import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const Hero = () => {
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const rafRef = useRef<number | null>(null);
  const { language } = useLanguage();
  const isHebrew = language === "he";

  const t = isHebrew
    ? {
        badge: "ליווי גיוס ליזמים",
        title1: "ליווי גיוס ליזמים",
        title2: "לפני ובמהלך הסבב.",
        subtitle:
          "Foundterra עוזרת ליזמי Pre-Seed ו-Seed לבנות מצגת חדה יותר, סיפור משקיעים ברור יותר, הנחות פיננסיות מדויקות יותר ותהליך גיוס ממושמע.",
        ctaDiagnostic: "התחל עם דיאגנוסטיק ב-₪300",
        ctaPlans: "צפה במסלולי המנוי",
        cardTitle: "תפסיקו לנחש. תתחילו לפגוש משקיעים.",
        cardLines: [
          "תראו בדיוק מה מוריד תגובות במצגת שלכם",
          "קבלו Pitch Deck ו-Data Room ברמת VC",
          "עברו מפידבק אקראי למערכת גיוס שחוזרת על עצמה",
        ],
      }
    : {
        badge: "Founder fundraising support",
        title1: "Fundraising support for founders",
        title2: "before and during the raise.",
        subtitle:
          "Foundterra helps pre-seed and seed founders build sharper pitch decks, clearer investor stories, better financial assumptions, and a more disciplined fundraising process.",
        ctaDiagnostic: "Start with $100 Deck Diagnostic",
        ctaPlans: "View Monthly Support",
        cardTitle: "Stop guessing. Start meeting investors.",
        cardLines: [
          "See exactly what is killing replies in your deck",
          "Get a VC-ready Pitch Deck and Data Room",
          "Move from random feedback to a repeatable raise system",
        ],
      };

  const handleMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      setPointer({ x, y });
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      className="relative min-h-[78vh] sm:min-h-[88vh] flex items-center section-padding pt-24 sm:pt-32 lg:pt-40 pb-10 sm:pb-0 overflow-hidden"
      onMouseMove={handleMove}
    >
      <div className="hero-aurora" aria-hidden="true" />
      <div className="hero-gridfx" aria-hidden="true" />
      <div
        className="hero-cursor-glow"
        aria-hidden="true"
        style={{
          background: `radial-gradient(560px circle at ${pointer.x}% ${pointer.y}%, rgba(124,58,237,0.22), transparent 60%)`,
        }}
      />

      <div className="container-max relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-10 items-center ${isHebrew ? "text-right" : ""}`}>
          <div className="max-w-4xl">
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs tracking-[0.16em] uppercase font-semibold mb-5">
              {t.badge}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-light mb-6 leading-[1.02] tracking-tight font-serif">
              <span className="gradient-text">{t.title1}</span>
              <br />
              <span className="text-foreground">{t.title2}</span>
            </h1>

            <p className={`text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl leading-relaxed font-body ${isHebrew ? "mr-0" : ""}`}>
              {t.subtitle}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 ${isHebrew ? "sm:flex-row-reverse" : ""}`}>
              <Button asChild variant="hero" size="lg" className="text-base px-8 py-6 group">
                <a href="/pay/pitch-deck-review">
                  {t.ctaDiagnostic}
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isHebrew ? "mr-2 rotate-180" : "ml-2"}`} />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 py-6">
                <a href="#plans">{t.ctaPlans}</a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="hero-orbit hidden sm:block" aria-hidden="true" />
            <div className="glass-card rounded-2xl p-6 sm:p-7 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(124,58,237,0.20),transparent_38%)]" />
              <div className={`relative z-10 ${isHebrew ? "text-right" : ""}`}>
                <h3 className="text-2xl sm:text-3xl font-semibold font-serif mb-4">{t.cardTitle}</h3>
                <div className="space-y-3">
                  {t.cardLines.map((line) => (
                    <div key={line} className="flex items-start gap-2 border-b border-primary/20 pb-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm text-foreground/90">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
