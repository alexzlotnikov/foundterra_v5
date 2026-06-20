import boardyLogo from "@/assets/boardy-ventures-logo.svg";
import michiganIsraelLogo from "@/assets/michigan-israel-logo.jpg";
import polyboxLogo from "@/assets/polybox-logo.jpg";
import seedLegalsLogo from "@/assets/seedlegals.png";
import { useLanguage } from "@/hooks/useLanguage";

const partners = [
  {
    name: "Boardy",
    href: "https://www.boardy.ai",
    logo: boardyLogo,
    description: {
      en: "AI-powered introductions to the people founders should meet.",
      he: "חיבורים מבוססי AI לאנשים הנכונים עבור יזמים.",
    },
  },
  {
    name: "Michigan Israel",
    href: "https://www.michiganisrael.com/",
    logo: michiganIsraelLogo,
    description: {
      en: "US market support and workspace for Israeli startups.",
      he: "תמיכה בכניסה לשוק האמריקאי ומרחב עבודה לסטארטאפים ישראליים.",
    },
  },
  {
    name: "Polybox Design",
    href: "https://polybox.studio/",
    logo: polyboxLogo,
    description: {
      en: "A flexible product and SaaS design partner.",
      he: "שותף גמיש לעיצוב מוצר ו-SaaS.",
    },
  },
  {
    name: "SeedLegals",
    href: "https://seedlegals.com/",
    logo: seedLegalsLogo,
    description: {
      en: "Legal infrastructure for funding, equity, and startup operations.",
      he: "תשתית משפטית לגיוס, הון ותפעול סטארטאפים.",
    },
  },
] as const;

const Partners = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";

  return (
    <section id="partners" className="section-padding scroll-mt-24">
      <div className="container-max">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {isHebrew ? "השותפים והחברים שלנו" : "Our Partners and Friends"}
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-64 flex-col rounded-2xl border border-primary/20 bg-secondary/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="mb-6 flex h-20 items-center justify-center overflow-hidden rounded-xl bg-[#0b0b14] px-4">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-16 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className={`mb-3 font-serif text-xl font-semibold text-foreground ${isHebrew ? "text-right" : "text-left"}`}>
                {partner.name}
              </h3>
              <p className={`text-sm leading-6 text-muted-foreground ${isHebrew ? "text-right" : "text-left"}`}>
                {partner.description[language]}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
