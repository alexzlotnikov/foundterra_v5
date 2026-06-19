import { DealCategory } from '@/lib/deals-data';

const colorMap: Record<DealCategory | 'expired', string> = {
  credits: 'bg-[#052E1C] text-[#10D9A0]',
  partner: 'bg-[#1E1B4B] text-[#818CF8]',
  alternative: 'bg-[#3A2A05] text-[#F4C430]',
  foundterra: 'bg-[#3A2A05] text-[#F4C430]',
  expired: 'bg-[rgba(244,63,94,0.15)] text-[#F43F5E]',
};

export function DealBadge({ text, category, expired = false }: { text: string; category: DealCategory; expired?: boolean }) {
  const klass = expired ? colorMap.expired : colorMap[category];
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${klass}`}>{text}</span>;
}

export function DealOfferButton({ text, link }: { text: string; link: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#16dba3] to-[#0fb880] px-4 py-2 text-sm font-bold text-[#052517] transition hover:brightness-110"
    >
      {text}
    </a>
  );
}
