import { lazy, Suspense, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import DeferredSection from "@/components/DeferredSection";
import { FAQ_CONTENT } from "@/content/faqContent";

const Footer = lazy(() => import("@/components/Footer"));
const FundraisingWasteCalculator = lazy(() => import("@/components/FundraisingWasteCalculator"));
const About = lazy(() => import("@/components/About"));
const Packages = lazy(() => import("@/components/Packages"));
const EntryPoints = lazy(() => import("@/components/EntryPoints"));
const Process = lazy(() => import("@/components/Process"));
const FreeStartupTools = lazy(() => import("@/components/FreeStartupTools"));
const FounderTeam = lazy(() => import("@/components/FounderTeam"));
const EventsCalendar = lazy(() => import("@/components/EventsCalendar"));
const Partners = lazy(() => import("@/components/Partners"));
const InvestorPerspective = lazy(() => import("@/components/InvestorPerspective"));
const Resources = lazy(() => import("@/components/Resources"));
const FAQ = lazy(() => import("@/components/FAQ"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));

const Index = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const websiteUrl = "https://www.foundterra.com";
  const pageUrl = isHebrew ? `${websiteUrl}/he` : `${websiteUrl}/`;
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Foundterra",
    url: websiteUrl,
    logo: `${websiteUrl}/brand/foundterra-logo-black.svg`,
    sameAs: ["https://www.linkedin.com/company/foundterra"],
    areaServed: ["US", "IL", "Global"],
    availableLanguage: ["en", "he"],
    inLanguage: isHebrew ? "he-IL" : "en-US",
    description: isHebrew
      ? "Foundterra מספקת הכנה וליווי לגיוס הון לסטארטאפים בשלבים מוקדמים, כולל מצגות משקיעים, מודלים פיננסיים, חומרים מוכנים למשקיעים, תכנון פנייה למשקיעים וליווי גיוס חודשי."
      : "Foundterra provides fundraising preparation and support for early-stage startups, including pitch decks, financial models, investor-ready materials, investor outreach planning, and monthly raise advisory.",
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CONTENT[isHebrew ? "he" : "en"].map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{isHebrew ? "Foundterra | מצגות משקיעים, מודלים פיננסיים וליווי גיוס" : "Foundterra | Investor-Ready Pitch Decks, Financial Models & Fundraising Support"}</title>
        <meta
          name="description"
          content={
            isHebrew
              ? "Foundterra מסייעת ליזמים בשלבים מוקדמים לבנות מצגות משקיעים, מודלים פיננסיים וחומרי גיוס, ומלווה אותם במיקוד משקיעים, פניות, מעקב והחלטות במהלך הגיוס."
              : "Foundterra helps early-stage founders build investor-ready pitch decks, financial models, and fundraising materials, then supports investor targeting, outreach, follow-ups, and raise decisions."
          }
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Foundterra" />
        <meta property="og:title" content={isHebrew ? "Foundterra | חומרי גיוס וליווי גיוס לסטארטאפים" : "Foundterra | Fundraising Materials & Raise Support for Startups"} />
        <meta
          property="og:description"
          content={
            isHebrew
              ? "בנו מצגות משקיעים, מודלים פיננסיים וחומרי גיוס מוכנים למשקיעים. קבלו ליווי במיקוד משקיעים, פניות, מעקב והחלטות חודשיות."
              : "Build investor-ready pitch decks, financial models, and fundraising materials. Get support with investor targeting, outreach, follow-ups, and monthly raise decisions."
          }
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content={isHebrew ? "he_IL" : "en_US"} />
        <meta property="og:locale:alternate" content={isHebrew ? "en_US" : "he_IL"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isHebrew ? "Foundterra | ליווי גיוס לסטארטאפים" : "Foundterra | Startup Fundraising Support"} />
        <meta
          name="twitter:description"
          content={
            isHebrew
              ? "מצגות משקיעים, מודלים פיננסיים, תמיכה בפנייה למשקיעים וליווי גיוס חודשי ליזמים בשלבים מוקדמים."
              : "Investor-ready pitch decks, financial models, outreach support, and monthly fundraising advice for early-stage founders."
          }
        />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hrefLang="en" href={`${websiteUrl}/`} />
        <link rel="alternate" hrefLang="he" href={`${websiteUrl}/he`} />
        <link rel="alternate" hrefLang="x-default" href={`${websiteUrl}/`} />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <Header />
      <main>
        <Hero />
        <DeferredSection minHeight={1100} rootMargin="700px 0px">
          <Suspense fallback={<div className="h-[800px]" aria-hidden="true" />}>
            <FundraisingWasteCalculator />
          </Suspense>
        </DeferredSection>
        <div className="pb-12">
          <Problem />
        </div>
        <DeferredSection minHeight={520}><Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <About />
        </div></Suspense></DeferredSection>
        <DeferredSection minHeight={720}><Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <Packages />
        </div></Suspense></DeferredSection>
        <DeferredSection minHeight={760}><Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <EntryPoints />
        </div></Suspense></DeferredSection>
        <DeferredSection minHeight={700}><Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <Process />
        </div></Suspense></DeferredSection>
        <DeferredSection minHeight={680}><Suspense fallback={<div className="h-24" aria-hidden="true" />}>
          <FounderTeam />
        </Suspense></DeferredSection>
        <DeferredSection minHeight={720}><Suspense fallback={<div className="h-[520px]" aria-hidden="true" />}>
          <EventsCalendar />
        </Suspense></DeferredSection>
        <DeferredSection minHeight={520}><Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <Partners />
        </div></Suspense></DeferredSection>
        <DeferredSection minHeight={780}><Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <Resources />
        </div></Suspense></DeferredSection>
        <DeferredSection minHeight={760}><Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <FreeStartupTools highlighted />
        </div></Suspense></DeferredSection>
        <DeferredSection minHeight={620}><Suspense fallback={<div className="h-24" aria-hidden="true" />}><FAQ /></Suspense></DeferredSection>
        <DeferredSection minHeight={620}><Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <InvestorPerspective />
        </div></Suspense></DeferredSection>
        <DeferredSection minHeight={520}><Suspense fallback={<div className="h-24" aria-hidden="true" />}><FinalCTA /></Suspense></DeferredSection>
      </main>
      <Suspense fallback={<div className="h-48 bg-[hsl(240_14%_2%)]" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
