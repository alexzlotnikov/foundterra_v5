import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { FaTelegram, FaDiscord, FaTiktok, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import socialLinksData from "@/content/socialLinks.json";
import { localizedPath } from "@/utils/localizedPath";

const Footer = () => {
  const { content, language } = useLanguage();
  const isHebrew = language === "he";
  const packageLabels = ["תכנון הנרטיב", "חבילת הגיוס", "שותף לגיוס"];

  const socialIcons = {
    telegram: FaTelegram,
    linkedin: Linkedin,
    discord: FaDiscord,
    tiktok: FaTiktok,
    youtube: FaYoutube,
    whatsapp: FaWhatsapp,
    x: FaXTwitter,
  };

  const enabledSocialLinks = Object.entries(socialLinksData.socialLinks)
    .filter(([_, link]) => link.enabled)
    .map(([key, link]) => ({
      key,
      ...link,
      icon: socialIcons[key as keyof typeof socialIcons],
    }));

  return (
    <footer className="section-padding relative" style={{ background: 'hsl(240 14% 2%)' }}>
      {/* Near-invisible grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="container-max relative z-10">
        {/* Brand Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <img loading="lazy" decoding="async"
              src="/brand/foundterra-logo-white.svg"
              width="32"
              height="32"
              alt="Foundterra Logo" 
              className="h-6 w-6 sm:h-8 sm:w-8"
            />
            <span className="text-lg sm:text-xl font-bold text-foreground font-serif">Foundterra</span>
          </div>
          <p className="text-sm leading-6 text-muted-foreground mb-3 sm:mb-4 font-body">
            {content.footer.tagline}
          </p>
          <a 
            href={`mailto:${content.footer.email}`}
            className="text-sm leading-6 text-primary hover:text-primary/80 transition-colors font-body"
          >
            {content.footer.email}
          </a>
        </div>

        {/* Social Links */}
        {enabledSocialLinks.length > 0 && (
          <div className="flex justify-center items-center gap-4 mb-8 sm:mb-12">
            {enabledSocialLinks.map(({ key, url, label, icon: Icon }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 glass-panel rounded-full flex items-center justify-center transition-all duration-400 hover:scale-110 group hover:border-[rgba(99,102,241,0.3)]"
                aria-label={label}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        )}

        {/* Links Grid */}
        <div className={`grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 sm:gap-x-8 mb-8 sm:mb-12 ${isHebrew ? "text-right" : "text-left"}`}>
          {content.footer.sections.map((section, index) => (
            <div key={index}>
              <h2 className="break-words text-xs leading-5 font-semibold text-foreground mb-3 sm:mb-4 font-serif">{section.title}</h2>
              <ul className="space-y-1.5 sm:space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={localizedPath(link.href, language)}
                      className="block break-words text-xs leading-5 text-muted-foreground hover:text-primary transition-colors font-body"
                    >
                      {isHebrew && section.title === "שירותים" && link.href.includes("#packages") && linkIndex < packageLabels.length
                        ? packageLabels[linkIndex]
                        : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="break-words text-xs leading-5 font-semibold text-foreground mb-3 sm:mb-4 font-serif">
              {isHebrew ? "כלים חינמיים" : "Free Services"}
            </h2>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link to={localizedPath("/pitch-review", language)} className="block break-words text-xs leading-5 text-muted-foreground hover:text-primary transition-colors font-body">{language === "he" ? "בדיקת מצגת" : "Pitch Deck Review"}</Link></li>
              <li><Link to={localizedPath("/deck-architect", language)} className="block break-words text-xs leading-5 text-muted-foreground hover:text-primary transition-colors font-body">{language === "he" ? "מבנה למצגת" : "Deck Architect"}</Link></li>
              <li><Link to={localizedPath("/financial-model", language)} className="block break-words text-xs leading-5 text-muted-foreground hover:text-primary transition-colors font-body">{language === "he" ? "כלי למודל פיננסי" : "Financial Model Tool"}</Link></li>
              <li><Link to={localizedPath("/saas-metric-auditor", language)} className="block break-words text-xs leading-5 text-muted-foreground hover:text-primary transition-colors font-body">{language === "he" ? "בדיקת מדדי SaaS" : "SaaS Metric Auditor"}</Link></li>
              <li><Link to={localizedPath("/investor-ready", language)} className="block break-words text-xs leading-5 text-muted-foreground hover:text-primary transition-colors font-body">{language === "he" ? "בדיקת מוכנות למשקיעים" : "Investor Readiness Quiz"}</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[rgba(99,102,241,0.1)] pt-6 sm:pt-8 text-center">
          <p className="text-xs leading-5 text-muted-foreground font-body">
            © 2026 Foundterra. {isHebrew ? "כל הזכויות שמורות." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
