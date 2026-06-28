import { safeStorage } from "@/utils/storage";

const DIAGNOSTIC_KEY = "foundterra-startup-error";

const record = (type: "error" | "rejection", value: unknown) => {
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
  }));
};

export const installStartupDiagnostics = () => {
  window.addEventListener("error", (event) => record("error", event.error ?? event.message), { once: true });
  window.addEventListener("unhandledrejection", (event) => record("rejection", event.reason), { once: true });
};
