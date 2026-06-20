const showcaseImages = [
  "/carousel/slide-01.avif",
  "/carousel/slide-04.avif",
  "/carousel/slide-09.avif",
  "/carousel/slide-13.avif",
];

const ImageCarousel = () => (
  <section className="overflow-hidden py-6 sm:py-8" aria-label="Foundterra client work">
    <div className="container-max">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {showcaseImages.map((src, index) => (
          <div
            key={src}
            className="aspect-[16/9] overflow-hidden rounded-lg border border-primary/15 bg-secondary"
          >
            <img
              src={src}
              width="500"
              height="280"
              alt={`Foundterra client pitch deck example ${index + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-75"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ImageCarousel;
