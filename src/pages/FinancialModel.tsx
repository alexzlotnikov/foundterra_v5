import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedServices from "@/components/RelatedServices";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

type ModelKey = "saas" | "ecommerce" | "marketplace" | "agency";

type InputConfig = {
  key: string;
  unit: "$" | "%" | "num";
  defaultValue: number;
};

type Metric = { key: string; label: string; value: string; status: "healthy" | "warning" | "critical" };

type ProjectionRow = Record<string, number | string>;

const translations = {
  en: {
    title: "Free Startup Financial Model Calculator",
    metaDescription:
      "Build your startup's financial model in minutes. Calculate LTV:CAC, CAC payback, runway, and 12-month projections for SaaS, e-commerce, marketplace, and agency startups.",
    hero: "Build Your Startup's Financial Model",
    subtitle:
      "Input your metrics and instantly see unit economics, health indicators, and 12-month projections.",
    inputs: "Your Metrics",
    outputs: "Results",
    projections: "12-Month Projections",
    export: "Export Projections as CSV",
    health: "Health Score",
    healthExcellent: "Investor-Ready Fundamentals",
    healthGood: "Solid foundation, a few areas to improve",
    healthFair: "Key metrics need attention before fundraising",
    healthPoor: "Critical issues — prioritize fixing burn & unit economics",
    healthy: "Healthy",
    warning: "Warning",
    critical: "Critical",
    seeResults: "See Results",
    ready: "Ready to present this to investors?",
    readyText:
      "This tool gives you the numbers — we give you the full picture. Our team builds investor-grade financial models, pitch decks, and data rooms that get you meetings.",
    book: "Book Free Consultation",
    viewPackages: "View Packages",
    model_saas: "SaaS / Subscription",
    model_ecommerce: "E-Commerce / D2C",
    model_marketplace: "Marketplace",
    model_agency: "Agency / Services",
  },
  he: {
    title: "מחשבון מודל פיננסי לסטארטאפ",
    metaDescription:
      "בנה את המודל הפיננסי של הסטארטאפ שלך בדקות. חשב יחס LTV:CAC, החזר CAC, runway ותחזיות ל-12 חודשים — בחינם.",
    hero: "בנה את המודל הפיננסי של הסטארטאפ שלך",
    subtitle: "הזן את המדדים שלך וקבל מיד כלכלת יחידה, אינדיקטורי בריאות ותחזיות ל-12 חודשים.",
    inputs: "המדדים שלך",
    outputs: "תוצאות",
    projections: "תחזיות ל-12 חודשים",
    export: "ייצוא תחזיות כ-CSV",
    health: "ציון בריאות",
    healthExcellent: "יסודות מוכנים למשקיעים",
    healthGood: "בסיס טוב, כמה נקודות לשיפור",
    healthFair: "מדדים מרכזיים דורשים תשומת לב לפני גיוס",
    healthPoor: "בעיות קריטיות — תעדוף: שריפת מזומנים וכלכלת יחידה",
    healthy: "תקין",
    warning: "אזהרה",
    critical: "קריטי",
    seeResults: "לתוצאות",
    ready: "מוכן להציג למשקיעים?",
    readyText:
      "הכלי נותן לך את המספרים — אנחנו נותנים את התמונה המלאה. הצוות שלנו בונה מודלים פיננסיים, מצגות ומרחבי נתונים שמביאים פגישות.",
    book: "קבע ייעוץ חינמי",
    viewPackages: "צפה בחבילות",
    model_saas: "SaaS / מנוי",
    model_ecommerce: "מסחר אלקטרוני",
    model_marketplace: "מרקטפלייס",
    model_agency: "סוכנות / שירותים",
  },
} as const;

const inputConfigs: Record<ModelKey, InputConfig[]> = {
  saas: [
    { key: "mrr", unit: "$", defaultValue: 10000 },
    { key: "mom_growth", unit: "%", defaultValue: 10 },
    { key: "arpu", unit: "$", defaultValue: 99 },
    { key: "cac", unit: "$", defaultValue: 400 },
    { key: "churn_rate", unit: "%", defaultValue: 3 },
    { key: "gross_margin", unit: "%", defaultValue: 75 },
    { key: "burn_rate", unit: "$", defaultValue: 30000 },
    { key: "cash_balance", unit: "$", defaultValue: 200000 },
  ],
  ecommerce: [
    { key: "monthly_revenue", unit: "$", defaultValue: 50000 },
    { key: "mom_growth", unit: "%", defaultValue: 8 },
    { key: "aov", unit: "$", defaultValue: 85 },
    { key: "cac", unit: "$", defaultValue: 35 },
    { key: "repeat_purchase_rate", unit: "%", defaultValue: 25 },
    { key: "cogs_percent", unit: "%", defaultValue: 40 },
    { key: "return_rate", unit: "%", defaultValue: 8 },
    { key: "burn_rate", unit: "$", defaultValue: 45000 },
    { key: "cash_balance", unit: "$", defaultValue: 150000 },
  ],
  marketplace: [
    { key: "gmv", unit: "$", defaultValue: 200000 },
    { key: "take_rate", unit: "%", defaultValue: 12 },
    { key: "mom_growth", unit: "%", defaultValue: 12 },
    { key: "cac_supply", unit: "$", defaultValue: 120 },
    { key: "cac_demand", unit: "$", defaultValue: 25 },
    { key: "supply_churn", unit: "%", defaultValue: 4 },
    { key: "demand_churn", unit: "%", defaultValue: 5 },
    { key: "gross_margin", unit: "%", defaultValue: 65 },
    { key: "burn_rate", unit: "$", defaultValue: 60000 },
    { key: "cash_balance", unit: "$", defaultValue: 500000 },
  ],
  agency: [
    { key: "monthly_revenue", unit: "$", defaultValue: 40000 },
    { key: "mom_growth", unit: "%", defaultValue: 6 },
    { key: "retainer_revenue", unit: "%", defaultValue: 60 },
    { key: "avg_project_value", unit: "$", defaultValue: 5000 },
    { key: "utilization_rate", unit: "%", defaultValue: 70 },
    { key: "blended_hourly_rate", unit: "$", defaultValue: 150 },
    { key: "cac", unit: "$", defaultValue: 800 },
    { key: "churn_rate", unit: "%", defaultValue: 5 },
    { key: "gross_margin", unit: "%", defaultValue: 55 },
    { key: "burn_rate", unit: "$", defaultValue: 35000 },
    { key: "cash_balance", unit: "$", defaultValue: 120000 },
  ],
};

const fieldLabels: Record<string, { en: string; he: string }> = {
  mrr: { en: "Monthly Recurring Revenue (MRR)", he: "הכנסה חודשית חוזרת (MRR)" },
  mom_growth: { en: "MoM Revenue Growth Rate", he: "שיעור צמיחה חודש-על-חודש" },
  arpu: { en: "Avg Revenue Per User (ARPU)", he: "הכנסה ממוצעת למשתמש (ARPU)" },
  cac: { en: "Customer Acquisition Cost (CAC)", he: "עלות רכישת לקוח (CAC)" },
  churn_rate: { en: "Monthly Churn Rate", he: "שיעור נטישה חודשי" },
  gross_margin: { en: "Gross Margin", he: "שיעור רווח גולמי" },
  burn_rate: { en: "Monthly Burn Rate", he: "שריפת מזומנים חודשית" },
  cash_balance: { en: "Current Cash Balance", he: "יתרת מזומנים נוכחית" },
  monthly_revenue: { en: "Monthly Revenue", he: "הכנסה חודשית" },
  aov: { en: "Average Order Value", he: "ערך הזמנה ממוצע" },
  repeat_purchase_rate: { en: "Repeat Purchase Rate", he: "שיעור רכישה חוזרת" },
  cogs_percent: { en: "COGS as % of Revenue", he: "עלות מכר כאחוז מהכנסות" },
  return_rate: { en: "Return Rate", he: "שיעור החזרות" },
  gmv: { en: "Gross Merchandise Value", he: "שווי סחורה גולמי (GMV)" },
  take_rate: { en: "Take Rate", he: "שיעור עמלה" },
  cac_supply: { en: "CAC — Supply Side", he: "CAC — צד היצע" },
  cac_demand: { en: "CAC — Demand Side", he: "CAC — צד ביקוש" },
  supply_churn: { en: "Supply-Side Monthly Churn", he: "נטישת היצע חודשית" },
  demand_churn: { en: "Demand-Side Monthly Churn", he: "נטישת ביקוש חודשית" },
  retainer_revenue: { en: "% Revenue from Retainers", he: "אחוז הכנסות מריטיינרים" },
  avg_project_value: { en: "Avg Project / Retainer Value", he: "שווי פרויקט / ריטיינר ממוצע" },
  utilization_rate: { en: "Team Utilization Rate", he: "שיעור ניצולת צוות" },
  blended_hourly_rate: { en: "Blended Hourly Rate", he: "תעריף שעתי משוקלל" },
};

const tooltips: Record<string, { en: string; he: string }> = {
  mrr: { en: "Total recurring subscription revenue this month.", he: "סך ההכנסה החוזרת מכל המנויים הפעילים בחודש זה." },
  arpu: { en: "Average monthly revenue per paying customer.", he: "הכנסה חודשית ממוצעת לכל לקוח משלם." },
  cac: { en: "Sales and marketing spend divided by new customers acquired.", he: "סך הוצאות מכירה ושיווק חלקי לקוחות חדשים." },
  churn_rate: { en: "Percent of customers who cancel monthly.", he: "אחוז הלקוחות שמבטלים בכל חודש." },
  gross_margin: { en: "Revenue minus direct costs as a percentage.", he: "הכנסות פחות עלויות ישירות כאחוז מההכנסות." },
  burn_rate: { en: "Total monthly cash outflow.", he: "סך הוצאות המזומן החודשיות." },
  cash_balance: { en: "Cash currently available in the bank.", he: "מזומנים זמינים כרגע בבנק." },
  mom_growth: { en: "Month-over-month growth in revenue/GMV.", he: "צמיחה חודשית בהכנסות/GMV." },
};

const statuses = {
  healthy: { color: "text-emerald-400", dot: "bg-emerald-400" },
  warning: { color: "text-amber-400", dot: "bg-amber-400" },
  critical: { color: "text-red-400", dot: "bg-red-400" },
};

const formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const compactMoney = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(v);
const percent = (v: number) => `${formatter.format(v)}%`;

const toNaturalLabel = (key: string) =>
  key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const getStatus = (value: number, healthy: (n: number) => boolean, warning: (n: number) => boolean): "healthy" | "warning" | "critical" => {
  if (!Number.isFinite(value)) return "critical";
  if (healthy(value)) return "healthy";
  if (warning(value)) return "warning";
  return "critical";
};

const FinancialModel = () => {
  const { language } = useLanguage();
  const lang = language === "he" ? "he" : "en";
  const t = translations[lang];
  const [model, setModel] = useState<ModelKey>("saas");
  const [inputs, setInputs] = useState<Record<string, number>>(() => Object.fromEntries(inputConfigs.saas.map((f) => [f.key, f.defaultValue])));
  const [animating, setAnimating] = useState(false);
  const outputsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const next = Object.fromEntries(inputConfigs[model].map((f) => [f.key, f.defaultValue]));
    setAnimating(true);
    setTimeout(() => {
      setInputs(next);
      setAnimating(false);
    }, 200);
  }, [model]);

  const computed = useMemo(() => {
    const m = (key: string) => Number(inputs[key] ?? 0);
    let metrics: Metric[] = [];
    let heroNumbers: Array<{ label: string; value: string }> = [];
    const projections: ProjectionRow[] = [];

    if (model === "saas") {
      const customers = m("arpu") > 0 ? m("mrr") / m("arpu") : 0;
      const ltv = m("churn_rate") > 0 ? (m("arpu") * (m("gross_margin") / 100)) / (m("churn_rate") / 100) : 0;
      const ltvCac = m("cac") > 0 ? ltv / m("cac") : 0;
      const payback = m("arpu") > 0 ? m("cac") / (m("arpu") * (m("gross_margin") / 100)) : 0;
      const runway = m("burn_rate") > 0 ? m("cash_balance") / m("burn_rate") : 0;
      metrics = [
        { key: "ltv_cac", label: "LTV:CAC", value: `${formatter.format(ltvCac)}x`, status: getStatus(ltvCac, (x) => x >= 3, (x) => x >= 1.5) },
        { key: "payback", label: "CAC Payback", value: `${formatter.format(payback)} mo`, status: getStatus(payback, (x) => x <= 12, (x) => x <= 24) },
        { key: "churn", label: "Monthly Churn", value: percent(m("churn_rate")), status: getStatus(m("churn_rate"), (x) => x <= 2, (x) => x <= 5) },
        { key: "margin", label: "Gross Margin", value: percent(m("gross_margin")), status: getStatus(m("gross_margin"), (x) => x >= 70, (x) => x >= 50) },
        { key: "runway", label: "Runway", value: `${formatter.format(runway)} mo`, status: getStatus(runway, (x) => x >= 18, (x) => x >= 6) },
        { key: "growth", label: "MoM Growth", value: percent(m("mom_growth")), status: getStatus(m("mom_growth"), (x) => x >= 10, (x) => x >= 5) },
      ];
      heroNumbers = [
        { label: "ARR", value: compactMoney(m("mrr") * 12) },
        { label: "LTV:CAC", value: `${formatter.format(ltvCac)}x` },
        { label: "Runway", value: `${formatter.format(runway)} mo` },
      ];

      let currMRR = m("mrr");
      let currCustomers = customers;
      let cash = m("cash_balance");
      for (let month = 1; month <= 12; month++) {
        const nextMRR = currMRR * (1 + m("mom_growth") / 100);
        const newCustomers = m("arpu") > 0 ? (nextMRR - currMRR) / m("arpu") : 0;
        const churned = currCustomers * (m("churn_rate") / 100);
        const totalCustomers = currCustomers + (newCustomers - churned);
        const grossProfit = nextMRR * (m("gross_margin") / 100);
        const netIncome = grossProfit - m("burn_rate");
        cash += netIncome;
        projections.push({ month, revenue: nextMRR, grossProfit, cashBalance: cash, MRR: nextMRR, ARR: nextMRR * 12, totalCustomers, newCustomers, churned, netIncome, cash });
        currMRR = nextMRR;
        currCustomers = totalCustomers;
      }
    }

    if (model === "ecommerce") {
      const grossProfit = m("monthly_revenue") * (1 - m("cogs_percent") / 100) * (1 - m("return_rate") / 100);
      const ltv = m("aov") * (1 / (1 - m("repeat_purchase_rate") / 100)) * (1 - m("cogs_percent") / 100);
      const ltvCac = m("cac") > 0 ? ltv / m("cac") : 0;
      const payback = m("aov") > 0 ? m("cac") / (m("aov") * (1 - m("cogs_percent") / 100)) : 0;
      const runway = m("burn_rate") > grossProfit ? m("cash_balance") / (m("burn_rate") - grossProfit) : 999;
      metrics = [
        { key: "ltv_cac", label: "LTV:CAC", value: `${formatter.format(ltvCac)}x`, status: getStatus(ltvCac, (x) => x >= 3, (x) => x >= 1.5) },
        { key: "payback", label: "CAC Payback", value: `${formatter.format(payback)} mo`, status: getStatus(payback, (x) => x <= 3, (x) => x <= 6) },
        { key: "margin", label: "Gross Margin", value: percent((grossProfit / Math.max(1, m("monthly_revenue"))) * 100), status: getStatus((grossProfit / Math.max(1, m("monthly_revenue"))) * 100, (x) => x >= 40, (x) => x >= 25) },
        { key: "repeat", label: "Repeat Purchase", value: percent(m("repeat_purchase_rate")), status: getStatus(m("repeat_purchase_rate"), (x) => x >= 30, (x) => x >= 15) },
        { key: "runway", label: "Runway", value: runway === 999 ? "Profitable" : `${formatter.format(runway)} mo`, status: getStatus(runway, (x) => x >= 12, (x) => x >= 3) },
        { key: "returns", label: "Return Rate", value: percent(m("return_rate")), status: getStatus(m("return_rate"), (x) => x <= 10, (x) => x <= 20) },
      ];
      heroNumbers = [
        { label: "Annual Revenue", value: compactMoney(m("monthly_revenue") * 12) },
        { label: "LTV:CAC", value: `${formatter.format(ltvCac)}x` },
        { label: "Runway", value: runway === 999 ? "Profitable" : `${formatter.format(runway)} mo` },
      ];
      let revenue = m("monthly_revenue");
      let cash = m("cash_balance");
      for (let month = 1; month <= 12; month++) {
        revenue = revenue * (1 + m("mom_growth") / 100);
        const orders = m("aov") > 0 ? revenue / m("aov") : 0;
        const gp = revenue * (1 - m("cogs_percent") / 100) * (1 - m("return_rate") / 100);
        const netIncome = gp - m("burn_rate");
        cash += netIncome;
        projections.push({ month, revenue, grossProfit: gp, cashBalance: cash, orders, netIncome });
      }
    }

    if (model === "marketplace") {
      const netRevenue = m("gmv") * (m("take_rate") / 100);
      const grossProfit = netRevenue * (m("gross_margin") / 100);
      const ltvDemand = (netRevenue / Math.max(1, m("gmv"))) * (1 / Math.max(0.01, m("demand_churn") / 100));
      const ltvCac = ltvDemand / Math.max(1, m("cac_demand"));
      const runway = m("burn_rate") > 0 ? m("cash_balance") / m("burn_rate") : 0;
      metrics = [
        { key: "take", label: "Take Rate", value: percent(m("take_rate")), status: getStatus(m("take_rate"), (x) => x >= 8 && x <= 20, (x) => x >= 5) },
        { key: "ltv_cac", label: "LTV:CAC (Demand)", value: `${formatter.format(ltvCac)}x`, status: getStatus(ltvCac, (x) => x >= 3, (x) => x >= 1.5) },
        { key: "margin", label: "Gross Margin", value: percent(m("gross_margin")), status: getStatus(m("gross_margin"), (x) => x >= 60, (x) => x >= 40) },
        { key: "demand_churn", label: "Demand Churn", value: percent(m("demand_churn")), status: getStatus(m("demand_churn"), (x) => x <= 5, (x) => x <= 10) },
        { key: "runway", label: "Runway", value: `${formatter.format(runway)} mo`, status: getStatus(runway, (x) => x >= 18, (x) => x >= 6) },
        { key: "growth", label: "MoM GMV Growth", value: percent(m("mom_growth")), status: getStatus(m("mom_growth"), (x) => x >= 10, (x) => x >= 5) },
      ];
      heroNumbers = [
        { label: "Annual Net Revenue", value: compactMoney(netRevenue * 12) },
        { label: "LTV:CAC", value: `${formatter.format(ltvCac)}x` },
        { label: "Runway", value: `${formatter.format(runway)} mo` },
      ];
      let gmv = m("gmv");
      let cash = m("cash_balance");
      for (let month = 1; month <= 12; month++) {
        gmv = gmv * (1 + m("mom_growth") / 100);
        const rev = gmv * (m("take_rate") / 100);
        const gp = rev * (m("gross_margin") / 100);
        const netIncome = gp - m("burn_rate");
        cash += netIncome;
        projections.push({ month, revenue: gmv, grossProfit: gp, cashBalance: cash, gmv, netRevenue: rev, netIncome });
      }
    }

    if (model === "agency") {
      const ltv = m("churn_rate") > 0 ? m("avg_project_value") * (1 / (m("churn_rate") / 100)) * (m("gross_margin") / 100) : 0;
      const ltvCac = ltv / Math.max(1, m("cac"));
      const payback = m("avg_project_value") > 0 ? m("cac") / (m("avg_project_value") * (m("gross_margin") / 100)) : 0;
      const runway = m("burn_rate") > 0 ? m("cash_balance") / m("burn_rate") : 0;
      metrics = [
        { key: "ltv_cac", label: "LTV:CAC", value: `${formatter.format(ltvCac)}x`, status: getStatus(ltvCac, (x) => x >= 4, (x) => x >= 2) },
        { key: "payback", label: "CAC Payback", value: `${formatter.format(payback)} mo`, status: getStatus(payback, (x) => x <= 6, (x) => x <= 12) },
        { key: "retainer", label: "Retainer %", value: percent(m("retainer_revenue")), status: getStatus(m("retainer_revenue"), (x) => x >= 60, (x) => x >= 30) },
        { key: "utilization", label: "Utilization", value: percent(m("utilization_rate")), status: getStatus(m("utilization_rate"), (x) => x >= 75, (x) => x >= 50) },
        { key: "margin", label: "Gross Margin", value: percent(m("gross_margin")), status: getStatus(m("gross_margin"), (x) => x >= 50, (x) => x >= 30) },
        { key: "runway", label: "Runway", value: `${formatter.format(runway)} mo`, status: getStatus(runway, (x) => x >= 12, (x) => x >= 3) },
      ];
      heroNumbers = [
        { label: "Annual Revenue", value: compactMoney(m("monthly_revenue") * 12) },
        { label: "LTV:CAC", value: `${formatter.format(ltvCac)}x` },
        { label: "Runway", value: `${formatter.format(runway)} mo` },
      ];
      let revenue = m("monthly_revenue");
      let cash = m("cash_balance");
      for (let month = 1; month <= 12; month++) {
        revenue = revenue * (1 + m("mom_growth") / 100);
        const activeClients = m("avg_project_value") > 0 ? revenue / m("avg_project_value") : 0;
        const gp = revenue * (m("gross_margin") / 100);
        const netIncome = gp - m("burn_rate");
        cash += netIncome;
        projections.push({ month, revenue, grossProfit: gp, cashBalance: cash, activeClients, netIncome });
      }
    }

    const points = 100 / Math.max(1, metrics.length);
    const score = Math.round(
      metrics.reduce((acc, metric) => acc + (metric.status === "healthy" ? points : metric.status === "warning" ? points / 2 : 0), 0),
    );

    return { metrics, heroNumbers, projections, score };
  }, [inputs, model]);

  const healthLabel = computed.score >= 80 ? t.healthExcellent : computed.score >= 60 ? t.healthGood : computed.score >= 40 ? t.healthFair : t.healthPoor;
  const healthColor = computed.score >= 80 ? "#34D399" : computed.score >= 50 ? "#FBBF24" : "#F87171";

  const updateInput = (key: string, value: string) => {
    const num = Number(value);
    setInputs((prev) => ({ ...prev, [key]: Number.isFinite(num) ? Math.max(0, num) : 0 }));
  };

  const exportCsv = () => {
    const rows: string[][] = [];
    const date = new Date().toLocaleDateString();
    rows.push([`Foundterra Financial Model - ${model} - ${date}`]);
    rows.push([]);
    const headers = Object.keys(computed.projections[0] || {});
    rows.push(headers.map((h) => toNaturalLabel(h)));
    computed.projections.forEach((row) =>
      rows.push(
        headers.map((h) => {
          const value = row[h];
          return typeof value === "number" ? value.toFixed(2) : String(value ?? "");
        }),
      ),
    );
    rows.push([]);
    rows.push(["Unit Economics"]);
    computed.metrics.forEach((m) => rows.push([m.label, m.value, m.status]));

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `foundterra-model-${model}-${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white">
      <Helmet>
        <title>{lang === "he" ? "מחשבון מודל פיננסי לסטארטאפ חינמי | Foundterra" : "Free Startup Financial Model Calculator | Foundterra"}</title>
        <meta name="description" content={t.metaDescription} />
        <link rel="canonical" href={lang === "he" ? "https://www.foundterra.com/he/financial-model" : "https://www.foundterra.com/financial-model"} />
        <meta name="keywords" content="startup financial model, SaaS financial model calculator, LTV CAC ratio calculator, startup runway calculator" />
        <meta property="og:title" content={lang === "he" ? "מחשבון מודל פיננסי לסטארטאפ — Foundterra" : "Free Startup Financial Model Calculator — Foundterra"} />
        <meta property="og:description" content={t.metaDescription} />
        <meta property="og:url" content="https://www.foundterra.com/financial-model" />
        <meta property="og:locale" content={lang === "he" ? "he_IL" : "en_US"} />
        <link rel="alternate" hrefLang="en" href="https://www.foundterra.com/financial-model" />
        <link rel="alternate" hrefLang="he" href="https://www.foundterra.com/he/financial-model" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Startup Financial Model Calculator",
          alternateName: "מחשבון מודל פיננסי לסטארטאפ",
          url: "https://www.foundterra.com/financial-model",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web Browser",
          isAccessibleForFree: true,
          inLanguage: ["en", "he"],
        })}</script>
      </Helmet>

      <Header />
      <main className="pt-28 pb-16">
        <section className="container-max px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold max-w-3xl">
            {t.hero.split("Financial Model")[0]}
            <span className="text-primary">{lang === "he" ? "מודל פיננסי" : "Financial Model"}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mt-4">{t.subtitle}</p>

          <section id="tool-intro" className="mt-8 glass-panel p-6 border border-[rgba(99,102,241,0.2)]">
            <h2 className="text-2xl font-serif mb-3">{t.title}</h2>
            <p className="text-muted-foreground">
              {lang === "he"
                ? "כל המדדים מחושבים מול בנצ׳מרקים שקרנות הון סיכון בוחנות בפיטצ׳ דק."
                : "Every metric is benchmarked against what VCs evaluate before Seed and Series A rounds."}
            </p>
          </section>
        </section>

        <section className="container-max px-4 mt-8">
          <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Business model selector">
            {(["saas", "ecommerce", "marketplace", "agency"] as ModelKey[]).map((mk) => (
              <button
                key={mk}
                onClick={() => setModel(mk)}
                role="tab"
                className={`px-4 py-2 border text-sm uppercase tracking-wide ${model === mk ? "bg-primary border-primary" : "border-border bg-transparent"}`}
              >
                {t[`model_${mk}` as keyof typeof t]}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-6 tool-layout">
            <div className={`lg:col-span-2 card-elevated p-6 border border-[rgba(99,102,241,0.2)] transition-all duration-200 ${animating ? "opacity-20 translate-y-2" : "opacity-100"}`}>
              <h3 className="text-xl font-serif mb-4">{t.inputs}</h3>
              <div className="space-y-4">
                {inputConfigs[model].map((field) => (
                  <div key={field.key}>
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      {fieldLabels[field.key]?.[lang] || field.key}
                      <details className="inline-block">
                        <summary className="cursor-pointer text-primary">ⓘ</summary>
                        <article className="mt-2 p-3 bg-[#16162A] border border-border text-xs text-muted-foreground" itemScope itemType="https://schema.org/DefinedTerm">
                          <h4 className="text-white mb-1">{fieldLabels[field.key]?.[lang] || field.key}</h4>
                          <p>{tooltips[field.key]?.[lang] || tooltips.mom_growth[lang]}</p>
                        </article>
                      </details>
                    </label>
                    <div className="relative mt-1">
                      {field.unit !== "num" && (
                        <span className={`absolute ${lang === "he" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-muted-foreground`}>{field.unit === "$" ? "$" : "%"}</span>
                      )}
                      <input
                        className={`w-full bg-[#16162A] border border-border py-2 ${lang === "he" ? "pr-9 pl-3" : "pl-9 pr-3"}`}
                        type="number"
                        min={0}
                        value={inputs[field.key] ?? 0}
                        onChange={(e) => updateInput(field.key, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div ref={outputsRef} className="lg:col-span-3 card-elevated p-6 border border-[rgba(99,102,241,0.2)] lg:sticky lg:top-24 h-fit outputs-panel">
              <h3 className="text-xl font-serif mb-4">{t.outputs}</h3>
              <div className="flex items-center gap-4 mb-6">
                <svg width="90" height="90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.15)" strokeWidth="10" fill="none" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={healthColor}
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${(computed.score / 100) * 314} 314`}
                    transform="rotate(-90 60 60)"
                  />
                  <text x="60" y="68" textAnchor="middle" fill="white" fontSize="24" fontWeight="700">{computed.score}</text>
                </svg>
                <div>
                  <p className="text-sm text-muted-foreground">{t.health}</p>
                  <p className="text-sm">{healthLabel}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {computed.heroNumbers.map((n) => (
                  <div key={n.label} className="border border-border p-3">
                    <div className="text-xl font-semibold">{n.value}</div>
                    <div className="text-xs text-muted-foreground">{n.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {computed.metrics.map((metric) => (
                  <div key={metric.key} className="border border-border p-3">
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                    <div className={`text-2xl font-semibold ${statuses[metric.status].color} metric-card-value`}>{metric.value}</div>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <span className={`w-2 h-2 rounded-full ${statuses[metric.status].dot}`} />
                      <span>{metric.status === "healthy" ? t.healthy : metric.status === "warning" ? t.warning : t.critical}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-max px-4 mt-10" aria-label="12-month financial projections">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif">{t.projections}</h2>
            <button className="btn-secondary border border-border px-4 py-2 text-sm" onClick={exportCsv}>{t.export}</button>
          </div>

          <div className="h-72 bg-[#12121F] border border-[#1E1E32] p-4 mb-6" aria-label="12-month revenue projection line chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={computed.projections}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#A0A0C0" />
                <YAxis stroke="#A0A0C0" />
                <Tooltip
                  contentStyle={{ background: "#16162A", border: "1px solid #2A2A45" }}
                  formatter={(value: number, name: string) => [formatter.format(Number(value)), toNaturalLabel(name)]}
                  labelFormatter={(label) => `Month ${label}`}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#7B52F5" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="grossProfit" name="Gross Profit" stroke="#34D399" strokeDasharray="5 4" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="cashBalance" name="Cash Balance" stroke="#A0A0C0" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-auto border border-[#1E1E32]">
            <table className="w-full text-sm">
              <thead className="bg-[#12121F] sticky top-0">
                <tr className="border-t-2 border-primary">
                  {Object.keys(computed.projections[0] || {}).map((h) => (
                    <th key={toNaturalLabel(h)} className="text-left p-2 capitalize">{toNaturalLabel(h)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {computed.projections.map((row, idx) => (
                  <tr key={idx} className={`${idx % 2 ? "bg-[#0B0B14]" : "bg-[#12121F]"} ${idx === 11 ? "outline outline-1 outline-primary" : ""}`}>
                    {Object.entries(row).map(([k, v]) => (
                      <td key={k} className={`p-2 ${k.toLowerCase().includes("netincome") ? (Number(v) >= 0 ? "text-emerald-400" : "text-red-400") : ""}`}>
                        {typeof v === "number" ? formatter.format(v) : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="startup-metrics-guide" className="container-max px-4 mt-10">
          <h2 className="text-2xl font-serif mb-4">{lang === "he" ? "מדריך מדדים פיננסיים לסטארטאפ" : "Startup Financial Metrics Guide"}</h2>
          <details open className="border border-border p-4 mb-3">
            <summary className="font-semibold cursor-pointer">{lang === "he" ? "מה יחס LTV:CAC טוב?" : "What is a good LTV:CAC ratio for SaaS?"}</summary>
            <p className="text-muted-foreground mt-2">{lang === "he" ? "יחס בריא הוא 3:1 ומעלה. מתחת ל-1.5:1 מעיד על כלכלת יחידה בעייתית." : "A healthy ratio is 3:1 or higher. Below 1.5:1 usually means broken unit economics."}</p>
          </details>
          <details className="border border-border p-4 mb-3">
            <summary className="font-semibold cursor-pointer">{lang === "he" ? "כמה runway צריך לפני גיוס?" : "How much runway is needed before fundraising?"}</summary>
            <p className="text-muted-foreground mt-2">{lang === "he" ? "מומלץ 12–18 חודשים כדי לנהל תהליך חזק וללא לחץ." : "Typically 12–18 months to run a strong process without pressure."}</p>
          </details>
        </section>

        <section className="container-max px-4 mt-10">
          <div className="border border-[rgba(99,102,241,0.2)] bg-[#12121F] p-8 text-center">
            <h2 className="text-3xl font-serif mb-3">{t.ready}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">{t.readyText}</p>
            <div className="flex justify-center gap-3">
              <a href="/contact" className="bg-primary px-5 py-3 text-sm uppercase tracking-wider">{t.book}</a>
              <Link to="/#packages" className="border border-border px-5 py-3 text-sm">{t.viewPackages}</Link>
            </div>
          </div>
        </section>
      </main>

      <button onClick={() => outputsRef.current?.scrollIntoView({ behavior: "smooth" })} className="fixed md:hidden bottom-4 left-1/2 -translate-x-1/2 z-50 bg-primary px-4 py-2 text-sm">
        ↓ {t.seeResults}
      </button>

      <RelatedServices />
      <Footer />
    </div>
  );
};

export default FinancialModel;
