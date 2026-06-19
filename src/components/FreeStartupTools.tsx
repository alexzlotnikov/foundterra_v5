import { ArrowRight, BarChart3, Briefcase, Calculator, FileSearch, LayoutTemplate, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

type FreeStartupToolsProps = {
  className?: string;
  sectionId?: string;
  highlighted?: boolean;
};

const TOOLS = [
  {
    title: "Pitch Deck Review",
    description: "Get an instant VC readiness score with actionable feedback.",
    href: "/pitch-review",
    icon: FileSearch,
  },
  {
    title: "Deck Architect",
    description: "Generate a winning deck structure for pre-seed and seed rounds.",
    href: "/deck-architect",
    icon: LayoutTemplate,
  },
  {
    title: "Financial Model",
    description: "Build key assumptions and investor-facing financial projections.",
    href: "/financial-model",
    icon: Calculator,
  },
  {
    title: "Market Size Tool",
    description: "Estimate TAM, SAM, and SOM for your startup market.",
    href: "/market-size",
    icon: BarChart3,
  },
  {
    title: "SaaS Metric Auditor",
    description: "Benchmark growth, retention, and efficiency metrics.",
    href: "/saas-metric-auditor",
    icon: Sparkles,
  },
  {
    title: "Investor Readiness Check",
    description: "See if your startup is ready for investor outreach.",
    href: "/investor-ready",
    icon: Briefcase,
  },
];

const FreeStartupTools = ({ className = "", sectionId = "free-startup-tools", highlighted = false }: FreeStartupToolsProps) => {
  const { language } = useLanguage();
  const isHebrew = language === "he";

  const t = isHebrew
    ? {
        title: "כלים חינמיים לסטארטאפים",
        subtitle: "השתמשו בכלים החינמיים שלנו כדי לשפר את המצגת, לאמת הנחות ולהתכונן לגיוס.",
        open: "פתחו כלי",
      }
    : {
        title: "Free Startup Tools",
        subtitle: "Use our free founder tools to improve your pitch, validate assumptions, and prepare for fundraising.",
        open: "Open tool",
      };

  return (
    <section
      id={sectionId}
      className={`section-padding scroll-mt-24 ${highlighted ? "tool-section-highlight" : ""} ${className}`}
    >
      <div className="container-max">
        <div
          className={
            highlighted
              ? "rounded-3xl border border-primary/30 bg-background/80 p-6 md:p-10 shadow-[0_0_0_1px_rgba(139,92,246,0.25),0_0_40px_rgba(139,92,246,0.2)]"
              : ""
          }
        >
          <div className={`text-center mb-12 ${isHebrew ? "text-right" : ""}`}>
            <h2 className="text-4xl md:text-5xl font-bold font-serif">
              {isHebrew ? <><span className="gradient-text">כלים חינמיים</span> לסטארטאפים</> : <>Free <span className="gradient-text">Startup Tools</span></>}
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  to={tool.href}
                  key={tool.href}
                  className="card-elevated border border-border/70 bg-card/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="w-11 h-11 rounded-lg icon-glow flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${isHebrew ? "text-right" : ""}`}>{tool.title}</h3>
                  <p className={`text-sm text-muted-foreground mb-4 ${isHebrew ? "text-right" : ""}`}>{tool.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    {t.open} <ArrowRight className={`w-4 h-4 ${isHebrew ? "mr-1 rotate-180" : "ml-1"}`} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeStartupTools;
