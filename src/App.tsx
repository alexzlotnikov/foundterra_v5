import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./hooks/useLanguage";
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

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const AppContent = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-background" aria-label="Loading page" />}>
          <Routes>
            {appRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <RouteSeo />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
      <AppContent />
      <Suspense fallback={null}>
        <Toaster />
        <CookieConsent />
        <Analytics />
      </Suspense>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;
