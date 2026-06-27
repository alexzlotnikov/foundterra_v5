import { useLanguage } from "@/hooks/useLanguage";
import { FAQ_CONTENT } from "@/content/faqContent";

const FAQ = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const faqs = FAQ_CONTENT[isHebrew ? "he" : "en"];

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
