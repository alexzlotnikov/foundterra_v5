import { geolocation, next } from "@vercel/functions";

const LOCALIZED_PATHS = new Set([
  "/",
  "/resources",
  "/get-resources",
  "/saas-metric-auditor",
  "/deck-architect",
  "/financial-model",
  "/investor-ready",
  "/paid-consultation",
  "/market-size",
  "/pitch-review",
  "/startup-deals",
]);

const EXCLUDED_PREFIXES = [
  "/api/",
  "/pay/",
  "/assets/",
  "/brand/",
  "/fonts/",
  "/carousel/",
  "/posts/",
  "/lovable-uploads/",
];

const isLocalizedEnglishPath = (pathname: string) =>
  LOCALIZED_PATHS.has(pathname) || pathname.startsWith("/resources/");

const readLanguagePreference = (request: Request) => {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(/(?:^|;\s*)preferred-language=(en|he)(?:;|$)/);
  return match?.[1] as "en" | "he" | undefined;
};

export default function middleware(request: Request) {
  if (request.method !== "GET" && request.method !== "HEAD") return next();
  if (/bot|crawler|spider|slurp|facebookexternalhit|linkedinbot/i.test(request.headers.get("user-agent") ?? "")) {
    return next();
  }

  const url = new URL(request.url);
  const pathname = url.pathname;

  if (
    pathname.startsWith("/he") ||
    EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    /\.[a-z0-9]+$/i.test(pathname) ||
    !isLocalizedEnglishPath(pathname)
  ) {
    return next();
  }

  const preference = readLanguagePreference(request);
  const { country } = geolocation(request);
  const shouldUseHebrew = preference === "he" || (!preference && country === "IL");

  if (!shouldUseHebrew) return next();

  url.pathname = pathname === "/" ? "/he" : `/he${pathname}`;
  return Response.redirect(url, 307);
}

export const config = {
  runtime: "edge",
  matcher: ["/((?!api/|assets/|brand/|fonts/|carousel/|posts/|lovable-uploads/).*)"],
};
