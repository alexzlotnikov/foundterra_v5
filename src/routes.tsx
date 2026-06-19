import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import Index from "@/pages/Index";

export type RouteLocale = "en" | "he";
export type RouteComponent = ComponentType | LazyExoticComponent<ComponentType>;

export interface AppRoute {
  path: string;
  component: RouteComponent;
  locale: RouteLocale;
  indexable: boolean;
  prerender: boolean;
  sitemap: boolean;
  canonical?: string;
  alternate?: string;
}

const lazyPage = (loader: () => Promise<{ default: ComponentType }>) => lazy(loader);

const Privacy = lazyPage(() => import("@/pages/Privacy"));
const Terms = lazyPage(() => import("@/pages/Terms"));
const Cookies = lazyPage(() => import("@/pages/Cookies"));
const Referral = lazyPage(() => import("@/pages/Referral"));
const Blog = lazyPage(() => import("@/pages/Blog"));
const BlogPost = lazyPage(() => import("@/pages/BlogPost"));
const Resources = lazyPage(() => import("@/pages/Resources"));
const GetResources = lazyPage(() => import("@/pages/GetResources"));
const Redirecting = lazyPage(() => import("@/pages/Redirecting"));
const SaasMetricAuditor = lazyPage(() => import("@/pages/SaasMetricAuditor"));
const DeckArchitect = lazyPage(() => import("@/pages/DeckArchitect"));
const FinancialModel = lazyPage(() => import("@/pages/FinancialModel"));
const InvestorReady = lazyPage(() => import("@/pages/InvestorReady"));
const PaidConsultation = lazyPage(() => import("@/pages/PaidConsultation"));
const MarketSize = lazyPage(() => import("@/pages/MarketSize"));
const PitchReview = lazyPage(() => import("@/pages/PitchReview"));
const StartupDeals = lazyPage(() => import("@/pages/StartupDeals"));
const Checkout = lazyPage(() => import("@/pages/Checkout"));
const ResourceGuide = lazyPage(() => import("@/pages/ResourceGuide"));
const NotFound = lazyPage(() => import("@/pages/NotFound"));

const localized = (
  path: string,
  component: RouteComponent,
  options: { indexable?: boolean; prerender?: boolean; sitemap?: boolean } = {},
): AppRoute[] => {
  const indexable = options.indexable ?? true;
  const prerender = options.prerender ?? indexable;
  const sitemap = options.sitemap ?? indexable;
  return [
    {
      path,
      component,
      locale: "en",
      indexable,
      prerender,
      sitemap,
      canonical: `https://www.foundterra.com${path === "/" ? "/" : path}`,
      alternate: path === "/" ? "/he" : `/he${path}`,
    },
    {
      path: path === "/" ? "/he" : `/he${path}`,
      component,
      locale: "he",
      indexable,
      prerender,
      sitemap,
      canonical: `https://www.foundterra.com${path === "/" ? "/he" : `/he${path}`}`,
      alternate: path,
    },
  ];
};

export const appRoutes: AppRoute[] = [
  ...localized("/", Index),
  { path: "/privacy", component: Privacy, locale: "en", indexable: true, prerender: true, sitemap: true, canonical: "https://www.foundterra.com/privacy" },
  { path: "/terms", component: Terms, locale: "en", indexable: true, prerender: true, sitemap: true, canonical: "https://www.foundterra.com/terms" },
  { path: "/cookies", component: Cookies, locale: "en", indexable: true, prerender: true, sitemap: true, canonical: "https://www.foundterra.com/cookies" },
  { path: "/referral", component: Referral, locale: "en", indexable: true, prerender: true, sitemap: true, canonical: "https://www.foundterra.com/referral" },
  { path: "/blog", component: Blog, locale: "en", indexable: true, prerender: true, sitemap: true, canonical: "https://www.foundterra.com/blog" },
  { path: "/blog/:slug", component: BlogPost, locale: "en", indexable: true, prerender: false, sitemap: false },
  ...localized("/resources", Resources),
  ...localized("/get-resources", GetResources),
  ...localized("/saas-metric-auditor", SaasMetricAuditor),
  ...localized("/deck-architect", DeckArchitect),
  ...localized("/financial-model", FinancialModel),
  ...localized("/investor-ready", InvestorReady),
  ...localized("/paid-consultation", PaidConsultation),
  ...localized("/market-size", MarketSize),
  ...localized("/pitch-review", PitchReview),
  ...localized("/startup-deals", StartupDeals),
  { path: "/resources/:slug", component: ResourceGuide, locale: "en", indexable: true, prerender: false, sitemap: false },
  { path: "/he/resources/:slug", component: ResourceGuide, locale: "he", indexable: true, prerender: false, sitemap: false },
  { path: "/redirecting", component: Redirecting, locale: "en", indexable: false, prerender: false, sitemap: false },
  { path: "/pay/:checkoutId", component: Checkout, locale: "en", indexable: false, prerender: false, sitemap: false },
  { path: "/he/pay/:checkoutId", component: Checkout, locale: "he", indexable: false, prerender: false, sitemap: false },
];

export const NotFoundPage = NotFound;

