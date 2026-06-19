import { useEffect, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";
import { useLanguage } from "@/hooks/useLanguage";

type CheckoutConfig = {
  title: string;
  subtitle: string;
  descriptionEn: string;
  descriptionHe: string;
  mode: "subscription" | "hosted_button";
  hostedButtonId?: string;
  planId?: string;
  clientId: string;
};

type PayPalActions = {
  subscription: { create: (options: { plan_id?: string }) => Promise<string> | string };
};

type PayPalApi = {
  HostedButtons: (config: { hostedButtonId?: string }) => { render: (target: HTMLElement) => void };
  Buttons: (config: {
    style: { shape: string; color: string; layout: string; label: string };
    createSubscription: (_data: unknown, actions: PayPalActions) => Promise<string> | string;
  }) => { render: (target: HTMLElement) => void };
};

const ONE_TIME_CLIENT_ID = "BAALg_f4pdt00DM89Q_Vbdxw5WE6phPXXwGpQRAw2Gb5sWTLKKEjtaD4FfZlOL-loELTtSxRKISWv-b3gY";
const SUBSCRIPTION_CLIENT_ID = "AVZ2SWVdIkzPSWFnKHCrMuXV2_iBe07YhUwqwUpTN243w8dXMxofdb7n-UGYESrHjPZl5TrKwEJ-zfl-";

const CHECKOUTS: Record<string, CheckoutConfig> = {
  "pitch-deck-review": {
    title: "Pitch Deck Diagnostic — $100",
    subtitle: "Secure one-time PayPal payment for your pitch deck diagnostic.",
    descriptionEn:
      "A one-time review for founders who are not sure whether they need small fixes, monthly support, or a full deck rebuild.",
    descriptionHe:
      "בדיקה חד-פעמית ליזמים שלא בטוחים אם צריך תיקונים קטנים, מנוי חודשי או בנייה מחדש מלאה.",
    mode: "hosted_button",
    hostedButtonId: "4Z4FYK6LEB9TQ",
    clientId: ONE_TIME_CLIENT_ID,
  },
  "subscription-300": {
    title: "Fundraising Starter — $300/month",
    subtitle: "Secure PayPal subscription checkout.",
    descriptionEn: "For founders improving their deck and investor readiness before serious outreach.",
    descriptionHe: "ליזמים שמשפרים חומרים ומוכנות לפני אאוטריץ' משמעותי.",
    mode: "subscription",
    planId: "P-5VJ08946PJ297241ENHXYISA",
    clientId: SUBSCRIPTION_CLIENT_ID,
  },
  "subscription-500": {
    title: "Investor-Ready Support — $500/month",
    subtitle: "Secure PayPal subscription checkout.",
    descriptionEn: "For founders starting outreach or already speaking with investors.",
    descriptionHe: "ליזמים שכבר התחילו אאוטריץ' או בשיחות עם משקיעים.",
    mode: "subscription",
    planId: "P-2ES992737D663040RNHXYKRY",
    clientId: SUBSCRIPTION_CLIENT_ID,
  },
  "subscription-1000": {
    title: "Active Raise Partner — $1,000/month",
    subtitle: "Secure PayPal subscription checkout.",
    descriptionEn: "For founders already taking investor meetings and managing follow-ups.",
    descriptionHe: "ליזמים שכבר בפגישות פעילות ומנהלים פולואפים.",
    mode: "subscription",
    planId: "P-6DK88186011743254NHXYMCY",
    clientId: SUBSCRIPTION_CLIENT_ID,
  },
  "pitch-deck-creation": {
    title: "Investor-Ready Pitch Deck Creation — $1,500",
    subtitle: "Secure one-time PayPal payment for full deck creation.",
    descriptionEn:
      "Full strategic rewrite and rebuild of your pitch deck, focused on investor logic, narrative, slide structure, clarity, and fundraising readiness.",
    descriptionHe:
      "כתיבה מחדש ובנייה מלאה של המצגת סביב לוגיקת משקיע, נרטיב, מבנה שקופיות ובהירות.",
    mode: "hosted_button",
    hostedButtonId: "6EYTHM7EMSBFS",
    clientId: ONE_TIME_CLIENT_ID,
  },
};

const Checkout = () => {
  const { checkoutId } = useParams();
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const containerRef = useRef<HTMLDivElement>(null);
  const config = useMemo(() => (checkoutId ? CHECKOUTS[checkoutId] : undefined), [checkoutId]);

  useEffect(() => {
    if (!config || !containerRef.current) return;

    const targetEl = containerRef.current;
    if (!targetEl) return;

    const script = document.createElement("script");
    script.src =
      config.mode === "subscription"
        ? `https://www.paypal.com/sdk/js?client-id=${config.clientId}&vault=true&intent=subscription`
        : `https://www.paypal.com/sdk/js?client-id=${config.clientId}&components=hosted-buttons&disable-funding=venmo&currency=USD`;
    script.async = true;
    script.dataset.sdkIntegrationSource = "button-factory";

    const renderButtons = () => {
      const paypalApi = (window as Window & { paypal?: PayPalApi }).paypal;
      if (!paypalApi) return;

      targetEl.innerHTML = "";

      if (config.mode === "hosted_button") {
        paypalApi.HostedButtons({ hostedButtonId: config.hostedButtonId }).render(targetEl);
        return;
      }

      paypalApi
        .Buttons({
          style: { shape: "pill", color: "gold", layout: "vertical", label: "subscribe" },
          createSubscription: (_data: unknown, actions: PayPalActions) =>
            actions.subscription.create({
              plan_id: config.planId,
            }),
        })
        .render(targetEl);
    };

    script.onload = renderButtons;
    document.body.appendChild(script);

    return () => {
      targetEl.innerHTML = "";
      script.remove();
    };
  }, [config]);

  if (!config) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{config.title} | Foundterra</title>
        <meta name="description" content={config.subtitle} />
      </Helmet>

      <Header />
      <main className="container-max pt-28 pb-20">
        <section className={`max-w-2xl mx-auto glass-card p-8 sm:p-10 text-center ${isHebrew ? "text-right" : ""}`}>
          <h1 className="text-3xl sm:text-5xl font-serif mb-4">{config.title}</h1>
          <p className="text-muted-foreground mb-4">
            {isHebrew ? config.descriptionHe : config.descriptionEn}
          </p>
          <p className="text-muted-foreground mb-8">{isHebrew ? "תשלום מאובטח דרך PayPal." : config.subtitle}</p>
          <div ref={containerRef} className="mb-8" />
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
