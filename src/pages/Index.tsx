import { lazy, Suspense, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Footer from "@/components/Footer";

const ImageCarousel = lazy(() => import("@/components/ImageCarousel"));
const About = lazy(() => import("@/components/About"));
const Packages = lazy(() => import("@/components/Packages"));
const EntryPoints = lazy(() => import("@/components/EntryPoints"));
const Process = lazy(() => import("@/components/Process"));
const FreeStartupTools = lazy(() => import("@/components/FreeStartupTools"));
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
    logo: `${websiteUrl}/favicon.ico`,
    sameAs: ["https://www.linkedin.com/company/foundterra"],
    areaServed: ["US", "IL", "Global"],
    availableLanguage: ["en", "he"],
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
    <div className="min-h-screen opacity-100 transition-opacity duration-500">
      <div className="ambient-orb orb-1" aria-hidden="true" />
      <div className="ambient-orb orb-2" aria-hidden="true" />
      <Helmet>
        <title>{isHebrew ? "Foundterra | ליווי גיוס, מצגות ומודלים ליזמים" : "Foundterra | Pitch Deck & Fundraising Advisory for Founders"}</title>
        <meta
          name="description"
          content={
            isHebrew
              ? "Foundterra מסייעת ליזמי Pre-Seed ו-Seed לבנות מצגת משקיעים, מסרים ומוכנות גיוס ברמה גבוהה."
              : "Foundterra helps founders build investor-ready pitch decks, financial models, and fundraising strategy for pre-seed and seed rounds."
          }
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Foundterra" />
        <meta property="og:title" content={isHebrew ? "Foundterra | ליווי גיוס ליזמים" : "Foundterra | Fundraising Advisory for Founders"} />
        <meta
          property="og:description"
          content={
            isHebrew
              ? "ליווי גיוס ליזמי Pre-Seed ו-Seed: מצגת, מסרים, מודלים ומוכנות משקיעים."
              : "Fundraising support for pre-seed and seed founders: pitch decks, investor messaging, models, and raise readiness."
          }
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content={isHebrew ? "he_IL" : "en_US"} />
        <meta property="og:locale:alternate" content={isHebrew ? "en_US" : "he_IL"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isHebrew ? "Foundterra | ליווי גיוס ליזמים" : "Foundterra | Fundraising Advisory for Founders"} />
        <meta
          name="twitter:description"
          content={
            isHebrew
              ? "ליווי גיוס ממוקד ליזמים בשלבי Pre-Seed ו-Seed."
              : "Focused fundraising support for pre-seed and seed founders."
          }
        />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hrefLang="en" href={`${websiteUrl}/`} />
        <link rel="alternate" hrefLang="he" href={`${websiteUrl}/he`} />
        <link rel="alternate" hrefLang="x-default" href={`${websiteUrl}/`} />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-[220px]" aria-hidden="true" />}>
          <ImageCarousel />
        </Suspense>
        <div className="pb-12">
          <Problem />
        </div>
        <Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <About />
        </div></Suspense>
        <Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <Packages />
        </div></Suspense>
        <Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <EntryPoints />
        </div></Suspense>
        <Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <Process />
        </div></Suspense>
        <Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <InvestorPerspective />
        </div></Suspense>
        <Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <Resources />
        </div></Suspense>
        <Suspense fallback={<div className="h-24" aria-hidden="true" />}><div className="pb-12">
          <FreeStartupTools highlighted />
        </div></Suspense>
        <Suspense fallback={<div className="h-24" aria-hidden="true" />}><FAQ /></Suspense>
        <Suspense fallback={<div className="h-24" aria-hidden="true" />}><FinalCTA /></Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
