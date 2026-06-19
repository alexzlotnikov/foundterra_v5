import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "./hooks/useLanguage";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Referral from "./pages/Referral";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import GetResources from "./pages/GetResources";
import Redirecting from "./pages/Redirecting";
import SaasMetricAuditor from "./pages/SaasMetricAuditor";
import DeckArchitect from "./pages/DeckArchitect";
import NotFound from "./pages/NotFound";
import FinancialModel from "./pages/FinancialModel";
import InvestorReady from "./pages/InvestorReady";
import PaidConsultation from "./pages/PaidConsultation";
import MarketSize from "./pages/MarketSize";
import PitchReview from "./pages/PitchReview";
import StartupDeals from "./pages/StartupDeals";
import Checkout from "./pages/Checkout";
import ResourceGuide from "./pages/ResourceGuide";
import CookieConsent from "./components/CookieConsent";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

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
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/he" element={<Index />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/he/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<ResourceGuide />} />
          <Route path="/he/resources/:slug" element={<ResourceGuide />} />
          <Route path="/get-resources" element={<GetResources />} />
          <Route path="/he/get-resources" element={<GetResources />} />
          <Route path="/redirecting" element={<Redirecting />} />
          <Route path="/saas-metric-auditor" element={<SaasMetricAuditor />} />
          <Route path="/he/saas-metric-auditor" element={<SaasMetricAuditor />} />
          <Route path="/deck-architect" element={<DeckArchitect />} />
          <Route path="/he/deck-architect" element={<DeckArchitect />} />
          <Route path="/financial-model" element={<FinancialModel />} />
          <Route path="/he/financial-model" element={<FinancialModel />} />
          <Route path="/investor-ready" element={<InvestorReady />} />
          <Route path="/he/investor-ready" element={<InvestorReady />} />
          <Route path="/paid-consultation" element={<PaidConsultation />} />
          <Route path="/he/paid-consultation" element={<PaidConsultation />} />
          <Route path="/market-size" element={<MarketSize />} />
          <Route path="/he/market-size" element={<MarketSize />} />
          <Route path="/pitch-review" element={<PitchReview />} />
          <Route path="/he/pitch-review" element={<PitchReview />} />
          <Route path="/startup-deals" element={<StartupDeals />} />
          <Route path="/he/startup-deals" element={<StartupDeals />} />
          <Route path="/pay/:checkoutId" element={<Checkout />} />
          <Route path="/he/pay/:checkoutId" element={<Checkout />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
          <Analytics />
        </TooltipProvider>
      </LanguageProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
