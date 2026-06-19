import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedServices from "@/components/RelatedServices";
import { Link } from "react-router-dom";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

type Metrics = {
  cmgr: number;
  activation: number;
  burn: number;
  grossMargin: number;
  nrr: number;
  ltvCac: number;
  pipeline: number;
};

type Insight = {
  title: string;
  condition: (m: Metrics) => boolean;
  output: string;
  recommendation: string;
};

type MetricInput = {
  label: string;
  description: string;
  key: keyof Metrics;
  min: number;
  max: number;
  suffix: string;
};

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));
const norm = (v: number, min: number, max: number) => clamp(((v - min) / (max - min)) * 100);

const insights: Insight[] = [
  {
    title: "The Rocket Ship",
    condition: (m) => m.cmgr > 20 && m.burn < 1.5,
    output: "ELITE MOMENTUM: You are in the top 1% of Seed startups.",
    recommendation: "Foundterra Tip: Your deck should focus on 'Category Domination'—don't let mediocre design distract from these numbers.",
  },
  {
    title: "The Leaky Bucket",
    condition: (m) => m.cmgr > 15 && m.nrr < 90,
    output: "RETENTION ALERT: Your growth is high but churn is killing you.",
    recommendation: "Foundterra Tip: We need to remodel your 'Retention Strategy' slide to show investors how you'll plug the leaks.",
  },
  {
    title: "The Agency Hybrid",
    condition: (m) => m.grossMargin < 65,
    output: "VALUATION CEILING: Your margins look like a service business.",
    recommendation: "Foundterra Tip: Let's adjust your financial model to project 'Pure SaaS' margins as you scale.",
  },
  {
    title: "Baseline Read",
    condition: () => true,
    output: "MIXED SIGNALS: You have momentum in parts of the business, but the profile is not yet Tier-1 crisp.",
    recommendation: "Foundterra Tip: Align your narrative and model so one clear investor thesis emerges across traction, retention, and burn.",
  },
];

const checklistStatic = [
  "Foundterra Service: Professionally Designed Deck",
  "Foundterra Service: Validated Financial Model",
  "Foundterra Service: Cohesive GTM Storyline",
  "Foundterra Service: Pricing Sensitivity Model",
  "Foundterra Service: Use-of-Funds Breakdown",
];

const SaasMetricAuditor = () => {
  const { content, language } = useLanguage();
  const isHebrew = language === "he";
  const [metrics, setMetrics] = useState<Metrics>({
    cmgr: 12,
    activation: 32,
    burn: 2.3,
    grossMargin: 76,
    nrr: 102,
    ltvCac: 3.4,
    pipeline: 18,
  });
  const [manualChecks, setManualChecks] = useState<boolean[]>(Array(checklistStatic.length).fill(false));
  const [email, setEmail] = useState("");
  const [reportSent, setReportSent] = useState(false);

  const metricInputs = isHebrew
    ? [
        { label: "CMGR (קצב צמיחה חודשי)", description: "אחוז הצמיחה החודשית החוזרת בהכנסות.", key: "cmgr", min: 0, max: 30, suffix: "%" },
        { label: "שיעור אקטיבציה", description: "אחוז המשתמשים שמגיעים לערך הראשון במוצר.", key: "activation", min: 0, max: 100, suffix: "%" },
        { label: "Burn Multiple", description: "כמה דולרים נשרפים כדי לייצר דולר ARR חדש.", key: "burn", min: 0.5, max: 5, suffix: "x" },
        { label: "שולי רווח גולמי", description: "אחוז ההכנסה שנשאר אחרי עלויות ישירות.", key: "grossMargin", min: 20, max: 100, suffix: "%" },
        { label: "NRR", description: "שימור נטו של הכנסות מלקוחות קיימים.", key: "nrr", min: 70, max: 150, suffix: "%" },
        { label: "LTV:CAC", description: "יחס בין ערך לקוח לעלות רכישתו.", key: "ltvCac", min: 0, max: 10, suffix: "x" },
        { label: "Pipeline Velocity", description: "קצב התקדמות הלידים המוסמכים בצינור המכירות.", key: "pipeline", min: 0, max: 50, suffix: "%" },
      ]
    : [
        { label: "CMGR (Growth Velocity)", description: "Monthly recurring revenue growth rate.", key: "cmgr", min: 0, max: 30, suffix: "%" },
        { label: "Activation Rate", description: "Share of new users who reach first value quickly.", key: "activation", min: 0, max: 100, suffix: "%" },
        { label: "Burn Multiple", description: "How many dollars you burn to add one dollar of ARR.", key: "burn", min: 0.5, max: 5, suffix: "x" },
        { label: "Gross Margin", description: "Revenue left after direct delivery costs.", key: "grossMargin", min: 20, max: 100, suffix: "%" },
        { label: "NRR", description: "Net revenue retention from existing customers.", key: "nrr", min: 70, max: 150, suffix: "%" },
        { label: "LTV:CAC", description: "Customer lifetime value to acquisition cost ratio.", key: "ltvCac", min: 0, max: 10, suffix: "x" },
        { label: "Pipeline Velocity", description: "Speed at which qualified leads move toward close.", key: "pipeline", min: 0, max: 50, suffix: "%" },
      ];

  const ui = isHebrew
    ? {
        title: "טרמינל דיאגנוסטיקה ל-Pre-Seed ו-Seed",
        subtitle: "הזינו את המדדים שלכם כדי לראות איך קרן VC תדרג את החברה, ולקבל פערים בנרטיב הפיץ׳ ובמודל הפיננסי.",
        inputWorkspace: "מרחב קלט",
        intelligence: "מודיעין Foundterra",
        diagnosticFeed: "פיד אבחון",
        serviceBridge: "גשר לשירות",
        checklist: "צ׳קליסט שירותי Foundterra",
        score: "ציון הדיאגנוסטיקה שלך",
        scoreHelp: "מוכנים לטפל באזורי הסיכון? השירותים של Foundterra ממירים דאטה גולמי לנרטיב השקעה חד.",
        viewServices: "לשירותים שלנו",
        bookAudit: "תיאום שיחת אבחון",
        exportTitle: "ייצוא דוח",
        exportDesc: "הזינו אימייל לקבלת דוח Investor-Ready של Foundterra.",
        exportBtn: "ייצוא דוח",
        reportQueued: "הדוח נשלח לתור. בדקו את תיבת המייל.",
      }
    : {
        title: "The Pre-Seed & Seed Diagnostic Terminal.",
        subtitle: "Input your raw metrics to see how a Tier-1 VC would view your startup in 2026. Get instant feedback on your pitch deck narrative and financial modeling gaps.",
        inputWorkspace: "Input Workspace",
        intelligence: "Foundterra Intelligence",
        diagnosticFeed: "Diagnostic Feed",
        serviceBridge: "Service Bridge",
        checklist: "Foundterra Service Checklist",
        score: "Your Diagnostic Score",
        scoreHelp: "Ready to fix the Red Zones? Foundterra specializes in turning raw startup data into world-class pitch decks and bulletproof financial models.",
        viewServices: "View Our Services",
        bookAudit: "Book a Free Audit Call",
        exportTitle: "Export Audit",
        exportDesc: "Enter your email to receive the Foundterra Investor-Ready Report.",
        exportBtn: "Export Audit",
        reportQueued: "Report queued. Check your inbox for the Foundterra Investor-Ready Report.",
      };


  const scores = useMemo(() => {
    const growth = norm(metrics.cmgr, 0, 30);
    const efficiency = clamp(100 - norm(metrics.burn, 0.5, 5));
    const purity = norm(metrics.grossMargin, 20, 100);
    const retention = norm(metrics.nrr, 70, 150);
    const demand = norm(metrics.pipeline, 0, 50);
    const value = norm(metrics.ltvCac, 0, 10);
    const friction = clamp(100 - norm(metrics.activation, 0, 100));
    return { growth, efficiency, purity, retention, demand, value, friction };
  }, [metrics]);

  const diagnostic = useMemo(() => insights.find((i) => i.condition(metrics)) ?? insights[insights.length - 1], [metrics]);

  const overallScore = Math.round(
    (scores.growth + scores.efficiency + scores.purity + scores.retention + scores.demand + scores.value + (100 - scores.friction)) / 7,
  );
  const checklistBonus = Math.min(25, manualChecks.filter(Boolean).length * 5);
  const readinessScore = Math.min(100, overallScore + checklistBonus);

  const weakest = useMemo(() => {
    const entries: Array<[string, number]> = [
      ["growth", scores.growth],
      ["activation", 100 - scores.friction],
      ["burn", scores.efficiency],
      ["margin", scores.purity],
      ["nrr", scores.retention],
      ["ltv", scores.value],
      ["pipeline", scores.demand],
    ];
    return entries.sort((a, b) => a[1] - b[1])[0][0];
  }, [scores]);

  const bridge = {
    burn: {
      text: isHebrew ? "המודל הפיננסי צריך תוכנית אופטימיזציית Burn." : "Your financial model needs a burn-optimization roadmap.",
      cta: isHebrew ? "תיאום סשן מודל פיננסי" : "Book a Modeling Session",
      href: content.cta.calendlyLink,
      external: true,
    },
    activation: {
      text: isHebrew ? "סלייד ה-Traction צריך נרטיב חד יותר." : "Your Traction slide needs a better narrative.",
      cta: isHebrew ? "סקירת חבילות דק" : "Review Deck Packages",
      href: "/#packages",
      external: false,
    },
    growth: {
      text: isHebrew ? "סיפור ה-GTM צריך תזת סקייל חדה יותר." : "Your GTM story needs a sharper scale thesis.",
      cta: isHebrew ? "לשירותים שלנו" : "View Our Services",
      href: "/#services",
      external: false,
    },
    margin: {
      text: isHebrew ? "המודל צריך מסלול שיפור לשולי רווח תוכנתיים." : "Your model needs a software-margin expansion path.",
      cta: isHebrew ? "תיאום סשן מודל פיננסי" : "Book a Modeling Session",
      href: content.cta.calendlyLink,
      external: true,
    },
    nrr: {
      text: isHebrew ? "נרטיב הריטנשן צריך יותר הוכחות ואסטרטגיה." : "Your retention narrative needs stronger proof and strategy.",
      cta: isHebrew ? "סקירת חבילות דק" : "Review Deck Packages",
      href: "/#packages",
      external: false,
    },
    ltv: {
      text: isHebrew ? "יחידת הכלכלה צריכה מסלול ברור ליעילות בסקייל." : "Your unit economics need a clearer path to scale efficiency.",
      cta: isHebrew ? "לשירותים שלנו" : "View Our Services",
      href: "/#services",
      external: false,
    },
    pipeline: {
      text: isHebrew ? "מנוע הביקוש צריך נרטיב Pipeline מוסמך חזק יותר." : "Your demand engine needs a stronger qualified pipeline narrative.",
      cta: isHebrew ? "תיאום שיחת אבחון" : "Book a Free Audit Call",
      href: content.cta.calendlyLink,
      external: true,
    },
  }[weakest as "growth" | "activation" | "burn" | "margin" | "nrr" | "ltv" | "pipeline"];

  const chartData = [
    { metric: isHebrew ? "צמיחה" : "Growth", value: scores.growth },
    { metric: isHebrew ? "יעילות" : "Efficiency", value: scores.efficiency },
    { metric: isHebrew ? "טוהר תוכנה" : "Purity", value: scores.purity },
    { metric: isHebrew ? "שימור" : "Retention", value: scores.retention },
    { metric: isHebrew ? "ביקוש" : "Demand", value: scores.demand },
    { metric: isHebrew ? "ערך" : "Value", value: scores.value },
    { metric: isHebrew ? "חיכוך" : "Friction", value: scores.friction },
  ];

  const autoChecks = [
    { label: isHebrew ? "CMGR > 15% (מהירות צמיחה)" : "CMGR > 15% (Venture Speed)", passed: metrics.cmgr > 15 },
    { label: isHebrew ? "LTV:CAC > 3 (התאמת יחידת כלכלה)" : "LTV:CAC > 3 (Unit Economic Fit)", passed: metrics.ltvCac > 3 },
    { label: isHebrew ? "Gross Margin > 75% (טוהר תוכנה)" : "Gross Margin > 75% (Software Purity)", passed: metrics.grossMargin > 75 },
  ];

  const sliderStyle = (score: number) => ({
    background: "linear-gradient(90deg, #FF4B4B 0%, #ff8a4b 35%, #ffd24b 55%, #7ff0a7 78%, #00FFC2 100%)",
    boxShadow: `0 0 18px rgba(159, 103, 255, ${0.18 + score / 500})`,
  });

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Free SaaS Metrics Auditor for Founders | Foundterra</title>
        <meta name="description" content="Audit SaaS KPIs instantly and get investor-ready recommendations for fundraising, retention, and growth metrics." />
        <link rel="canonical" href="https://www.foundterra.com/saas-metric-auditor" />
      </Helmet>
      <Header />
      <main className="pt-24 pb-20">
        <section className="section-padding">
          <div className="container-max">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h1 className="font-serif text-4xl sm:text-5xl mb-4">{ui.title}</h1>
              <p className="text-muted-foreground text-lg">
                {ui.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="glass-panel rounded-xl p-6 sm:p-8 space-y-6">
                <h2 className="text-2xl font-serif">{ui.inputWorkspace}</h2>
                {metricInputs.map(({ label, description, key, min, max, suffix }) => {
                  const val = metrics[key as keyof Metrics] as number;
                  const display = key === "burn" || key === "ltvCac" ? val.toFixed(1) : Math.round(val);
                  const score = key === "burn" ? clamp(100 - norm(val, min, max)) : norm(val, min, max);
                  return (
                    <label key={String(key)} className="block">
                      <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-foreground">{label}</span>
                        <span className="text-[var(--purple-light)] font-semibold">{display}{suffix}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{description}</p>
                      <input
                        type="range"
                        min={min}
                        max={max}
                        step={key === "burn" || key === "ltvCac" ? 0.1 : 1}
                        value={val}
                        onChange={(e) => setMetrics((m) => ({ ...m, [key]: Number(e.target.value) }))}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={sliderStyle(score)}
                      />
                    </label>
                  );
                })}
              </div>

              <div className="glass-panel rounded-xl p-6 sm:p-8">
                <h2 className="text-2xl font-serif mb-4">{ui.intelligence}</h2>
                <div className="h-72 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={chartData}>
                      <PolarGrid stroke="rgba(159,103,255,0.25)" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: "#c4b5fd", fontSize: 12 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar dataKey="value" stroke="#9f67ff" fill="#7c3aed" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass-card rounded-md p-4 border border-[var(--purple-border)]">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--purple-light)] mb-2">{ui.diagnosticFeed}</p>
                  <p className="text-foreground font-semibold mb-1">{diagnostic.title}</p>
                  <p className="text-muted-foreground text-sm mb-2">{diagnostic.output}</p>
                  <p className="text-[var(--purple-pale)] text-sm">{diagnostic.recommendation}</p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6 mt-8">
              <h3 className="text-xl font-serif mb-2">{ui.serviceBridge}</h3>
              <p className="text-muted-foreground mb-4">{bridge.text}</p>
              {bridge.external ? (
                <a href={bridge.href} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-6 py-3 rounded-[2px] bg-[linear-gradient(135deg,var(--purple)_0%,#9333ea_100%)] text-white text-sm uppercase tracking-[0.08em]">{bridge.cta}</a>
              ) : (
                <Link to={bridge.href} className="inline-flex items-center justify-center px-6 py-3 rounded-[2px] bg-[linear-gradient(135deg,var(--purple)_0%,#9333ea_100%)] text-white text-sm uppercase tracking-[0.08em]">{bridge.cta}</Link>
              )}
            </div>

            <div className="glass-panel rounded-xl p-6 mt-8">
              <h3 className="text-xl font-serif mb-4">{ui.checklist}</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm mb-4">
                {autoChecks.map((item) => (
                  <div key={item.label} className={`px-3 py-2 rounded-md border ${item.passed ? "border-[rgba(0,255,194,0.5)] text-[var(--text)]" : "border-[var(--purple-border)] text-muted-foreground"}`}>
                    {item.passed ? "✓" : "○"} {item.label}
                  </div>
                ))}
                {checklistStatic.map((item, i) => (
                  <label key={item} className="px-3 py-2 rounded-md border border-[var(--purple-border)] text-muted-foreground flex items-center gap-2">
                    <input type="checkbox" checked={manualChecks[i]} onChange={() => setManualChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)))} />
                    {item}
                  </label>
                ))}
              </div>

              <p className="text-lg font-serif mb-4">{ui.score}: <span className="text-[var(--purple-light)]">{readinessScore}/100</span>.</p>
              <p className="text-muted-foreground mb-4">{ui.scoreHelp}</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/#services" className="inline-flex items-center justify-center px-5 py-3 rounded-[2px] border border-[rgba(124,58,237,0.4)] text-[var(--purple-light)] text-sm uppercase tracking-[0.06em]">{ui.viewServices}</Link>
                <a href={content.cta.calendlyLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-6 py-3 rounded-[2px] bg-[linear-gradient(135deg,var(--purple)_0%,#9333ea_100%)] text-white text-sm uppercase tracking-[0.08em]">{ui.bookAudit}</a>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6 mt-8">
              <Link
                to="/get-resources"
                className="inline-flex w-full items-center justify-center px-6 py-3 rounded-[2px] bg-[linear-gradient(135deg,var(--purple)_0%,#9333ea_100%)] text-white text-base font-semibold tracking-[0.02em]"
              >
                Get your FREE startup fundraising kit
              </Link>
            </div>

          </div>
        </section>
      </main>
      <RelatedServices />
      <Footer />
    </div>
  );
};

export default SaasMetricAuditor;
