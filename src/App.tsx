import React, { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { LanguageProvider, type Language } from "./hooks/useLanguage";
import { getLanguageFromPathname } from "./utils/languagePath";
import ErrorBoundary from "./components/ErrorBoundary";
import { appRoutes, NotFoundPage } from "./routes";
import RouteSeo from "./components/RouteSeo";

const CookieConsent = lazy(() => import("./components/CookieConsent"));
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((module) => ({ default: module.Toaster })),
);
const Analytics = lazy(() =>
  import("@vercel/analytics/react").then((module) => ({ default: module.Analytics })),
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const BrandedRouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center" role="status">
    <div>
      <img
        src="/brand/foundterra-logo-white.svg"
        width="56"
        height="56"
        alt=""
        className="mx-auto h-14 w-14"
      />
      <p className="mt-4 text-sm text-foreground/70">Loading Foundterra…</p>
    </div>
  </div>
);

export const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Suspense fallback={<BrandedRouteFallback />}>
      <Routes>
        {appRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
    <RouteSeo />
  </>
);

const ClientEnhancements = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <Toaster />
      <CookieConsent />
      <Analytics />
    </Suspense>
  );
};

interface AppFrameProps {
  children: ReactNode;
  initialLanguage: Language;
  helmetContext?: { helmet?: HelmetServerState };
}

export const AppFrame = ({ children, initialLanguage, helmetContext }: AppFrameProps) => (
  <ErrorBoundary>
    <HelmetProvider context={helmetContext}>
      <LanguageProvider initialLanguage={initialLanguage}>
        {children}
        <ClientEnhancements />
      </LanguageProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

const App = () => {
  const initialLanguage = getLanguageFromPathname(window.location.pathname);

  return (
    <AppFrame initialLanguage={initialLanguage}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppFrame>
  );
};

export default App;
