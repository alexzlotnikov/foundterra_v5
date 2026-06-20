import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { localizedPath } from "@/utils/localizedPath";

type FreeStartupToolsProps = { className?: string; sectionId?: string; highlighted?: boolean };

const tools = [
  { title: "Pitch Deck Review", he: "בדיקת מצגת משקיעים", description: "Get an expert review and clear, actionable feedback.", heDescription: "קבלו בדיקה מקצועית והמלצות ברורות לשיפור.", href: "/pitch-review" },
  { title: "Deck Architect", he: "בניית מבנה למצגת", description: "Generate a deck structure tailored to your story.", heDescription: "צרו מבנה למצגת המותאם לסיפור שלכם.", href: "/deck-architect" },
  { title: "Financial Model", he: "מודל פיננסי", description: "Build investor-facing assumptions and projections.", heDescription: "בנו הנחות ותחזיות המותאמות למשקיעים.", href: "/financial-model" },
  { title: "Market Size Tool", he: "חישוב גודל שוק", description: "Estimate TAM, SAM, and SOM with guided inputs.", heDescription: "העריכו TAM, SAM ו־SOM בתהליך מונחה.", href: "/market-size" },
  { title: "SaaS Metric Auditor", he: "בדיקת מדדי SaaS", description: "Benchmark growth, retention, and efficiency.", heDescription: "השוו צמיחה, שימור ויעילות למדדי השוק.", href: "/saas-metric-auditor" },
  { title: "Investor Readiness Check", he: "בדיקת מוכנות למשקיעים", description: "See what to improve before investor outreach.", heDescription: "בדקו מה לשפר לפני פנייה למשקיעים.", href: "/investor-ready" },
];

const FreeStartupTools = ({ className = "", sectionId = "free-startup-tools" }: FreeStartupToolsProps) => {
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const Arrow = isHebrew ? ArrowLeft : ArrowRight;

  return (
    <section id={sectionId} className={`section-padding scroll-mt-24 ${className}`}>
      <div className="container-max grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
        <div className={isHebrew ? "text-right" : "text-left"}>
          <h2>{isHebrew ? "כלים חינמיים לסטארטאפים." : "Free startup tools."}</h2>
          <p className="mt-5 max-w-md text-base leading-8 text-foreground/60">
            {isHebrew ? "מומחיות שאפשר להשתמש בה כבר עכשיו — ללא תשלום." : "Expertise you can use right now, built for founders and free to use."}
          </p>
        </div>
        <div className="grid md:grid-cols-2 md:divide-x md:divide-white/10">
          {tools.map((tool, index) => (
            <Link key={tool.href} to={localizedPath(tool.href, language)} className={`grid grid-cols-[2rem_1fr_auto] gap-4 border-b border-white/10 p-6 transition-colors hover:bg-white/[0.025] ${index % 2 ? "md:ps-9" : "md:pe-9"}`}>
              <span className="text-primary">0{index + 1}</span>
              <span>
                <strong className="block text-lg text-foreground">{isHebrew ? tool.he : tool.title}</strong>
                <span className="mt-2 block text-sm leading-6">{isHebrew ? tool.heDescription : tool.description}</span>
              </span>
              <Arrow className="mt-1 h-4 w-4 text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreeStartupTools;
