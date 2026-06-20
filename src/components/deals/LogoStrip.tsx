import { DEALS } from '@/lib/deals-data';
import { DealLogo } from './DealLogo';

const logos = DEALS.filter((d) => d.category !== 'foundterra').slice(0, 8);

export function LogoStrip() {
  return (
    <div className="container-max py-6">
      <div className="mx-auto max-w-4xl rounded-xl border border-[#252535] bg-[#0f0f17] px-4 py-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {logos.map((deal) => (
            <div key={deal.id} className="flex min-w-0 items-center gap-2 opacity-80">
              <DealLogo domain={deal.domain} name={deal.company} size={24} />
              <span className="truncate text-xs text-[#a7a7c9]">{deal.company}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
