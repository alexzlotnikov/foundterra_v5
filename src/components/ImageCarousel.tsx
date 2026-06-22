import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { deckSlides } from "@/data/deckSlides";

const rows = [deckSlides.filter((slide) => slide.row === 0), deckSlides.filter((slide) => slide.row === 1)];

const ImageCarousel = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: "160px 0px" });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const isHebrew = language === "he";
  return (
    <section ref={sectionRef} className="deck-showcase overflow-hidden pb-14 sm:pb-20" aria-label={isHebrew ? "דוגמאות המחשה לשקפי מצגות משקיעים" : "Illustrative investor-ready pitch slides"}>
      <div className={`container-max mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between ${isHebrew ? "text-right" : ""}`}>
        <div>
          <h2 className="font-serif text-3xl font-normal sm:text-4xl">
            {isHebrew ? "שש-עשרה שאלות שמשקיעים מצפים שהמצגת תענה עליהן." : "Sixteen investor questions. Sixteen clear answers."}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/55">
            {isHebrew ? "דוגמאות המחשה לאסטרטגיה, נרטיב, לוגיקה פיננסית ועיצוב — לא עבודות לקוח." : "Illustrative samples of strategy, narrative, financial logic, and design — not claimed client work."}
          </p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/55">
          {isHebrew ? "דוגמאות המחשה" : "Illustrative samples"}
        </p>
      </div>
      <div className="container-max">
        <div className={`deck-rails ${isVisible ? "is-visible" : ""}`} dir="ltr">
          {rows.map((slides, rowIndex) => (
            <div key={rowIndex} className="deck-rail-viewport" tabIndex={0}>
              <div className={`deck-rail-track ${rowIndex === 1 ? "deck-rail-reverse" : ""}`}>
                {[...slides, ...slides].map((slide, index) => (
                  <figure key={`${slide.src}-${index}`} className="deck-rail-slide" aria-hidden={index >= slides.length}>
                    <img
                      src={slide.src}
                      width="800"
                      height="450"
                      alt={index >= slides.length ? "" : isHebrew ? slide.altHe : slide.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    {index < slides.length ? <figcaption>{isHebrew ? slide.topicHe : slide.topic}</figcaption> : null}
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
