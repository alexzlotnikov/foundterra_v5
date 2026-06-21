export type DeckSlide = {
  src: string;
  topic: string;
  topicHe: string;
  alt: string;
  altHe: string;
  row: 0 | 1;
  priority: boolean;
};

export const deckSlides: DeckSlide[] = [
  { src: "/carousel/slide-01.avif", topic: "Why now?", topicHe: "למה עכשיו?", alt: "Investor-ready why-now slide showing enterprise AI adoption reaching an infrastructure threshold", altHe: "שקף למה עכשיו המציג את המעבר של אימוץ AI ארגוני לסף תשתיתי", row: 0, priority: false },
  { src: "/carousel/slide-02.avif", topic: "Problem", topicHe: "הבעיה", alt: "Problem slide connecting manual diligence to eleven days of deal delay", altHe: "שקף בעיה המחבר בין בדיקת נאותות ידנית לעיכוב של 11 ימים בעסקה", row: 0, priority: false },
  { src: "/carousel/slide-03.avif", topic: "Existing workflow", topicHe: "התהליך הקיים", alt: "Workflow slide showing context lost between five disconnected tools", altHe: "שקף תהליך המציג אובדן הקשר בין חמישה כלים מנותקים", row: 0, priority: false },
  { src: "/carousel/slide-04.avif", topic: "Solution", topicHe: "הפתרון", alt: "Solution slide turning scattered inputs into an investment decision", altHe: "שקף פתרון ההופך מקורות מידע מפוזרים להחלטת השקעה", row: 0, priority: false },
  { src: "/carousel/slide-05.avif", topic: "Product workflow", topicHe: "תהליך המוצר", alt: "Product workflow slide moving from source connection to an investment memo", altHe: "שקף תהליך מוצר מחיבור מקורות ועד מזכר השקעה", row: 0, priority: false },
  { src: "/carousel/slide-06.avif", topic: "Customer ROI", topicHe: "החזר ללקוח", alt: "Customer ROI slide showing a fifty-one day payback period", altHe: "שקף החזר ללקוח המציג תקופת החזר של 51 ימים", row: 0, priority: false },
  { src: "/carousel/slide-07.avif", topic: "Market size", topicHe: "גודל שוק", alt: "Bottom-up market sizing slide showing a reachable 680 million dollar initial market", altHe: "שקף גודל שוק מלמטה למעלה המציג שוק התחלתי נגיש של 680 מיליון דולר", row: 0, priority: false },
  { src: "/carousel/slide-08.avif", topic: "Market expansion", topicHe: "התרחבות השוק", alt: "Market expansion slide showing how the initial segment grows into adjacent workflows", altHe: "שקף התרחבות שוק המציג צמיחה מהפלח הראשוני לתהליכים סמוכים", row: 0, priority: false },
  { src: "/carousel/slide-09.avif", topic: "Business model", topicHe: "מודל עסקי", alt: "Business model slide showing land-and-expand pricing tiers", altHe: "שקף מודל עסקי המציג מדרגות תמחור והתרחבות", row: 1, priority: false },
  { src: "/carousel/slide-10.avif", topic: "Traction", topicHe: "צמיחה", alt: "Traction slide showing expansion revenue driving sixty-one percent of growth", altHe: "שקף צמיחה המציג הכנסות מהתרחבות כמקור ל-61 אחוז מהצמיחה", row: 1, priority: true },
  { src: "/carousel/slide-11.avif", topic: "Retention", topicHe: "שימור", alt: "Retention slide comparing portfolio expansion with market benchmarks", altHe: "שקף שימור המשווה התרחבות לקוחות למדדי שוק", row: 1, priority: false },
  { src: "/carousel/slide-12.avif", topic: "Go-to-market", topicHe: "חדירה לשוק", alt: "Go-to-market slide outlining the path from design partners to category leadership", altHe: "שקף חדירה לשוק המתאר את הדרך משותפי פיתוח להובלת קטגוריה", row: 1, priority: false },
  { src: "/carousel/slide-13.avif", topic: "Competition", topicHe: "תחרות", alt: "Competitive positioning map for regulated mid-market teams", altHe: "מפת מיצוב תחרותי לצוותי מיד-מרקט מפוקחים", row: 1, priority: false },
  { src: "/carousel/slide-14.avif", topic: "Defensibility", topicHe: "יתרון בר-הגנה", alt: "Defensibility slide showing the compounding evidence graph", altHe: "שקף יתרון בר-הגנה המציג גרף מידע שמשתפר עם כל החלטה", row: 1, priority: false },
  { src: "/carousel/slide-15.avif", topic: "Financial trajectory", topicHe: "תחזית פיננסית", alt: "Financial trajectory slide showing revenue growth outpacing operating expense", altHe: "שקף תחזית פיננסית המציג צמיחת הכנסות מהירה מהוצאות תפעול", row: 1, priority: false },
  { src: "/carousel/slide-16.avif", topic: "The round", topicHe: "סבב הגיוס", alt: "Use-of-funds slide linking an 1.8 million dollar round to eighteen-month milestones", altHe: "שקף שימוש בכספי הגיוס המחבר סבב של 1.8 מיליון דולר לאבני דרך ל-18 חודשים", row: 1, priority: false },
];
