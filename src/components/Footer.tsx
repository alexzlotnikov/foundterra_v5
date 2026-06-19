import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { FaTelegram, FaDiscord, FaTiktok, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import socialLinksData from "@/content/socialLinks.json";

const Footer = () => {
  const { content } = useLanguage();

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
              src="/lovable-uploads/e5057dbc-fcd7-4f62-9bda-98df3c222f20.png" 
              alt="Foundterra Logo" 
              className="h-6 w-6 sm:h-8 sm:w-8 invert"
            />
            <span className="responsive-text-lg font-bold text-foreground font-serif">Foundterra</span>
          </div>
          <p className="responsive-text-sm text-muted-foreground mb-3 sm:mb-4 font-body">
            {content.footer.tagline}
          </p>
          <a 
            href={`mailto:${content.footer.email}`}
            className="text-primary hover:text-primary/80 transition-colors responsive-text-sm font-body"
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {content.footer.sections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-foreground mb-3 sm:mb-4 responsive-text-xs font-serif">{section.title}</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors responsive-text-xs font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 responsive-text-xs font-serif">Free Services</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link to="/pitch-review" className="text-muted-foreground hover:text-primary transition-colors responsive-text-xs font-body">Pitch Deck Review</Link></li>
              <li><Link to="/deck-architect" className="text-muted-foreground hover:text-primary transition-colors responsive-text-xs font-body">Deck Architect</Link></li>
              <li><Link to="/financial-model" className="text-muted-foreground hover:text-primary transition-colors responsive-text-xs font-body">Financial Model Tool</Link></li>
              <li><Link to="/saas-metric-auditor" className="text-muted-foreground hover:text-primary transition-colors responsive-text-xs font-body">SaaS Metric Auditor</Link></li>
              <li><Link to="/investor-ready" className="text-muted-foreground hover:text-primary transition-colors responsive-text-xs font-body">Investor Readiness Quiz</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[rgba(99,102,241,0.1)] pt-6 sm:pt-8 text-center">
          <p className="text-muted-foreground responsive-text-xs font-body">
            © 2026 Foundterra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
