import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";

const Resources = () => {
  const { content, language } = useLanguage();
  const isHebrew = language === "he";
  const resourcesPath = isHebrew ? "/he/get-resources" : "/get-resources";
  const Arrow = isHebrew ? ArrowLeft : ArrowRight;
  const [featured, ...rest] = content.resources.items;

  return (
    <section id="resources" className="section-padding scroll-mt-24">
      <div className="container-max grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
        <div className={isHebrew ? "text-right" : "text-left"}>
          <h2>{isHebrew ? "משאבים מעשיים לגיוס שלכם." : "Practical resources for your raise."}</h2>
          <p className="mt-5 max-w-md text-base leading-8 text-foreground/60">{content.resources.subtitle}</p>
          <Link to={resourcesPath} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">{content.resources.cta}<Arrow className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-7 md:grid-cols-[1.05fr_0.95fr]">
          <Link to={resourcesPath} className="group relative min-h-80 overflow-hidden border border-primary/55 p-7">
            <h3 className="max-w-xs font-serif text-3xl font-semibold">{featured?.title}</h3>
            <p className="mt-4 max-w-sm text-sm leading-7">{featured?.description}</p>
            <img
              src="/carousel/resource-library.avif"
              alt={isHebrew ? "כריכות מדריכים ותצוגות מקדימות של כלי גיוס ליזמים" : "Fundraising guide covers and startup tool previews"}
              width="1200"
              height="760"
              loading="lazy"
              decoding="async"
              className="resource-library-preview"
            />
          </Link>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {rest.map((resource, index) => (
              <Link key={resource.title} to={resourcesPath} className="grid grid-cols-[2rem_1fr_auto] items-start gap-3 py-6">
                <span className="text-primary">0{index + 1}</span>
                <span><strong className="block text-foreground">{resource.title}</strong><span className="mt-2 block text-sm leading-6">{resource.description}</span></span>
                <Arrow className="mt-1 h-4 w-4 text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
