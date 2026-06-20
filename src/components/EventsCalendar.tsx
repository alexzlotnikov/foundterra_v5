import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const LUMA_EMBED = "https://luma.com/embed/calendar/cal-ijaWsNJuaGGlXwy/events";

const EventsCalendar = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "500px 0px" });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="section-padding scroll-mt-24">
      <div className="container-max">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <div className={isHebrew ? "text-right" : "text-left"}>
            <h2>{isHebrew ? "אירועים קרובים ליזמים" : "Upcoming founder events"}</h2>
            <p className="mt-5 text-base leading-8 text-foreground/60">
              {isHebrew
                ? "אחרי יותר מ־30 אירועים ליזמים, Foundterra ממשיכה לארח שיחות מעשיות עם משקיעים, מפעילים ומומחים."
                : "After organizing 30+ founder events, Foundterra continues to host practical conversations with investors, operators, and specialists."}
            </p>
            <a href="https://luma.com/foundterra" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
              {isHebrew ? "לכל האירועים ב־Luma" : "View all events on Luma"} <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="relative min-h-[520px] overflow-hidden border border-white/12 bg-[#0b0b13]">
            {!loaded && (
              <div className="absolute inset-0 grid place-items-center text-sm text-foreground/45">
                {isHebrew ? "טוען אירועים קרובים…" : "Loading upcoming events…"}
              </div>
            )}
            {shouldLoad ? (
              <iframe
                src={LUMA_EMBED}
                title={isHebrew ? "לוח האירועים הקרובים של Foundterra" : "Foundterra upcoming events calendar"}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`relative h-[520px] w-full border-0 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
                allow="fullscreen; payment"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;
