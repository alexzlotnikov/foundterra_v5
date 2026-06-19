import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

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
        <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-serif">{t.title}</h2>
          <p className="responsive-text-base text-muted-foreground max-w-3xl mx-auto font-body">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {t.paths.map(([tag, title, price, description, href, cta, variant], index) => (
            <Card key={title} className="card-elevated animate-slide-up flex flex-col" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className={`p-6 sm:p-8 flex flex-col h-full ${isHebrew ? "text-right" : ""}`}>
                <span className="w-fit px-3 py-1 rounded-full bg-primary/15 text-primary text-xs tracking-wide uppercase font-semibold mb-4">{tag}</span>
                <h3 className="text-2xl font-bold mb-2 font-serif">{title}</h3>
                <p className="text-xl font-semibold gradient-text mb-4">{price}</p>
                <p className="text-muted-foreground leading-relaxed font-body mb-8">{description}</p>
                <Button asChild variant={variant} className="w-full mt-auto">
                  <a href={href}>{cta}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
