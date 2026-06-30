import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  recordRateLimitAttempt,
  resolveResourceListId,
  shouldSilentlyAccept,
  subscribeContact,
  validateSubscribeInput,
} from "./logic.js";

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 8;

let cachedListId: number | null = null;
const attempts = new Map<string, number[]>();

function isRateLimited(key: string, now = Date.now()): boolean {
  const result = recordRateLimitAttempt(
    attempts.get(key) ?? [],
    now,
    RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX_ATTEMPTS,
  );
  attempts.set(key, result.attempts);
  return result.limited;
}

function clientKey(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0];
  return ip?.trim() || req.socket.remoteAddress || "unknown";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }

  const contentLength = Number(req.headers["content-length"] ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return res.status(413).json({ ok: false, error: "INVALID_REQUEST" });
  }

  if (isRateLimited(clientKey(req))) {
    return res.status(429).json({ ok: false, error: "RATE_LIMITED" });
  }

  const parsed = validateSubscribeInput(req.body);
  if (!parsed.ok || !parsed.value) {
    return res.status(400).json({ ok: false, error: "INVALID_REQUEST" });
  }

  if (shouldSilentlyAccept(parsed.value)) {
    return res.status(200).json({ ok: true });
  }

  const apiKey = process.env.BREVO_API;
  if (!apiKey) {
    return res.status(503).json({ ok: false, error: "SERVICE_UNAVAILABLE" });
  }

  try {
    cachedListId ??= await resolveResourceListId(apiKey);
    await subscribeContact(apiKey, parsed.value, cachedListId);
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: "SUBSCRIPTION_FAILED" });
  }
}
