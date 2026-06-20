import { useLanguage } from "@/hooks/useLanguage";
import { localizedPath } from "@/utils/localizedPath";

const About = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";

  const t = isHebrew
    ? {
        kicker: "בחר את המסלול שלך",
        title: "התחל מהשלב שבו אתה נמצא בגיוס.",
        subtitle:
          "Foundterra בנויה כסולם פשוט: מתחילים בדיאגנוסטיק, ממשיכים למנוי חודשי תוך כדי גיוס, ומשדרגים לביצוע מלא כשצריך לבנות את הנכסים כמו שצריך.",
        paths: [
          ["אבחון", "דיאגנוסטיק למצגת", "₪300", "פידבק מפורט על המצגת, שיחת ייעוץ של שעה, ציון מוכנות והמלצת המשך.", "/pay/pitch-deck-review", "קבעו דיאגנוסטיק", "hero"],
          ["איטרציה", "תמיכה חודשית בגיוס", "₪900–₪3,000/חודש", "פידבק שוטף בזמן ההכנה, ההשקה וניהול הגיוס.", "#plans", "צפו במסלולים", "outline"],
          ["ביצוע", "שירותי Done-For-You", "החל מ-₪4,500", "צריך בנייה מקצועית של מצגת, מודל, דאטה רום או מחקר שוק?", "#services", "צפו בשירותים", "outline"],
        ] as const,
      }
    : {
        kicker: "Choose your path",
        title: "Start where you are in the fundraising process.",
        subtitle:
          "Foundterra is structured as a simple ladder: start with a diagnostic, subscribe for ongoing support while you raise, or upgrade to done-for-you execution when you need the assets built properly.",
        paths: [
          ["Diagnose", "Pitch Deck Diagnostic", "$100", "Get detailed deck feedback, a 1-hour consultation, a readiness score, and a recommended next step.", "/pay/pitch-deck-review", "Book Diagnostic", "hero"],
          ["Iterate", "Monthly Fundraising Support", "$300–$1,000/mo", "Get ongoing feedback while preparing, launching, or managing your raise.", "#plans", "View Plans", "outline"],
          ["Build", "Done-For-You Services", "From $1,500", "Need the deck, model, data room, or market analysis built properly? Upgrade to a fixed project.", "#services", "View Services", "outline"],
        ] as const,
      };

  return (
    <section id="about" className="section-padding scroll-mt-24">
      <div className="container-max">
        <div className="mb-14 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-serif">{t.title}</h2>
          <p className="responsive-text-base text-muted-foreground max-w-3xl font-body">{t.subtitle}</p>
        </div>

        <div className="grid border-y border-white/10 md:grid-cols-3">
          {t.paths.map(([tag, title, price, description, href, cta, variant], index) => (
            <article key={title} className={`relative p-7 sm:p-9 md:border-e md:border-white/10 ${isHebrew ? "text-right" : ""}`}>
              <span className="font-serif text-6xl font-light text-primary/80">0{index + 1}</span>
              <p className="mt-5 text-sm font-semibold text-primary">{tag}</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-lg font-semibold text-foreground">{price}</p>
              <p className="mt-4 min-h-24 text-sm leading-7 text-foreground/55">{description}</p>
              <a className="mt-5 inline-flex border-b border-primary/60 pb-1 text-sm font-semibold text-primary" href={localizedPath(href, language)}>{cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
