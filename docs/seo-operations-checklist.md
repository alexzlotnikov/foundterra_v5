# SEO Operations Checklist (Manual / Platform)

These items require DNS or platform configuration outside the codebase:

## DNS email authentication
- SPF TXT record (`@`): `v=spf1 include:_spf.google.com ~all`
- DMARC TXT record (`_dmarc`): `v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@foundterra.com; pct=100`

## Redirect and protocol
- Ensure one-hop domain resolution: `http://` → `https://www.foundterra.com/`.
- Avoid redirecting production domain to any Vercel preview domain.
- Confirm HTTP/2 (`h2`) is enabled in Vercel/edge proxy and (if used) Cloudflare.

## Backlink execution plan
- Submit profiles: Crunchbase, AngelList, ProductHunt, Betalist, startup directories.
- Publish founder-focused guest content and secure roundup mentions.
- Maintain media/press page for journalist outreach.
