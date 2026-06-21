import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { localizedPath } from "@/utils/localizedPath";

const Hero = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const Arrow = isHebrew ? ArrowLeft : ArrowRight;
  const copy = isHebrew
    ? {
        title: "ליווי גיוס ליזמים לפני ובמהלך הסבב.",
        body: "מצגות חדות יותר, סיפור משקיעים ברור יותר, הנחות פיננסיות חזקות יותר וליווי גיוס ממוקד ליזמי Pre-Seed ו-Seed.",
        primary: "התחילו עם בדיקת מצגת ב־₪300",
        secondary: "למסלולי הליווי החודשיים",
        good: "טוב",
        ready: "מוכן למשקיעים",
        transformation: "אותם נתונים. מסקנה חדה יותר למשקיע.",
        visualLabel: "שדרוג שקף מצגת משקיעים",
      }
    : {
        title: "Fundraising support for founders before and during the raise.",
        body: "Sharper pitch decks, clearer investor stories, stronger financial assumptions, and disciplined fundraising support for pre-seed and seed founders.",
        primary: "Start with $100 Deck Diagnostic",
        secondary: "View Monthly Support",
        good: "Good",
        ready: "Investor-ready",
        transformation: "Same underlying data. A sharper investor conclusion.",
        visualLabel: "Investor pitch slide transformation",
      };

  return (
    <section className="editorial-hero relative overflow-hidden pt-28 sm:pt-36 lg:pt-40">
      <div className="container-max pb-14 sm:pb-20">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
          <div className={isHebrew ? "text-right" : "text-left"}>
            <h1 className="max-w-3xl text-[clamp(3rem,5.5vw,5.6rem)] font-light leading-[0.98] tracking-[-0.025em]">
              {copy.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-foreground/65 sm:text-lg">
              {copy.body}
            </p>
            <div className={`mt-9 flex flex-col gap-3 sm:flex-row ${isHebrew ? "sm:flex-row-reverse sm:justify-end" : ""}`}>
              <a className="editorial-button editorial-button-primary" href={localizedPath("/pay/pitch-deck-review", language)}>
                {copy.primary}<Arrow className="h-4 w-4" aria-hidden="true" />
              </a>
              <a className="editorial-button editorial-button-secondary" href="#plans">
                {copy.secondary}<Arrow className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-transformation" aria-label={copy.visualLabel}>
            <figure className="hero-proof hero-proof-good">
              <figcaption>{copy.good}</figcaption>
              <img
                src="/carousel/hero-good.avif"
                width="800"
                height="450"
                alt={isHebrew ? "שקף צמיחה מקצועי אך כללי לפני שיפור" : "A competent but generic traction slide before strategic improvement"}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="hero-proof-arrow" aria-hidden="true">
              <span />
              <Arrow className="h-5 w-5" />
            </div>
            <figure className="hero-proof hero-proof-ready">
              <figcaption>{copy.ready}</figcaption>
              <img
                src="/carousel/hero-investor-ready.avif"
                width="800"
                height="450"
                alt={isHebrew ? "שקף צמיחה מוכן למשקיעים המדגיש הכנסות מהתרחבות" : "Investor-ready traction slide emphasizing expansion revenue"}
                loading="eager"
                decoding="async"
              />
            </figure>
            <p className="hero-proof-caption">{copy.transformation}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
