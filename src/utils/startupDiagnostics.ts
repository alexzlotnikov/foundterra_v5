import { safeStorage } from "@/utils/storage";

const DIAGNOSTIC_KEY = "foundterra-startup-error";
const CHUNK_RETRY_KEY = "foundterra-chunk-retry";

export const recordStartupError = (
  type: "error" | "rejection" | "optional-component" | "chunk-load",
  value: unknown,
  details?: Record<string, string | undefined>,
) => {
  const message = value instanceof Error
    ? value.message
    : typeof value === "string"
      ? value
      : "Unknown startup error";

  safeStorage.setItem("sessionStorage", DIAGNOSTIC_KEY, JSON.stringify({
    type,
    message: message.slice(0, 300),
    path: window.location.pathname,
    time: new Date().toISOString(),
    ...details,
  }));
};

export const installStartupDiagnostics = () => {
  window.addEventListener("error", (event) => recordStartupError("error", event.error ?? event.message), { once: true });
  window.addEventListener("unhandledrejection", (event) => recordStartupError("rejection", event.reason), { once: true });
  window.addEventListener("vite:preloadError", (event) => {
    event.preventDefault();
    recordStartupError("chunk-load", "A versioned JavaScript chunk failed to load");

    const lastRetry = Number(safeStorage.getItem("sessionStorage", CHUNK_RETRY_KEY) ?? "0");
    if (Date.now() - lastRetry < 60_000) return;

    safeStorage.setItem("sessionStorage", CHUNK_RETRY_KEY, String(Date.now()));
    window.location.reload();
  });
};
