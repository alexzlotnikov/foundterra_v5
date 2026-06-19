import { Helmet } from "react-helmet-async";
import { matchPath, useLocation } from "react-router-dom";
import { appRoutes } from "@/routes";

const SITE_URL = "https://www.foundterra.com";
const SOCIAL_IMAGE = `${SITE_URL}/brand/foundterra-og.webp`;

export default function RouteSeo() {
  const location = useLocation();
  const route = appRoutes.find((candidate) =>
    matchPath({ path: candidate.path, end: true }, location.pathname),
  );

  const locale = route?.locale ?? (location.pathname.startsWith("/he") ? "he" : "en");
  const canonical = route?.canonical ?? `${SITE_URL}${location.pathname}`;
  const alternate = route?.alternate ? `${SITE_URL}${route.alternate}` : undefined;
  const englishUrl = locale === "en" ? canonical : alternate;
  const hebrewUrl = locale === "he" ? canonical : alternate;

  return (
    <Helmet>
      <html lang={locale} dir={locale === "he" ? "rtl" : "ltr"} />
      <meta
        name="robots"
        content={!route || route.indexable === false ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />
      <link rel="canonical" href={canonical} />
      {englishUrl && <link rel="alternate" hrefLang="en" href={englishUrl} />}
      {hebrewUrl && <link rel="alternate" hrefLang="he" href={hebrewUrl} />}
      {englishUrl && <link rel="alternate" hrefLang="x-default" href={englishUrl} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={SOCIAL_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={SOCIAL_IMAGE} />
    </Helmet>
  );
}
