import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

const Packages = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";

  const t = isHebrew
    ? {
        kicker: "הצעד בתשלום המומלץ ראשון",
        title: "דיאגנוסטיק למצגת משקיעים",
        subtitle: "בדיקה חד-פעמית ליזמים שלא בטוחים אם צריך תיקונים קטנים, מנוי חודשי או בנייה מחדש מלאה.",
        bullets: ["פידבק מפורט על המצגת", "שיחת ייעוץ של שעה", "תוכנית תיקונים ישימה"],
        cta: "קבעו דיאגנוסטיק ב-₪300",
        cards: [
          ["מה חלש עכשיו?", "אבחון ברור של הבעיות המרכזיות מול משקיעים במצגת הנוכחית שלך."],
          ["מה לתקן קודם?", "יוצאים עם רשימת תיקונים מסודרת ומדורגת במקום הערות אקראיות."],
          ["מה הצעד הבא הנכון?", "להבין אם להמשיך לבד, להצטרף למנוי תמיכה, או לבנות מחדש."],
        ],
      }
    : {
        kicker: "Best first paid step",
        title: "Pitch Deck Diagnostic",
        subtitle: "A one-time review for founders who are not sure whether they need small fixes, monthly support, or a full deck rebuild.",
        bullets: ["Detailed pitch deck feedback", "1-hour consultation", "Actionable fixing plan"],
        cta: "Book $100 Diagnostic",
        cards: [
          ["What is weak right now?", "Get a clear diagnosis of the biggest investor-facing problems in your current deck."],
          ["What should you fix first?", "Leave with a prioritized list of changes instead of random comments from different advisors."],
          ["What is the right next step?", "Know whether you should keep improving alone, subscribe for support, or rebuild the deck properly."],
        ],
      };

  return (
    <section id="diagnostic" className="section-padding scroll-mt-24">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <Card className="card-elevated">
            <CardContent className={`p-8 sm:p-10 ${isHebrew ? "text-right" : ""}`}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-serif">{t.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-body">{t.subtitle}</p>
              <ul className="space-y-3 mb-8">
                {t.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <Button asChild variant="hero" size="lg" className="w-full sm:w-auto whitespace-normal leading-snug min-h-12 py-3 px-5">
                <a href="/pay/pitch-deck-review">{t.cta}</a>
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {t.cards.map(([title, description], index) => (
              <Card key={title} className="card-elevated animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className={`p-6 ${isHebrew ? "text-right" : ""}`}>
                  <h3 className="text-xl font-bold mb-2 font-serif">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-body">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
