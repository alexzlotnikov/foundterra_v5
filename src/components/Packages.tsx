import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { localizedPath } from "@/utils/localizedPath";

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
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-12">
          <div className={isHebrew ? "text-right" : ""}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-serif">{t.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-body">{t.subtitle}</p>
              <ul className="mb-8 divide-y divide-white/10 border-y border-white/10">
                {t.cards.map(([title, description], index) => (
                  <li key={title} className="grid grid-cols-[2rem_1fr] gap-3 py-4">
                    <span className="text-primary">0{index + 1}</span>
                    <span><strong className="block text-foreground">{title}</strong><span className="mt-1 block text-sm leading-6">{description}</span></span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="hero" size="lg" className="w-full sm:w-auto whitespace-normal leading-snug min-h-12 py-3 px-5">
                <a href={localizedPath("/pay/pitch-deck-review", language)}>{t.cta}</a>
              </Button>
          </div>
          <figure className="diagnostic-visual">
            <img
              src="/carousel/deck-diagnostic-original.png"
              width="1448"
              height="1086"
              loading="lazy"
              decoding="async"
              alt={isHebrew ? "דיאגנוסטיק למצגת לפני שליחה למשקיעים עם ציון ותיקונים מומלצים" : "Pitch deck diagnostic showing a readiness score and recommended fixes before investor outreach"}
            />
            <figcaption className="sr-only">
              {isHebrew ? "הבדיקה מזהה בעיות מרכזיות לפני פנייה למשקיעים ומציעה סדר תיקונים." : "The diagnostic identifies the most important deck problems before investor outreach and prioritizes the fixes."}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Packages;
