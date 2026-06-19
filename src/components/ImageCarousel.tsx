import { useEffect, useMemo, useRef, useState } from "react";

const carouselImages = [
  "/carousel/slide-01.avif",
  "/carousel/slide-02.avif",
  "/carousel/slide-03.avif",
  "/carousel/slide-04.avif",
  "/carousel/slide-05.avif",
  "/carousel/slide-06.avif",
  "/carousel/slide-07.avif",
  "/carousel/slide-08.avif",
];

const carouselImages2 = [
  "/carousel/slide-09.avif",
  "/carousel/slide-10.avif",
  "/carousel/slide-11.avif",
  "/carousel/slide-12.avif",
  "/carousel/slide-13.avif",
  "/carousel/slide-14.avif",
  "/carousel/slide-15.avif",
  "/carousel/slide-16.avif",
];

const ImageCarousel = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const row1Images = useMemo(() => showAll ? carouselImages : carouselImages.slice(0, 4), [showAll]);
  const row2Images = useMemo(() => showAll ? carouselImages2 : carouselImages2.slice(0, 4), [showAll]);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowAll(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

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
  }, [showAll]);

  const imageWidth = 250;
  const imageHeight = 140;

  return (
    <section
      dir="ltr"
      className="py-6 sm:py-8 overflow-hidden relative"
      onPointerEnter={() => setShowAll(true)}
      onTouchStart={() => setShowAll(true)}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[200px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-lg">
            <div ref={row1Ref} className="flex gap-3 will-change-transform" style={{ width: "max-content" }}>
              {[...row1Images, ...row1Images].map((src, index) => (
                <div
                  key={index}
                  aria-hidden={index >= row1Images.length}
                  className="flex-shrink-0 rounded-lg overflow-hidden border border-[rgba(99,102,241,0.1)] opacity-50 hover:opacity-80 transition-opacity duration-300"
                  style={{ width: imageWidth, height: imageHeight }}
                >
                  <img loading="lazy" decoding="async"
                    src={src}
                    width={imageWidth}
                    height={imageHeight}
                    alt={index >= row1Images.length ? "" : `Foundterra client pitch deck example ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg">
            <div ref={row2Ref} className="flex gap-3 will-change-transform" style={{ width: "max-content" }}>
              {[...row2Images, ...row2Images].map((src, index) => (
                <div
                  key={index}
                  aria-hidden={index >= row2Images.length}
                  className="flex-shrink-0 rounded-lg overflow-hidden border border-[rgba(99,102,241,0.1)] opacity-50 hover:opacity-80 transition-opacity duration-300"
                  style={{ width: imageWidth, height: imageHeight }}
                >
                  <img loading="lazy" decoding="async"
                    src={src}
                    width={imageWidth}
                    height={imageHeight}
                    alt={index >= row2Images.length ? "" : `Foundterra client pitch deck example ${index + 1}`}
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
