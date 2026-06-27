import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { localizedPath } from "@/utils/localizedPath";
import { calculateFundraisingWaste, clamp } from "@/utils/fundraisingCalculator";

const parseCurrency = (value: string) => Number(value.replace(/[^\d.]/g, ""));

const FundraisingWasteCalculator = () => {
  const { language, content } = useLanguage();
  const isHebrew = language === "he";
  const locale = isHebrew ? "he-IL" : "en-US";
  const Arrow = isHebrew ? ArrowLeft : ArrowRight;
  const [hourlyValue, setHourlyValue] = useState(100);
  const [roundSize, setRoundSize] = useState(1_000_000);
  const [hourlyDraft, setHourlyDraft] = useState("$100");
  const [roundDraft, setRoundDraft] = useState("$1,000,000");
  const result = useMemo(() => calculateFundraisingWaste(hourlyValue, roundSize), [hourlyValue, roundSize]);
  const money = (value: number) => new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

  const t = isHebrew ? {
    title: "כמה הגיוס כבר עולה לכם?",
    subtitle: "רוב היזמים חושבים שלהכין את הגיוס לבד זה בחינם. בפועל זה עולה בזמן, במומנטום ובצמיחה שהוחמצה.",
    hourlyLabel: "כמה שווה שעה אחת מזמן היזם שלכם?",
    roundLabel: "כמה אתם מגייסים?",
    cards: [
      ["שעות יזם שאבדו", "זמן לחומרים, מחקר, פניות, הכנה למשקיעים ופגישות לא מתאימות."],
      ["עלות הזמן שלכם", "עבודה עצמית אינה בחינם. משלמים עליה בזמן יזם."],
      ["הזדמנות צמיחה שהוחמצה", "זמן גיוס אינו זמן למכירות, מוצר, גיוס עובדים, לקוחות או שותפויות."],
      ["עלות Foundterra", "תמיכה במחיר קבוע לחומרים, מחקר משקיעים, אסטרטגיה ומוכנות."],
    ],
    sentence: "לעשות הכול לבד עשוי להיראות זול יותר, אבל זמן היזם הוא המשאב היקר ביותר בחברה.",
    bars: ["עלות זמן היזם", "צמיחה שהוחמצה", "יועץ עמלת הצלחה של 5% (הערכה)", "תמיכת Foundterra במחיר קבוע"],
    savingsDiy: "חיסכון פוטנציאלי לעומת עבודה עצמית",
    savingsAdvisor: "חיסכון פוטנציאלי לעומת עמלת הצלחה של 5%",
    where: "לאן הולך הזמן?",
    why: "למה צמיחה שהוחמצה חשובה",
    whyText: "כל שעה שמושקעת בתיקון חומרי גיוס אינה מושקעת במכירות, מוצר, לקוחות, גיוס עובדים או שותפויות. המחשבון מעריך את הזדמנות הצמיחה שהוחמצה כ־1.5× מהערך הישיר של זמן היזם.",
    categories: ["מצגת וסיפור גיוס", "מודל פיננסי", "מחקר שוק ומתחרים", "מחקר משקיעים", "הכנת פניות", "שאלות משקיעים ומעקב", "פגישות לא מתאימות ושיחות מבוזבזות"],
    founderTime: "מזמן היזם",
    comparisonTitle: "Foundterra מספקת את שכבת הגיוס בלי לשרוף זמן יזם.",
    materials: "חבילת חומרים",
    monthly: "ליווי חודשי",
    includes: ["מצגת וסיפור גיוס", "תמיכה במודל פיננסי", "מחקר שוק ומתחרים", "מחקר וטירגוט משקיעים", "אסטרטגיית פניות", "הכנה לשאלות משקיעים", "מוכנות דאטה רום"],
    primary: "חסכו זמן יזם עם Foundterra",
    secondary: "קבעו בדיקת גיוס",
    disclaimer: "המחשבון הוא הערכה המבוססת על הנתונים שהזנתם ועל הנחות מפושטות. הוא אינו מבטיח תוצאות גיוס. Foundterra מספקת חומרים, מחקר, אסטרטגיה וליווי ואינה מוכרת ניירות ערך או גובה עמלת הצלחה.",
  } : {
    title: "How much is fundraising already costing you?",
    subtitle: "Most founders think preparing the raise themselves is free. It is not. It costs time, momentum, and missed growth.",
    hourlyLabel: "What is one hour of your founder time worth?",
    roundLabel: "How much are you raising?",
    cards: [
      ["Founder hours lost", "Time spent on materials, research, outreach, investor prep, and avoidable bad-fit meetings."],
      ["Cost of your time", "Doing it yourself is not free. You pay with founder time."],
      ["Lost growth opportunity", "Time not spent on sales, product, hiring, customers, or partnerships."],
      ["Foundterra cost", "Fixed support for materials, investor research, strategy, and raise readiness."],
    ],
    sentence: "Doing it yourself may look cheaper, but your time is the most expensive resource in the company.",
    bars: ["Founder time cost", "Lost growth opportunity", "5% success-fee advisor (estimate)", "Foundterra fixed support"],
    savingsDiy: "Potential savings versus doing it yourself",
    savingsAdvisor: "Potential savings versus a 5% success-fee advisor",
    where: "Where does the time go?",
    why: "Why lost growth matters",
    whyText: "Every hour spent fixing fundraising materials is an hour not spent on sales, product, customers, hiring, or partnerships. The calculator estimates lost growth opportunity as 1.5× the direct value of founder time.",
    categories: ["Pitch deck and fundraising story", "Financial model", "Market and competitor research", "Investor research", "Outreach preparation", "Investor Q&A and follow-ups", "Bad-fit meetings and wasted calls"],
    founderTime: "of founder time",
    comparisonTitle: "Foundterra gives you the fundraising layer without burning founder time.",
    materials: "Materials package",
    monthly: "Monthly support",
    includes: ["Pitch deck and fundraising story", "Financial model support", "Market and competitor research", "Investor research and targeting", "Outreach strategy", "Investor Q&A preparation", "Data room readiness"],
    primary: "Save founder time with Foundterra",
    secondary: "Book a fundraising review",
    disclaimer: "This calculator is an estimate based on your inputs and simplified assumptions. It does not guarantee fundraising outcomes. Foundterra provides fundraising materials, research, strategy, and support. Foundterra does not sell securities or charge a success fee.",
  };

  const commitInput = (type: "hourly" | "round") => {
    if (type === "hourly") {
      const next = clamp(parseCurrency(hourlyDraft), 0, 1_000);
      setHourlyValue(next);
      setHourlyDraft(money(next));
    } else {
      const next = clamp(parseCurrency(roundDraft), 100_000, 20_000_000);
      setRoundSize(next);
      setRoundDraft(money(next));
    }
  };

  const barValues = [result.founderTimeCost, result.lostGrowth, result.advisorCost, result.foundterraCost];
  const barMax = Math.max(...barValues, 1);

  return (
    <section id="calculator" className="calculator-section section-padding scroll-mt-24">
      <div className="container-max">
        <div className={`calculator-shell ${isHebrew ? "text-right" : "text-left"}`} dir={isHebrew ? "rtl" : "ltr"}>
          <header className="max-w-4xl">
            <h2>{t.title}</h2>
            <p>{t.subtitle}</p>
          </header>

          <div className="calculator-inputs">
            {[
              { id: "hourly-value", label: t.hourlyLabel, min: 0, max: 1_000, step: 10, value: hourlyValue, draft: hourlyDraft, setDraft: setHourlyDraft, type: "hourly" as const, setValue: setHourlyValue },
              { id: "round-size", label: t.roundLabel, min: 100_000, max: 20_000_000, step: 50_000, value: roundSize, draft: roundDraft, setDraft: setRoundDraft, type: "round" as const, setValue: setRoundSize },
            ].map((input) => (
              <div className="calculator-input-group" key={input.id}>
                <div className="calculator-input-heading">
                  <label htmlFor={`${input.id}-text`}>{input.label}</label>
                  <input id={`${input.id}-text`} inputMode="numeric" value={input.draft} onChange={(event) => input.setDraft(event.target.value)} onBlur={() => commitInput(input.type)} onKeyDown={(event) => { if (event.key === "Enter") event.currentTarget.blur(); }} />
                </div>
                <input id={input.id} aria-label={input.label} type="range" min={input.min} max={input.max} step={input.step} value={input.value} onChange={(event) => { const next = Number(event.target.value); input.setValue(next); input.setDraft(money(next)); }} />
                <div className="calculator-range-labels"><span>{money(input.min)}</span><span>{money(input.max)}</span></div>
              </div>
            ))}
          </div>

          <div className="calculator-results" aria-live="polite">
            {[result.founderHours, result.founderTimeCost, result.lostGrowth, result.foundterraCost].map((value, index) => (
              <article key={t.cards[index][0]}>
                <h3>{t.cards[index][0]}</h3>
                <strong>{index === 0 ? value.toLocaleString(locale) : money(value)}</strong>
                <p>{t.cards[index][1]}</p>
              </article>
            ))}
          </div>

          <p className="calculator-emphasis">{t.sentence}</p>

          <div className="calculator-comparison">
            <div className="calculator-bars">
              {barValues.map((value, index) => (
                <div className="calculator-bar-row" key={t.bars[index]}>
                  <div><span>{t.bars[index]}</span><strong>{money(value)}</strong></div>
                  <span className={`calculator-bar ${index === 3 ? "is-foundterra" : ""}`}><i style={{ width: `${Math.max(2, (value / barMax) * 100)}%` }} /></span>
                </div>
              ))}
            </div>
            <div className="calculator-savings">
              <div><span>{t.savingsDiy}</span><strong>{money(result.savingsVsDiy)}</strong></div>
              <div><span>{t.savingsAdvisor}</span><strong>{money(result.savingsVsAdvisor)}</strong></div>
            </div>
          </div>

          <div className="calculator-details">
            <details>
              <summary>{t.where}<ChevronDown aria-hidden="true" /></summary>
              <div className="calculator-workload">
                {t.categories.map((category, index) => (
                  <div key={category}><span>{category}</span><strong>{result.workloadHours[index]} {isHebrew ? "שעות" : "hours"}</strong><small>{money(result.workloadHours[index] * hourlyValue)} {t.founderTime}</small></div>
                ))}
              </div>
            </details>
            <details>
              <summary>{t.why}<ChevronDown aria-hidden="true" /></summary>
              <p>{t.whyText}</p>
            </details>
          </div>

          <div className="calculator-offer">
            <div><h3>{t.comparisonTitle}</h3><div className="calculator-prices"><span><strong>$5,000</strong>{t.materials}</span><span><strong>$1,000/mo</strong>{t.monthly}</span></div></div>
            <ul>{t.includes.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
            <div className="calculator-actions">
              <a className="calculator-primary" href={localizedPath("/pay/pitch-deck-review", language)}>{t.primary}<Arrow aria-hidden="true" /></a>
              <a className="calculator-secondary" href={content.cta.calendlyLink} target="_blank" rel="noreferrer">{t.secondary}<Arrow aria-hidden="true" /></a>
            </div>
          </div>
          <p className="calculator-disclaimer">{t.disclaimer}</p>
        </div>
      </div>
    </section>
  );
};

export default FundraisingWasteCalculator;
