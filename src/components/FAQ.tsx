import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

const FAQ = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";

  const t = isHebrew
    ? {
        kicker: "שאלות נפוצות",
        title: "שאלות שמייסדים שואלים לפני תשלום חודשי.",
        faqs: [
          ["להתחיל בדיאגנוסטיק של $100 או במנוי?", "אם לא ברור מה הבעיה — מתחילים בדיאגנוסטיק. אם ברור שצריך תמיכה שוטפת — הולכים על מנוי."],
          ["המנוי כולל כתיבה מלאה של המצגת?", "לא. המנוי כולל פידבק, סקירה ואדווייזורי. בנייה מלאה היא שירות נפרד החל מ-$1,500."],
          ["כמה זמן נהוג להישאר במנוי?", "בדרך כלל 2–4 חודשים: הכנה, השקת אאוטריץ', שיחות משקיעים ושיפור מתמשך."],
          ["מה כולל תמיכת צ'אט?", "שאלות טקטיות קצרות. כתיבה, מחקר, מודלים ובנייה מלאה הם עבודה נפרדת."],
          ["אפשר עזרה בניתוח פידבק ממשקיעים?", "כן. שולחים הערות/מיילי דחייה/שאלות, ומתרגמים אותן לפעולות שינוי ברורות."],
          ["אתם מבטיחים תוצאות גיוס?", "לא. השירות משפר מוכנות, חומרים ומסרים — בלי הבטחת פגישות או השקעה."],
        ],
      }
    : {
        kicker: "FAQ",
        title: "F.A.Q.",
        faqs: [
          ["Should I buy the $100 diagnostic or subscribe?", "Start with the diagnostic if you are unsure what is wrong. Subscribe if you already know you need ongoing support while preparing or raising."],
          ["Do monthly plans include full deck rewriting?", "No. Monthly plans include feedback, review, and advisory support. Full deck rebuilding is a separate service starting at $1,500."],
          ["How long should founders subscribe?", "Usually 2–4 months: while preparing the materials, launching outreach, handling investor calls, and improving the story from feedback."],
          ["What does chat support mean?", "Short tactical questions. Long reviews, rewriting, research, financial modeling, and deck building are separate work."],
          ["Can you help with investor feedback?", "Yes. Send investor notes, rejection emails, or questions they asked. The goal is to understand what the feedback likely means and what to change."],
          ["Do you guarantee fundraising results?", "No. The service improves fundraising readiness, materials, messaging, and process. It does not guarantee meetings, investment, or term sheets."],
        ],
      };

  return (
    <section id="faq" className="section-padding scroll-mt-24">
      <div className="container-max">
        <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text font-serif">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {t.faqs.map(([question, answer], index) => (
            <Card key={question} className="card-elevated animate-slide-up" style={{ animationDelay: `${index * 0.06}s` }}>
              <CardContent className={`p-6 sm:p-8 ${isHebrew ? "text-right" : ""}`}>
                <h3 className="text-xl font-bold mb-3 font-serif">{question}</h3>
                <p className="text-muted-foreground leading-relaxed font-body">{answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
