import { useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ChevronsLeftRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Hero = () => {
  const { language, content } = useLanguage();
  const isHebrew = language === "he";
  const [comparisonPosition, setComparisonPosition] = useState(50);
  const Arrow = isHebrew ? ArrowLeft : ArrowRight;
  const copy = isHebrew
    ? {
        title: "גיוס הון גוזל יותר מדי זמן של יזמים מכדי לעשות אותו לא נכון.",
        body: "Foundterra מסייעת ליזמים בשלבים מוקדמים לבנות חומרים מוכנים למשקיעים, להגיע למשקיעים הנכונים ולדעת מה לעשות הלאה במהלך הגיוס.",
        primary: "התחילו לגייס נכון",
        secondary: "לכל השירותים",
        valueStrip: "מצגת משקיעים · מודל פיננסי · פנייה למשקיעים · ליווי גיוס חודשי",
        trustNote: "ללא הבטחת גיוס. ללא היכרויות בתשלום. ללא דמי הצלחה.",
        before: "לפני",
        after: "אחרי",
        transformation: "אותם נתונים. מסקנה חדה יותר למשקיע.",
        visualLabel: "שדרוג שקף מצגת משקיעים",
        sliderLabel: "השוואת מצגת לפני ואחרי השיפור",
      }
    : {
        title: "Fundraising takes too much founder time to do it wrong.",
        body: "Foundterra helps early-stage founders build investor-ready materials, reach the right investors, and know what to do next during the raise.",
        primary: "Start fundraising properly",
        secondary: "View services",
        valueStrip: "Pitch deck · Financial model · Investor outreach · Monthly raise support",
        trustNote: "No guaranteed funding. No paid introductions. No success fees.",
        before: "Before",
        after: "After",
        transformation: "Same underlying data. A sharper investor conclusion.",
        visualLabel: "Investor pitch slide transformation",
        sliderLabel: "Compare the pitch deck before and after improvement",
      };

  return (
    <section className="editorial-hero relative overflow-hidden pt-28 sm:pt-36 lg:pt-40">
      <div className="container-max pb-14 sm:pb-20">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className={isHebrew ? "text-right" : "text-left"}>
            <h1 className="max-w-3xl text-[clamp(3rem,5.5vw,5.6rem)] font-light leading-[0.98] tracking-[-0.025em]">
              {copy.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-foreground/65 sm:text-lg">
              {copy.body}
            </p>
            <div className={`mt-9 flex flex-col gap-3 sm:flex-row ${isHebrew ? "sm:flex-row-reverse sm:justify-end" : ""}`}>
              <a className="editorial-button editorial-button-primary" href={content.cta.calendlyLink} target="_blank" rel="noopener noreferrer">
                {copy.primary}<Arrow className="h-4 w-4" aria-hidden="true" />
              </a>
              <a className="editorial-button editorial-button-secondary" href="#plans">
                {copy.secondary}<Arrow className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-7 max-w-2xl text-sm font-medium leading-7 text-foreground/85">
              {copy.valueStrip}
            </p>
            <p className="mt-2 max-w-2xl text-xs leading-6 text-foreground/60">
              {copy.trustNote}
            </p>
          </div>

          <figure className="hero-comparison" aria-label={copy.visualLabel}>
            <div
              className="hero-comparison-frame"
              dir="ltr"
              style={{ "--comparison-position": `${comparisonPosition}%` } as CSSProperties}
            >
              <img
                className="hero-comparison-image"
                src="/carousel/hero-phone-after-transparent.webp"
                width="941"
                height="1672"
                alt={isHebrew ? "השוואה בין מצגת עמוסה למצגת ברורה המותאמת לקריאה בטלפון" : "A comparison between a dense pitch deck and an improved deck designed for clear phone viewing"}
                loading="eager"
                decoding="async"
              />
              <div className="hero-comparison-before" aria-hidden="true">
                <img
                  className="hero-comparison-image"
                  src="/carousel/hero-phone-before-transparent.webp"
                  width="941"
                  height="1672"
                  alt=""
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="hero-comparison-label hero-comparison-label-before">{copy.before}</span>
              <span className="hero-comparison-label hero-comparison-label-after">{copy.after}</span>
              <span className="hero-comparison-divider" aria-hidden="true">
                <span className="hero-comparison-handle">
                  <ChevronsLeftRight className="h-4 w-4" />
                </span>
              </span>
              <input
                className="hero-comparison-range"
                type="range"
                min="0"
                max="100"
                step="1"
                value={comparisonPosition}
                onChange={(event) => setComparisonPosition(Number(event.target.value))}
                onKeyDown={(event) => {
                  if (event.key === "Home" || event.key === "End") {
                    event.preventDefault();
                    setComparisonPosition(event.key === "Home" ? 0 : 100);
                  }
                  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    event.preventDefault();
                    const direction = event.key === "ArrowLeft" ? -1 : 1;
                    setComparisonPosition((current) => Math.min(100, Math.max(0, current + direction)));
                  }
                }}
                aria-label={copy.sliderLabel}
                aria-valuetext={`${copy.after} ${comparisonPosition}%`}
              />
            </div>
            <figcaption className="hero-comparison-caption">{copy.transformation}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
