import { Helmet } from "react-helmet-async";
import { Database, Rocket, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import FreeStartupTools from "@/components/FreeStartupTools";
import RelatedServices from "@/components/RelatedServices";
import { useLanguage } from "@/hooks/useLanguage";

const BREVO_FORM_ACTION =
  "https://2f7b1624.sibforms.com/v2/serve/MUIFAFHPuF7CY4GtAaTSqbLtqOqYhdbKZcA1l5Vrm2adbkNBrc74Vy-UOTg9trle5vG9kTAlPTfE7b0y14nhnnSbVl27tmAS5PSfTlYLW8NsEjPuZt5hpUIxepM8swQpg6Uxud9_TNHlaWzprO-VubAOEKPJUNiFFQ3R3IR5NKlMDmCmhUNSCUsAIwwuPXym4eaMppd4Lcok0BhVeg==";

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

            <div className="mx-auto max-w-xl animate-slide-up rounded-2xl border border-primary/30 bg-card p-6 shadow-xl shadow-primary/5 sm:p-10">
              <div className="mb-8 text-center">
                <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
                  {isHebrew ? "ערכת גיוס כספים בחינם" : "Free Fundraising Toolkit"}
                </h2>
                <p className="text-muted-foreground">
                  {isHebrew ? "קבלו גישה מיידית לכל המשאבים בחינם" : "Get instant access to all resources for free"}
                </p>
              </div>

              <form action={BREVO_FORM_ACTION} method="POST" className="space-y-5">
                <div className="space-y-2 text-start">
                  <label htmlFor="resource-first-name" className="text-sm font-semibold">
                    {isHebrew ? "שם" : "Name"}
                  </label>
                  <input
                    id="resource-first-name"
                    name="FIRSTNAME"
                    type="text"
                    autoComplete="given-name"
                    required
                    maxLength={200}
                    placeholder={isHebrew ? "השם שלך" : "Your name"}
                    className="h-12 w-full rounded-lg border border-border bg-background px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2 text-start">
                  <label htmlFor="resource-email" className="text-sm font-semibold">
                    {isHebrew ? "כתובת אימייל" : "Email address"}
                  </label>
                  <input
                    id="resource-email"
                    name="EMAIL"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                    className="h-12 w-full rounded-lg border border-border bg-background px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <p className="text-start text-xs leading-relaxed text-muted-foreground">
                  {isHebrew
                    ? "בשליחת הטופס אתם מסכימים לקבל מדי פעם אימיילים על משאבים לסטארטאפים. ניתן להסיר את ההרשמה בכל עת."
                    : "By submitting, you agree to receive occasional emails about startup resources. You can unsubscribe at any time."}
                </p>

                <input
                  type="text"
                  name="email_address_check"
                  value=""
                  readOnly
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px]"
                  aria-hidden="true"
                />
                <input type="hidden" name="locale" value="en" />

                <button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-primary px-6 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {isHebrew ? "קבלת גישה בחינם" : "Get Free Access"}
                </button>
              </form>
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
