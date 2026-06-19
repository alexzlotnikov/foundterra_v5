import { Deal } from '@/lib/deals-data';
import { DealLogo } from './DealLogo';
import { DealBadge } from './DealBadge';

export function DealExpiredCard({ deal }: { deal: Deal }) {
  return (
    <div className="rounded-xl border border-[#3b2330] bg-[#16131a] p-5 opacity-80">
      <div className="mb-4 flex items-center gap-3">
        <DealLogo domain={deal.domain} name={deal.company} />
        <h3 className="text-lg font-semibold text-[#dad6e8]">{deal.company}</h3>
      </div>
      <div className="mb-3"><DealBadge text={deal.badge} category={deal.category} expired /></div>
      <p className="mb-2 text-sm text-[#9f93a9]">{deal.description}</p>
      <p className="text-sm text-[#f38fa3]">This deal has ended — here's the next best pick:</p>
    </div>
  );
}
