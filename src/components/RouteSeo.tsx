import { Helmet } from "react-helmet-async";
import { matchPath, useLocation } from "react-router-dom";
import { appRoutes } from "@/routes";

const SITE_URL = "https://www.foundterra.com";
const SOCIAL_IMAGES = {
  en: `${SITE_URL}/brand/foundterra-og-v2-en.webp`,
  he: `${SITE_URL}/brand/foundterra-og-v2-he.webp`,
} as const;

const SOCIAL_IMAGE_ALT = {
  en: "Fundraising takes too much founder time to do it wrong. Foundterra transforms founder materials into an investor-ready pitch.",
  he: "גיוס הון גוזל יותר מדי זמן של יזמים מכדי לעשות אותו לא נכון. Foundterra הופכת חומרי גיוס להצגה ברורה למשקיעים.",
} as const;

const hebrewSeo: Record<string, { title: string; description: string }> = {
  "/he": {
    title: "Foundterra | ליווי גיוס, מצגות משקיעים ומודלים פיננסיים",
    description: "ליווי גיוס ליזמי Pre-Seed ו-Seed בישראל: מצגות משקיעים, מודלים פיננסיים, אסטרטגיית גיוס וכלים מעשיים.",
  },
  "/he/resources": {
    title: "משאבים וכלים לסטארטאפים | Foundterra",
    description: "מדריכים, תבניות, מאגרי משקיעים וכלים מעשיים ליזמים בישראל בשלבי הקמה וגיוס.",
  },
  "/he/get-resources": {
    title: "מאגר משאבים חינמי ליזמים | Foundterra",
    description: "גישה חינמית לתבניות, מדריכים וכלי גיוס לסטארטאפים ויזמים.",
  },
  "/he/saas-metric-auditor": {
    title: "בדיקת מדדי SaaS למשקיעים | Foundterra",
    description: "בדקו צמיחה, שימור, Burn Multiple וכלכלת יחידה וקבלו תמונת מוכנות לגיוס.",
  },
  "/he/deck-architect": {
    title: "בניית מבנה למצגת משקיעים | Foundterra",
    description: "כלי חינמי לבניית סדר שקפים ומבנה נרטיבי למצגת גיוס למשקיעים.",
  },
  "/he/financial-model": {
    title: "מודל פיננסי לסטארטאפ | Foundterra",
    description: "כלי לתכנון הכנסות, הוצאות, תזרים, Burn ו-Runway עבור סטארטאפים לפני גיוס.",
  },
  "/he/investor-ready": {
    title: "בדיקת מוכנות למשקיעים | Foundterra",
    description: "בדקו את מוכנות הסטארטאפ לגיוס לפי צוות, שוק, Traction, מודל עסקי ותהליך גיוס.",
  },
  "/he/paid-consultation": {
    title: "ייעוץ גיוס פרטי ליזמים | Foundterra",
    description: "פגישת ייעוץ ממוקדת למצגת, נרטיב, מודל פיננסי ואסטרטגיית גיוס.",
  },
  "/he/market-size": {
    title: "חישוב TAM, SAM ו-SOM לסטארטאפ | Foundterra",
    description: "כלי לחישוב גודל שוק והכנת ניתוח שוק אמין למצגת משקיעים.",
  },
  "/he/pitch-review": {
    title: "בדיקת מצגת משקיעים חינמית | Foundterra",
    description: "העלו Pitch Deck וקבלו ציון מוכנות למשקיעים והמלצות מעשיות לשיפור.",
  },
  "/he/startup-deals": {
    title: "הטבות, קרדיטים וכלים לסטארטאפים | Foundterra",
    description: "קרדיטים לענן, הנחות תוכנה והטבות שנבחרו עבור יזמים וסטארטאפים בישראל.",
  },
};

export default function RouteSeo() {
  const location = useLocation();
  const route = appRoutes.find((candidate) =>
    matchPath({ path: candidate.path, end: true }, location.pathname),
  );

  const locale = route?.locale ?? (location.pathname.startsWith("/he") ? "he" : "en");
  const canonical = route?.canonical ?? `${SITE_URL}${location.pathname}`;
  const inferredAlternate = route?.alternate
    ?? (route?.locale === "he"
      ? location.pathname.replace(/^\/he/, "") || "/"
      : route?.locale === "en" && route.path.includes(":")
        ? `/he${location.pathname}`
        : undefined);
  const alternate = inferredAlternate ? `${SITE_URL}${inferredAlternate}` : undefined;
  const englishUrl = locale === "en" ? canonical : alternate;
  const hebrewUrl = locale === "he" ? canonical : alternate;
  const localizedSeo = locale === "he" ? hebrewSeo[location.pathname] : undefined;
  const socialImage = SOCIAL_IMAGES[locale];
  const socialImageAlt = SOCIAL_IMAGE_ALT[locale];
  const serviceSchema = locale === "he"
    ? {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Foundterra",
        url: canonical,
        inLanguage: "he-IL",
        areaServed: { "@type": "Country", name: "Israel" },
        description: localizedSeo?.description ?? "ליווי גיוס וכלים מעשיים ליזמים וסטארטאפים בישראל.",
        logo: `${SITE_URL}/brand/foundterra-logo-black.svg`,
      }
    : undefined;

  return (
    <Helmet>
      <html lang={locale} dir={locale === "he" ? "rtl" : "ltr"} />
      {localizedSeo ? <title>{localizedSeo.title}</title> : null}
      {localizedSeo ? <meta name="description" content={localizedSeo.description} /> : null}
      <meta
        name="robots"
        content={!route || route.indexable === false ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />
      <link rel="canonical" href={canonical} />
      {englishUrl && <link rel="alternate" hrefLang="en" href={englishUrl} />}
      {hebrewUrl && <link rel="alternate" hrefLang="he" href={hebrewUrl} />}
      {englishUrl && <link rel="alternate" hrefLang="x-default" href={englishUrl} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:secure_url" content={socialImage} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={socialImageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={socialImageAlt} />
      {serviceSchema ? <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script> : null}
    </Helmet>
  );
}
