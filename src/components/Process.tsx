import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { localizedPath } from "@/utils/localizedPath";

const Process = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";

  const t = isHebrew
    ? {
        kicker: "ביצוע Done-for-you",
        title: "צריך לבנות את נכסי הגיוס בפועל? נשמור את זה נפרד מהמנוי.",
        subtitle: "מסלולי המנוי מיועדים לפידבק ואדווייזורי. שירותי ביצוע הם פרויקטים סגורים.",
        mainTitle: "מצגת משקיעים ברמת Investor-Ready",
        mainText: "כתיבה מחדש ובנייה מלאה של המצגת סביב לוגיקת משקיע, נרטיב, מבנה שקופיות ובהירות.",
        cta: "דברו איתנו על בנייה מלאה",
        addOn: "תוספת",
        services: [
          ["מודל פיננסי", "הנחות משקיע, לוגיקת הכנסות, runway, תרחישים ומבנה מודל."],
          ["הכנת Data Room", "ארגון חומרי הדיו דיליג'נס הבסיסיים שמשקיעים מצפים לראות."],
          ["ניתוח שוק ומתחרים", "מיפוי מתחרים, פוזישנינג, לוגיקת שוק ומסגור moat למשקיעים."],
        ],
      }
    : {
        kicker: "Done-for-you execution",
        title: "Need the actual fundraising assets built? Keep this separate from the subscription.",
        subtitle: "Monthly plans are for review, advisory, and iteration. Execution services are fixed projects for founders who need materials rebuilt or prepared properly.",
        mainTitle: "Investor-Ready Pitch Deck",
        mainText: "Full strategic rewrite and rebuild of your pitch deck, focused on investor logic, narrative, slide structure, clarity, and fundraising readiness.",
        cta: "Ask About Full Deck",
        addOn: "Add-on",
        services: [
          ["Financial Model", "Investor-facing assumptions, revenue logic, runway, scenarios, and model structure."],
          ["Data Room Preparation", "Organize the basic diligence materials investors expect before serious conversations."],
          ["Competitor & Market Analysis", "Investor-facing competitor map, positioning, market logic, and moat framing."],
        ],
      };

  return (
    <section id="services" className="section-padding scroll-mt-24 relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="mb-12 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-serif">{t.title}</h2>
          <p className="responsive-text-base text-muted-foreground leading-relaxed font-body">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 sm:gap-14">
          <Card className="rounded-none border-white/15 bg-transparent">
            <CardContent className={`p-8 sm:p-10 ${isHebrew ? "text-right" : ""}`}>
              <h3 className="text-4xl font-bold mb-4 font-serif">{t.mainTitle}</h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed font-body">{t.mainText}</p>
              <p className="text-5xl font-bold gradient-text mb-8">{isHebrew ? "₪4,500" : "$1,500"} <span className="text-base text-muted-foreground">{isHebrew ? "מחיר התחלתי" : "starting price"}</span></p>
              <Button asChild variant="hero" size="lg">
                <a href={localizedPath("/pay/pitch-deck-creation", language)}>{t.cta}</a>
              </Button>
            </CardContent>
          </Card>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {t.services.map(([title, description], index) => (
              <div key={title} className={`flex items-center justify-between gap-4 py-7 ${isHebrew ? "text-right" : ""}`}>
                  <div>
                    <h3 className="text-xl font-bold mb-1 font-serif">{title}</h3>
                    <p className="text-muted-foreground font-body">{description}</p>
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-primary whitespace-nowrap">{t.addOn}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
