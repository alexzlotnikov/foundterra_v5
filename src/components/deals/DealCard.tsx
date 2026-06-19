import { Deal } from '@/lib/deals-data';
import { DealLogo } from './DealLogo';
import { DealBadge, DealOfferButton } from './DealBadge';

export function DealCard({ deal, isReplacement, replacesName }: { deal: Deal; isReplacement?: boolean; replacesName?: string }) {
  return (
    <div className="group rounded-xl border border-[#252535] bg-[#111118] p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#4A4A7A] hover:shadow-[0_8px_32px_rgba(99,102,241,0.15)]">
      {isReplacement && <div className="mb-3 text-xs text-[#F4C430]">🔄 New Pick — replaces {replacesName}</div>}
      <div className="mb-4 flex items-center justify-center gap-3">
        <DealLogo domain={deal.domain} name={deal.company} />
        <div>
          <h3 className="text-lg font-semibold text-[#EEEEF8]">{deal.company}</h3>
          {deal.alternativeTo && <p className="text-xs text-[#9a9ab8]">Alt to {deal.alternativeTo}</p>}
        </div>
      </div>
      <div className="mb-3">
        <DealBadge text={deal.category === 'credits' ? 'Cloud Credit' : deal.category === 'partner' ? 'Partner Deal' : 'Alternative'} category={deal.category} />
      </div>
      <p className="mb-4 text-sm text-[#b6b6d4]">{deal.description}</p>
      <DealOfferButton text={deal.category === 'credits' ? `Up to ${deal.badge}` : deal.badge} link={deal.link} />
    </div>
  );
}
