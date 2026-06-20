import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const rows = [
  Array.from({ length: 8 }, (_, index) => `/carousel/slide-${String(index + 1).padStart(2, "0")}.avif`),
  Array.from({ length: 8 }, (_, index) => `/carousel/slide-${String(index + 9).padStart(2, "0")}.avif`),
];

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
    <section ref={sectionRef} className="deck-showcase overflow-hidden pb-14 sm:pb-20" aria-label={isHebrew ? "עבודות נבחרות במצגות משקיעים" : "Selected pitch deck work"}>
      <div className="container-max mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/55">
          {isHebrew ? "עבודות נבחרות במצגות משקיעים" : "Selected pitch deck work"}
        </p>
      </div>
      <div className={`deck-rails ${isVisible ? "is-visible" : ""}`} dir="ltr">
        {rows.map((images, rowIndex) => (
          <div key={rowIndex} className="deck-rail-viewport" tabIndex={0}>
            <div className={`deck-rail-track ${rowIndex === 1 ? "deck-rail-reverse" : ""}`}>
              {[...images, ...images].map((src, index) => (
                <figure key={`${src}-${index}`} className="deck-rail-slide" aria-hidden={index >= images.length}>
                  <img
                    src={src}
                    width="800"
                    height="450"
                    alt={index >= images.length ? "" : isHebrew ? `דוגמה למצגת ${index + 1 + rowIndex * 8}` : `Pitch deck example ${index + 1 + rowIndex * 8}`}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageCarousel;
