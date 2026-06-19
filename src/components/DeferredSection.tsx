import { type ReactNode, useEffect, useRef, useState } from "react";

interface DeferredSectionProps {
  children: ReactNode;
  minHeight?: number;
  className?: string;
  rootMargin?: string;
}

export default function DeferredSection({
  children,
  minHeight = 96,
  className,
  rootMargin = "500px 0px",
}: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(() => typeof window === "undefined");

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldRender) return;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div
      ref={ref}
      className={`deferred-section ${className ?? ""}`}
      style={shouldRender ? undefined : { minHeight }}
    >
      {shouldRender ? children : null}
    </div>
  );
}
