# Dynamic Rendering Architecture for SEO & Crawl Performance

## 1) Traffic interception and bot detection

### Request flow (high level)

1. Request enters CDN/edge worker.
2. Worker normalizes URL and headers.
3. Worker evaluates **bot detection policy**:
   - User-Agent regex allowlist
   - Optional reverse-DNS verification for sensitive engines (Google, Bing)
   - Method/path eligibility checks
4. If bot and eligible, worker routes to prerender gateway.
5. If human (or ineligible), worker forwards to origin SPA app.

### Bot detection policy

> Use a positive allowlist first, then a minimal denylist to reduce false positives.

#### Recommended crawler User-Agent patterns

```regex
/(googlebot|google-inspectiontool|apis-google|adsbot-google|mediapartners-google|bingbot|adidxbot|msnbot|yandex(bot|images|video|blogs)|duckduckbot|baiduspider|sogou|exabot|facebot|facebookexternalhit|meta-externalagent|twitterbot|linkedinbot|slackbot-linkexpanding|slack-imgproxy|discordbot|whatsapp|telegrambot|skypeuripreview|pinterest(bot|app)|redditbot|quora\slink\spreview|applebot|petalbot|semrushbot|ahrefsbot|mj12bot|dotbot|rogerbot|sitebulb|screaming\sfrog|lighthouse|chatgpt-user|gptbot|oai-searchbot|perplexitybot|claudebot|ccbot|amazonbot|bytespider)/i
```

#### Security and accuracy hardening

- Only prerender `GET` and `HEAD` requests.
- Ignore requests for static assets (`.js`, `.css`, `.png`, `.webp`, `.svg`, `.ico`, `.woff2`, etc.).
- Ignore authenticated/private routes (dashboard, checkout, account, API).
- Optional reverse DNS checks:
  - Googlebot host ends with `googlebot.com` or `google.com`, then forward-confirm lookup.
  - Bingbot host ends with `search.msn.com`.
- Include an emergency kill switch: `DYNAMIC_RENDERING_ENABLED=false`.

---

## 2) Routing logic

### Components

- **Edge Router / Middleware** (Cloudflare Worker, Fastly Compute, NGINX/OpenResty, or CDN function)
- **Prerender Gateway API** (internal service that controls rendering requests)
- **Renderer Pool** (headless Chromium workers, e.g., Playwright/Puppeteer)
- **HTML Snapshot Cache** (CDN edge + Redis/object store)
- **Origin SPA** (normal user-facing client app)

### Bot request path

1. Edge determines request is crawler-eligible.
2. Edge computes cache key: `scheme + host + normalized_path + query + locale + device_class`.
3. Check CDN/Redis for snapshot.
4. On hit: return snapshot immediately with stored status headers.
5. On miss: call prerender gateway:
   - Gateway launches/borrows browser context.
   - Loads canonical URL.
   - Waits for render readiness signal (`window.__PRERENDER_READY__` or network idle + timeout).
   - Captures final HTML + response metadata (status, headers, canonical, robots, hreflang).
   - Stores snapshot in cache with TTL.
6. Gateway returns snapshot to edge; edge returns to bot.

### Human request path

- Edge bypasses prerender gateway.
- Request goes directly to origin/CDN static bundle and APIs.
- Existing performance stack remains unchanged.

---

## 3) Caching and crawl budget optimization

### Two-tier cache strategy

1. **Tier 1: CDN edge cache**
   - Fastest response for repeated crawler hits by geography.
2. **Tier 2: Central snapshot cache (Redis/S3 + metadata DB)**
   - Shared source of truth for generated HTML.

### TTL policy (1–24 hours)

- **Highly dynamic pages** (pricing, inventory-like): `TTL=1h`
- **Moderately changing pages** (blog index, landing pages): `TTL=6h`
- **Mostly static pages** (about, legal, evergreen docs): `TTL=24h`

### Revalidation and invalidation

- Use **stale-while-revalidate** for bots:
  - Serve stale snapshot instantly when expired.
  - Trigger async regeneration in background.
- Event-driven purge on CMS publish/deploy webhook:
  - Purge exact URL and related locale variants.
- Apply render throttling:
  - Distributed lock per URL to avoid stampede.
  - Max concurrent renders per domain.

### Crawl-budget protections

- Cache key normalization to prevent query-string explosion:
  - Keep SEO-significant params only (e.g., `page`, `lang`, `slug`).
  - Drop tracking params (`utm_*`, `fbclid`, `gclid`).
- Rate-limit abusive bots not in allowlist.
- Add `X-Prerender-Cache: HIT|MISS|STALE` for observability.

---

## 4) Anti-cloaking and SEO safety compliance

### Strict parity rules (must-have)

1. **Single rendering source**: snapshots are generated from the same production URL used by humans.
2. **No bot-only content branching** in app code.
3. **Metadata parity**:
   - `<title>`, meta description, canonical, robots, Open Graph, Twitter tags, structured data must match.
4. **Link parity**:
   - Same internal links, hreflang links, rel values.
5. **Content parity checks**:
   - Hash/body diff monitoring between prerendered DOM text and hydrated user DOM for key templates.

### HTTP status and header pass-through (critical)

- If route is real 404 for users, prerender must return **HTTP 404** (not 200 with “not found” text).
- Preserve **301/302/307/308** redirects exactly.
- Preserve `X-Robots-Tag`, `canonical`, and cache headers as intended.
- If renderer fails, fail open to origin HTML rather than serving broken snapshots.

### Governance controls

- Daily parity audit job for top landing pages.
- Alert on mismatch rate > threshold (e.g., 1%).
- Keep a signed rendering policy document for SEO/legal compliance.

---

## Reference architecture diagram (logical)

```text
Crawler/User
   |
[CDN/Edge Middleware]
   |-- if human ------------------------------> [Origin SPA + APIs]
   |
   |-- if bot --> [Edge Cache] --hit--> return HTML
                 |
                 '--miss--> [Prerender Gateway] --> [Renderer Pool]
                                      |                 |
                                      '--store snapshot-'
                                             |
                                      [Central Snapshot Cache]
```

---

## Pseudocode

### A) Edge middleware detection and routing

```pseudo
function handleRequest(req):
  if ENV.DYNAMIC_RENDERING_ENABLED != true:
    return fetchOrigin(req)

  if req.method not in ["GET", "HEAD"]:
    return fetchOrigin(req)

  url = normalizeUrl(req.url)

  if isStaticAsset(url.path) or isPrivatePath(url.path):
    return fetchOrigin(req)

  ua = (req.headers["user-agent"] or "").toLowerCase()

  if not isKnownBot(ua):
    return fetchOrigin(req)

  if ENV.ENABLE_RDNS_VERIFICATION:
    if not verifyCrawlerIdentity(req.ip, ua):
      return fetchOrigin(req)

  key = buildSnapshotCacheKey(req, url)

  snapshot = edgeCache.get(key)
  if snapshot exists:
    return response(snapshot.body, snapshot.status, snapshot.headers + {"X-Prerender-Cache":"HIT"})

  # Try central cache before rendering
  snapshot = centralCache.get(key)
  if snapshot exists:
    edgeCache.put(key, snapshot, snapshot.ttl)
    return response(snapshot.body, snapshot.status, snapshot.headers + {"X-Prerender-Cache":"HIT-CENTRAL"})

  # Miss => prerender
  prerenderRes = fetch(PRERENDER_GATEWAY_URL + "/render", {
    method: "POST",
    body: {
      url: url.full,
      key: key,
      headers: forwardedHeaders(req),
      timeoutMs: 12000
    }
  })

  if prerenderRes.ok and prerenderRes.body not empty:
    snapshot = parseSnapshot(prerenderRes)
    edgeCache.put(key, snapshot, snapshot.ttl)
    centralCache.put(key, snapshot, snapshot.ttl)
    return response(snapshot.body, snapshot.status, snapshot.headers + {"X-Prerender-Cache":"MISS"})

  # Fail-open strategy
  return fetchOrigin(req)
```

### B) Prerender gateway logic

```pseudo
function renderHandler(input):
  acquireLock("render:" + input.key, ttl=30s) or waitForExistingSnapshot()

  cached = centralCache.get(input.key)
  if cached exists and not expired(cached):
    return cached

  browser = rendererPool.borrow()

  page = browser.newPage()
  page.setUserAgent(STANDARD_DESKTOP_UA)
  page.setExtraHTTPHeaders({"X-Render-Mode":"prerender"})

  nav = page.goto(input.url, waitUntil="domcontentloaded", timeout=input.timeoutMs)

  # wait strategy: app-driven signal preferred
  waitUntil(
    page.evaluate("window.__PRERENDER_READY__ === true"),
    fallback="networkidle",
    max=8s
  )

  status = nav.finalResponse.status
  headers = filterResponseHeaders(nav.finalResponse.headers, passThroughAllowlist)

  # Preserve redirects and hard errors
  if status in [301,302,307,308]:
    location = nav.finalResponse.headers["location"]
    return snapshot("", status, {"Location": location}, ttl=1h)

  if status == 404 or pageContainsHard404Marker(page):
    html404 = page.content()
    return snapshot(html404, 404, headers, ttl=1h)

  html = page.content()

  parity = runParityChecks(html)
  if parity.failed:
    emitAlert("parity_mismatch", input.url, parity.details)

  ttl = chooseTtlByRoute(input.url) # 1h, 6h, or 24h
  snap = snapshot(html, status, headers, ttl)

  centralCache.put(input.key, snap, ttl)
  releaseLock("render:" + input.key)
  rendererPool.return(browser)

  return snap
```

### C) Cache invalidation webhook

```pseudo
function onContentPublish(event):
  changedUrls = resolveAffectedUrls(event.contentId, locales=["en","he","ru"])

  for url in changedUrls:
    keyPatterns = deriveCacheKeys(url)
    edgeCache.purge(keyPatterns)
    centralCache.delete(keyPatterns)

  return 200
```

### D) Parity audit job (anti-cloaking)

```pseudo
function nightlyParityAudit(urlList):
  for url in sampleTopUrls(urlList, n=500):
    botHtml = fetchAsBot(url)
    userHtml = fetchAsUserAndHydrate(url)

    botSignals = extractSeoSignals(botHtml)
    userSignals = extractSeoSignals(userHtml)

    diff = compare(
      botSignals.title,
      botSignals.meta,
      botSignals.canonical,
      botSignals.structuredData,
      botSignals.mainTextHash,
      botSignals.primaryLinksHash,
      userSignals...
    )

    if diff.exceedsThreshold:
      logIssue(url, diff)

  publishAuditReport()
```

---

## Operational SLOs and monitoring

- P95 prerender response to crawler: **< 800ms on cache hit**, **< 4s on miss**.
- Snapshot generation success rate: **> 99%**.
- Parity mismatch rate: **< 1%**.
- Monitor dashboards:
  - Render queue depth
  - Cache HIT ratio
  - Bot volume by engine
  - 404/redirect correctness
  - Renderer crash rate

This design gives bots fast static HTML, protects crawl budget, and stays compliant by enforcing strict parity and HTTP correctness.
