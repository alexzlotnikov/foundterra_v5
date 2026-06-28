import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { localizedPath } from "@/utils/localizedPath";
import {
  Activity,
  Check,
  Compass,
  Radio,
  RefreshCw,
  Rocket,
  Send,
  Target,
  type LucideIcon,
} from "lucide-react";

type Plan = {
  badge: string;
  title: string;
  price: string;
  description: string;
  result: string;
  features: string[];
  featured: boolean;
  cta: string;
  ctaHref: string;
  icon: LucideIcon;
  includesPrevious?: string;
};

const EntryPoints = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";

  const t: {
    title: string;
    subtitle: string;
    process: Array<[string, LucideIcon]>;
    resultLabel: string;
    plans: Plan[];
    disclaimer: string;
    supportNote: string;
  } = isHebrew
    ? {
        title: "גיוס נמשך חודשים. התמיכה לא צריכה לעצור אחרי בדיקת מצגת אחת.",
        subtitle: "בחרו את השלב שלכם וקבלו עזרה בטירגוט משקיעים, פניות, עדכוני מצגת, פולואפים והחלטות במהלך הגיוס.",
        process: [
          ["בוחרים כיוון למשקיעים", Compass],
          ["פונים עם המסר הנכון", Send],
          ["בודקים את תגובות המשקיעים", Activity],
          ["משפרים ומתקדמים", RefreshCw],
        ],
        resultLabel: "התוצאה",
        plans: [
          {
            badge: "מתכוננים לגיוס",
            title: "First Raise Batch",
            price: "₪900",
            description: "ליזמים שמתכוננים להתחיל פנייה למשקיעים.",
            result: "להתחיל עם המשקיעים הנכונים והמסר הראשון הנכון.",
            features: [
              "30 משקיעים יעד",
              "אימייל קר, הודעת LinkedIn ונוסח לאינטרו",
              "בדיקת כשירות של המצגת והמסר לשליחה",
              "שיחה חודשית אחת",
              "תמיכה בצ׳אט לשאלות קצרות",
            ],
            featured: false,
            cta: "התחילו את מקבץ הגיוס הראשון",
            ctaHref: "/pay/subscription-300",
            icon: Rocket,
          },
          {
            badge: "הכי פופולרי",
            title: "Raise Advisor",
            price: "₪1,500",
            description: "ליזמים שמתכוננים לפנייה רצינית או כבר פונים למשקיעים.",
            result: "לשפר את הפניות מדי חודש לפי תגובות אמיתיות ממשקיעים.",
            features: [
              "50 משקיעים יעד או ניקוי הרשימה הקיימת",
              "שיפור הודעות פנייה ופולואפ",
              "סקירת תגובות: תשובות, שתיקה והתנגדויות",
              "עדכון מצגת חודשי",
              "2 שיחות חודשיות + תמיכה שוטפת בצ׳אט",
            ],
            featured: true,
            cta: "קבלו ייעוץ גיוס חודשי",
            ctaHref: "/pay/subscription-500",
            icon: Target,
          },
          {
            badge: "גיוס פעיל",
            title: "Active Raise Advisor",
            price: "₪3,000",
            description: "ליזמים עם תגובות, שיחות, פידבק או בקשות לדאטה רום.",
            result: "לנהל שיחות עם משקיעים עם צעדים ברורים וחומרים טובים יותר.",
            includesPrevious: "כולל את כל מה שב־Raise Advisor, ובנוסף:",
            features: [
              "סקירת גיוס שבועית ותכנון הצעד הבא",
              "הכנה לשיחות ועזרה בהתנגדויות",
              "עדכון מצגת פעמיים בחודש",
              "צ׳קליסט דאטה רום ומעקב בקשות",
              "שיחה שבועית + תמיכה בעדיפות גבוהה בצ׳אט",
            ],
            featured: false,
            cta: "קבלו תמיכה בגיוס פעיל",
            ctaHref: "/pay/subscription-1000",
            icon: Radio,
          },
        ],
        disclaimer: "ללא הבטחת גיוס. ללא אינטרואים בתשלום. ללא עמלות הצלחה.",
        supportNote: "אם החומרים שלכם לא מוכנים, אגיד לכם ישירות לפני שתבזבזו זמן של משקיעים.",
      }
    : {
        title: "Fundraising takes months. Your support should not stop after one deck review.",
        subtitle: "Choose the stage you are in. Get help with investor targeting, outreach, deck updates, follow-ups, and active raise decisions.",
        process: [
          ["Choose investor direction", Compass],
          ["Reach out with the right message", Send],
          ["Review investor signals", Activity],
          ["Improve and move forward", RefreshCw],
        ],
        resultLabel: "Result",
        plans: [
          {
            badge: "Prepare to raise",
            title: "First Raise Batch",
            price: "$300",
            description: "For founders preparing to start outreach.",
            result: "Start with the right investors and the right first message.",
            features: [
              "30 investor targets",
              "Cold email, LinkedIn message, and intro blurb",
              "Sendability check on your deck and message",
              "1 monthly call",
              "Chat support for quick questions",
            ],
            featured: false,
            cta: "Start my first raise batch",
            ctaHref: "/pay/subscription-300",
            icon: Rocket,
          },
          {
            badge: "Most popular",
            title: "Raise Advisor",
            price: "$500",
            description: "For founders preparing serious outreach or already contacting investors.",
            result: "Improve your outreach each month based on real investor signals.",
            features: [
              "50 investor targets or cleanup of your current list",
              "Outreach and follow-up message improvements",
              "Investor signal review: replies, silence, objections",
              "Monthly pitch deck update",
              "2 monthly calls + ongoing chat support",
            ],
            featured: true,
            cta: "Get monthly raise advice",
            ctaHref: "/pay/subscription-500",
            icon: Target,
          },
          {
            badge: "Active raise",
            title: "Active Raise Advisor",
            price: "$1,000",
            description: "For founders with investor replies, calls, feedback, or data room requests.",
            result: "Manage investor conversations with clearer next steps and better materials.",
            includesPrevious: "Includes everything in Raise Advisor, plus:",
            features: [
              "Weekly raise review and next-step planning",
              "Investor call prep and objection help",
              "Pitch deck updated twice per month",
              "Data room checklist and request tracker",
              "Weekly call + priority chat support",
            ],
            featured: false,
            cta: "Get active raise support",
            ctaHref: "/pay/subscription-1000",
            icon: Radio,
          },
        ],
        disclaimer: "No guaranteed funding. No paid introductions. No success fees.",
        supportNote: "If your materials are not ready, I will tell you directly before you waste investor time.",
      };

  return (
    <section id="plans" className="pricing-section section-padding scroll-mt-24">
      <div className="container-max">
        <header className={`pricing-header ${isHebrew ? "text-right" : "text-left"}`}>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </header>

        <ol className="pricing-process" aria-label={isHebrew ? "תהליך ליווי הגיוס" : "Fundraising support process"}>
          {t.process.map(([label, Icon], index) => (
            <li key={label}>
              <span><Icon aria-hidden="true" /></span>
              <div><small>0{index + 1}</small><strong>{label}</strong></div>
            </li>
          ))}
        </ol>

        <div className="pricing-grid">
          {t.plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <article className={`pricing-card ${plan.featured ? "is-featured" : ""}`} key={plan.title}>
                <span className="pricing-badge">{plan.badge}</span>
                <div className="pricing-title">
                  <span><Icon aria-hidden="true" /></span>
                  <h3>{plan.title}</h3>
                </div>
                <p className="pricing-price">{plan.price}<span>{isHebrew ? "/חודש" : "/month"}</span></p>
                <p className="pricing-description">{plan.description}</p>
                <div className="pricing-result"><small>{t.resultLabel}</small><strong>{plan.result}</strong></div>
                {plan.includesPrevious && <p className="pricing-includes-previous">{plan.includesPrevious}</p>}
                <ul>
                  {plan.features.map((feature) => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}
                </ul>
                <Button asChild variant={plan.featured ? "hero" : "outline"} className="mt-auto min-h-12 w-full whitespace-normal py-3 leading-snug">
                  <a href={localizedPath(plan.ctaHref, language)}>{plan.cta}</a>
                </Button>
              </article>
            );
          })}
        </div>

        <div className="pricing-note">
          <strong>{t.disclaimer}</strong>
          <span>{t.supportNote}</span>
        </div>
      </div>
    </section>
  );
};

export default EntryPoints;
