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
    !data || data.fallback ? true : (data.statusMap[dealId]?.isActive ?? true);

  const getLiveLink = (dealId: string, fallback: string) =>
    data?.statusMap[dealId]?.liveLink ?? fallback;

  const getLiveBadge = (dealId: string, fallback: string) =>
    data?.statusMap[dealId]?.liveBadge ?? fallback;

  const getReplacement = (slotIndex: number): ReplacementDeal | null =>
    data?.replacementCandidates[slotIndex] ?? null;

  return { data, loading, isDealActive, getLiveLink, getLiveBadge, getReplacement };
}
