import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedServices from "@/components/RelatedServices";
import { useLanguage } from "@/hooks/useLanguage";

const MAX_RAW = 45;
type TierKey = "vc_ready" | "angel_ready" | "alternative" | "not_ready";
type PillarKey = "traction" | "team" | "market" | "bizModel" | "fundraising";

type Question = {
  pillar: PillarKey;
  text: { en: string; he: string };
  subtext: { en: string; he: string };
  options: { en: string; he: string; points: number }[];
};

const t = {
  en: {
    title: "Is Your Startup Investor-Ready?",
    subtitle:
      "Answer 15 questions and get an instant readiness score with practical next steps.",
    start: "Start Quiz",
    questionOf: (q: number, total: number) => `Question ${q} of ${total}`,
    next: "Next →",
    back: "← Back",
    seeResults: "See My Results →",
    retake: "Retake Quiz",
    breakdown: "Pillar Breakdown",
    whatMeans: "What this means for you",
    nextSteps: "Recommended next steps",
    ctaTitle: "Know Your Score. Now Let's Fix the Gaps.",
    ctaBody:
      "Our team works with founders at every readiness stage — from pitch decks and financial models to investor-readiness strategy.",
    book: "Book Free Consultation",
    viewPackages: "View Packages",
    pillarLabels: {
      traction: "🚀 Traction",
      team: "👥 Team",
      market: "📐 Market",
      bizModel: "💰 Business Model",
      fundraising: "🎯 Fundraising",
    },
    insights: {
      traction: ["Strong proof of demand", "Early signals — needs more validation", "Revenue and growth need attention"],
      team: ["Credible, complete founding team", "Team gap may raise investor questions", "Team is a key risk area to address"],
      market: ["Large, timely market opportunity", "Market story needs sharpening", "Market size or timing needs work"],
      bizModel: ["Scalable, investor-grade economics", "Unit economics are developing", "Business model viability is unclear"],
      fundraising: ["Well-prepared to raise", "Materials and strategy need work", "Not ready for investor conversations"],
    },
  },
  he: {
    title: "האם הסטארטאפ שלך מוכן למשקיעים?",
    subtitle: "ענה על 15 שאלות וקבל ציון מוכנות מיידי יחד עם צעדים מעשיים להמשך.",
    start: "התחל שאלון",
    questionOf: (q: number, total: number) => `שאלה ${q} מתוך ${total}`,
    next: "הבא ←",
    back: "→ חזרה",
    seeResults: "הצג תוצאות ←",
    retake: "בצע שוב",
    breakdown: "פירוט לפי עמודי ליבה",
    whatMeans: "מה זה אומר עבורך",
    nextSteps: "הצעדים הבאים",
    ctaTitle: "אתה יודע את הציון שלך. עכשיו בוא נתקן את הפערים.",
    ctaBody:
      "הצוות שלנו עובד עם מייסדים בכל שלב מוכנות — מחיזוק מצגת ומודל פיננסי ועד אסטרטגיית מוכנות לגיוס.",
    book: "קבע ייעוץ חינמי",
    viewPackages: "צפה בחבילות",
    pillarLabels: {
      traction: "🚀 Traction",
      team: "👥 צוות",
      market: "📐 שוק",
      bizModel: "💰 מודל עסקי",
      fundraising: "🎯 מוכנות לגיוס",
    },
    insights: {
      traction: ["הוכחת ביקוש חזקה", "אותות ראשוניים — דרוש אימות נוסף", "הכנסות וצמיחה דורשים תשומת לב"],
      team: ["צוות מייסדים אמין ומלא", "פער בצוות עלול להעלות שאלות אצל משקיעים", "הצוות הוא אזור סיכון מרכזי לטיפול"],
      market: ["הזדמנות שוק גדולה ובזמן", "סיפור השוק דורש חידוד", "גודל השוק או העיתוי דורשים עבודה"],
      bizModel: ["כלכלה מדרגית ברמת משקיע", "כלכלת היחידה מתפתחת", "כדאיות המודל העסקי אינה ברורה"],
      fundraising: ["מוכן היטב לגיוס", "חומרים ואסטרטגיה דורשים עבודה", "לא מוכן לשיחות משקיעים"],
    },
  },
} as const;

const questions: Question[] = [
  ["traction", "What best describes your current revenue situation?", "מה הכי מתאר את מצב ההכנסות שלך כיום?", ["No revenue yet — still building", "Early revenue: under $5K/month", "Growing revenue: $5K–$50K/month", "Meaningful revenue: $50K+/month"], ["אין הכנסות עדיין — עדיין בונה", "הכנסות ראשוניות: מתחת ל-$5K/חודש", "הכנסות גדלות: $5K–$50K/חודש", "הכנסות משמעותיות: $50K+/חודש"]],
  ["traction", "How has your revenue or user base grown over the last 3 months?", "כיצד גדלו ההכנסות או בסיס המשתמשים שלך ב-3 החודשים האחרונים?", ["Flat or declining", "Slow growth: under 5% MoM", "Healthy growth: 5–15% MoM", "Strong growth: 15%+ MoM"], ["ללא שינוי או ירידה", "צמיחה איטית: מתחת ל-5%", "צמיחה בריאה: 5–15%", "צמיחה חזקה: 15%+"]],
  ["traction", "How well have you validated customers will pay?", "עד כמה אימתת שלקוחות ישלמו?", ["No paying customers yet", "A few warm contacts pay", "Multiple unrelated paying customers", "Strong retention and referrals"], ["אין לקוחות משלמים עדיין", "כמה מכרים משלמים", "מספר לקוחות לא קשורים משלמים", "שימור חזק והפניות"]],
  ["team", "How relevant is your team's background to the problem?", "עד כמה הרקע של הצוות שלך רלוונטי לבעיה?", ["Limited direct experience", "Some relevant background", "Strong industry experience", "Deep domain expertise"], ["ניסיון ישיר מוגבל", "רקע רלוונטי מסוים", "ניסיון תעשייתי חזק", "מומחיות עמוקה בתחום"]],
  ["team", "How complete is your founding team for this stage?", "עד כמה צוות המייסדים שלם לשלב הנוכחי?", ["Solo founder with no key hires", "Early team with clear gaps", "2–3 complementary co-founders", "Complete team with strong credentials"], ["מייסד יחיד ללא גיוסי מפתח", "צוות מוקדם עם פערים", "2–3 שותפי מייסד משלימים", "צוות מלא עם אישורים חזקים"]],
  ["team", "What credibility signals does your team have?", "אילו אותות אמינות יש לצוות שלך?", ["No notable startup credentials", "Relevant work experience only", "Startup experience or top accelerator", "Prior successful exit / top backing"], ["ללא אישורים בולטים", "ניסיון עבודה רלוונטי בלבד", "ניסיון סטארטאפ או מאיץ מוביל", "אקזיט קודם / גיבוי מוביל"]],
  ["market", "How large is the market you're targeting?", "כמה גדול השוק שאתה מכוון אליו?", ["Niche/local market", "Likely under $500M TAM", "$1B–$10B TAM", "$10B+ market"], ["שוק נישה/מקומי", "TAM מתחת ל-$500M", "TAM של $1B–$10B", "שוק של $10B+"]],
  ["market", "Why is now the right time for your startup?", "מדוע עכשיו הוא הזמן הנכון לסטארטאפ שלך?", ["No clear timing catalyst", "Market is ready but crowded", "Recent shift creates an opening", "Clear inflection point"], ["אין קטליזטור עיתוי ברור", "השוק מוכן אך צפוף", "שינוי אחרון יוצר פתח", "נקודת מפנה ברורה"]],
  ["market", "How would you describe your competitive advantage?", "כיצד תתאר את היתרון התחרותי שלך?", ["Better/cheaper only", "Clear differentiation but replicable", "Defensible proprietary advantage", "Strong moat (IP/network/regulatory)"], ["רק טובים/זולים יותר", "בידול ברור אך ניתן לשכפול", "יתרון שניתן להגנה", "חפיר חזק (IP/רשת/רגולציה)"]],
  ["bizModel", "How well do you understand unit economics?", "עד כמה אתה מבין את כלכלת היחידה?", ["No data yet", "Known but weak economics", "Solid: LTV:CAC above 3:1", "Strong: LTV:CAC 5:1+"], ["אין נתונים עדיין", "המספרים ידועים אך חלשים", "מוצק: LTV:CAC מעל 3:1", "חזק: LTV:CAC מעל 5:1"]],
  ["bizModel", "How does your business model scale?", "כיצד המודל העסקי שלך מדרג?", ["Linear with headcount", "Some scalability, much manual work", "Largely scalable", "Near-zero marginal cost"], ["ליניארי עם כוח אדם", "מדרגיות חלקית ועבודה ידנית", "בעיקר מדרגי", "עלות שולית כמעט אפס"]],
  ["bizModel", "How clear is your path to profitability?", "עד כמה ברור הנתיב לרווחיות?", ["No clear picture yet", "Path depends on assumptions", "Clear path with evidence", "Profitable unit-level or <24 months"], ["אין תמונה ברורה", "הנתיב תלוי בהנחות", "נתיב ברור עם ראיות", "רווחי ברמת יחידה או תוך <24 חודשים"]],
  ["fundraising", "What fundraising materials are ready today?", "אילו חומרי גיוס מוכנים היום?", ["Nothing prepared", "Rough deck only", "Solid deck + basic projections", "Full investor-grade package"], ["שום דבר לא מוכן", "דק גס בלבד", "דק טוב + תחזיות בסיסיות", "חבילה מלאה ברמת משקיע"]],
  ["fundraising", "How clear is your raise amount and investor fit?", "עד כמה ברור סכום הגיוס והתאמת סוג המשקיע?", ["Not sure yet", "Rough amount only", "Clear amount + investor type fit", "Specific target + mapped pipeline"], ["עדיין לא ברור", "רק סכום בקירוב", "סכום ברור + התאמת סוג משקיע", "יעד ספציפי + צנרת ממופה"]],
  ["fundraising", "How well does traction justify your fundraising ask?", "עד כמה ה-Traction מצדיק את בקשת הגיוס?", ["Clear mismatch", "Reasonable ask but weak proof", "Traction mostly supports ask", "Strong alignment backed by data"], ["חוסר התאמה ברור", "בקשה סבירה אך הוכחות חלשות", "ה-Traction תומך ברובו בבקשה", "התאמה חזקה מגובה בנתונים"]],
].map((q) => ({
  pillar: q[0] as PillarKey,
  text: { en: q[1] as string, he: q[2] as string },
  subtext: {
    en: "Answer based on your current stage.",
    he: "ענה לפי השלב הנוכחי שלך.",
  },
  options: (q[3] as string[]).map((en, idx) => ({
    en,
    he: (q[4] as string[])[idx],
    points: idx,
  })),
}));

const tierMap = {
  vc_ready: { range: [78, 100], color: "#34D399", icon: "🚀", en: "VC Ready", he: "מוכן לגיוס מ-VC" },
  angel_ready: { range: [55, 77], color: "#FBBF24", icon: "💡", en: "Angel / Pre-Seed Ready", he: "מוכן לגיוס מ-Angel / Pre-Seed" },
  alternative: { range: [33, 54], color: "#FF9A3C", icon: "🔀", en: "Consider Alternative Funding", he: "שקול מימון אלטרנטיבי" },
  not_ready: { range: [0, 32], color: "#F87171", icon: "🔧", en: "Not Ready Yet", he: "עדיין לא מוכן" },
};

const tierCopy = {
  vc_ready: {
    headline: { en: "You're In the Game — VCs Will Take This Meeting", he: "אתה במשחק — VCs יסכימו לפגישה" },
    desc: { en: "Strong fundamentals. Optimize materials and positioning for institutional conversations.", he: "היסודות חזקים. עכשיו צריך ללטש חומרים ומיצוב לשיחות מוסדיות." },
    means: {
      en: ["You are competitive for institutional rounds", "Your deck and model must be investor-grade", "Lead with a data-backed narrative", "Warm intros can materially improve close rate"],
      he: ["אתה תחרותי לסבבים מוסדיים", "הדק והמודל חייבים להיות ברמת משקיע", "הובל עם סיפור מגובה נתונים", "חיבורים חמים יכולים לשפר מהותית שיעור סגירה"],
    },
    steps: {
      en: ["Audit your deck against top-tier standards", "Finalize 3-year projections with assumptions", "Build a prioritized VC target list"],
      he: ["בדוק את הדק מול סטנדרטים של קרנות מובילות", "סיים תחזיות ל-3 שנים עם הנחות", "בנה רשימת יעד מתועדפת של קרנות VC"],
    },
    consult: {
      en: "You are close to institutional quality. In a Foundterra consultation, we can pressure-test your narrative, sharpen your investor materials, and map the highest-fit VC targets.",
      he: "אתה קרוב לרמה מוסדית. בפגישת ייעוץ עם Foundterra נבצע בדיקת עומק לנרטיב, נחדד את חומרי המשקיע ונמפה את קרנות ה-VC המתאימות ביותר."
    },
  },
  angel_ready: {
    headline: { en: "You're Close — Angels and Pre-Seed Funds Are Next", he: "אתה קרוב — Angels ו-Pre-Seed הם הצעד הבא" },
    desc: { en: "You have promising signals with gaps to close before institutional VC.", he: "יש לך אותות מבטיחים לצד פערים שכדאי לסגור לפני VC מוסדי." },
    means: {
      en: ["More traction proof will help", "Founder quality and story matter heavily", "Keep metrics clear and consistent", "Domain angels can unlock your next round"],
      he: ["עוד הוכחת Traction תסייע", "איכות המייסד והסיפור חשובים מאוד", "שמור על מדדים ברורים ועקביים", "Angels בתחום יכולים לפתוח את הסבב הבא"],
    },
    steps: {
      en: ["Build a list of relevant angels", "Tighten your key metrics story", "Collect customer testimonials as proof"],
      he: ["בנה רשימה של Angels רלוונטיים", "חדד את סיפור המדדים המרכזיים", "אסוף המלצות לקוחות כהוכחה"],
    },
    consult: {
      en: "You are in a strong pre-seed zone. A Foundterra consultation can help you close gaps quickly and position you for a clean angel/pre-seed raise.",
      he: "אתה באזור pre-seed חזק. ייעוץ עם Foundterra יכול לסגור פערים במהירות ולמקם אותך לגיוס angel/pre-seed נקי."
    },
  },
  alternative: {
    headline: { en: "Not VC-Trackable Yet — But Capital Is Available", he: "עדיין לא במסלול VC — אבל יש הון זמין" },
    desc: { en: "Alternative funding can help you grow before equity fundraising.", he: "מימון אלטרנטיבי יכול לעזור לצמוח לפני גיוס הון עצמי." },
    means: {
      en: ["Premature VC outreach can burn bridges", "Alternative routes reduce dilution pressure", "Accelerators, grants, and RBF are valid paths", "Focused execution can move you into angel-ready range"],
      he: ["פנייה מוקדמת ל-VC עלולה לשרוף גשרים", "נתיבים חלופיים מפחיתים לחץ דילול", "מאיצים, מענקים ו-RBF הם נתיבים תקפים", "ביצוע ממוקד יכול להעביר אותך לטווח Angel-ready"],
    },
    steps: {
      en: ["Apply to relevant accelerator programs", "Pick 1–2 metrics for a 90-day sprint", "Research grants for your sector"],
      he: ["הגש לתוכניות מאיץ רלוונטיות", "בחר 1–2 מדדים לספרינט 90 יום", "חקור מענקים בתחום שלך"],
    },
    consult: {
      en: "You need a focused funding path. In a Foundterra consultation, we can build a practical 90-day plan and choose the right non-dilutive and alternative funding options.",
      he: "אתה צריך מסלול מימון ממוקד. בפגישת ייעוץ עם Foundterra נבנה תוכנית 90 יום פרקטית ונבחר את אפשרויות המימון האלטרנטיביות והלא-מדללות הנכונות."
    },
  },
  not_ready: {
    headline: { en: "The Foundation Needs Work — And That's Okay", he: "היסודות דורשים עבודה — וזה בסדר" },
    desc: { en: "Prioritize product-market validation before fundraising.", he: "העדיפות כעת היא אימות Product-Market לפני גיוס." },
    means: {
      en: ["Fundraising now can distract from core validation", "Protect future investor relationships", "Strong rounds follow undeniable proof", "Use the next 90 days for focused milestones"],
      he: ["גיוס עכשיו עלול להסיח מאימות הליבה", "שמור על מערכות היחסים העתידיות עם משקיעים", "סבבים חזקים מגיעים אחרי הוכחה חד-משמעית", "נצל את 90 הימים הבאים לאבני דרך ממוקדות"],
    },
    steps: {
      en: ["Run customer discovery interviews", "Set a concrete raise milestone", "Retake this quiz in 90 days"],
      he: ["בצע ראיונות גילוי לקוחות", "קבע אבן דרך ברורה לגיוס", "חזור לשאלון בעוד 90 יום"],
    },
    consult: {
      en: "You should avoid fundraising right now. A Foundterra consultation can help you define the exact validation milestones that make your next raise credible.",
      he: "כרגע עדיף להימנע מגיוס. ייעוץ עם Foundterra יעזור להגדיר במדויק את אבני הדרך לאימות שיהפכו את סבב הגיוס הבא לאמין."
    },
  },
} as const;

const getTier = (score: number): TierKey => (score >= 78 ? "vc_ready" : score >= 55 ? "angel_ready" : score >= 33 ? "alternative" : "not_ready");
const calculateScore = (answers: number[]) => Math.round((answers.reduce((a, b) => a + b, 0) / MAX_RAW) * 100);
const getPillarScores = (answers: number[]) => ({
  traction: Math.round(((answers[0] + answers[1] + answers[2]) / 9) * 100),
  team: Math.round(((answers[3] + answers[4] + answers[5]) / 9) * 100),
  market: Math.round(((answers[6] + answers[7] + answers[8]) / 9) * 100),
  bizModel: Math.round(((answers[9] + answers[10] + answers[11]) / 9) * 100),
  fundraising: Math.round(((answers[12] + answers[13] + answers[14]) / 9) * 100),
});

const InvestorReady = () => {
  const { language, setLanguage, content } = useLanguage();
  const location = useLocation();
  const lang = language === "he" ? "he" : "en";
  const tx = t[lang];

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(15).fill(null));
  const [quizComplete, setQuizComplete] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [direction, setDirection] = useState<"next" | "back">("next");
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.pathname.startsWith("/he/") && language !== "he") setLanguage("he");
    if (location.pathname === "/investor-ready" && language === "he") {
      // keep user choice if already Hebrew
    }
  }, [language, location.pathname, setLanguage]);

  const filled = useMemo(() => answers.filter((a): a is number => a !== null), [answers]);
  const score = useMemo(() => (filled.length === 15 ? calculateScore(filled) : 0), [filled]);
  const tier = useMemo(() => getTier(score), [score]);
  const pillarScores = useMemo(() => (filled.length === 15 ? getPillarScores(filled) : null), [filled]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scoreParam = params.get("score");
    const tierParam = params.get("tier") as TierKey | null;
    if (scoreParam && tierParam && tierMap[tierParam]) {
      setQuizComplete(true);
      const parsed = Math.max(0, Math.min(100, Number(scoreParam) || 0));
      let frame = 0;
      const timer = setInterval(() => {
        frame += 1;
        setAnimatedScore(Math.round((parsed * frame) / 24));
        if (frame >= 24) clearInterval(timer);
      }, 30);
      return () => clearInterval(timer);
    }
  }, [location.search]);

  useEffect(() => {
    if (!quizComplete) return;
    let frame = 0;
    const timer = setInterval(() => {
      frame += 1;
      setAnimatedScore(Math.round((score * frame) / 24));
      if (frame >= 24) clearInterval(timer);
    }, 30);
    resultsRef.current?.focus();
    return () => clearInterval(timer);
  }, [quizComplete, score]);


  const handleSelect = (points: number) => {
    const copy = [...answers];
    copy[currentQ] = points;
    setAnswers(copy);
  };

  const next = () => {
    if (answers[currentQ] === null) return;
    if (currentQ === 14) return setQuizComplete(true);
    setDirection("next");
    setCurrentQ((q) => q + 1);
  };

  const back = () => {
    setDirection("back");
    setCurrentQ((q) => Math.max(0, q - 1));
  };

  const retake = () => {
    setAnswers(Array(15).fill(null));
    setCurrentQ(0);
    setQuizComplete(false);
    setAnimatedScore(0);
    window.history.replaceState({}, "", location.pathname);
  };



  const progress = ((currentQ + 1) / questions.length) * 100;
  const q = questions[currentQ];
  const currentText = lang === "he" ? q.text.he : q.text.en;
  const currentSubtext = lang === "he" ? q.subtext.he : q.subtext.en;

  const insightFor = (pillar: PillarKey, value: number) => {
    const idx = value >= 70 ? 0 : value >= 45 ? 1 : 2;
    return tx.insights[pillar][idx];
  };

  return (
    <>
      <Helmet>
        <title>{lang === "he" ? "האם הסטארטאפ שלך מוכן למשקיעים? | Foundterra" : "Investor-Ready Fundraising Quiz for Founders | Foundterra"}</title>
        <meta name="description" content={lang === "he" ? "ענה על 15 שאלות וגלה אם הסטארטאפ שלך מוכן לגיוס מ-VC, Angel או מימון אלטרנטיבי." : "Answer 15 questions to see if your startup is investor-ready for fundraising, and get practical next steps for founders preparing to pitch."} />
        <link rel="canonical" href={lang === "he" ? "https://www.foundterra.com/he/investor-ready" : "https://www.foundterra.com/investor-ready"} />
      </Helmet>
      <style>{`
        .investor-ready-page { --bg-primary:#0B0B14; --bg-card:#12121F; --bg-card-border:#1E1E32; --accent-purple:#7B52F5; --accent-purple-light:rgba(123,82,245,0.14); --text-primary:#FFF; --text-secondary:#A0A0C0; --success:#34D399; --warning:#FBBF24; --danger:#F87171; background:var(--bg-primary); color:var(--text-primary); }
        .quiz-card,.content-card { background:var(--bg-card); border:1px solid var(--bg-card-border); border-radius:0; }
        .answer-option{display:block;width:100%;background:#111122;border:1.5px solid #2A2A45;color:var(--text-primary);padding:14px 16px;margin-bottom:10px;cursor:pointer;text-align:left;transition:border-color .15s,background .15s;font-size:15px;line-height:1.35}
        [dir='rtl'] .answer-option{text-align:right}
        .answer-option:hover{border-color:var(--accent-purple)}
        .answer-option.selected{border-color:var(--accent-purple);background:var(--accent-purple-light);border-left:3px solid var(--accent-purple)}
        [dir='rtl'] .answer-option.selected{border-left:none;border-right:3px solid var(--accent-purple)}
        .progress-fill{transition:width .3s ease;background:var(--accent-purple)}
        .question-transition.next{animation:slideInRight .28s ease-out}
        .question-transition.back{animation:slideInLeft .28s ease-out}
        @keyframes slideInRight{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideInLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
      `}</style>
      <div className="investor-ready-page min-h-screen overflow-x-hidden">
        <Header />
        <main className="container-max pt-28 pb-16 space-y-8">
          <section className="content-card p-6 md:p-10">
            <h1 className="!text-4xl md:!text-6xl">{tx.title}</h1>
            <p className="text-[var(--text-secondary)] mt-4 max-w-3xl">{tx.subtitle}</p>
            <a href="#quiz" className="inline-block mt-5 px-5 py-3 bg-[var(--accent-purple)]">{tx.start}</a>
          </section>

          <section id="quiz" className="quiz-card p-5 md:p-8">
            {!quizComplete ? (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-full h-2 bg-[#23233B]" role="progressbar" aria-valuenow={currentQ + 1} aria-valuemin={1} aria-valuemax={15} aria-label={tx.questionOf(currentQ + 1, 15)}>
                    <div className="h-2 progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-sm text-[var(--text-secondary)] shrink-0" dir="ltr">{currentQ + 1} / 15</span>
                </div>

                <div key={currentQ} className={`question-transition ${direction}`}>
                  <span className="text-xs text-[var(--text-secondary)]">{tx.questionOf(currentQ + 1, 15)}</span>
                  <h2 className="!text-2xl mt-2 mb-2 break-words">{currentText}</h2>
                  <p className="text-[var(--text-secondary)] mb-4">{currentSubtext}</p>
                  <div role="radiogroup">
                    {q.options.map((opt, idx) => (
                      <button
                        key={`${currentQ}-${idx}`}
                        type="button"
                        className={`answer-option ${answers[currentQ] === opt.points ? "selected" : ""}`}
                        role="radio"
                        aria-checked={answers[currentQ] === opt.points}
                        onClick={() => handleSelect(opt.points)}
                      >
                        {String.fromCharCode(65 + idx)}. {lang === "he" ? opt.he : opt.en}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between gap-3 mt-4">
                    <button className="px-4 py-2 border border-[var(--bg-card-border)] disabled:opacity-40" onClick={back} disabled={currentQ === 0}>{tx.back}</button>
                    <button className="px-4 py-2 bg-[var(--accent-purple)] disabled:opacity-40" onClick={next} disabled={answers[currentQ] === null}>{currentQ === 14 ? tx.seeResults : tx.next}</button>
                  </div>
                </div>
              </>
            ) : (
              <div ref={resultsRef} tabIndex={-1} className="space-y-6 overflow-hidden">
                <div className="grid lg:grid-cols-[140px_1fr] gap-5 items-start">
                  <svg viewBox="0 0 120 120" className="w-28 h-28 md:w-32 md:h-32" aria-label={`Readiness score: ${animatedScore} out of 100`}>
                    <circle cx="60" cy="60" r="52" stroke="#2A2A45" strokeWidth="10" fill="none" />
                    <circle cx="60" cy="60" r="52" stroke={tierMap[tier].color} strokeWidth="10" fill="none" strokeDasharray={`${(animatedScore / 100) * 327} 327`} transform="rotate(-90 60 60)" />
                    <text x="60" y="66" textAnchor="middle" fill="white" fontSize="24" direction="ltr">{animatedScore}</text>
                  </svg>
                  <div className="min-w-0">
                    <span className="inline-flex px-3 py-1 text-sm" style={{ background: `${tierMap[tier].color}22`, color: tierMap[tier].color }}>
                      {tierMap[tier].icon} {lang === "he" ? tierMap[tier].he : tierMap[tier].en}
                    </span>
                    <h2 className="!text-2xl md:!text-3xl mt-2 break-words">{tierCopy[tier].headline[lang]}</h2>
                    <p className="text-[var(--text-secondary)] mt-2 break-words">{tierCopy[tier].desc[lang]}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl mb-3">{tx.breakdown}</h3>
                  {pillarScores && (Object.keys(pillarScores) as PillarKey[]).map((key) => {
                    const value = pillarScores[key];
                    const color = value >= 70 ? "var(--success)" : value >= 45 ? "var(--warning)" : "var(--danger)";
                    return (
                      <div key={key} className="mb-4">
                        <div className="flex justify-between text-sm mb-1"><span>{tx.pillarLabels[key]}</span><span dir="ltr">{value}%</span></div>
                        <div className="h-2 bg-[#25253f]"><div className="h-2 transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} /></div>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">{insightFor(key, value)}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl mb-2">{tx.whatMeans}</h3>
                    <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2">
                      {tierCopy[tier].means[lang].map((item) => <li key={item} className="break-words">{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">{tx.nextSteps}</h3>
                    <ol className="list-decimal list-inside text-[var(--text-secondary)] space-y-2">
                      {tierCopy[tier].steps[lang].map((item) => <li key={item} className="break-words">{item}</li>)}
                    </ol>
                  </div>
                </div>

                <div className="content-card p-4 md:p-5">
                  <h4 className="text-lg font-semibold mb-2">{lang === "he" ? "המלצה אישית מ-Foundterra" : "Personal recommendation from Foundterra"}</h4>
                  <p className="text-[var(--text-secondary)] mb-4">{tierCopy[tier].consult[lang]}</p>
                  <div className="flex flex-wrap gap-2">
                    <a href={content.cta.calendlyLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[var(--accent-purple)]">{tx.book}</a>
                    <button className="px-4 py-2 border border-[var(--bg-card-border)]" onClick={retake}>{tx.retake}</button>
                  </div>
                </div>
              </div>
            )}
          </section>


          <section className="content-card p-6 md:p-8">
            <h2 className="!text-3xl">{tx.ctaTitle}</h2>
            <p className="mt-3 text-[var(--text-secondary)] max-w-3xl">{tx.ctaBody}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={content.cta.calendlyLink} target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-[var(--accent-purple)]">{tx.book}</a>
              <a href={content.cta.calendlyLink} target="_blank" rel="noopener noreferrer" className="px-5 py-3 border border-[var(--bg-card-border)]">{tx.viewPackages}</a>
            </div>
          </section>
        </main>
        <RelatedServices />
      <Footer />
      </div>
    </>
  );
};

export default InvestorReady;
