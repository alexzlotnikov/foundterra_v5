import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const FinalCTA = () => {
  const { content, language } = useLanguage();
  const isHebrew = language === "he";
  const Arrow = isHebrew ? ArrowLeft : ArrowRight;
  return (
    <section id="final-cta" className="section-padding scroll-mt-24 border-y border-primary/25 bg-primary/[0.055]">
      <div className="container-max flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <div className={isHebrew ? "text-right" : "text-left"}>
          <h2 className="max-w-4xl">{isHebrew ? "בנו תהליך גיוס שמשקיעים יכולים להבין." : "Build a fundraising process investors can understand."}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8">{content.finalCTA.cardSubtitle}</p>
        </div>
        <a href={content.cta.calendlyLink} target="_blank" rel="noreferrer" className="editorial-button editorial-button-primary shrink-0">
          {content.finalCTA.primaryButton}<Arrow className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;
