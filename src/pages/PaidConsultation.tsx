import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedServices from "@/components/RelatedServices";
import { useLanguage } from "@/hooks/useLanguage";

const PaidConsultation = () => {
  const { language, content } = useLanguage();
  const isHebrew = language === "he";
  const paypalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paypalContainerRef.current) return;

    const renderHostedButton = () => {
      const win = window as Window & {
        paypal?: {
          HostedButtons: (config: { hostedButtonId: string }) => {
            render: (selector: string) => Promise<void> | void;
          };
        };
      };

      if (!win.paypal?.HostedButtons) return false;
      paypalContainerRef.current!.innerHTML = "";
      win.paypal
        .HostedButtons({ hostedButtonId: "4Z4FYK6LEB9TQ" })
        .render("#paypal-container-4Z4FYK6LEB9TQ");
      return true;
    };

    if (renderHostedButton()) return;

    const timer = window.setInterval(() => {
      if (renderHostedButton()) window.clearInterval(timer);
    }, 250);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>{isHebrew ? "תשלום לייעוץ 1:1 | Foundterra" : "Pay for 1:1 Consultation | Foundterra"}</title>
        <meta
          name="description"
          content={
            isHebrew
              ? "שלם $250 לייעוץ אישי עם Foundterra. לאחר התשלום תועבר אוטומטית לעמוד קביעת זמן ביומן."
              : "Pay $250 for a 1:1 consultation with Foundterra. After payment, you will be redirected to a calendar booking page."
          }
        />
        <link rel="canonical" href={isHebrew ? "https://www.foundterra.com/he/paid-consultation" : "https://www.foundterra.com/paid-consultation"} />
        <script
          src="https://www.paypal.com/sdk/js?client-id=BAALg_f4pdt00DM89Q_Vbdxw5WE6phPXXwGpQRAw2Gb5sWTLKKEjtaD4FfZlOL-loELTtSxRKISWv-b3gY&components=hosted-buttons&disable-funding=venmo&currency=USD"
          async
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container-max pt-28 pb-16">
          <section className="glass-card p-8 md:p-10 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-serif mb-4">
              {isHebrew ? "ייעוץ אישי 1:1 — $250" : "1:1 Consultation — $250"}
            </h1>
            <p className="text-muted-foreground mb-3">
              {isHebrew
                ? "זהו תשלום מאובטח עבור פגישת ייעוץ אסטרטגית אישית עם צוות Foundterra."
                : "This is a secure payment for your private strategic consultation session with the Foundterra team."}
            </p>
            <p className="text-muted-foreground mb-6">
              {isHebrew
                ? "לאחר השלמת התשלום תועבר אוטומטית לעמוד יומן לקביעת הזמן שמתאים לך."
                : "After completing payment, you will be automatically redirected to a calendar page to book your preferred time."}
            </p>

            <div id="paypal-container-4Z4FYK6LEB9TQ" ref={paypalContainerRef} className="mb-6" />

            <div className="text-sm sm:text-base text-muted-foreground space-y-2">
              <p>
                {isHebrew
                  ? "לאחר התשלום תקבלו קישור אישי לקביעת פגישה עם Alex כדי לעבור על הצעדים הבאים."
                  : "After payment, you will receive a dedicated link to book a meeting with Alex and discuss next steps."}
              </p>
              <p>
                {isHebrew
                  ? "בנוסף תקבלו ממנו גם אימייל מעקב."
                  : "You will also receive an email from him."}
              </p>
              <p>
                {isHebrew ? "לשאלות: " : "Questions? Email "}
                <a href="mailto:info@foundterra.com" className="text-primary underline underline-offset-2">
                  info@foundterra.com
                </a>
              </p>
              <a
                href={content.cta.calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-primary underline underline-offset-2"
              >
                {isHebrew ? "קישור גיבוי ליומן" : "Backup calendar link"}
              </a>
            </div>
          </section>
        </main>
        <RelatedServices />
      <Footer />
      </div>
    </>
  );
};

export default PaidConsultation;
