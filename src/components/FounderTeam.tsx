import founderPhoto from "@/assets/alex-zlotnikov.webp";
import { useLanguage } from "@/hooks/useLanguage";

const FounderTeam = () => {
  const { content, language } = useLanguage();
  const profile = content.investorPerspective;
  const isHebrew = language === "he";

  if (!profile) return null;

  return (
    <section id="team" className="section-padding scroll-mt-24">
      <div className="container-max">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-primary/20 bg-secondary shadow-2xl shadow-primary/10">
              <img
                src={founderPhoto}
                alt="Alex Zlotnikov, founder of Foundterra"
                width="400"
                height="400"
                loading="lazy"
                decoding="async"
                className="aspect-square h-auto w-full object-cover"
              />
            </div>
          </div>

          <div className={isHebrew ? "text-right" : "text-left"}>
            <h2 className="mb-5 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {profile.title}
            </h2>
            {profile.subtitle && (
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                {profile.subtitle}
              </p>
            )}
            <blockquote className="mb-7 border-s-2 border-primary ps-5 font-serif text-xl leading-relaxed text-foreground sm:text-2xl">
              “{profile.quote}”
            </blockquote>
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-semibold text-foreground">Alex Zlotnikov</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary sm:text-base">{profile.role}</p>
            </div>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              {profile.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderTeam;
