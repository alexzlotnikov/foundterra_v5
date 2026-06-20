import { type CSSProperties, type ReactNode } from "react";

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
}: DeferredSectionProps) {
  return (
    <div
      className={`deferred-section ${className ?? ""}`}
      style={{ "--section-intrinsic-size": `${minHeight}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
