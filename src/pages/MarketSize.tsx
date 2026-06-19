import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedServices from "@/components/RelatedServices";
import { useLanguage } from "@/hooks/useLanguage";

type BusinessType = "b2b_saas" | "b2c" | "marketplace" | "ecommerce" | "deeptech" | "services";
type Approach = "bottom_up" | "top_down";

type Inputs = {
  arpa_monthly: number;
  contract_length: number;
  arpu_monthly: number;
  ltv_months: number;
  gmv_per_transaction: number;
  take_rate: number;
  transactions_per_user_year: number;
  aov: number;
  orders_per_year: number;
  gross_margin: number;
  deal_size: number;
  avg_project_value: number;
  tam_companies: number;
  tam_population: number;
  tam_penetration_assumption: number;
  sam_pct_of_tam: number;
  team_size_sales: number;
  deals_per_rep_year: number;
  growth_rate_annual: number;
  years_to_project: number;
  som_pct_override: number;
  som_manual_override: boolean;
  market_category: string;
  company_name: string;
  icp_description: string;
  unfair_advantage: string;
  stage: "Pre-Seed" | "Seed" | "Series A" | "Series B";
  currency: "USD" | "EUR" | "GBP" | "ILS";
  market_growth_rate: number;
  total_market_value: number;
  target_segment_pct: number;
  expected_market_share_pct: number;
};

const defaultInputs: Inputs = {
  arpa_monthly: 500,
  contract_length: 12,
  arpu_monthly: 12,
  ltv_months: 18,
  gmv_per_transaction: 200,
  take_rate: 12,
  transactions_per_user_year: 4,
  aov: 75,
  orders_per_year: 3,
  gross_margin: 45,
  deal_size: 250000,
  avg_project_value: 60000,
  tam_companies: 500000,
  tam_population: 500000000,
  tam_penetration_assumption: 15,
  sam_pct_of_tam: 20,
  team_size_sales: 2,
  deals_per_rep_year: 24,
  growth_rate_annual: 80,
  years_to_project: 3,
  som_pct_override: 7,
  som_manual_override: false,
  market_category: "",
  company_name: "",
  icp_description: "",
  unfair_advantage: "",
  stage: "Seed",
  currency: "USD",
  market_growth_rate: 18,
  total_market_value: 2_000_000_000,
  target_segment_pct: 12,
  expected_market_share_pct: 6,
};

const translations = {
  en: {
    title: "Free TAM SAM SOM Calculator — Foundterra",
    heroTitle: "Build Your Market Size — The Way Investors Want to See It",
    heroSubtitle:
      "Build a credible bottom-up TAM/SAM/SOM model and generate an investor-ready market narrative.",
    bottomUp: "Bottom-Up ✓ (Recommended)",
    topDown: "Top-Down",
    warning:
      "⚠ Top-down sizing is the most common investor red flag. Bottom-up gives you a defensible number.",
    step1: "Step 1: Your Customer",
    step2: "Step 2: Your Market",
    step3: "Step 3: Your Context",
    next: "Next →",
    calculate: "Calculate",
    back: "← Back",
    output: "Your Market Opportunity",
    narrative: "Market Narrative",
    ctaTitle: "Your Market Is Defined. Now Let's Build the Deck.",
    ctaBody:
      "A market slide is only as strong as the story it lives inside. Our team takes your numbers and turns them into a pitch deck investors actually want to read.",
    book: "Book Free Consultation",
    packages: "View Packages",
  },
  he: {
    title: "מחשבון TAM SAM SOM חינמי — Foundterra",
    heroTitle: "בנה את גודל השוק שלך — כפי שמשקיעים רוצים לראות",
    heroSubtitle: "בנה מודל TAM/SAM/SOM אמין מלמטה למעלה וצור נרטיב שוק מוכן למשקיעים.",
    bottomUp: "מלמטה למעלה ✓ (מומלץ)",
    topDown: "מלמעלה למטה",
    warning: "⚠ גודל שוק מלמעלה למטה הוא דגל האזהרה הנפוץ ביותר אצל משקיעים.",
    step1: "שלב 1: הלקוח שלך",
    step2: "שלב 2: השוק שלך",
    step3: "שלב 3: הקשר",
    next: "הבא ←",
    calculate: "חשב",
    back: "→ חזרה",
    output: "הזדמנות השוק שלך",
    narrative: "נרטיב השוק",
    ctaTitle: "השוק שלך מוגדר. עכשיו בוא נבנה את המצגת.",
    ctaBody: "שקף שוק חזק חייב לחיות בתוך סיפור. אנחנו הופכים את המספרים שלך למצגת שמשקיעים רוצים לקרוא.",
    book: "קבע ייעוץ חינמי",
    packages: "צפה בחבילות",
  },
} as const;

const formatValue = (val: number, currency: Inputs["currency"]) => {
  const symbols = { USD: "$", EUR: "€", GBP: "£", ILS: "₪" };
  const sym = symbols[currency] || "$";
  if (val >= 1_000_000_000) return `${sym}${(val / 1_000_000_000).toFixed(1)}B`;
  if (val >= 1_000_000) return `${sym}${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `${sym}${(val / 1_000).toFixed(0)}K`;
  return `${sym}${val.toFixed(0)}`;
};

const MarketSize = () => {
  const { language, setLanguage, content } = useLanguage();
  const location = useLocation();
  const lang = language === "he" ? "he" : "en";
  const t = translations[lang];

  const [businessType, setBusinessType] = useState<BusinessType>("b2b_saas");
  const [approach, setApproach] = useState<Approach>("bottom_up");
  const [currentStage, setCurrentStage] = useState(1);
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);

  useEffect(() => {
    if (location.pathname.startsWith("/he/") && language !== "he") setLanguage("he");
  }, [language, location.pathname, setLanguage]);

  const getUnitAnnualValue = useCallback(() => {
    switch (businessType) {
      case "b2b_saas":
        return inputs.arpa_monthly * 12;
      case "b2c":
        return inputs.arpu_monthly * 12;
      case "marketplace":
        return inputs.gmv_per_transaction * (inputs.take_rate / 100) * inputs.transactions_per_user_year;
      case "ecommerce":
        return inputs.aov * inputs.orders_per_year * (inputs.gross_margin / 100);
      case "deeptech":
        return inputs.deal_size;
      case "services":
        return inputs.avg_project_value;
      default:
        return 0;
    }
  }, [businessType, inputs]);

  const results = useMemo(() => {
    const unit = getUnitAnnualValue();
    if (approach === "top_down") {
      const tamValue = Math.max(0, inputs.total_market_value);
      const samValue = tamValue * (inputs.target_segment_pct / 100);
      const somValue = samValue * (inputs.expected_market_share_pct / 100);
      const tamCustomers = unit > 0 ? Math.round(tamValue / unit) : 0;
      const samCustomers = unit > 0 ? Math.round(samValue / unit) : 0;
      const somCustomers = unit > 0 ? Math.round(somValue / unit) : 0;

      return {
        unit,
        tamCustomers,
        samCustomers,
        somCustomers,
        tamValue,
        samValue,
        somValue,
        samTamRatio: tamValue > 0 ? (samValue / tamValue) * 100 : 0,
        somSamRatio: samValue > 0 ? (somValue / samValue) * 100 : 0,
      };
    }

    const tamCustomers = businessType === "b2c"
      ? Math.round(inputs.tam_population * (inputs.tam_penetration_assumption / 100))
      : inputs.tam_companies;
    const tamValue = tamCustomers * unit;

    const samCustomers = Math.round(tamCustomers * (inputs.sam_pct_of_tam / 100));
    const samValue = samCustomers * unit;

    const year1Customers = inputs.team_size_sales * inputs.deals_per_rep_year;
    const somByCapacity = Math.round(year1Customers * Math.pow(1 + inputs.growth_rate_annual / 100, Math.max(0, inputs.years_to_project - 1)));
    const somCustomers = inputs.som_manual_override
      ? Math.round(samCustomers * (inputs.som_pct_override / 100))
      : somByCapacity;
    const somValue = somCustomers * unit;

    return {
      unit,
      tamCustomers,
      samCustomers,
      somCustomers,
      tamValue,
      samValue,
      somValue,
      samTamRatio: tamValue > 0 ? (samValue / tamValue) * 100 : 0,
      somSamRatio: samValue > 0 ? (somValue / samValue) * 100 : 0,
    };
  }, [approach, getUnitAnnualValue, businessType, inputs]);

  const formulas = useMemo(() => {
    if (approach === "top_down") {
      return [
        `TAM = Total Market Value = ${formatValue(inputs.total_market_value, inputs.currency)}`,
        `SAM = TAM × Target Segment % = ${formatValue(results.tamValue, inputs.currency)} × ${inputs.target_segment_pct}% = ${formatValue(results.samValue, inputs.currency)}`,
        `SOM = SAM × Expected Share % = ${formatValue(results.samValue, inputs.currency)} × ${inputs.expected_market_share_pct}% = ${formatValue(results.somValue, inputs.currency)}`,
      ];
    }

    return [
      `Unit Annual Value = ${formatValue(results.unit, inputs.currency)}`,
      `TAM = ${results.tamCustomers.toLocaleString()} × ${formatValue(results.unit, inputs.currency)} = ${formatValue(results.tamValue, inputs.currency)}`,
      `SAM = TAM × ${inputs.sam_pct_of_tam}% = ${formatValue(results.samValue, inputs.currency)}`,
      `SOM = ${inputs.som_manual_override ? `SAM × ${inputs.som_pct_override}%` : `Capacity Model (${inputs.team_size_sales} × ${inputs.deals_per_rep_year} × Growth)`} = ${formatValue(results.somValue, inputs.currency)}`,
    ];
  }, [approach, inputs, results]);

  const samVisualWidth = Math.min(88, Math.max(62, 62 + results.samTamRatio * 0.4));
  const somVisualWidth = Math.min(
    samVisualWidth - 10,
    Math.max(44, 44 + results.somSamRatio * 1.1),
  );

  const narrative = useMemo(() => {
    if (lang === "he") {
      return `${inputs.company_name || "החברה שלנו"} פועלת בשוק ה-${inputs.market_category || "מתפתח"}, ומכוונת ל-${inputs.icp_description || "לקוחות עם נקודת כאב ברורה"}. TAM מוערך ב-${formatValue(results.tamValue, inputs.currency)} בהתבסס על ${results.tamCustomers.toLocaleString()} לקוחות פוטנציאליים וערך שנתי של ${formatValue(results.unit, inputs.currency)} ללקוח. ה-SAM מוערך ב-${formatValue(results.samValue, inputs.currency)}, וה-SOM ב-${formatValue(results.somValue, inputs.currency)} ל-${inputs.years_to_project} שנים.`;
    }
    return `${inputs.company_name || "Our company"} operates in the ${inputs.market_category || "emerging"} market, targeting ${inputs.icp_description || "customers with a clear pain point"}. TAM is estimated at ${formatValue(results.tamValue, inputs.currency)} from ${results.tamCustomers.toLocaleString()} potential customers and ${formatValue(results.unit, inputs.currency)} annual value per customer. SAM is ${formatValue(results.samValue, inputs.currency)}, and SOM is ${formatValue(results.somValue, inputs.currency)} over ${inputs.years_to_project} years.`;
  }, [inputs, lang, results]);

  const setNum = (key: keyof Inputs, value: string) => setInputs((prev) => ({ ...prev, [key]: Number(value) || 0 }));

  const exportCSV = () => {
    const rows = [
      ["Company", inputs.company_name || "N/A"],
      ["Business Type", businessType],
      ["TAM", results.tamValue],
      ["SAM", results.samValue],
      ["SOM", results.somValue],
      ["TAM Customers", results.tamCustomers],
      ["SAM Customers", results.samCustomers],
      ["SOM Customers", results.somCustomers],
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${inputs.company_name || "market-size"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white" dir={lang === "he" ? "rtl" : "ltr"}>
      <Helmet>
        <title>{lang === "he" ? "מחשבון TAM/SAM/SOM לסטארטאפים | Foundterra" : "TAM SAM SOM Calculator for Startup Founders | Foundterra"}</title>
        <meta name="description" content={t.heroSubtitle} />
        <link rel="canonical" href={lang === "he" ? "https://www.foundterra.com/he/market-size" : "https://www.foundterra.com/market-size"} />
      </Helmet>
      <Header />

      <main className="pt-28 sm:pt-24 pb-16">
        <section className="container-max px-4 mb-12">
          <h1 className="text-3xl md:text-5xl font-serif mb-3">{t.heroTitle}</h1>
          <p className="text-muted-foreground max-w-4xl">{t.heroSubtitle}</p>
        </section>

        <section className="container-max px-4 grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 border border-[rgba(123,82,245,0.3)] bg-[#12121F] p-5">
            <div className="flex flex-wrap gap-2">
              {([
                ["b2b_saas", "B2B SaaS", "B2B SaaS"],
                ["b2c", "B2C / Consumer", "B2C / צרכני"],
                ["marketplace", "Marketplace", "מרקטפלייס"],
                ["ecommerce", "E-Commerce / D2C", "מסחר אלקטרוני"],
                ["deeptech", "Deep Tech / Biotech", "טכנולוגיה עמוקה / ביוטק"],
                ["services", "Agency / Services", "סוכנות / שירותים"],
              ] as const).map(([key, en, he]) => (
                <button key={key} onClick={() => setBusinessType(key)} className={`px-3 py-2 text-xs border ${businessType === key ? "bg-[#7B52F5] border-[#7B52F5]" : "border-[#2A2A45]"}`}>
                  {lang === "he" ? he : en}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button className={`px-3 py-2 text-sm border ${approach === "bottom_up" ? "bg-[#7B52F5] border-[#7B52F5]" : "border-[#2A2A45]"}`} onClick={() => setApproach("bottom_up")}>{t.bottomUp}</button>
              <button className={`px-3 py-2 text-sm border ${approach === "top_down" ? "bg-[#7B52F5] border-[#7B52F5]" : "border-[#2A2A45]"}`} onClick={() => setApproach("top_down")}>{t.topDown}</button>
            </div>

            {approach === "top_down" && <div className="text-amber-300 text-sm border border-amber-500/50 p-3">{t.warning}</div>}

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className={currentStage === 1 ? "text-white" : ""}>{t.step1}</span>
              <span>→</span>
              <span className={currentStage === 2 ? "text-white" : ""}>{t.step2}</span>
              <span>→</span>
              <span className={currentStage === 3 ? "text-white" : ""}>{t.step3}</span>
            </div>

            {currentStage === 1 && (
              <div className="grid md:grid-cols-2 gap-3">
                {businessType === "b2b_saas" && <label className="text-sm">ARPA / Month<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.arpa_monthly} onChange={(e) => setNum("arpa_monthly", e.target.value)} /></label>}
                {businessType === "b2c" && <label className="text-sm">ARPU / Month<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.arpu_monthly} onChange={(e) => setNum("arpu_monthly", e.target.value)} /></label>}
                {businessType === "marketplace" && <>
                  <label className="text-sm">Avg GMV / Transaction<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.gmv_per_transaction} onChange={(e) => setNum("gmv_per_transaction", e.target.value)} /></label>
                  <label className="text-sm">Take Rate %<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.take_rate} onChange={(e) => setNum("take_rate", e.target.value)} /></label>
                </>}
                {businessType === "ecommerce" && <>
                  <label className="text-sm">AOV<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.aov} onChange={(e) => setNum("aov", e.target.value)} /></label>
                  <label className="text-sm">Gross Margin %<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.gross_margin} onChange={(e) => setNum("gross_margin", e.target.value)} /></label>
                </>}
                {businessType === "deeptech" && <label className="text-sm">Average Deal Size<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.deal_size} onChange={(e) => setNum("deal_size", e.target.value)} /></label>}
                {businessType === "services" && <label className="text-sm">Avg Annual Client Value<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.avg_project_value} onChange={(e) => setNum("avg_project_value", e.target.value)} /></label>}
                <label className="text-sm">ICP / User Description<select className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" value={inputs.icp_description} onChange={(e) => setInputs((p) => ({ ...p, icp_description: e.target.value }))}><option value="">Select ICP</option><option value="SMBs with high churn pain">SMBs with high churn pain</option><option value="Mid-market teams with manual workflows">Mid-market teams with manual workflows</option><option value="Enterprises with compliance pressure">Enterprises with compliance pressure</option><option value="Consumers making repeat monthly purchases">Consumers making repeat monthly purchases</option></select></label>
              </div>
            )}

            {currentStage === 2 && (
              <div className="grid md:grid-cols-2 gap-3">
                {approach === "top_down" ? (
                  <>
                    <label className="text-sm">Total Market Value<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" min={0} value={inputs.total_market_value} onChange={(e) => setNum("total_market_value", e.target.value)} /></label>
                    <label className="text-sm">Target Segment %<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" min={0} max={100} value={inputs.target_segment_pct} onChange={(e) => setNum("target_segment_pct", e.target.value)} /></label>
                    <label className="text-sm">Expected Market Share %<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" min={0} max={100} value={inputs.expected_market_share_pct} onChange={(e) => setNum("expected_market_share_pct", e.target.value)} /></label>
                  </>
                ) : businessType === "b2c" ? (
                  <>
                    <label className="text-sm">TAM Population<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.tam_population} onChange={(e) => setNum("tam_population", e.target.value)} /></label>
                    <label className="text-sm">Addressable %<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.tam_penetration_assumption} onChange={(e) => setNum("tam_penetration_assumption", e.target.value)} /></label>
                  </>
                ) : (
                  <label className="text-sm">TAM Customers/Companies<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.tam_companies} onChange={(e) => setNum("tam_companies", e.target.value)} /></label>
                )}
                {approach === "bottom_up" && (
                  <>
                    <label className="text-sm">SAM % of TAM<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.sam_pct_of_tam} onChange={(e) => setNum("sam_pct_of_tam", e.target.value)} /></label>
                    <label className="text-sm">Sales Team Size<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.team_size_sales} onChange={(e) => setNum("team_size_sales", e.target.value)} /></label>
                    <label className="text-sm">Deals per Rep / Year<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.deals_per_rep_year} onChange={(e) => setNum("deals_per_rep_year", e.target.value)} /></label>
                    <label className="text-sm">Growth Rate Annual %<input className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" type="number" value={inputs.growth_rate_annual} onChange={(e) => setNum("growth_rate_annual", e.target.value)} /></label>
                  </>
                )}
              </div>
            )}

            {currentStage === 3 && (
              <div className="grid md:grid-cols-2 gap-3">
                <label className="text-sm">Company Name<select className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" value={inputs.company_name} onChange={(e) => setInputs((p) => ({ ...p, company_name: e.target.value }))}><option value="">Select company profile</option><option value="Stealth Startup">Stealth Startup</option><option value="Growth Startup">Growth Startup</option><option value="Enterprise Challenger">Enterprise Challenger</option></select></label>
                <label className="text-sm">Market Category<select className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" value={inputs.market_category} onChange={(e) => setInputs((p) => ({ ...p, market_category: e.target.value }))}><option value="">Select market</option><option value="Vertical SaaS">Vertical SaaS</option><option value="Fintech">Fintech</option><option value="Healthtech">Healthtech</option><option value="AI Infrastructure">AI Infrastructure</option><option value="Consumer Subscription">Consumer Subscription</option></select></label>
                <label className="text-sm">Unfair Advantage<select className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" value={inputs.unfair_advantage} onChange={(e) => setInputs((p) => ({ ...p, unfair_advantage: e.target.value }))}><option value="">Select advantage</option><option value="Exclusive proprietary data">Exclusive proprietary data</option><option value="Distribution partnerships">Distribution partnerships</option><option value="Deep domain expertise">Deep domain expertise</option><option value="Regulatory moat">Regulatory moat</option></select></label>
                <label className="text-sm">Currency<select className="w-full mt-1 bg-[#16162A] border border-[#2A2A45] p-2" value={inputs.currency} onChange={(e) => setInputs((p) => ({ ...p, currency: e.target.value as Inputs["currency"] }))}><option>USD</option><option>EUR</option><option>GBP</option><option>ILS</option></select></label>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <button className="px-4 py-2 border border-[#2A2A45] disabled:opacity-40 w-full sm:w-auto" onClick={() => setCurrentStage((s) => Math.max(1, s - 1))} disabled={currentStage === 1}>{t.back}</button>
              <button
                className="px-4 py-2 bg-[#7B52F5] w-full sm:w-auto"
                onClick={() => {
                  if (currentStage < 3) {
                    setCurrentStage((s) => Math.min(3, s + 1));
                    return;
                  }
                  document.getElementById("market-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {currentStage < 3 ? t.next : t.calculate}
              </button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 border border-[#2A2A45] bg-[#12121F] p-5 space-y-4">
            <div className="space-y-3">
              <div
                className="h-28 md:h-32 mx-auto flex flex-col items-center justify-center text-center px-5"
                style={{
                  width: "100%",
                  clipPath: "polygon(0% 0%, 100% 0%, 82% 100%, 18% 100%)",
                  background: "linear-gradient(135deg,#7B52F5,#6A3EE8)",
                  boxShadow: "0 0 20px rgba(123,82,245,0.22)",
                }}
              >
                <span className="text-[11px] tracking-[0.16em] uppercase text-white/85">TAM</span>
                <strong className="font-mono text-2xl md:text-3xl leading-none mt-2">{formatValue(results.tamValue, inputs.currency)}</strong>
              </div>

              <div
                className="h-24 md:h-28 mx-auto flex flex-col items-center justify-center text-center px-5 transition-all duration-500"
                style={{
                  width: `${samVisualWidth}%`,
                  clipPath: "polygon(0% 0%, 100% 0%, 84% 100%, 16% 100%)",
                  background: "linear-gradient(135deg,#A07CF8,#8A64F7)",
                  boxShadow: "0 0 16px rgba(160,124,248,0.2)",
                }}
              >
                <span className="text-[11px] tracking-[0.16em] uppercase text-white/80">SAM</span>
                <strong className="font-mono text-xl md:text-2xl leading-none mt-2">{formatValue(results.samValue, inputs.currency)}</strong>
              </div>

              <div
                className="h-20 md:h-24 mx-auto flex flex-col items-center justify-center text-center px-5 transition-all duration-500"
                style={{
                  width: `${somVisualWidth}%`,
                  clipPath: "polygon(0% 0%, 100% 0%, 86% 100%, 14% 100%)",
                  background: "linear-gradient(135deg,#C9B0FB,#A994F9)",
                  boxShadow: "0 0 14px rgba(201,176,251,0.2)",
                }}
              >
                <span className="text-[11px] tracking-[0.16em] uppercase text-[#2A214A]">SOM</span>
                <strong className="font-mono text-lg md:text-xl leading-none mt-2 text-[#1B1438]">{formatValue(results.somValue, inputs.currency)}</strong>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="border border-[#2A2A45] p-2"><p>SAM/TAM</p><strong>{results.samTamRatio.toFixed(1)}%</strong></div>
              <div className="border border-[#2A2A45] p-2"><p>SOM/SAM</p><strong>{results.somSamRatio.toFixed(1)}%</strong></div>
              <div className="border border-[#2A2A45] p-2"><p>Growth</p><strong>+{inputs.market_growth_rate}%</strong></div>
            </div>
          </aside>
        </section>

        <section id="market-results" className="container-max px-4 mt-10">
          <h2 className="text-2xl font-serif mb-3">{t.output}</h2>
          <div className="border border-[#2A2A45] p-5 bg-[#12121F] mb-4">
            <h3 className="font-semibold mb-2">{t.narrative}</h3>
            <p className="text-muted-foreground leading-relaxed">{narrative}</p>
          </div>
          <div className="border border-[#2A2A45] p-5 bg-[#12121F] mb-4">
            <h3 className="font-semibold mb-2">Calculation Formula</h3>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5 break-words">
              {formulas.map((formula) => (
                <li key={formula}>{formula}</li>
              ))}
            </ul>
          </div>
          <button className="px-4 py-2 bg-[#7B52F5] mr-2" onClick={exportCSV}>Export Data (CSV)</button>
        </section>

        <section className="container-max px-4 mt-10">
          <div className="border border-[#7B52F5] p-8 bg-[#12121F]">
            <h3 className="text-2xl font-serif mb-2">{t.ctaTitle}</h3>
            <p className="text-muted-foreground mb-4">{t.ctaBody}</p>
            <div className="flex gap-3 flex-wrap">
              <button className="px-4 py-2 bg-[#7B52F5]" onClick={() => window.open(content.cta.calendlyLink, "_blank")}>{t.book}</button>
              <button className="px-4 py-2 border border-[#2A2A45]" onClick={() => (window.location.href = "/#packages")}>{t.packages}</button>
            </div>
          </div>
        </section>
      </main>

      <RelatedServices />
      <Footer />
    </div>
  );
};

export default MarketSize;
