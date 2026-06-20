import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { localizedPath } from "@/utils/localizedPath";

const heroSlides = [
  "/carousel/slide-01.avif",
  "/carousel/slide-04.avif",
  "/carousel/slide-13.avif",
];

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
      }
    : {
        title: "Fundraising support for founders before and during the raise.",
        body: "Sharper pitch decks, clearer investor stories, stronger financial assumptions, and disciplined fundraising support for pre-seed and seed founders.",
        primary: "Start with $100 Deck Diagnostic",
        secondary: "View Monthly Support",
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

          <div className="hero-slide-stage" aria-label={isHebrew ? "דוגמאות למצגות משקיעים" : "Pitch deck examples"}>
            {heroSlides.map((src, index) => (
              <img
                key={src}
                src={src}
                width="800"
                height="450"
                alt={isHebrew ? `דוגמה למצגת משקיעים ${index + 1}` : `Pitch deck example ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`hero-slide hero-slide-${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
