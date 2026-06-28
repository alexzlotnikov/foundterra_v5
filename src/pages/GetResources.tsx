import { Helmet } from "react-helmet-async";
import { Database, Rocket, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import FreeStartupTools from "@/components/FreeStartupTools";
import RelatedServices from "@/components/RelatedServices";
import { useLanguage } from "@/hooks/useLanguage";

const GetResources = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const t = isHebrew
    ? {
        title: "גישה מלאה ל-",
        titleHighlight: "מאגר המשאבים",
        subtitle: "הצטרפו לקהילת יזמים שבונים סטארטאפים מצליחים",
        templates: "תבניות",
        guides: "מדריכים",
        tools: "כלים",
        community: "קהילה",
      }
    : {
        title: "Get Access to Complete",
        titleHighlight: "Resources Database",
        subtitle: "Join community of founders building successful startups",
        templates: "Templates",
        guides: "Guides",
        tools: "Tools",
        community: "Community",
      };

  return (
    <>
      <Helmet>
        <title>{isHebrew ? "מאגר משאבים חינמי ליזמים | Foundterra" : "Access Free Startup Resources | Foundterra"}</title>
        <meta name="description" content={isHebrew ? "גישה חינמית למאגר תבניות, מדריכים וכלי גיוס ליזמים וסטארטאפים." : "Get instant access to our complete database of startup resources, templates, and guides. Free for entrepreneurs and founders."} />
        <meta property="og:title" content={isHebrew ? "מאגר משאבים חינמי ליזמים | Foundterra" : "Access Free Startup Resources | Foundterra"} />
        <meta property="og:description" content={isHebrew ? "תבניות, מדריכים וכלים מעשיים ליזמים בישראל." : "Get instant access to our complete database of startup resources, templates, and guides. Free for entrepreneurs and founders."} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen flex flex-col" dir={isHebrew ? "rtl" : "ltr"}>
        <div className="py-8 px-4">
          <div className="container-max max-w-4xl mx-auto flex justify-center">
            <Link to={isHebrew ? "/he" : "/"} className="flex items-center justify-center gap-3 group">
              <img loading="eager" decoding="async"
                src="/brand/foundterra-logo-white.svg"
                width="48"
                height="48"
                alt="Foundterra Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 transition-transform group-hover:scale-105"
              />
              <span className="text-2xl sm:text-3xl font-bold gradient-text transition-opacity group-hover:opacity-80">Foundterra</span>
            </Link>
          </div>
        </div>

        <main className="flex-1 section-padding pt-0">
          <div className="container-max max-w-5xl">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t.title} <span className="gradient-text">{t.titleHighlight}</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                {t.subtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
                <div className="flex flex-col items-center p-4 bg-card rounded-lg">
                  <Database className="w-8 h-8 text-primary mb-2" />
                  <p className="text-sm font-medium">{t.templates}</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-card rounded-lg">
                  <Rocket className="w-8 h-8 text-primary mb-2" />
                  <p className="text-sm font-medium">{t.guides}</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-card rounded-lg">
                  <TrendingUp className="w-8 h-8 text-primary mb-2" />
                  <p className="text-sm font-medium">{t.tools}</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-card rounded-lg">
                  <Users className="w-8 h-8 text-primary mb-2" />
                  <p className="text-sm font-medium">{t.community}</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto max-w-2xl animate-slide-up overflow-hidden rounded-xl border border-primary/25 bg-card/60">
              <div className="pointer-events-none absolute inset-x-0 top-0 flex h-16 items-center justify-center bg-card text-sm text-muted-foreground">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary/25 border-t-primary" aria-hidden="true" />
                <span className="ms-3">{isHebrew ? "טוען את טופס ההרשמה…" : "Loading signup form…"}</span>
              </div>
                <iframe
                  src="https://2f7b1624.sibforms.com/serve/MUIFAFHPuF7CY4GtAaTSqbLtqOqYhdbKZcA1l5Vrm2adbkNBrc74Vy-UOTg9trle5vG9kTAlPTfE7b0y14nhnnSbVl27tmAS5PSfTlYLW8NsEjPuZt5hpUIxepM8swQpg6Uxud9_TNHlaWzprO-VubAOEKPJUNiFFQ3R3IR5NKlMDmCmhUNSCUsAIwwuPXym4eaMppd4Lcok0BhVeg=="
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                  loading="eager"
                  className="relative z-10 min-h-[620px] w-full border-0 bg-card sm:min-h-[560px]"
                  title={isHebrew ? "טופס הרשמה לקבלת משאבים בחינם" : "Sign up to get free startup resources"}
                />
              <noscript>
                <p className="relative z-20 p-6 text-center text-sm text-muted-foreground">
                  {isHebrew
                    ? "יש להפעיל JavaScript כדי לפתוח את טופס קבלת המשאבים. ניתן ליצור קשר בכתובת info@foundterra.com."
                    : "Enable JavaScript to open the resource signup form, or contact info@foundterra.com."}
                </p>
              </noscript>
            </div>

          </div>

          <FreeStartupTools className="pt-16" sectionId="free-tools-resources" />
        </main>
        <RelatedServices />
      </div>
    </>
  );
};

export default GetResources;
