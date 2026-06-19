import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

type ProblemItem = {
  title: string;
  description: string;
};

const EN_ITEMS: ProblemItem[] = [
  {
    title: "Your deck is not getting replies",
    description: "You need to understand whether the problem is story, traction, market size, investor fit, or timing.",
  },
  {
    title: "Investor feedback is vague",
    description: "'Too early' and 'keep us updated' usually mean something specific. You need to know what to change.",
  },
  {
    title: "Your raise takes months",
    description: "The deck, model, outreach, and answers should improve every week while you raise.",
  },
];

const HE_ITEMS: ProblemItem[] = [
  {
    title: "המצגת לא מקבלת תגובות",
    description: "צריך להבין אם הבעיה היא סיפור, טרקשן, גודל שוק, התאמת משקיע או טיימינג.",
  },
  {
    title: "הפידבק מהמשקיעים מעורפל",
    description: "'מוקדם מדי' ו-'תעדכנו אותנו' כמעט תמיד אומר משהו קונקרטי שצריך לשנות.",
  },
  {
    title: "הגיוס נמרח חודשים",
    description: "המצגת, המודל, האאוטריץ' והתשובות חייבים להשתפר כל שבוע לאורך הסבב.",
  },
];

const Problem = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";

  const title = isHebrew
    ? "רוב המייסדים המוקדמים לא מקבלים דחייה ברורה. הם נדחים בשקט."
    : "Most early founders are not rejected clearly. They are rejected quietly.";
  const subtitle = isHebrew
    ? "משקיעים כמעט לא אומרים מה באמת הבעיה. לפעמים הסיפור לא ברור, לפעמים הטרקשן לא תומך, לפעמים פונים לקרנות הלא נכונות. אנחנו מזהים ומתקנים את נקודות החולשה לפני שעוד שיחות משקיעים מתבזבזות."
    : "Investors rarely explain the real problem. Your deck might be unclear. Your traction may not support the story. Your market might feel small. Your outreach may target the wrong funds. Foundterra helps you find and fix the weak points before you waste more investor conversations.";

  const items = isHebrew ? HE_ITEMS : EN_ITEMS;
  return (
    <section className="section-padding relative">
      <div className="container-max">
        <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 gradient-text font-serif">{title}</h2>
          <p className="responsive-text-base text-muted-foreground font-body">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <Card key={item.title} className="card-elevated animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className={`p-6 sm:p-8 ${isHebrew ? "text-right" : ""}`}>
                <h3 className="text-xl font-bold mb-3 font-serif">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-body">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
