export interface VerifiableAppSumoAd {
  Name?: string;
  Description?: string;
  TrackingLink?: string;
}

export interface TrackedAppSumoDeal {
  company: string;
  slug: string;
  token: string;
}

export function findVerifiedDeal<T extends VerifiableAppSumoAd>(
  ads: T[],
  deal: TrackedAppSumoDeal,
): T | undefined {
  return ads.find((ad) => {
    if (!ad.TrackingLink) return false;
    const name = ad.Name?.toLowerCase() ?? "";
    return (
      ad.TrackingLink.includes(deal.token)
      || name.includes(deal.company.toLowerCase())
      || name.includes(deal.slug)
    );
  });
}

export function isUsableReplacement(ad: VerifiableAppSumoAd): boolean {
  return Boolean(ad.Name?.trim() && ad.Description?.trim() && ad.TrackingLink?.trim());
}
