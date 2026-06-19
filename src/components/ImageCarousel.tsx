import { useEffect, useRef } from "react";

const carouselImages = [
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/1%20-%20Copy%20(2).avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/1%20-%20Copy.avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/1.avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/10%20-%20Copy.avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/10.avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/11.avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/12.avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/13.avif",
];

const carouselImages2 = [
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/4%20-%20Copy%20(2).avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/4%20-%20Copy.avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/5%20-%20Copy%20(2).avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/5%20-%20Copy.avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/5.avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/6%20-%20Copy%20(2).avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/6%20-%20Copy.avif",
  "https://cdn.jsdelivr.net/gh/alexzlotnikov/carousel@main/6.avif",
];

const ImageCarousel = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!row1 || !row2) return;

    const speed = 0.5;
    let row1Pos = 0;
    let row2Pos = 0;

    const singleSetWidth1 = row1.scrollWidth / 2;
    const singleSetWidth2 = row2.scrollWidth / 2;

    const animate = () => {
      row1Pos -= speed;
      row2Pos += speed;

      if (Math.abs(row1Pos) >= singleSetWidth1) {
        row1Pos = 0;
      }
      if (row2Pos >= singleSetWidth2) {
        row2Pos = 0;
      }

      row1.style.transform = `translateX(${row1Pos}px)`;
      row2.style.transform = `translateX(${row2Pos - singleSetWidth2}px)`;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const imageWidth = 250;
  const imageHeight = 140;

  return (
    <section dir="ltr" className="py-6 sm:py-8 overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[200px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-lg">
            <div ref={row1Ref} className="flex gap-3 will-change-transform" style={{ width: "max-content" }}>
              {[...carouselImages, ...carouselImages].map((src, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-lg overflow-hidden border border-[rgba(99,102,241,0.1)] opacity-50 hover:opacity-80 transition-opacity duration-300"
                  style={{ width: imageWidth, height: imageHeight }}
                >
                  <img loading="lazy" decoding="async"
                    src={src}
                    alt={`Foundterra client pitch deck example ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg">
            <div ref={row2Ref} className="flex gap-3 will-change-transform" style={{ width: "max-content" }}>
              {[...carouselImages2, ...carouselImages2].map((src, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-lg overflow-hidden border border-[rgba(99,102,241,0.1)] opacity-50 hover:opacity-80 transition-opacity duration-300"
                  style={{ width: imageWidth, height: imageHeight }}
                >
                  <img loading="lazy" decoding="async"
                    src={src}
                    alt={`Foundterra client pitch deck example ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
