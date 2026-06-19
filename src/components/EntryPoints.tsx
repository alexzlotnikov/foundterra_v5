import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { CheckCircle2 } from "lucide-react";

const EntryPoints = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";

  const t = isHebrew
    ? {
        kicker: "תמיכה חודשית",
        title: "גיוס כמעט תמיד נמשך חודשים. התמיכה לא יכולה לעצור אחרי בדיקה אחת.",
        subtitle: "מנוי חודשי תוך כדי הכנה, השקה וניהול הסבב.",
        subscribe: "הצטרפו עכשיו",
        plans: [
          {
            badge: "מתכוננים לגיוס",
            title: "Fundraising Starter",
            price: "₪900",
            description: "ליזמים שמשפרים חומרים ומוכנות לפני אאוטריץ' משמעותי.",
            features: [
              "2 סבבי פידבק למצגת בחודש",
              "בדיקת סטטוס שבועית של 15 דקות",
              "Q&A אסינכרוני עד 5 שאלות בשבוע",
              "סקירת הודעת משקיע אחת בחודש",
              "תוכנית פעולה חודשית",
            ],
            featured: false,
            ctaHref: "/pay/subscription-300",
          },
          {
            badge: "המסלול המרכזי",
            title: "Investor-Ready Support",
            price: "₪1,500",
            description: "ליזמים שכבר התחילו אאוטריץ' או בשיחות עם משקיעים.",
            features: [
              "פידבק שבועי למצגת",
              "בדיקת סטטוס שבועית של 30 דקות",
              "Q&A בעדיפות גבוהה עד 10 שאלות בשבוע",
              "עד 4 סקירות שיחות/דחיות משקיעים בחודש",
              "2 סקירות אאוטריץ' משקיעים בחודש",
              "תוכנית פעולה חודשית",
            ],
            featured: true,
            ctaHref: "/pay/subscription-500",
          },
          {
            badge: "סבב פעיל",
            title: "Active Raise Partner",
            price: "₪3,000",
            description: "ליזמים שכבר בפגישות פעילות ומנהלים פולואפים.",
            features: [
              "שיחת ייעוץ שבועית של 60 דקות",
              "פידבק שבועי על איטרציות מצגת",
              "Q&A אסינכרוני בעדיפות גבוהה ללא הגבלה",
              "עד 8 סקירות שיחות/דחיות משקיעים בחודש",
              "סקירת CRM ופאנל גיוס",
              "אסטרטגיית טרגוט משקיעים",
              "תרגול פיץ' פעמיים בחודש",
              "סקירת מוכנות דאטה רום חודשית",
              "סקירת עדכון משקיעים חודשי",
            ],
            featured: false,
            ctaHref: "/pay/subscription-1000",
          },
        ],
      }
    : {
        kicker: "Monthly support",
        title: "Fundraising usually takes months. Your support should not stop after one deck review.",
        subtitle: "Subscribe while you prepare, launch, and manage the raise. Every plan is designed around a different stage of the fundraising process.",
        subscribe: "Subscribe Now",
        plans: [
          {
            badge: "Prepare to raise",
            title: "Fundraising Starter",
            price: "$300",
            description: "For founders improving their deck and investor readiness before serious outreach.",
            features: [
              "2 deck feedback rounds per month",
              "Weekly 15-minute fundraising check-in",
              "Async Q&A, up to 5 questions per week",
              "1 investor message review per month",
              "Monthly action plan",
            ],
            featured: false,
            ctaHref: "/pay/subscription-300",
          },
          {
            badge: "Most Popular",
            title: "Investor-Ready Support",
            price: "$500",
            description: "For founders starting outreach or already speaking with investors.",
            features: [
              "Weekly pitch deck feedback",
              "Weekly 30-minute fundraising check-in",
              "Priority async Q&A, up to 10 questions per week",
              "Up to 4 investor meeting or rejection reviews per month",
              "2 investor outreach reviews per month",
              "Monthly action plan",
            ],
            featured: true,
            ctaHref: "/pay/subscription-500",
          },
          {
            badge: "Active raise",
            title: "Active Raise Partner",
            price: "$1,000",
            description: "For founders already taking investor meetings and managing follow-ups.",
            features: [
              "Weekly 60-minute advisory call",
              "Weekly deck iteration feedback",
              "Unlimited priority async Q&A",
              "Up to 8 investor meeting or rejection reviews per month",
              "Investor CRM and funnel review",
              "Investor targeting strategy",
              "Pitch practice twice per month",
              "Monthly data room readiness review",
              "Monthly investor newsletter update review",
            ],
            featured: false,
            ctaHref: "/pay/subscription-1000",
          },
        ],
      };

  return (
    <section id="plans" className="section-padding scroll-mt-24">
      <div className="container-max">
        <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto rounded-2xl border border-primary/20 bg-[linear-gradient(135deg,rgba(124,58,237,0.16)_0%,rgba(124,58,237,0.04)_100%)] p-6 sm:p-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 gradient-text font-serif">{t.title}</h2>
          <p className="responsive-text-base text-muted-foreground font-body">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {t.plans.map((plan, index) => (
            <Card
              key={plan.title}
              className={`card-elevated animate-slide-up flex flex-col relative overflow-hidden ${
                plan.featured
                  ? "border-primary/70 ring-2 ring-primary/35 shadow-[0_16px_50px_rgba(124,58,237,0.35)] lg:-translate-y-2"
                  : "border-primary/25"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.featured && <div className="absolute inset-x-0 top-0 h-1.5 hero-gradient" aria-hidden="true" />}
              <CardContent className={`p-6 sm:p-8 flex flex-col h-full ${isHebrew ? "text-right" : ""}`}>
                <span className="w-fit px-3 py-1 rounded-full bg-primary/15 text-primary text-xs tracking-wide uppercase font-semibold mb-4">{plan.badge}</span>
                <h3 className="text-2xl font-bold mb-2 font-serif">{plan.title}</h3>
                <p className="text-4xl font-bold gradient-text mb-4">{plan.price}<span className="text-base text-muted-foreground">{isHebrew ? "/חודש" : "/month"}</span></p>
                <p className="text-muted-foreground mb-5 font-body">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant={plan.featured ? "hero" : "outline"} className="w-full mt-auto whitespace-normal leading-snug min-h-12 py-3">
                  <a href={plan.ctaHref}>{t.subscribe}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EntryPoints;
