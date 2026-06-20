import founderPhoto from "@/assets/alex-zlotnikov.webp";
import ggwLogo from "@/assets/ggw-ventures-logo-optimized.webp";
import lvlupLogo from "@/assets/lvlup-ventures-logo.png";
import flashpointLogo from "@/assets/flashpoint-vc-logo.svg";
import ganasLogo from "@/assets/ganas-ventures-logo.svg";
import { useLanguage } from "@/hooks/useLanguage";

interface FounderCredential {
  organization: string;
  logo: string;
  titleEn: string;
  titleHe: string;
}

const credentials: FounderCredential[] = [
  { organization: "GGW Ventures", logo: ggwLogo, titleEn: "Associate at GGW Ventures", titleHe: "Associate ב־GGW Ventures" },
  { organization: "LvlUp Ventures", logo: lvlupLogo, titleEn: "Senior Scout at LvlUp Ventures", titleHe: "Senior Scout ב־LvlUp Ventures" },
  { organization: "Flashpoint VC", logo: flashpointLogo, titleEn: "Scout at Flashpoint VC", titleHe: "Scout ב־Flashpoint VC" },
  { organization: "Ganas Ventures", logo: ganasLogo, titleEn: "Scout at Ganas Ventures", titleHe: "Scout ב־Ganas Ventures" },
];

const FounderTeam = () => {
  const { content, language } = useLanguage();
  const profile = content.investorPerspective;
  const isHebrew = language === "he";
  if (!profile) return null;

  return (
    <section id="team" className="editorial-band section-padding scroll-mt-24">
      <div className="container-max">
        <div className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <img
            src={founderPhoto}
            alt="Alex Zlotnikov, founder of Foundterra"
            width="400"
            height="400"
            loading="lazy"
            decoding="async"
            className="mx-auto aspect-square w-full max-w-md border border-white/15 object-cover"
          />
          <div className={isHebrew ? "text-right" : "text-left"}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl">Alex Zlotnikov</h2>
            <p className="mt-3 text-lg font-semibold text-primary">{isHebrew ? "מייסד Foundterra" : "Founder, Foundterra"}</p>
            <p className="mt-7 max-w-3xl text-base leading-8 text-foreground/65 sm:text-lg">{profile.description}</p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/80">
              {isHebrew
                ? "אלכס ארגן יותר מ־30 אירועים ליזמים, המחברים בין מייסדים, משקיעים ומומחים מעשיים."
                : "Alex has organized 30+ events for founders, connecting early-stage teams with investors and practical experts."}
            </p>
          </div>
        </div>

        <div className="mt-14 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((credential) => (
            <div key={credential.organization} className="flex min-h-36 items-center gap-4 border-white/10 p-5 sm:border-e">
              <div className="flex h-14 w-24 shrink-0 items-center justify-center">
                <img src={credential.logo} alt={`${credential.organization} logo`} loading="lazy" decoding="async" className="max-h-14 max-w-24 object-contain" />
              </div>
              <p className="text-sm leading-6 text-foreground/75">{isHebrew ? credential.titleHe : credential.titleEn}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FounderTeam;
