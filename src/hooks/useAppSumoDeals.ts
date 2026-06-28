import { useEffect, useState } from 'react';

export interface AppSumoData {
  statusMap: Record<string, { isActive: boolean; liveLink: string | null; liveBadge: string | null }>;
  replacementCandidates: ReplacementDeal[];
  updatedAt: string;
  fallback?: boolean;
}

export interface ReplacementDeal {
  name: string;
  description: string;
  link: string;
  badge: string;
  imageUrl: string | null;
}

export function useAppSumoDeals() {
  const [data, setData] = useState<AppSumoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/appsumo-deals')
      .then((r) => r.json())
      .then(setData)
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const isDealActive = (dealId: string) =>
    Boolean(data && !data.fallback && data.statusMap[dealId]?.isActive);

  const getLiveLink = (dealId: string) =>
    data && !data.fallback ? data.statusMap[dealId]?.liveLink ?? null : null;

  const getLiveBadge = (dealId: string) =>
    data && !data.fallback ? data.statusMap[dealId]?.liveBadge ?? null : null;

  const getReplacement = (slotIndex: number): ReplacementDeal | null =>
    data && !data.fallback ? data.replacementCandidates[slotIndex] ?? null : null;

  return { data, loading, isDealActive, getLiveLink, getLiveBadge, getReplacement };
}
