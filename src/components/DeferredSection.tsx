import { type CSSProperties, type ReactNode } from "react";
import OptionalErrorBoundary from "@/components/OptionalErrorBoundary";

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
      <OptionalErrorBoundary name="deferred-homepage-section">
        {children}
      </OptionalErrorBoundary>
    </div>
  );
}
