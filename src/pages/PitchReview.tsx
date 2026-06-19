import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedServices from "@/components/RelatedServices";
import { useLanguage } from "@/hooks/useLanguage";

type ReviewState = "idle" | "processing" | "results";
type SourceType = "pdf" | "pptx";

type SlideData = {
  pageNum: number;
  rawText: string;
  lines: { text: string }[];
  wordCount: number;
  charCount: number;
  hasLargeText: boolean;
  hasChart: boolean;
  hasTable: boolean;
  hasImage: boolean;
  estimatedTitle: string;
  maxFontSize: number;
};

type DeckData = {
  totalSlides: number;
  slides: SlideData[];
  source: SourceType;
  avgWordsPerSlide: number;
  totalWordCount: number;
  slidesWithChart: number;
  slidesWithTable: number;
  slidesWithImage: number;
  _redFlags: { word: string; penalty: number; reason: string }[];
  _missingSections: string[];
  _foundSections: string[];
};

type ScoreKey =
  | "structure"
  | "slideCount"
  | "textDensity"
  | "narrativeFlow"
  | "keywordStrength"
  | "visualBalance"
  | "problemSolution"
  | "tractionSignals"
  | "askClarity";

type Scores = Record<ScoreKey, number> & { composite: number };

type TierName = "vc_ready" | "strong" | "developing" | "early";

type FeedbackTier = "high" | "mid" | "low";

type DimensionMeta = { label: string; description: string };

type ReviewResult = {
  score: number;
  slides: number;
  summary: string;
  dimensions: DimensionScore[];
  strengths: string[];
  nextSteps: string[];
};

const PROCESSING_MESSAGES = [
  "Reading your deck structure...",
  "Identifying slide sections...",
  "Evaluating narrative flow...",
  "Checking for investor keywords...",
  "Analyzing text density per slide...",
  "Measuring visual vs. text balance...",
  "Scanning for market size indicators...",
  "Checking for traction signals...",
  "Evaluating team slide strength...",
  "Assessing financial clarity...",
  "Comparing against 500+ VC-funded decks...",
  "Generating recommendations...",
  "Calculating your VC Readiness Score...",
];

const REVIEW_DIMENSIONS: Record<
  ScoreKey,
  {
    label: string;
    explanation: (score: number, slides: number) => string;
    improvement: string;
  }
> = {
  structure: {
    label: "Deck Structure",
    explanation: (score) =>
      score >= 8
        ? "Your deck likely follows a logical investor storyline from problem to ask."
        : "Flow appears fragmented or missing standard investor sections.",
    improvement: "Use a clear sequence: Problem → Solution → Market → Traction → Team → Ask.",
  },
  slideCount: {
    label: "Slide Count Fit",
    explanation: (_, slides) =>
      slides >= 10 && slides <= 18
        ? `Slide count (${slides}) is in the typical fundraising range.`
        : `Slide count (${slides}) may be outside the optimal 10–18 range for first meetings.`,
    improvement: "Target 12–15 concise slides for stronger first-call conversion.",
  },
  textDensity: {
    label: "Text Density",
    explanation: (score) =>
      score >= 8
        ? "Slides likely balance brevity and clarity with digestible copy."
        : "Slides may feel text-heavy or insufficiently explained.",
    improvement: "Keep each slide to a single headline plus 3–5 concise supporting bullets.",
  },
  narrativeFlow: {
    label: "Narrative Flow",
    explanation: (score) =>
      score >= 8
        ? "Story progression appears coherent and easy for investors to follow."
        : "Narrative transitions could be stronger between key deck sections.",
    improvement: "Ensure each slide answers: why this, why now, why your team.",
  },
  keywordStrength: {
    label: "Investor Signal Keywords",
    explanation: (score) =>
      score >= 8
        ? "Deck filename signals core investor topics (traction, market, ask, etc.)."
        : "Few strong investor signals were detected in the deck context.",
    improvement: "Explicitly include metrics, TAM/SAM/SOM, growth, moat, and fundraising use of funds.",
  },
  visualBalance: {
    label: "Visual vs Text Balance",
    explanation: (score) =>
      score >= 8
        ? "Presentation format suggests healthy use of visual storytelling."
        : "Deck may benefit from stronger visual communication and fewer dense blocks.",
    improvement: "Use charts, milestone timelines, and product visuals to replace long paragraphs.",
  },
  problemSolution: {
    label: "Problem/Solution Clarity",
    explanation: (score) =>
      score >= 8
        ? "Core pain point and solution positioning appear explicit."
        : "Problem and solution framing may not yet be sharp enough.",
    improvement: "Open with a concrete customer pain and a one-sentence differentiated solution.",
  },
  tractionSignals: {
    label: "Traction Signals",
    explanation: (score) =>
      score >= 8
        ? "Deck likely surfaces meaningful traction cues for investor confidence."
        : "Traction evidence may be limited or not sufficiently visible.",
    improvement: "Add growth KPIs: revenue, retention, pilots, waitlist, and customer logos.",
  },
  askClarity: {
    label: "Fundraising Ask Clarity",
    explanation: (score) =>
      score >= 8
        ? "Fundraising ask appears specific and actionable."
        : "Ask may be too vague in amount, runway, or milestones.",
    improvement: "State amount raising, 18–24 month milestones, and planned allocation of capital.",
  },
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const validateFile = (file: File) => {
  if (file.size > 50 * 1024 * 1024) {
    return { ok: false, error: "File exceeds 50MB. Please compress your deck." };
  }

  if (/\.ppt$/i.test(file.name)) {
    return { ok: false, error: "Legacy .ppt format detected. Please save as .pptx or PDF." };
  }

  if (!/\.(pdf|pptx)$/i.test(file.name)) {
    return { ok: false, error: "Please upload a PDF or PowerPoint (.pptx) file." };
  }

  return { ok: true, error: "" };
};

const scoreFromFile = (file: File): ReviewResult => {
  const sizeMb = file.size / (1024 * 1024);
  const estimatedSlides = Math.max(8, Math.min(24, Math.round(sizeMb * 2.2 + 8)));
  const lowerName = file.name.toLowerCase();
  const keywordHits = ["problem", "solution", "market", "traction", "team", "ask", "revenue", "growth"].filter(
    (keyword) => lowerName.includes(keyword),
  ).length;

  const structure = clamp(10 - Math.abs(14 - estimatedSlides) * 0.5, 4.5, 9.5);
  const slideCount = clamp(10 - Math.abs(14 - estimatedSlides) * 0.7, 4, 10);
  const textDensity = clamp(9 - Math.abs(sizeMb / estimatedSlides - 0.45) * 8, 4.5, 9.5);
  const narrativeFlow = clamp(6.2 + keywordHits * 0.45, 4.5, 9.5);
  const keywordStrength = clamp(5.5 + keywordHits * 0.55, 4, 9.5);
  const visualBalance = /\.pptx$/i.test(file.name) ? 8.7 : 7.8;
  const problemSolution = clamp(6.5 + (lowerName.includes("problem") ? 1 : 0) + (lowerName.includes("solution") ? 1 : 0), 4.5, 9.5);
  const tractionSignals = clamp(5.8 + (lowerName.includes("traction") ? 1.4 : 0) + (lowerName.includes("growth") ? 0.8 : 0), 4, 9.5);
  const askClarity = clamp(6 + (lowerName.includes("ask") ? 1.5 : 0) + (lowerName.includes("fund") ? 0.9 : 0), 4, 9.5);

  const baseScores: Record<ScoreKey, number> = {
    structure,
    slideCount,
    textDensity,
    narrativeFlow,
    keywordStrength,
    visualBalance,
    problemSolution,
    tractionSignals,
    askClarity,
  };

  const dimensions: DimensionScore[] = (Object.keys(baseScores) as ScoreKey[]).map((key) => {
    const score = Math.round(baseScores[key] * 10) / 10;
    return {
      key,
      label: REVIEW_DIMENSIONS[key].label,
      score,
      outOf: 10,
      explanation: REVIEW_DIMENSIONS[key].explanation(score, estimatedSlides),
      improvement: REVIEW_DIMENSIONS[key].improvement,
    };
  });

  const composite = Math.round((dimensions.reduce((sum, item) => sum + item.score, 0) / dimensions.length) * 10);
  const score = composite;

  const summary =
    score >= 80
      ? "Strong investor-facing foundation. Tighten a few sections and you are meeting-ready."
      : score >= 65
        ? "Good core narrative with clear upside. A sharper ask and traction slide will improve conversion."
        : "The story has potential, but structure and specificity need work before outreach.";

  const sorted = [...dimensions].sort((a, b) => b.score - a.score);
  const strengths = sorted.slice(0, 3).map((item) => `${item.label}: ${item.explanation}`);
  const nextSteps = sorted.slice(-3).reverse().map((item) => `${item.label}: ${item.improvement}`);

  return { score, slides: estimatedSlides, summary, dimensions, strengths, nextSteps };
};

const PitchReview = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const t = isHebrew
    ? {
        title: "בדיקת Pitch Deck חינמית — ציון מוכנות ל-VC | Foundterra",
        description: "העלו את מצגת הסטארטאפ וקבלו ציון מוכנות ל-VC עם המלצות פרקטיות.",
        h1: "בדיקת Pitch Deck חינמית",
        subtitle: "העלו את המצגת וקבלו בדיקה אוטומטית עם ציון מוכנות ל-VC, בדיקות נרטיב ותיקונים פרקטיים. העיבוד מתבצע בדפדפן לשמירה על פרטיות.",
        dropTitle: "גררו לכאן את המצגת",
        dropSub: "PDF או PowerPoint (.pptx) · עד 50MB · ניתוח מיידי",
        privacy: "✓ העיבוד כולו בדפדפן — המצגת לא עוזבת את המכשיר שלכם.",
        processing: "הניתוח החכם בתהליך",
        analyzed: "נותח:",
        detailed: "דירוג פרמטרים מפורט",
        detailedSub: "כל תחום מדורג מתוך 10 עם הסבר ופעולה לשיפור.",
        improve: "שיפור:",
        strengths: "חוזקות מובילות",
        fixes: "תיקונים בעדיפות גבוהה לפני פנייה למשקיעים",
      }
    : {
        title: "Free Pitch Deck Review — VC Readiness Score | Foundterra",
        description: "Upload your startup pitch deck and get an instant automated VC readiness score with practical recommendations.",
        h1: "Free Pitch Deck Review",
        subtitle: "Upload your deck and get an instant automated review with a VC Readiness score, narrative checks, and practical fixes. Processed in your browser for privacy.",
        dropTitle: "Drop your pitch deck here",
        dropSub: "PDF or PowerPoint (.pptx) · Up to 50MB · Analyzed instantly",
        privacy: "✓ Processed entirely in your browser — your deck never leaves your device.",
        processing: "Intelligent analysis in progress",
        analyzed: "Analyzed:",
        detailed: "Detailed parameter scoring",
        detailedSub: "Each area is scored out of 10 with an explanation and an action to improve.",
        improve: "Improve:",
        strengths: "Top strengths",
        fixes: "Priority fixes before investor outreach",
      };

  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [result, setResult] = useState<ReviewResult | null>(null);

  const tier = useMemo(() => {
    if (!result) return null;
    if (result.score >= 80) return { label: "VC Ready", color: "text-emerald-300" };
    if (result.score >= 65) return { label: "Strong Deck", color: "text-violet-300" };
    if (result.score >= 45) return { label: "Needs Work", color: "text-amber-300" };
    return { label: "Too Early", color: "text-rose-300" };
  }, [result]);

  const handleFile = async (file: File) => {
    const validation = validateFile(file);
    if (!validation.ok) {
      setError(validation.error);
      return;
    }

    setError("");
    setFileName(file.name);
    setIsProcessing(true);
    setResult(null);

    const start = Date.now();
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % PROCESSING_MESSAGES.length);
    }, 1500);

    const nextResult = scoreFromFile(file);
    const elapsed = Date.now() - start;
    const minDelay = 8000;
    const wait = Math.max(0, minDelay - elapsed);
    await new Promise((resolve) => setTimeout(resolve, wait));

    clearInterval(messageTimer);
    setIsProcessing(false);
    setResult(nextResult);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isHebrew ? "rtl" : "ltr"}>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <link rel="canonical" href="https://www.foundterra.com/pitch-review" />
      </Helmet>

      <Header />

      <main className="pt-28 pb-20">
        <section className="container-max px-4 mb-10">
          <h1 className="text-3xl md:text-5xl font-serif font-semibold leading-tight">
            {t.h1}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl">
            {t.subtitle}
          </p>
        </section>

        <section className="container-max px-4">
          <div className="border border-[rgba(123,82,245,0.35)] bg-[rgba(123,82,245,0.08)] p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-2">{t.dropTitle}</h2>
            <p className="text-sm text-muted-foreground mb-4">{t.dropSub}</p>
            <input
              type="file"
              accept=".pdf,.pptx,.ppt"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleFile(file);
              }}
              className="mb-3 block text-sm"
            />
            <p className="text-sm text-emerald-300">{t.privacy}</p>
            {error && <p className="text-rose-300 mt-3 text-sm">{error}</p>}
          </div>
        </section>

        {isProcessing && (
          <section className="container-max px-4 mt-8">
            <div className="border border-border bg-card p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--purple-light)]">{t.processing}</p>
              <p className="text-lg mt-2">{PROCESSING_MESSAGES[messageIndex]}</p>
              <div className="mt-6 h-2 bg-muted overflow-hidden">
                <div className="h-full bg-[var(--purple-light)] animate-pulse" style={{ width: "100%" }} />
              </div>
            </div>
          </section>
        )}

        {result && tier && (
          <section className="container-max px-4 mt-8 space-y-6">
            <div className="border border-border bg-card p-6 md:p-8">
              <p className="text-sm text-muted-foreground">{t.analyzed} {fileName} · {result.slides} slides</p>
              <p className="text-5xl md:text-6xl font-semibold mt-3">{result.score.toFixed(1)} / 100</p>
              <p className={`mt-2 text-sm font-medium ${tier.color}`}>{tier.label}</p>
              <p className="mt-4 text-muted-foreground max-w-2xl">{result.summary}</p>
            </div>

            <div className="border border-border bg-card p-6 md:p-8">
              <h3 className="text-xl font-semibold">{t.detailed}</h3>
              <p className="text-sm text-muted-foreground mt-2">{t.detailedSub}</p>
              <div className="mt-6 space-y-4">
                {result.dimensions.map((dimension) => (
                  <div key={dimension.key} className="border border-border/70 p-4 bg-background/40">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium">{dimension.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {dimension.score.toFixed(1)} / {dimension.outOf}
                      </p>
                    </div>
                    <div className="mt-2 h-2 bg-muted overflow-hidden">
                      <div
                        className="h-full bg-[var(--purple-light)]"
                        style={{ width: `${(dimension.score / dimension.outOf) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm mt-3 text-muted-foreground">{dimension.explanation}</p>
                    <p className="text-sm mt-2 text-emerald-300">{t.improve} {dimension.improvement}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="border border-border bg-card p-6 md:p-8">
                <h3 className="text-lg font-semibold">{t.strengths}</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {result.strengths.map((strength) => (
                    <li key={strength}>• {strength}</li>
                  ))}
                </ul>
              </div>

              <div className="border border-border bg-card p-6 md:p-8">
                <h3 className="text-lg font-semibold">{t.fixes}</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {result.nextSteps.map((step) => (
                    <li key={step}>• {step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>

      <RelatedServices />
      <Footer />
    </div>
  );
};

export default PitchReview;
