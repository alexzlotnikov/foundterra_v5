export const BREVO_API_BASE = "https://api.brevo.com/v3";
export const RESOURCE_LIST_NAME = "Foundterra Resources";

export interface SubscribeInput {
  email: string;
  firstName: string;
  locale: "en" | "he";
  website: string;
}

export function shouldSilentlyAccept(input: SubscribeInput): boolean {
  return input.website.length > 0;
}

export function recordRateLimitAttempt(
  attempts: number[],
  now: number,
  windowMs: number,
  maximumAttempts: number,
): { limited: boolean; attempts: number[] } {
  const activeAttempts = attempts.filter((timestamp) => now - timestamp < windowMs);

  if (activeAttempts.length >= maximumAttempts) {
    return { limited: true, attempts: activeAttempts };
  }

  return { limited: false, attempts: [...activeAttempts, now] };
}

export interface ValidationResult {
  ok: boolean;
  value?: SubscribeInput;
}

interface BrevoList {
  id: number;
  name: string;
}

interface BrevoListsResponse {
  lists?: BrevoList[];
  count?: number;
}

type FetchLike = typeof fetch;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSubscribeInput(body: unknown): ValidationResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false };

  const record = body as Record<string, unknown>;
  const email = typeof record.email === "string" ? record.email.trim().toLowerCase() : "";
  const firstName = typeof record.firstName === "string" ? record.firstName.trim() : "";
  const locale = record.locale === "he" ? "he" : "en";
  const website = typeof record.website === "string" ? record.website.trim() : "";

  if (!EMAIL_PATTERN.test(email) || email.length > 254) return { ok: false };
  if (!firstName || firstName.length > 200) return { ok: false };
  if (website.length > 500) return { ok: false };

  return { ok: true, value: { email, firstName, locale, website } };
}

export async function resolveResourceListId(
  apiKey: string,
  fetcher: FetchLike = fetch,
): Promise<number> {
  const matches: BrevoList[] = [];
  const limit = 50;

  for (let offset = 0; offset < 1000; offset += limit) {
    const response = await fetcher(
      `${BREVO_API_BASE}/contacts/lists?limit=${limit}&offset=${offset}&sort=desc`,
      {
        headers: {
          accept: "application/json",
          "api-key": apiKey,
        },
      },
    );

    if (!response.ok) throw new Error("BREVO_LIST_LOOKUP_FAILED");

    const payload = (await response.json()) as BrevoListsResponse;
    const lists = payload.lists ?? [];
    matches.push(...lists.filter((list) => list.name === RESOURCE_LIST_NAME));

    if (
      lists.length < limit
      || (typeof payload.count === "number" && offset + limit >= payload.count)
    ) {
      break;
    }
  }

  if (matches.length !== 1) {
    throw new Error(matches.length === 0 ? "BREVO_LIST_NOT_FOUND" : "BREVO_LIST_NOT_UNIQUE");
  }

  return matches[0].id;
}

export function buildContactPayload(input: SubscribeInput, listId: number) {
  return {
    email: input.email,
    attributes: {
      FIRSTNAME: input.firstName,
    },
    listIds: [listId],
    updateEnabled: true,
  };
}

export async function subscribeContact(
  apiKey: string,
  input: SubscribeInput,
  listId: number,
  fetcher: FetchLike = fetch,
): Promise<void> {
  const response = await fetcher(`${BREVO_API_BASE}/contacts`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(buildContactPayload(input, listId)),
  });

  if (!response.ok) throw new Error("BREVO_CONTACT_UPSERT_FAILED");
}
