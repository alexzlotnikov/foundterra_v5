import boardyLogo from "@/assets/boardy-logo-original.webp";
import michiganIsraelLogo from "@/assets/michigan-israel-logo.jpg";
import polyboxLogo from "@/assets/polybox-logo.jpg";
import seedLegalsLogo from "@/assets/seedlegals.png";
import youngPeopleHaifaLogo from "@/assets/young-people-haifa.webp";
import { useLanguage } from "@/hooks/useLanguage";

const partners = [
  {
    name: "Young People For Haifa",
    href: "https://ypfh.org/en",
    logo: youngPeopleHaifaLogo,
    logoClass: "max-h-20 max-w-[88%]",
    description: {
      en: "A nonprofit organization that empowers young people in Haifa.",
      he: "ארגון ללא מטרות רווח שמעצים צעירים וצעירות בחיפה.",
    },
  },
  {
    name: "Boardy",
    href: "https://www.boardy.ai",
    logo: boardyLogo,
    logoClass: "max-h-20 max-w-[92%]",
    description: {
      en: "AI-powered introductions to the people founders should meet.",
      he: "חיבורים מבוססי AI לאנשים הנכונים עבור יזמים.",
    },
  },
  {
    name: "Michigan Israel",
    href: "https://www.michiganisrael.com/",
    logo: michiganIsraelLogo,
    logoClass: "max-h-16 max-w-[84%]",
    description: {
      en: "US market support and workspace for Israeli startups.",
      he: "תמיכה בכניסה לשוק האמריקאי ומרחב עבודה לסטארטאפים ישראליים.",
    },
  },
  {
    name: "Polybox Design",
    href: "https://polybox.studio/",
    logo: polyboxLogo,
    logoClass: "max-h-16 max-w-[84%]",
    description: {
      en: "A flexible product and SaaS design partner.",
      he: "שותף גמיש לעיצוב מוצר ו-SaaS.",
    },
  },
  {
    name: "SeedLegals",
    href: "https://seedlegals.com/",
    logo: seedLegalsLogo,
    logoClass: "max-h-24 max-w-[96%] brightness-125",
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

        <div className="mx-auto grid max-w-7xl grid-cols-1 border-y border-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${partner.name} — ${isHebrew ? partner.description.he : partner.description.en}`}
              className="group flex min-h-52 flex-col items-center justify-center gap-5 border-b border-e border-white/10 p-5 text-center transition-colors hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset lg:min-h-56"
            >
              <div className="flex h-24 w-full items-center justify-center">
                <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" decoding="async" className={`${partner.logoClass} object-contain opacity-90 transition group-hover:opacity-100`} />
              </div>
              <p className="max-w-52 text-sm leading-6 text-foreground/60 transition-colors group-hover:text-foreground/80">
                {isHebrew ? partner.description.he : partner.description.en}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
