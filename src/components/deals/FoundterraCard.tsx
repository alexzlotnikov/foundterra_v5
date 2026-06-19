import { ArrowRight } from 'lucide-react';
import { Deal } from '@/lib/deals-data';

export function FoundterraCard({ deal }: { deal: Deal }) {
  const isReview = deal.id === 'foundterra-review';
  const isTools = deal.id === 'foundterra-deck';

  return (
    <a href={deal.link} className="block rounded-2xl border border-[#6366F1] bg-[linear-gradient(135deg,#1E1B4B_0%,#0F1A2E_100%)] p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(99,102,241,0.2)]">
      <div className="mb-3 text-xs font-semibold text-[#F4C430]">⭐ Foundterra</div>
      <h3 className="mb-2 text-2xl font-semibold text-white">{isTools ? 'Free Fundraising Kit + Startup Tools' : 'Pitch Deck Review'}</h3>
      <p className="mb-4 text-sm text-[#c9c9e9]">{deal.description}</p>
      {isReview && deal.salePrice && (
        <div className="mb-4 flex items-center gap-2">
          <s className="text-sm text-[#9ca0c4]">${deal.originalPrice}</s>
          <span className="font-mono text-2xl font-bold text-[#F4C430]">${deal.salePrice}</span>
        </div>
      )}
      <div className="inline-flex items-center justify-center gap-2 rounded-md bg-[#2b2f92] px-4 py-2 text-sm font-semibold text-white">{isTools ? 'Get Free Tools' : 'Book $100 Pitch Review'} <ArrowRight size={15} /></div>
    </a>
  );
}
