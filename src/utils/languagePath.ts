export const getLanguageFromPathname = (pathname: string): "en" | "he" => {
  const pathOnly = pathname.split(/[?#]/, 1)[0];
  return pathOnly === "/he" || pathOnly.startsWith("/he/") ? "he" : "en";
};
