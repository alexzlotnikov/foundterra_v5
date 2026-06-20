import type { Language } from "@/hooks/useLanguage";

const ENGLISH_ONLY_PREFIXES = ["/blog", "/privacy", "/terms", "/cookies", "/referral"];

export const localizedPath = (path: string, language: Language) => {
  if (language !== "he" || !path.startsWith("/") || path.startsWith("/he")) return path;
  if (ENGLISH_ONLY_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) return path;
  if (path === "/") return "/he";
  if (path.startsWith("/#")) return `/he${path.slice(1)}`;
  return `/he${path}`;
};
