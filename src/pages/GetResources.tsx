import { useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { AlertCircle, CheckCircle2, Database, Loader2, Rocket, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import FreeStartupTools from "@/components/FreeStartupTools";
import RelatedServices from "@/components/RelatedServices";
import { useLanguage } from "@/hooks/useLanguage";

const GetResources = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "success" | "error">("idle");
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionState === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmissionState("submitting");

    try {
      const response = await fetch("/api/brevo-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: String(data.get("firstName") ?? ""),
          email: String(data.get("email") ?? ""),
          locale: isHebrew ? "he" : "en",
          website: String(data.get("website") ?? ""),
        }),
      });

      if (!response.ok) throw new Error("Subscription failed");

      setSubmissionState("success");
      window.setTimeout(() => {
        window.location.assign(isHebrew ? "/he/resources" : "/resources");
      }, 600);
    } catch {
      setSubmissionState("error");
    }
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

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2 text-start">
                  <label htmlFor="resource-first-name" className="text-sm font-semibold">
                    {isHebrew ? "שם" : "Name"}
                  </label>
                  <input
                    id="resource-first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    maxLength={200}
                    disabled={submissionState === "submitting" || submissionState === "success"}
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
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    disabled={submissionState === "submitting" || submissionState === "success"}
                    placeholder="you@company.com"
                    className="h-12 w-full rounded-lg border border-border bg-background px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <p className="text-start text-xs leading-relaxed text-muted-foreground">
                  {isHebrew
                    ? "בשליחת הטופס אתם מסכימים לקבל מדי פעם אימיילים על משאבים לסטארטאפים. ניתן להסיר את ההרשמה בכל עת."
                    : "By submitting, you agree to receive occasional emails about startup resources. You can unsubscribe at any time."}
                </p>

                <div className="hidden" aria-hidden="true">
                  <label htmlFor="resource-website">Website</label>
                  <input id="resource-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                {submissionState === "error" && (
                  <div role="alert" className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-start text-sm text-destructive">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      {isHebrew
                        ? "לא הצלחנו לשמור את הפרטים. בדקו אותם ונסו שוב."
                        : "We couldn't save your details. Check them and try again."}
                    </span>
                  </div>
                )}

                {submissionState === "success" && (
                  <div role="status" className="flex items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 p-3 text-sm text-primary">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    <span>{isHebrew ? "הפרטים נשמרו. פותחים את המשאבים…" : "Saved. Opening your resources…"}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submissionState === "submitting" || submissionState === "success"}
                  className="flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submissionState === "submitting" ? (
                    <>
                      <Loader2 className="me-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      {isHebrew ? "שומרים…" : "Saving…"}
                    </>
                  ) : submissionState === "success" ? (
                    isHebrew ? "הפרטים נשמרו" : "Saved"
                  ) : (
                    isHebrew ? "קבלת גישה בחינם" : "Get Free Access"
                  )}
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
