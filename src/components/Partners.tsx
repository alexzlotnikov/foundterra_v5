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

        <div className="mx-auto grid max-w-6xl grid-cols-2 border-y border-white/10 lg:grid-cols-4">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-40 items-center justify-center border-e border-white/10 p-6 transition-colors hover:bg-white/[0.025]"
            >
              <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" decoding="async" className="max-h-16 max-w-[85%] object-contain opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
