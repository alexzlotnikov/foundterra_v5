import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageDropdown from "@/components/LanguageDropdown";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const { content, language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const homePath = language === "he" ? "/he" : "/";

  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector("header.glass-nav");
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 60);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLanguageChange = (lang: "en" | "he" | "ru") => {
    setLanguage(lang);
    if (lang === "he" && !location.pathname.startsWith("/he")) {
      navigate(location.pathname === "/" ? "/he" : `/he${location.pathname}`);
    }
    if (lang === "en" && location.pathname.startsWith("/he")) {
      const nextPath = location.pathname.replace(/^\/he/, "") || "/";
      navigate(nextPath);
    }
  };

  const handleNavigation = (path: string, hash?: string) => {
    if (path === "/") {
      if (location.pathname !== homePath) {
        navigate(homePath);
        setTimeout(() => {
          if (hash) {
            const element = document.getElementById(hash);
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else if (hash) {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-header z-[100] glass-nav" dir={language === "he" ? "rtl" : "ltr"}>
      <div className="container-max">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          <button onClick={() => handleNavigation("/")} className={`flex items-center gap-2 sm:gap-3 group bg-transparent border-none cursor-pointer shrink-0 min-w-0 ${language === "he" ? "space-x-reverse" : ""}`}>
            <img loading="eager" fetchPriority="high" decoding="async" src="/lovable-uploads/e5057dbc-fcd7-4f62-9bda-98df3c222f20.png" alt="Foundterra Logo" className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 transition-transform group-hover:scale-105 invert" />
            <span className="hidden sm:inline text-xl sm:text-2xl lg:text-3xl font-serif font-light text-foreground transition-opacity group-hover:opacity-80 truncate">Foundterra</span>
          </button>

          <nav className={`hidden lg:flex items-center gap-5 xl:gap-7 ${language === "he" ? "space-x-reverse" : ""}`} dir={language === "he" ? "rtl" : "ltr"}>
            <button onClick={() => handleNavigation("/", "plans")} className="text-muted-foreground hover:text-foreground transition-colors responsive-text-xs whitespace-nowrap px-1 bg-transparent border-none cursor-pointer tracking-[0.06em]">{content.navigation.services}</button>
            <button onClick={() => handleNavigation("/", "investor-perspective")} className="text-muted-foreground hover:text-foreground transition-colors responsive-text-xs whitespace-nowrap px-1 bg-transparent border-none cursor-pointer tracking-[0.06em]">{content.navigation.about}</button>
            <button onClick={() => handleNavigation("/", "resources")} className="text-muted-foreground hover:text-foreground transition-colors responsive-text-xs whitespace-nowrap px-1 bg-transparent border-none cursor-pointer tracking-[0.06em]">{content.navigation.resources}</button>
            <button onClick={() => handleNavigation("/", "free-startup-tools")} className="text-muted-foreground hover:text-foreground transition-colors responsive-text-xs whitespace-nowrap px-1 bg-transparent border-none cursor-pointer tracking-[0.06em]">{language === "he" ? "כלים חינמיים" : "Free Tools"}</button>
            <button onClick={() => handleNavigation("/", "final-cta")} className="text-muted-foreground hover:text-foreground transition-colors responsive-text-xs whitespace-nowrap px-1 bg-transparent border-none cursor-pointer tracking-[0.06em]">{content.navigation.contact}</button>
          </nav>

          <div className="flex items-center responsive-gap-xs lg:hidden shrink-0">
            <LanguageDropdown currentLanguage={language} onLanguageChange={handleLanguageChange} />
            <button className="p-2 rounded-full border border-[rgba(99,102,241,0.2)] hover:bg-[rgba(99,102,241,0.1)] transition-colors text-foreground" aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-expanded={isMobileMenuOpen}>
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <LanguageDropdown currentLanguage={language} onLanguageChange={handleLanguageChange} />
            <Button variant="hero" size="lg" className="px-3 py-2 lg:px-4 lg:py-2 xl:px-6 xl:py-3 responsive-text-xs whitespace-nowrap" onClick={() => window.open(content.cta.calendlyLink, "_blank")}>{content.cta.bookSession}</Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 z-50">
            <div className="glass-nav border-b border-[rgba(99,102,241,0.1)]">
              <div className="container-max py-6" dir={language === "he" ? "rtl" : "ltr"}>
                <div className="glass-panel rounded-xl p-6 mx-4">
                  <nav className="flex flex-col space-y-5">
                    <button onClick={() => { handleNavigation("/", "plans"); setIsMobileMenuOpen(false); }} className="text-muted-foreground hover:text-foreground transition-colors responsive-text-base font-medium py-2 px-3 rounded-lg hover:bg-[rgba(99,102,241,0.08)] bg-transparent border-none cursor-pointer text-left rtl:text-right w-full">{content.navigation.services}</button>
                    <button onClick={() => { handleNavigation("/", "investor-perspective"); setIsMobileMenuOpen(false); }} className="text-muted-foreground hover:text-foreground transition-colors responsive-text-base font-medium py-2 px-3 rounded-lg hover:bg-[rgba(99,102,241,0.08)] bg-transparent border-none cursor-pointer text-left rtl:text-right w-full">{content.navigation.about}</button>
                    <button onClick={() => { handleNavigation("/", "resources"); setIsMobileMenuOpen(false); }} className="text-muted-foreground hover:text-foreground transition-colors responsive-text-base font-medium py-2 px-3 rounded-lg hover:bg-[rgba(99,102,241,0.08)] bg-transparent border-none cursor-pointer text-left rtl:text-right w-full">{content.navigation.resources}</button>
                    <button onClick={() => { handleNavigation("/", "free-startup-tools"); setIsMobileMenuOpen(false); }} className="text-muted-foreground hover:text-foreground transition-colors responsive-text-base font-medium py-2 px-3 rounded-lg hover:bg-[rgba(99,102,241,0.08)] bg-transparent border-none cursor-pointer text-left rtl:text-right w-full">{language === "he" ? "כלים חינמיים" : "Free Tools"}</button>
                    <button onClick={() => { handleNavigation("/", "final-cta"); setIsMobileMenuOpen(false); }} className="text-muted-foreground hover:text-foreground transition-colors responsive-text-base font-medium py-2 px-3 rounded-lg hover:bg-[rgba(99,102,241,0.08)] bg-transparent border-none cursor-pointer text-left rtl:text-right w-full">{content.navigation.contact}</button>
                    <div className="pt-4 mt-4 border-t border-[rgba(99,102,241,0.1)]">
                      <Button variant="hero" size="lg" className="w-full py-3" onClick={() => { window.open(content.cta.calendlyLink, "_blank"); setIsMobileMenuOpen(false); }}>{content.cta.bookSession}</Button>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
