import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedServices from "@/components/RelatedServices";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

type Params = {
  stage: string;
  vertical: string;
  model: string;
  moat: string;
  pmf: string;
  fmf: string;
  traction: string;
  capital: string;
  risk: string;
  investor: string;
  advantage: string;
  thesis: string;
  team: string;
  geo: string;
};

type Option = { value: string; label: string };
type ParamConfig = { key: keyof Params; label: string; options: Option[] };

type SlideNode = {
  id: string;
  title: string;
  label: string;
  narrativeGoal: string;
  designInsight: string;
  ruleApplied: string | null;
};

const stageOptions: Option[] = [
  { value: "ANGEL", label: "Angel Round" },
  { value: "PRE_SEED", label: "Pre-Seed" },
  { value: "SEED", label: "Seed" },
  { value: "POST_SEED", label: "Post-Seed / Bridge" },
  { value: "SERIES_A", label: "Series A" },
  { value: "PRE_SERIES_B", label: "Pre-Series B" },
  { value: "SERIES_B", label: "Series B" },
  { value: "GROWTH", label: "Growth / Pre-IPO" },
];

const verticalOptions: Option[] = [
  { value: "B2B_SAAS", label: "B2B SaaS" },
  { value: "B2B_ENTERPRISE", label: "B2B Enterprise SaaS" },
  { value: "B2B_PLG", label: "B2B PLG SaaS" },
  { value: "B2C_SAAS", label: "B2C SaaS" },
  { value: "B2B2C", label: "B2B2C" },
  { value: "DEVELOPER_TOOLS", label: "Developer Tools" },
  { value: "DATA_ANALYTICS", label: "Data & Analytics" },
  { value: "NO_CODE", label: "No-Code / Automation" },
  { value: "VERTICAL_SAAS", label: "Vertical SaaS" },
  { value: "AI_NATIVE", label: "AI-Native" },
  { value: "AI_INFRA", label: "AI Infrastructure" },
  { value: "AI_AGENTS", label: "AI Agents" },
  { value: "DEEPTECH", label: "DeepTech" },
  { value: "HARDWARE", label: "Hardware / Robotics" },
  { value: "MARKETPLACE_B2B", label: "B2B Marketplace" },
  { value: "MARKETPLACE_B2C", label: "B2C Marketplace" },
  { value: "GIG_ECONOMY", label: "Gig Economy" },
  { value: "CREATOR_ECONOMY", label: "Creator Economy" },
  { value: "FINTECH", label: "FinTech" },
  { value: "CONSUMER", label: "Consumer App" },
];

const modelOptions: Option[] = [
  { value: "SUBSCRIPTION", label: "Recurring Subscription" },
  { value: "USAGE_BASED", label: "Usage-Based / API" },
  { value: "TRANSACTIONAL", label: "Transactional / Take-Rate" },
  { value: "FREEMIUM", label: "Freemium to Paid" },
  { value: "HARDWARE_HYBRID", label: "Hardware + Software" },
  { value: "LAND_EXPAND", label: "Land & Expand" },
  { value: "ADVERTISING", label: "Advertising" },
  { value: "DATA_LICENSING", label: "Data Licensing" },
  { value: "SUCCESS_FEE", label: "Success Fee" },
];

const moatOptions: Option[] = [
  { value: "DATA_GRAVITY", label: "Data Gravity" },
  { value: "NETWORK_EFFECTS", label: "Network Effects" },
  { value: "DEEP_IP", label: "Deep IP" },
  { value: "SWITCHING_COSTS", label: "Switching Costs" },
  { value: "ECONOMIES_OF_SCALE", label: "Economies of Scale" },
  { value: "BRAND_COMMUNITY", label: "Brand / Community" },
  { value: "REGULATORY_LICENSE", label: "Regulatory License" },
  { value: "TALENT_RESEARCH", label: "Talent / Research" },
];

const pmfOptions: Option[] = [
  { value: "PRE_PRODUCT", label: "Pre-Product" },
  { value: "PRIVATE_BETA", label: "Private Beta" },
  { value: "DESIGN_PARTNER", label: "Paid Design Partners" },
  { value: "EARLY_REVENUE", label: "Early Revenue" },
  { value: "STRONG_GROWTH", label: "Strong Growth" },
  { value: "HIGH_RETENTION", label: "High Retention" },
  { value: "VIRAL_MOMENT", label: "Viral Moment" },
  { value: "ENTERPRISE_LOIS", label: "Enterprise LOIs" },
];

const fmfOptions: Option[] = [
  { value: "FIRST_TIME", label: "First-Time Founders" },
  { value: "REPEAT_EXITED", label: "Repeat Exited Founders" },
  { value: "DOMAIN_EXPERT", label: "Domain Experts" },
  { value: "EX_FAANG", label: "Ex-FAANG" },
  { value: "ACADEMIC", label: "Academic / PhD" },
  { value: "OPERATOR", label: "Operator Background" },
  { value: "COMMUNITY_BUILDER", label: "Community Builder" },
  { value: "IMMIGRANT_INTL", label: "International Expert" },
];

const tractionOptions: Option[] = [
  { value: "ZERO_TO_ONE", label: "Zero to One" },
  { value: "SLOW_STEADY", label: "Slow & Steady" },
  { value: "T2D3", label: "T2D3" },
  { value: "VIRAL_ORGANIC", label: "Viral / Organic" },
  { value: "ENTERPRISE_WHALES", label: "Enterprise Whales" },
  { value: "COMMUNITY_LED", label: "Community-Led" },
  { value: "PRESS_MOMENTUM", label: "Press Momentum" },
  { value: "ACCELERATOR_SIGNAL", label: "Accelerator Signal" },
];

const capitalOptions: Option[] = [
  { value: "BOOTSTRAPPED", label: "Bootstrapped" },
  { value: "ULTRA_LEAN", label: "Ultra-Lean" },
  { value: "STANDARD_SAAS", label: "Standard Software Burn" },
  { value: "HEAVY_CAPEX", label: "Heavy R&D / CapEx" },
  { value: "GRANT_FUNDED", label: "Grant-Funded" },
  { value: "HYBRID_MODEL", label: "Hybrid Model" },
];

const riskOptions: Option[] = [
  { value: "GTM_RISK", label: "GTM / Distribution Risk" },
  { value: "TECHNICAL_RISK", label: "Technical Risk" },
  { value: "REGULATORY_RISK", label: "Regulatory Risk" },
  { value: "COMPETITION_RISK", label: "Competition Risk" },
  { value: "TALENT_RISK", label: "Talent Risk" },
  { value: "TIMING_RISK", label: "Market Timing Risk" },
  { value: "UNIT_ECON_RISK", label: "Unit Economics Risk" },
];

const investorOptions: Option[] = [
  { value: "ANGEL_SYNDICATE", label: "Angel Syndicate" },
  { value: "TIER1_VC", label: "Tier-1 VC" },
  { value: "MICRO_VC", label: "Micro-VC" },
  { value: "CORPORATE_VC", label: "Corporate VC" },
  { value: "FAMILY_OFFICE", label: "Family Office" },
  { value: "ACCELERATOR", label: "Accelerator" },
  { value: "IMPACT_FUND", label: "Impact Fund" },
];

const advantageOptions: Option[] = [
  { value: "COST_ARBITRAGE", label: "10x Cheaper" },
  { value: "SPEED_UX", label: "10x Faster / Better UX" },
  { value: "NEW_CATEGORY", label: "New Category" },
  { value: "EXCLUSIVE_DATA", label: "Exclusive Data" },
  { value: "FOUNDER_BRAND", label: "Founder Brand" },
  { value: "GEO_FIRST_MOVER", label: "Geo First-Mover" },
  { value: "REGULATORY_ARBITRAGE", label: "Regulatory Arbitrage" },
];

const thesisOptions: Option[] = [
  { value: "VENTURE_SCALE", label: "Venture Scale" },
  { value: "CAPITAL_EFFICIENT", label: "Capital Efficient" },
  { value: "CATEGORY_CREATION", label: "Category Creation" },
  { value: "ACQUI_HIRE_EXIT", label: "Strategic Exit" },
  { value: "IPO_TRAJECTORY", label: "IPO Trajectory" },
  { value: "IMPACT_FIRST", label: "Impact-First" },
];

const teamOptions: Option[] = [
  { value: "SOLO_FOUNDER", label: "Solo Founder" },
  { value: "TWO_COFOUNDERS", label: "Two Co-Founders" },
  { value: "FULL_FOUNDING_TEAM", label: "Full Founding Team" },
  { value: "TEAM_GAPS", label: "Team with Known Gaps" },
  { value: "TEAM_PLUS_ADVISORS", label: "Team + Advisors" },
];

const geoOptions: Option[] = [
  { value: "US_ONLY", label: "US-First" },
  { value: "EUROPE", label: "Europe-First" },
  { value: "LATAM", label: "Latin America" },
  { value: "SEA_INDIA", label: "Southeast Asia / India" },
  { value: "MENA", label: "MENA" },
  { value: "GLOBAL_FROM_DAY1", label: "Global from Day 1" },
];

const paramConfig: ParamConfig[] = [
  { key: "stage", label: "Current Round / Stage", options: stageOptions },
  { key: "vertical", label: "Vertical / Industry", options: verticalOptions },
  { key: "model", label: "Core Business Model", options: modelOptions },
  { key: "moat", label: "Primary Defensibility", options: moatOptions },
  { key: "pmf", label: "Product-Market Fit Signal", options: pmfOptions },
  { key: "fmf", label: "Founder-Market Fit", options: fmfOptions },
  { key: "traction", label: "Traction Velocity", options: tractionOptions },
  { key: "capital", label: "Capital Intensity", options: capitalOptions },
  { key: "risk", label: "Primary Risk / Bottleneck", options: riskOptions },
  { key: "investor", label: "Target Investor Profile", options: investorOptions },
  { key: "advantage", label: "Unfair Advantage", options: advantageOptions },
  { key: "thesis", label: "Fundraising Thesis", options: thesisOptions },
  { key: "team", label: "Team Completeness", options: teamOptions },
  { key: "geo", label: "Geographic Focus", options: geoOptions },
];

const slideMeta: Record<string, { title: string; label: string }> = {
  TITLE: { title: "The Opening Frame", label: "TITLE" },
  PROBLEM: { title: "The Pain Thesis", label: "PROBLEM" },
  SOLUTION: { title: "The Answer", label: "SOLUTION" },
  UNDER_THE_HOOD: { title: "The Breakthrough / Under The Hood", label: "UNDER THE HOOD" },
  AI_DIFFERENTIATION: { title: "Why This AI Wins", label: "AI DIFFERENTIATION" },
  MARKET: { title: "The Opportunity", label: "MARKET" },
  PRODUCT: { title: "The Product Experience", label: "PRODUCT" },
  TRACTION: { title: "The Proof Points", label: "TRACTION" },
  BUSINESS_MODEL: { title: "How We Make Money", label: "BUSINESS MODEL" },
  GTM: { title: "Go-To-Market Strategy", label: "GTM" },
  GTM_PLG: { title: "The Viral Loop & Bottom-Up Acquisition Engine", label: "GTM (PLG)" },
  NETWORK_LIQUIDITY: { title: "Network Liquidity & Chicken/Egg Strategy", label: "NETWORK LIQUIDITY" },
  CHANNEL_STRATEGY: { title: "Channel Strategy & Distribution Partnerships", label: "CHANNEL STRATEGY" },
  GEOGRAPHIC_EXPANSION: { title: "Geographic Expansion Thesis", label: "GEOGRAPHIC EXPANSION" },
  TEAM: { title: "The Team", label: "TEAM" },
  COMPETITION: { title: "The Competitive Landscape", label: "COMPETITION" },
  MOAT_IP: { title: "The Moat / IP Defensibility", label: "MOAT / IP" },
  FINANCIALS_STANDARD: { title: "Financial Projections & Unit Economics", label: "FINANCIALS" },
  FINANCIALS_ANGEL_PRESEED: { title: "Path to Revenue & Use of This Round", label: "PRE-INSTITUTIONAL FINANCIALS" },
  FINANCIALS_SERIESA_UNIT_ECONOMICS: { title: "Historical Unit Economics", label: "UNIT ECONOMICS" },
  FINANCIALS_SERIESA_FORECAST: { title: "36-Month Forecast & Scenario Analysis", label: "FORECAST" },
  REGULATORY_SLIDE: { title: "Regulatory Navigation & Compliance Moat", label: "REGULATORY" },
  THE_ASK: { title: "The Ask", label: "ASK" },
};

const verticalLabelMap: Record<string, string> = Object.fromEntries(verticalOptions.map((o) => [o.value, o.label]));
const stageLabelMap: Record<string, string> = Object.fromEntries(stageOptions.map((o) => [o.value, o.label]));

const investorLabelMap: Record<string, string> = {
  ANGEL_SYNDICATE: "angel investors and syndicates",
  TIER1_VC: "Tier-1 generalist VCs",
  MICRO_VC: "specialist sector funds",
  CORPORATE_VC: "corporate venture arms",
  FAMILY_OFFICE: "family offices",
  ACCELERATOR: "accelerator programs",
  IMPACT_FUND: "impact and ESG funds",
};

const riskLabelMap: Record<string, string> = {
  GTM_RISK: "distribution and go-to-market execution",
  TECHNICAL_RISK: "technical execution and engineering credibility",
  REGULATORY_RISK: "regulatory navigation and compliance",
  COMPETITION_RISK: "competitive differentiation against incumbents",
  TALENT_RISK: "recruiting and team-building",
  TIMING_RISK: "market timing and readiness",
  UNIT_ECON_RISK: "unit economics and financial model rigor",
};

const narrativeForSlide = (id: string, p: Params) => {
  const vertical = verticalLabelMap[p.vertical] ?? "startup";
  switch (id) {
    case "TITLE":
      return `Communicate your company and thesis in under 3 seconds with immediate credibility. At ${stageLabelMap[p.stage]}, the title must frame investor expectations before details.`;
    case "PROBLEM":
      return `Quantify the status quo pain for ${vertical} users with urgency and measurable impact. Investors should feel the cost of inaction before they see your product.`;
    case "SOLUTION":
      return `Mirror the problem structure and show your product as the inevitable answer. The slide should make your model (${p.model.replaceAll("_", " ")}) feel obvious and scalable.`;
    case "UNDER_THE_HOOD":
      return "Prove your approach is a technical breakthrough, not a feature bundle. This slide must answer reproducibility and defensibility concerns at engineering depth.";
    case "AI_DIFFERENTIATION":
      return "Kill the ‘wrapper risk’ objection proactively with architecture, proprietary data, and benchmark deltas. Investors must see what is uniquely yours.";
    case "MARKET":
      return "Show credible bottom-up sizing and where your beachhead converts into expansion. Market size must feel huge yet mechanically defensible.";
    case "PRODUCT":
      return "Use workflow visuals to prove speed-to-value and product clarity. Investors should immediately picture this in portfolio companies or end-user hands.";
    case "TRACTION":
      return `Lead with momentum and acceleration signals tied to your ${p.traction.replaceAll("_", " ")} profile. Trajectory matters more than snapshots.`;
    case "BUSINESS_MODEL":
      return "Make pricing, margin, and expansion mechanics instantly legible. The investor should be able to model your revenue mentally in under 30 seconds.";
    case "GTM":
      return "Show the repeatable acquisition motion with enough specificity to execute next week. Channel assumptions should be tied to conversion mechanics.";
    case "GTM_PLG":
      return "Present the viral self-serve flywheel from signup to team expansion to paid upgrade. Quantify each loop stage and land-and-expand compounding.";
    case "NETWORK_LIQUIDITY":
      return "Address marketplace chicken/egg risk before GTM by showing liquidity milestones. Clarify your supply-demand sequencing and threshold to self-sustain.";
    case "CHANNEL_STRATEGY":
      return "De-risk distribution by mapping partner channels, contribution, and timeline. Show a diversified pipeline instead of one-channel dependency.";
    case "GEOGRAPHIC_EXPANSION":
      return "Demonstrate where and how expansion happens with market sequencing logic. The global thesis must be specific, not aspirational.";
    case "TEAM":
      return "Map each core leader to the exact execution challenge of this round. Investors should see immediate founder-market fit and hiring clarity.";
    case "COMPETITION":
      return "Acknowledge alternatives and position your moat on investor-relevant axes. Credibility increases when you frame competition honestly and specifically.";
    case "MOAT_IP":
      return "Demonstrate multi-year replication difficulty via IP, data, and technical milestones. The goal is to make copycat timelines economically unattractive.";
    case "FINANCIALS_ANGEL_PRESEED":
      return "Replace spreadsheet theater with milestone logic that this round unlocks. Show what capital buys and how that creates next-round inevitability.";
    case "FINANCIALS_SERIESA_UNIT_ECONOMICS":
      return "Show historical cohort efficiency trends with improving CAC, payback, and expansion. This is your institutional proof of repeatability.";
    case "FINANCIALS_SERIESA_FORECAST":
      return "Present bear/base/bull scenarios with explicit assumptions and runway impact. Investors should trust your planning under volatility.";
    case "FINANCIALS_STANDARD":
      return "Present a 3-year model with defensible assumptions tied to GTM and headcount. Highlight margin profile and path to operating leverage.";
    case "REGULATORY_SLIDE":
      return "Turn compliance from concern into structural moat with clear roadmap and timelines. Show jurisdiction-level readiness before the Ask.";
    case "THE_ASK":
      return "State amount, milestones, and value-add required beyond capital with precision. The Ask should feel like a disciplined execution plan.";
    default:
      return "";
  }
};

const designInsightForSlide = (id: string, p: Params) => {
  if (id === "PROBLEM") return `Foundterra Tip: use a ${verticalLabelMap[p.vertical]}-specific failure mode with one hard metric and one customer quote.`;
  if (id === "SOLUTION") return `Foundterra Tip: visualize your ${p.model.replaceAll("_", " ")} mechanics with a simple before/after flow.`;
  if (id === "TEAM") return "Foundterra Tip: each leader gets role + relevant win + execution proof in one line.";
  if (id === "TRACTION") return `Foundterra Tip: with ${p.pmf.replaceAll("_", " ")}, pair growth with retention or demand quality on one chart.`;
  if (id === "GTM" || id === "GTM_PLG") return "Foundterra Tip: show a 90-day sequence, not a channel list.";
  if (id.includes("FINANCIALS")) return "Foundterra Tip: connect every forecast input to one operating driver (headcount, CAC, conversion, or expansion).";
  if (id === "AI_DIFFERENTIATION") return "Foundterra Tip: separate what you built vs. what you use from foundation models in one architecture diagram.";
  return "Foundterra Tip: keep this slide visually sparse and logically dense—one thesis, one chart, one takeaway.";
};

const insertAfter = (arr: string[], targetId: string, newId: string) => {
  const idx = arr.indexOf(targetId);
  if (idx === -1) return arr;
  if (arr.includes(newId)) return arr;
  const copy = [...arr];
  copy.splice(idx + 1, 0, newId);
  return copy;
};

const replaceSlide = (arr: string[], oldId: string, newId: string) => arr.map((s) => (s === oldId ? newId : s));

const removeSlide = (arr: string[], id: string) => arr.filter((s) => s !== id);

const moveTo = (arr: string[], id: string, position: number) => {
  const currentIndex = arr.indexOf(id);
  if (currentIndex === -1) return arr;
  const copy = [...arr];
  copy.splice(currentIndex, 1);
  copy.splice(Math.max(0, Math.min(position, copy.length)), 0, id);
  return copy;
};

function computeDeckStructure(params: Params) {
  let slides = [
    "TITLE",
    "PROBLEM",
    "SOLUTION",
    "MARKET",
    "PRODUCT",
    "TRACTION",
    "BUSINESS_MODEL",
    "GTM",
    "TEAM",
    "COMPETITION",
    "FINANCIALS_STANDARD",
    "THE_ASK",
  ];

  const ruleBySlide: Record<string, string> = {};
  const appliedRules: string[] = [];

  // Rule 3
  if (["DEEPTECH", "HARDWARE", "AI_INFRA"].includes(params.vertical)) {
    slides = insertAfter(slides, "SOLUTION", "UNDER_THE_HOOD");
    slides = replaceSlide(slides, "COMPETITION", "MOAT_IP");
    ruleBySlide.UNDER_THE_HOOD = "⚡ Deep Tech Expansion — Technical credibility slide injected";
    ruleBySlide.MOAT_IP = "⚡ Deep Tech Expansion — Competition replaced with Moat/IP";
    appliedRules.push("Rule 3");
  }

  // Rule 3B
  const aiVert = ["AI_NATIVE", "AI_AGENTS", "AI_INFRA"].includes(params.vertical);
  const aiMoat = ["DATA_GRAVITY", "DEEP_IP", "TALENT_RESEARCH"].includes(params.moat);
  if (aiVert && aiMoat) {
    const afterId = slides.includes("UNDER_THE_HOOD") ? "UNDER_THE_HOOD" : "SOLUTION";
    slides = insertAfter(slides, afterId, "AI_DIFFERENTIATION");
    ruleBySlide.AI_DIFFERENTIATION = "⚡ AI Differentiation — 'Why This AI Wins' injected";
    appliedRules.push("Rule 3B");
  }

  // Rule 4A
  if (["MARKETPLACE_B2B", "MARKETPLACE_B2C", "GIG_ECONOMY"].includes(params.vertical)) {
    slides = insertAfter(slides, "BUSINESS_MODEL", "NETWORK_LIQUIDITY");
    ruleBySlide.NETWORK_LIQUIDITY = "⚡ Marketplace Flywheel — Network Liquidity injected";
    appliedRules.push("Rule 4A");
  }

  // Rule 4B
  const isB2B = ["B2B_SAAS", "B2B_ENTERPRISE", "B2B_PLG", "VERTICAL_SAAS", "DEVELOPER_TOOLS", "DATA_ANALYTICS", "NO_CODE", "AI_NATIVE", "AI_INFRA", "AI_AGENTS", "FINTECH"].includes(params.vertical);
  if (params.vertical === "B2B_PLG" || (params.model === "FREEMIUM" && isB2B)) {
    slides = replaceSlide(slides, "GTM", "GTM_PLG");
    ruleBySlide.GTM_PLG = "⚡ PLG Motion — Viral Loop replaces standard GTM";
    appliedRules.push("Rule 4B");
  }

  // Rule 5A/5B/5C
  if (["ANGEL", "PRE_SEED"].includes(params.stage)) {
    slides = removeSlide(slides, "BUSINESS_MODEL");
    slides = replaceSlide(slides, "FINANCIALS_STANDARD", "FINANCIALS_ANGEL_PRESEED");
    ruleBySlide.FINANCIALS_ANGEL_PRESEED = "⚡ Pre-Institutional Financials — Milestone roadmap replaces projections";
    appliedRules.push("Rule 5A");
  } else if (params.stage === "SERIES_A") {
    slides = replaceSlide(slides, "FINANCIALS_STANDARD", "FINANCIALS_SERIESA_UNIT_ECONOMICS");
    slides = insertAfter(slides, "FINANCIALS_SERIESA_UNIT_ECONOMICS", "FINANCIALS_SERIESA_FORECAST");
    ruleBySlide.FINANCIALS_SERIESA_UNIT_ECONOMICS = "⚡ Series A Financial Split — Unit economics";
    ruleBySlide.FINANCIALS_SERIESA_FORECAST = "⚡ Series A Financial Split — 36-month scenario forecast";
    appliedRules.push("Rule 5B");
  } else if (["SERIES_B", "GROWTH"].includes(params.stage)) {
    slides = replaceSlide(slides, "FINANCIALS_STANDARD", "FINANCIALS_SERIESA_UNIT_ECONOMICS");
    slides = insertAfter(slides, "FINANCIALS_SERIESA_UNIT_ECONOMICS", "FINANCIALS_SERIESA_FORECAST");
    ruleBySlide.FINANCIALS_SERIESA_UNIT_ECONOMICS = "⚡ Growth Stage Financials — Expanded cohort rigor";
    ruleBySlide.FINANCIALS_SERIESA_FORECAST = "⚡ Growth Stage Financials — Includes liquidity analysis";
    appliedRules.push("Rule 5C");
  }

  // Rule 6A
  if (params.risk === "REGULATORY_RISK") {
    const askIdx = slides.indexOf("THE_ASK");
    if (askIdx !== -1 && !slides.includes("REGULATORY_SLIDE")) {
      slides.splice(askIdx, 0, "REGULATORY_SLIDE");
      ruleBySlide.REGULATORY_SLIDE = "⚡ Regulatory Moat — Compliance strategy injected before Ask";
      appliedRules.push("Rule 6A");
    }
  }

  // Rule 6B
  if (params.risk === "GTM_RISK") {
    const gtmId = slides.includes("GTM_PLG") ? "GTM_PLG" : "GTM";
    slides = insertAfter(slides, gtmId, "CHANNEL_STRATEGY");
    ruleBySlide.CHANNEL_STRATEGY = "⚡ Distribution Reinforcement — Channel strategy injected";
    appliedRules.push("Rule 6B");
  }

  // Rule 7
  if (["SERIES_B", "GROWTH"].includes(params.stage) && ["GLOBAL_FROM_DAY1", "LATAM", "SEA_INDIA", "MENA", "EUROPE"].includes(params.geo)) {
    const gtmId = slides.includes("GTM_PLG") ? "GTM_PLG" : "GTM";
    slides = insertAfter(slides, gtmId, "GEOGRAPHIC_EXPANSION");
    ruleBySlide.GEOGRAPHIC_EXPANSION = "⚡ Global Expansion — Geographic strategy slide injected";
    appliedRules.push("Rule 7");
  }

  // Rule 1 / 1B
  if (params.stage === "ANGEL") {
    slides = moveTo(slides, "TEAM", 1);
    ruleBySlide.TEAM = "⚡ Angel Round Protocol — Team promoted to Slide 2";
    appliedRules.push("Rule 1B");
  } else if (["REPEAT_EXITED", "DOMAIN_EXPERT", "OPERATOR"].includes(params.fmf)) {
    slides = moveTo(slides, "TEAM", 1);
    ruleBySlide.TEAM = "⚡ Founder Premium Override — Team promoted to Slide 2";
    appliedRules.push("Rule 1");
  }

  // Rule 2
  if (["T2D3", "VIRAL_ORGANIC", "ACCELERATOR_SIGNAL"].includes(params.traction) && !["ANGEL", "PRE_SEED"].includes(params.stage)) {
    const teamAtTwo = slides[1] === "TEAM";
    slides = moveTo(slides, "TRACTION", teamAtTwo ? 2 : 1);
    ruleBySlide.TRACTION = "⚡ Traction Hook — Momentum leads the narrative";
    appliedRules.push("Rule 2");
  }

  const outputSlides: SlideNode[] = slides.map((id) => ({
    id,
    title: slideMeta[id].title,
    label: slideMeta[id].label,
    narrativeGoal: narrativeForSlide(id, params),
    designInsight: designInsightForSlide(id, params),
    ruleApplied: ruleBySlide[id] ?? null,
  }));

  const conversionCopy = {
    headline: `A brilliant ${verticalLabelMap[params.vertical]} deck structure is useless without world-class execution.`,
    body: `You now possess the exact narrative blueprint that ${investorLabelMap[params.investor]} expects from a ${stageLabelMap[params.stage]} ${verticalLabelMap[params.vertical]} company in 2026. But your primary bottleneck is ${riskLabelMap[params.risk]} — and that means your visual design, financial modeling, and narrative precision must be flawless. Canva templates will cost you this round.`,
  };

  return { slides: outputSlides, appliedRules, conversionCopy };
}



const hebrewParamLabels: Record<string, string> = {
  stage: "שלב וסבב נוכחי",
  vertical: "תחום פעילות",
  model: "מודל עסקי",
  moat: "חסם תחרותי מרכזי",
  pmf: "אותות Product-Market Fit",
  fmf: "Founder-Market Fit",
  traction: "קצב טרקשן",
  capital: "אינטנסיביות הון",
  risk: "סיכון / צוואר בקבוק ראשי",
  investor: "פרופיל המשקיע",
  advantage: "יתרון לא הוגן",
  thesis: "תזת גיוס",
  team: "שלמות הצוות",
  geo: "פוקוס גיאוגרפי",
};

const hebrewOptionLabels: Record<string, string> = {
  ANGEL: "אנג'ל", PRE_SEED: "פרה-סיד", SEED: "סיד", POST_SEED: "פוסט-סיד", SERIES_A: "סדרה A", PRE_SERIES_B: "לפני סדרה B", SERIES_B: "סדרה B", GROWTH: "צמיחה",
  B2B_SAAS: "B2B SaaS", B2B_ENTERPRISE: "אנטרפרייז SaaS", B2B_PLG: "PLG", B2C_SAAS: "B2C SaaS", B2B2C: "B2B2C", DEVELOPER_TOOLS: "כלי מפתחים", DATA_ANALYTICS: "דאטה ואנליטיקה", NO_CODE: "No-Code", VERTICAL_SAAS: "Vertical SaaS", AI_NATIVE: "AI Native", AI_INFRA: "תשתיות AI", AI_AGENTS: "סוכני AI", DEEPTECH: "DeepTech", HARDWARE: "חומרה/רובוטיקה", MARKETPLACE_B2B: "מרקטפלייס B2B", MARKETPLACE_B2C: "מרקטפלייס B2C", GIG_ECONOMY: "Gig Economy", CREATOR_ECONOMY: "Creator Economy", FINTECH: "פינטק", CONSUMER: "אפליקציית צרכן",
  SUBSCRIPTION: "מנוי חוזר", USAGE_BASED: "תמחור מבוסס שימוש", TRANSACTIONAL: "עמלה פר עסקה", FREEMIUM: "Freemium", HARDWARE_HYBRID: "חומרה + תוכנה", LAND_EXPAND: "Land & Expand", ADVERTISING: "פרסום", DATA_LICENSING: "רישוי דאטה", SUCCESS_FEE: "עמלת הצלחה",
  DATA_GRAVITY: "חסם דאטה", NETWORK_EFFECTS: "אפקט רשת", DEEP_IP: "IP עמוק", SWITCHING_COSTS: "עלות מעבר גבוהה", ECONOMIES_OF_SCALE: "יתרון לגודל", BRAND_COMMUNITY: "מותג/קהילה", REGULATORY_LICENSE: "חסם רגולטורי", TALENT_RESEARCH: "צוות מחקר",
  PRE_PRODUCT: "לפני מוצר", PRIVATE_BETA: "בטא סגורה", DESIGN_PARTNER: "לקוחות Design Partner", EARLY_REVENUE: "הכנסות ראשוניות", STRONG_GROWTH: "צמיחה חזקה", HIGH_RETENTION: "ריטנשן גבוה", VIRAL_MOMENT: "רגע ויראלי", ENTERPRISE_LOIS: "LOI ארגוניים",
  FIRST_TIME: "פאונדרים ראשונים", REPEAT_EXITED: "פאונדרים עם אקזיט", DOMAIN_EXPERT: "מומחי דומיין", EX_FAANG: "Ex-FAANG", ACADEMIC: "אקדמי/דוקטורט", OPERATOR: "אופרייטור", COMMUNITY_BUILDER: "בונה קהילה", IMMIGRANT_INTL: "מומחה בינלאומי",
  ZERO_TO_ONE: "Zero to One", SLOW_STEADY: "איטי ויציב", T2D3: "T2D3", VIRAL_ORGANIC: "ויראלי/אורגני", ENTERPRISE_WHALES: "עסקאות אנטרפרייז", COMMUNITY_LED: "קהילה מובילה", PRESS_MOMENTUM: "מומנטום תקשורתי", ACCELERATOR_SIGNAL: "איתות מאקסלרטור",
  BOOTSTRAPPED: "Bootstrapped", ULTRA_LEAN: "רזה מאוד", STANDARD_SAAS: "שריפת SaaS סטנדרטית", HEAVY_CAPEX: "CapEx כבד", GRANT_FUNDED: "ממומן מענקים", HYBRID_MODEL: "מודל היברידי",
  GTM_RISK: "סיכון GTM", TECHNICAL_RISK: "סיכון טכני", REGULATORY_RISK: "סיכון רגולטורי", COMPETITION_RISK: "סיכון תחרות", TALENT_RISK: "סיכון גיוס", TIMING_RISK: "סיכון תזמון שוק", UNIT_ECON_RISK: "סיכון יוניט אקונומיקס",
  ANGEL_SYNDICATE: "סינדיקט אנג'לים", TIER1_VC: "Tier-1 VC", MICRO_VC: "Micro VC", CORPORATE_VC: "CVC", FAMILY_OFFICE: "Family Office", ACCELERATOR: "Accelerator", IMPACT_FUND: "Impact Fund",
  COST_ARBITRAGE: "זול פי 10", SPEED_UX: "מהיר/UX פי 10", NEW_CATEGORY: "קטגוריה חדשה", EXCLUSIVE_DATA: "דאטה בלעדי", FOUNDER_BRAND: "מותג פאונדר", GEO_FIRST_MOVER: "ראשון גיאוגרפי", REGULATORY_ARBITRAGE: "ארביטראז' רגולטורי",
  VENTURE_SCALE: "סקייל ונצ'רי", CAPITAL_EFFICIENT: "צמיחה יעילה בהון", CATEGORY_CREATION: "יצירת קטגוריה", ACQUI_HIRE_EXIT: "אקזיט אסטרטגי", IPO_TRAJECTORY: "מסלול IPO", IMPACT_FIRST: "Impact First",
  SOLO_FOUNDER: "פאונדר יחיד", TWO_COFOUNDERS: "שני קו-פאונדרים", FULL_FOUNDING_TEAM: "צוות מייסד מלא", TEAM_GAPS: "צוות עם פערים", TEAM_PLUS_ADVISORS: "צוות + יועצים",
  US_ONLY: "ארה״ב", EUROPE: "אירופה", LATAM: "לטאם", SEA_INDIA: "דרום-מזרח אסיה/הודו", MENA: "מזרח תיכון", GLOBAL_FROM_DAY1: "גלובלי מיום 1",
};

const hebrewUi = {
  title: "בנו את הדק המושלם שלכם!",
  subtitle: "ענו על 14 שאלות וקבלו סדר שקפים, היגיון נרטיבי ואסטרטגיית עיצוב שמשקיעים מצפים לה מחברת יוניקורן — תוך 60 שניות.",
  build: "בנו לי דק מושלם",
  processing: ["ממפים קשתות נרטיב VC...", "בונים לוגיקה לפי ורטיקל...", "מזריקים עקרונות עיצוב Foundterra...", "התוכנית מוכנה."],
  slidePrefix: "שקף",
  narrativeGoal: "מטרה נרטיבית",
  tip: "טיפ Foundterra:",
  conversion: "גם מבנה דק מבריק לא שווה בלי ביצוע ברמה עולמית.",
  cta: "Build It With Foundterra — קבעו שיחת אסטרטגיה חינם →",
  modalTitle: "לאן לשלוח את התוכנית?",
  modalBody: "השאירו אימייל ונשלח את מסגרת הדק המותאמת שלכם.",
  send: "שלחו לי את התוכנית →",
  cancel: "ביטול",
};

const hebrewNarrativeBySlide: Record<string,string> = {
  TITLE: "שקף פתיחה חד שמייצר אמינות תוך שניות ספורות.",
  PROBLEM: "הציגו את הכאב המרכזי בצורה מדידה וברורה.",
  SOLUTION: "הראו למה הפתרון שלכם הוא ההמשך הטבעי לבעיה.",
  MARKET: "הציגו הזדמנות שוק אמינה עם לוגיקה Bottom-Up.",
  TRACTION: "הדגישו מומנטום וצמיחה לאורך זמן, לא רק צילום מצב.",
  THE_ASK: "בקשו סכום ברור עם אבני דרך מדידות.",
};

const hebrewTipBySlide: Record<string,string> = {
  TITLE: "שמרו על מסר חד וברור עם אמינות חזותית גבוהה.",
  PROBLEM: "הציגו כאב עם מספר אחד וציטוט לקוח אחד.",
  SOLUTION: "המחישו לפני/אחרי בתרשים פשוט וברור.",
  TRACTION: "הציגו מגמה לאורך זמן ולא נקודה בודדת.",
  GTM: "הראו תהליך רכישה של 90 יום עם שלבים מדידים.",
  THE_ASK: "קשרו בין סכום הגיוס לאבני דרך מדידות.",
};

const hebrewSlideTitles: Record<string,string> = {
  TITLE: "שקף פתיחה",
  PROBLEM: "הכאב המרכזי",
  SOLUTION: "הפתרון",
  MARKET: "הזדמנות השוק",
  PRODUCT: "חוויית המוצר",
  TRACTION: "טרקשן",
  BUSINESS_MODEL: "מודל עסקי",
  GTM: "אסטרטגיית GTM",
  GTM_PLG: "מנוע PLG",
  TEAM: "הצוות",
  COMPETITION: "תחרות",
  THE_ASK: "הבקשה",
};

const processingFrames = [
  "Mapping VC Narrative Arcs...",
  "Structuring Vertical-Specific Logic...",
  "Injecting Foundterra Design Principles...",
  "Blueprint Finalized.",
];

const initialParams: Params = {
  stage: "SEED",
  vertical: "AI_NATIVE",
  model: "SUBSCRIPTION",
  moat: "DATA_GRAVITY",
  pmf: "STRONG_GROWTH",
  fmf: "FIRST_TIME",
  traction: "T2D3",
  capital: "STANDARD_SAAS",
  risk: "GTM_RISK",
  investor: "TIER1_VC",
  advantage: "EXCLUSIVE_DATA",
  thesis: "VENTURE_SCALE",
  team: "TWO_COFOUNDERS",
  geo: "US_ONLY",
};

const DeckArchitect = () => {
  const { content, language } = useLanguage();
  const isHebrew = language === "he";
  const [params, setParams] = useState<Params>(initialParams);
  const [isProcessing, setIsProcessing] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof computeDeckStructure> | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const root = document.documentElement;
      root.style.setProperty("--cursor-x", `${e.clientX}px`);
      root.style.setProperty("--cursor-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    if (!isProcessing) return;
    const ticker = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % (isHebrew ? hebrewUi.processing.length : processingFrames.length));
    }, 750);
    const done = setTimeout(() => {
      setResult(computeDeckStructure(params));
      setIsProcessing(false);
      setFrameIndex(0);
    }, 3000);

    return () => {
      clearInterval(ticker);
      clearTimeout(done);
    };
  }, [isProcessing, params, isHebrew]);

  const onBuild = () => {
    setResult(null);
    setIsProcessing(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0F1C] text-white relative overflow-hidden" dir={isHebrew ? "rtl" : "ltr"}>
      <Helmet>
        <title>Build Your Perfect Pitch Deck — Free Deck Structure Generator | Foundterra</title>
        <meta
          name="description"
          content="The most advanced pitch deck structure generator for 2026. Get a custom slide order, investor narrative logic, and design strategy for your exact startup stage, vertical, and investor profile — free from Foundterra's pitch deck agency."
        />
        <link rel="canonical" href="https://www.foundterra.com/deck-architect" />
      </Helmet>

      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(350px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(124, 58, 237, 0.06), transparent 70%)",
        }}
      />

      <Header />
      <main className="pt-24 pb-16 relative z-10">
        <section className="section-padding">
          <div className="container-max space-y-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif text-4xl sm:text-6xl leading-tight mb-4">
                {isHebrew ? (<>בנו את <span className="text-[#7C3AED]">הדק המושלם שלכם!</span></>) : (<>Build Your <span className="text-[#7C3AED]">Perfect Pitch Deck!</span></>)}
              </h1>
              <p className="text-[#C4C9E2] text-base sm:text-lg max-w-3xl mx-auto">
                {isHebrew ? hebrewUi.subtitle : "Answer 14 questions. Get the exact slide order, narrative logic, and design strategy investors expect from a unicorn startup in 60 seconds."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {paramConfig.map((param) => (
                <div key={param.key} className="rounded-xl border border-[rgba(124,58,237,0.2)] bg-[#13162A] p-4">
                  <p className="font-mono text-xs tracking-wider uppercase text-[#A78BFA] mb-3">{isHebrew ? (hebrewParamLabels[param.key] ?? param.label) : param.label}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {param.options.map((option) => {
                      const selected = params[param.key] === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setParams((prev) => ({ ...prev, [param.key]: option.value }))}
                          className={`rounded-lg border px-3 py-2 text-left text-sm transition-all duration-150 ${
                            selected
                              ? "border-[rgba(124,58,237,0.8)] bg-[#1A1E35] shadow-[0_0_12px_rgba(124,58,237,0.4)] scale-[0.98]"
                              : "border-[rgba(124,58,237,0.2)] bg-[#13162A] hover:bg-[#1A1E35]"
                          }`}
                        >
                          <span className="text-[#C4C9E2]">{isHebrew ? (hebrewOptionLabels[option.value] ?? option.label) : option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={onBuild}
                className="bg-[#7C3AED] hover:bg-[#6d28d9] text-white uppercase tracking-wider font-bold px-8 py-6"
              >
                {isHebrew ? hebrewUi.build : "Build My Perfect Deck"}
              </Button>
            </div>

            {isProcessing && (
              <div className="rounded-xl border border-[rgba(124,58,237,0.25)] bg-[#13162A] p-8 text-center">
                <div className="mx-auto mb-4 h-28 w-28 rounded-full animate-pulse" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.55), rgba(124,58,237,0.06))" }} />
                <p className="font-mono text-[#C4C9E2] text-lg">{isHebrew ? hebrewUi.processing[frameIndex] : processingFrames[frameIndex]}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {result.slides.map((slide, idx) => (
                  <article key={slide.id} className="rounded-xl border border-[rgba(124,58,237,0.2)] bg-[#13162A] p-6">
                    <p className="font-mono text-xs text-[#7C3AED] mb-1">{isHebrew ? `${hebrewUi.slidePrefix} ${idx + 1}: ${slide.label}` : `Slide ${idx + 1}: ${slide.label}`}</p>
                    <h3 className="text-xl font-semibold mb-2">{isHebrew ? (hebrewSlideTitles[slide.id] ?? slide.title) : slide.title}</h3>
                    {slide.ruleApplied && (
                      <span className="inline-block rounded-full px-3 py-1 text-xs mb-3 bg-[rgba(245,158,11,0.1)] text-[#F59E0B]">
                        {slide.ruleApplied}
                      </span>
                    )}
                    <div>
                      <p className="font-mono text-[10px] text-[#6B7280] tracking-widest mb-2">{isHebrew ? hebrewUi.narrativeGoal : "NARRATIVE GOAL"}</p>
                      <p className="text-[#C4C9E2] text-sm mb-4">{isHebrew ? (hebrewNarrativeBySlide[slide.id] ?? "הגדירו את מטרת השקף כך שתוביל את המשקיע לצעד הבא.") : slide.narrativeGoal}</p>
                      <div className="rounded-lg border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] p-4">
                        <p className="text-[#10B981] text-xs font-semibold mb-1">{isHebrew ? hebrewUi.tip : "Foundterra Tip:"}</p>
                        <p className="text-[#C4C9E2] text-sm">{isHebrew ? (hebrewTipBySlide[slide.id] ?? "שמרו על מסר אחד חד וברור עם הוכחה תומכת.") : slide.designInsight}</p>
                      </div>
                    </div>
                  </article>
                ))}

                <section className="rounded-xl border border-[rgba(124,58,237,0.2)] bg-[#1A1E35] p-6">
                  <h2 className="font-serif text-2xl mb-3">
                    {isHebrew ? <>מבנה דק מבריק ל<span className="text-[#7C3AED]">{isHebrew ? (hebrewOptionLabels[params.vertical] ?? verticalLabelMap[params.vertical]) : verticalLabelMap[params.vertical]}</span> לא שווה בלי ביצוע ברמה עולמית.</> : <>A brilliant <span className="text-[#7C3AED]">{verticalLabelMap[params.vertical]}</span> deck structure is useless without world-class execution.</>}
                  </h2>
                  <p className="text-[#C4C9E2] mb-4">{isHebrew ? "קיבלתם מסגרת נרטיבית מותאמת אישית. עכשיו צריך להפוך אותה לדק שעובר בדיקת משקיע תוך דקות — עם נרטיב, עיצוב ומודל פיננסי מדויקים." : result.conversionCopy.body}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="bg-[#7C3AED] hover:bg-[#6d28d9] text-white uppercase tracking-wider font-bold px-6 py-6"
                      onClick={() => window.open(content.cta.calendlyLink, "_blank", "noopener,noreferrer")}
                    >
                      {isHebrew ? hebrewUi.cta : "Build It With Foundterra — Book Your Free Strategy Session →"}
                    </Button>
                  </div>
                </section>
              </div>
            )}
          </div>
        </section>
      </main>

      {showEmailModal && (
        <div className="fixed inset-0 bg-[rgba(13,15,28,0.95)] z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl border border-[rgba(124,58,237,0.35)] bg-[#13162A] p-6">
            <h3 className="font-serif text-2xl mb-2">{isHebrew ? hebrewUi.modalTitle : "Where should we send your blueprint?"}</h3>
            <p className="text-sm text-[#C4C9E2] mb-4">{isHebrew ? hebrewUi.modalBody : "Enter your email and we'll deliver your personalized deck framework."}</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@company.com"
              className="w-full rounded-lg border border-[rgba(124,58,237,0.35)] bg-[#0D0F1C] px-3 py-2 text-sm mb-4"
            />
            <div className="flex gap-2">
              <Button className="flex-1 bg-[#7C3AED] hover:bg-[#6d28d9]" onClick={() => setShowEmailModal(false)}>
                {isHebrew ? hebrewUi.send : "Send My Blueprint →"}
              </Button>
              <Button variant="outline" className="border-[#7C3AED] text-[#A78BFA]" onClick={() => setShowEmailModal(false)}>
                {isHebrew ? hebrewUi.cancel : "Cancel"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <RelatedServices />
      <Footer />
    </div>
  );
};

export default DeckArchitect;
