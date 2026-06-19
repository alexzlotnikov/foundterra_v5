import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DEALS, Deal } from '@/lib/deals-data';
import { HeroCounter } from '@/components/deals/HeroCounter';
import { LogoStrip } from '@/components/deals/LogoStrip';
import { DealCard } from '@/components/deals/DealCard';
import { useAppSumoDeals } from '@/hooks/useAppSumoDeals';
import { useLanguage } from '@/hooks/useLanguage';

const credits = DEALS.filter((d) => d.category === 'credits');
const partners = DEALS.filter((d) => d.category === 'partner');
const alternatives = DEALS.filter((d) => d.category === 'alternative');

const copy = {
  en: {
    title: 'Founder savings unlocked: up to $600,000 in startup value',
    subtitle: 'Premium credits and tactical software offers to help you move faster and extend runway.',
    browse: 'Browse All Deals ↓',
    cloudTitle: 'Free Startup Cloud Credits',
    cloudBody: 'Reduce burn with high-impact infrastructure support for serious founders.',
    partnersTitle: 'Premium Tools at Founder Prices',
    partnersBody: 'Curated discounts for product, growth, analytics, and fundraising execution.',
    strategicTitle: 'Partners',
    altTitle: 'Smart Alternatives That Protect Cash',
    altBody: 'Live AppSumo checks + replacement logic, plus lean alternatives for recurring tools.',
    finalTitle: 'Your stack is ready. Now build the investor story.',
    finalBody: 'You have the tools. Now get the narrative, positioning, and strategy investors fund.',
    finalCta: 'Book a Strategy Call',
    bannerTitle: 'Free Fundraising Kit + Startup Tools',
    bannerBody: 'Templates, investor update frameworks, and practical tools to tighten your fundraising process.',
    bannerCta: 'Get Free Fundraising Kit',
  },
  he: {
    title: 'חיסכון אמיתי ליזמים: יותר מ-₪1,800,000 בערך לסטארטאפ',
    subtitle: 'קרדיטים והנחות לכלים פרקטיים שיעזרו לכם להתקדם מהר ולהאריך מסלול.',
    browse: 'צפו בכל הדילים ↓',
    cloudTitle: 'יותר מ-₪2,280,000 בקרדיטי ענן',
    cloudBody: 'הקטינו עלויות תשתית עם הטבות משמעותיות ליזמים בשלבי צמיחה.',
    partnersTitle: 'כלי פרימיום במחירי יזמים',
    partnersBody: 'הנחות נבחרות לכלי מוצר, צמיחה, אנליטיקה והיערכות לגיוס.',
    strategicTitle: 'שותפים',
    altTitle: 'אלטרנטיבות חכמות ששומרות על התקציב',
    altBody: 'בדיקות AppSumo חיות + החלפות אוטומטיות, יחד עם חלופות רזות לכלים חודשיים.',
    finalTitle: 'הסטאק מוכן. עכשיו בונים סיפור שמשקיעים מממנים.',
    finalBody: 'יש לכם את הכלים. עכשיו צריך נרטיב, מיצוב ואסטרטגיה שמביאים השקעה.',
    finalCta: 'קבעו שיחת אסטרטגיה',
    bannerTitle: 'ערכת גיוס חינמית + כלי Startup',
    bannerBody: 'תבניות, פורמט עדכונים למשקיעים וכלים פרקטיים לשיפור תהליך הגיוס.',
    bannerCta: 'קבלו ערכת גיוס חינמית',
  },
} as const;

function AlternativeCard({ deal, slotIndex }: { deal: Deal; slotIndex: number }) {
  const { getLiveLink, getLiveBadge, getReplacement } = useAppSumoDeals();

  if (deal.source !== 'appsumo') return <DealCard deal={deal} />;

  const liveLink = getLiveLink(deal.id, deal.link);
  const liveBadge = getLiveBadge(deal.id, deal.badge);

  // Never show expired UI; either use live deal data or silently swap with a replacement.
  if (liveLink && liveBadge) {
    return <DealCard deal={{ ...deal, link: liveLink, badge: liveBadge }} />;
  }

  const replacement = getReplacement(slotIndex);
  if (replacement) {
    return (
      <DealCard
        deal={{
          id: `replacement-${slotIndex}`,
          company: replacement.name,
          domain: '',
          badge: replacement.badge,
          description: replacement.description,
          link: replacement.link,
          category: 'alternative',
          source: 'appsumo',
          alternativeTo: deal.alternativeTo,
        }}
      />
    );
  }

  return <DealCard deal={deal} />;
}

const sectionClass = 'container-max py-12 text-center sm:py-16';
const strategicPartners = [
  {
    name: 'Boardy',
    href: 'https://www.boardy.ai',
    description: 'AI Superconnector! He knows who you should meet before you do.',
    icon: 'https://i.ibb.co/jCwHQ1D/boardy-box-head.png',
  },
  {
    name: 'Michigan Israel',
    href: 'https://www.michiganisrael.com/',
    description: 'Free dedicated office space and a US address to facilitate business operations for Israeli startups.',
    icon: 'https://i.ibb.co/HDN916TT/MIBA-Logo.jpg',
  },
  {
    name: 'Polybox Design',
    href: 'https://polybox.studio/',
    description: 'Your SaaS design department, without the department.',
    icon: 'https://i.ibb.co/3myMZmRV/Polybox-Logotype-White.jpg',
  },
];

const StartupDeals = () => {
  const { language, content } = useLanguage();
  const isHebrew = language === 'he';
  const t = copy[isHebrew ? 'he' : 'en'];
  const advisorReviewDeal: Deal = {
    id: 'foundterra-advisor-review',
    company: 'Foundterra',
    domain: 'foundterra.com',
    badge: isHebrew ? 'בדיקה ב-₪300' : '$100 Review',
    description: isHebrew
      ? 'קבלו בדיקת מצגת משקיעים עם תיקונים ברורים, סדר עדיפויות והכוונה נרטיבית לגיוס.'
      : 'Get an investor pitch deck review with clear fixes, priorities, and funding narrative guidance.',
    link: '/paid-consultation',
    category: 'alternative',
    source: 'direct',
    alternativeTo: 'Advisor',
  };

  const middle = Math.ceil(alternatives.length / 2);
  const alternativesWithAdvisor = [...alternatives.slice(0, middle), advisorReviewDeal, ...alternatives.slice(middle)];

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-body)' }}>
      <Helmet>
        <title>Free Startup Deals 2026 — $600K+ in Credits | Foundterra</title>
        <meta name="description" content="Cloud credits, SaaS discounts, and AppSumo lifetime deals curated for founders." />
      </Helmet>
      <Header />
      <main className="pt-20 sm:pt-24" dir={isHebrew ? 'rtl' : 'ltr'}>
        <section className="container-max py-12 text-center sm:py-16">
          <h1 style={{ fontFamily: 'var(--font-body)', fontWeight: 800 }} className="mx-auto mb-4 max-w-5xl text-3xl leading-tight text-[#EEEEF8] sm:text-5xl">
            {t.title}
          </h1>
          <p className="mx-auto mb-6 max-w-3xl text-sm text-[#b8b8d7] sm:text-base">{t.subtitle}</p>
          <div className="mb-8"><HeroCounter /></div>
          <a href="#deals-start" className="inline-flex rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8a5cf6] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_40px_rgba(99,102,241,0.35)]">{t.browse}</a>
        </section>

        <LogoStrip />

        <section id="deals-start" className={sectionClass}>
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 800 }} className="mb-2 text-2xl text-[#EEEEF8] sm:text-3xl">{t.cloudTitle}</h2>
          <p className="mb-8 text-sm text-[#a4a8cb] sm:text-base">{t.cloudBody}</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{credits.map((deal) => <DealCard key={deal.id} deal={deal} />)}</div>
        </section>

        <section className="container-max py-6 text-center sm:py-8">
          <div className="rounded-2xl border border-[#434389] bg-[linear-gradient(135deg,#13153d_0%,#10253a_100%)] p-6 sm:p-8">
            <h3 className="mb-2 text-2xl font-bold text-white">{t.bannerTitle}</h3>
            <p className="mx-auto mb-5 max-w-3xl text-sm text-[#d1d4f4] sm:text-base">{t.bannerBody}</p>
            <a href="/get-resources" className="inline-flex rounded-lg bg-[#10d9a0] px-5 py-3 text-sm font-bold text-[#06271c]">{t.bannerCta}</a>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 800 }} className="mb-2 text-2xl text-[#EEEEF8] sm:text-3xl">{t.partnersTitle}</h2>
          <p className="mb-8 text-sm text-[#a4a8cb] sm:text-base">{t.partnersBody}</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{partners.map((deal) => <DealCard key={deal.id} deal={deal} />)}</div>
        </section>

        <section className={sectionClass}>
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 800 }} className="mb-8 text-2xl text-[#EEEEF8] sm:text-3xl">{t.strategicTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {strategicPartners.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-[#3e3c86] bg-[linear-gradient(135deg,#10133a_0%,#0b1e34_100%)] p-6 text-left transition hover:-translate-y-1 hover:border-[#6160bd]"
              >
                <div className="mb-4 flex h-16 items-center justify-start">
                  <img src={partner.icon} alt={partner.name} className="max-h-16 w-auto object-contain" loading="lazy" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#EEEEF8]">{partner.name}</h3>
                <p className="text-sm text-[#b8b8d7]">{partner.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className={sectionClass}>
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 800 }} className="mb-2 text-2xl text-[#EEEEF8] sm:text-3xl">{t.altTitle}</h2>
          <p className="mb-8 text-sm text-[#a4a8cb] sm:text-base">{t.altBody}</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {alternativesWithAdvisor.map((deal, index) =>
              deal.source === 'appsumo' ? <AlternativeCard key={deal.id} deal={deal} slotIndex={index} /> : <DealCard key={deal.id} deal={deal} />
            )}
          </div>
        </section>

        <section className="container-max pb-16 pt-4 text-center sm:pb-20 sm:pt-8">
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 800 }} className="mb-3 text-2xl text-[#EEEEF8] sm:text-4xl">{t.finalTitle}</h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-[#b8b8d7] sm:text-base">{t.finalBody}</p>
          <div className="flex justify-center">
            <a href={content.cta.calendlyLink} target="_blank" rel="noreferrer" className="rounded-lg bg-[#6366F1] px-6 py-3 text-sm font-semibold text-white" dir="ltr">{t.finalCta}</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StartupDeals;
