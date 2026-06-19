import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

const InvestorPerspective = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";

  const t = isHebrew
    ? {
        kicker: "גבולות ברורים",
        title: "זה ליווי גיוס אמיתי — לא הבטחות קסם.",
        subtitle: "Foundterra משפרת חומרים, מסרים, מוכנות ותהליך. אין הבטחה לפגישות, השקעה או term sheet.",
        items: [
          "ללא הבטחת אינטרוים למשקיעים",
          "ללא פעילות ברוקר/Placement Agent",
          "ללא ייעוץ משפטי, מס או השקעות",
          "ללא כתיבה מלאה בתוך מסלולי המנוי",
          "ללא בניית מודל/דאטה רום ללא רכישה נפרדת",
          "ללא הבטחת תוצאת גיוס",
        ],
      }
    : {
        kicker: "Clear boundaries",
        title: "This is fundraising support, not fake fundraising magic.",
        subtitle: "Foundterra helps founders improve materials, messaging, readiness, and fundraising process. It does not guarantee investor meetings, investment, or term sheets.",
        items: [
          "No guaranteed investor introductions",
          "No broker-dealer or placement agent activity",
          "No legal, tax, or investment advice",
          "No full rewrite inside monthly plans",
          "No financial model or data room build unless purchased separately",
          "No fundraising outcome guarantee",
        ],
      };

  return (
    <section id="investor-perspective" className="section-padding scroll-mt-24">
      <div className="container-max">
        <Card className="bg-secondary border-primary/30 max-w-6xl mx-auto">
          <CardContent className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className={isHebrew ? "text-right" : ""}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-serif text-foreground">{t.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-body">{t.subtitle}</p>
            </div>
            <div className={`glass-panel rounded-xl p-6 sm:p-8 ${isHebrew ? "text-right" : ""}`}>
              <ul className="space-y-3">
                {t.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InvestorPerspective;
