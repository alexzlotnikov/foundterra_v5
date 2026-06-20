import { useLanguage } from "@/hooks/useLanguage";

const FAQ = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const faqs = isHebrew
    ? [
        ["להתחיל בדיאגנוסטיק או במנוי?", "אם לא ברור מה הבעיה, מתחילים בדיאגנוסטיק. אם נדרשת תמיכה שוטפת במהלך הגיוס, בוחרים מנוי."],
        ["המנוי כולל כתיבה מלאה של המצגת?", "לא. המנוי כולל פידבק, סקירה וליווי. בנייה מלאה היא שירות נפרד."],
        ["לכמה זמן כדאי להצטרף?", "בדרך כלל לחודשיים עד ארבעה חודשים, לאורך ההכנה, הפנייה למשקיעים ושיפור החומרים."],
        ["אתם מבטיחים תוצאות גיוס?", "לא. אנחנו משפרים מוכנות, חומרים, מסרים ותהליך, ללא הבטחת פגישות או השקעה."],
      ]
    : [
        ["Should I start with the diagnostic or subscribe?", "Start with the diagnostic if you are unsure what is wrong. Subscribe when you need ongoing support during the raise."],
        ["Do monthly plans include full deck rewriting?", "No. Monthly plans include feedback, review, and advisory support. Full deck rebuilding is a separate service."],
        ["How long should founders subscribe?", "Usually two to four months while preparing materials, launching outreach, and improving the story from feedback."],
        ["Do you guarantee fundraising results?", "No. We improve readiness, materials, messaging, and process without guaranteeing meetings or investment."],
      ];

  return (
    <section id="faq" className="section-padding scroll-mt-24">
      <div className="container-max grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
        <h2>{isHebrew ? "שאלות של יזמים לפני שמתחילים." : "Questions founders ask before working with us."}</h2>
        <div className="border-t border-white/12">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group border-b border-white/12 py-6">
              <summary className="cursor-pointer list-none text-lg font-semibold text-foreground">{question}<span className="float-end text-primary transition-transform group-open:rotate-45">+</span></summary>
              <p className="max-w-2xl pt-4 leading-7">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
