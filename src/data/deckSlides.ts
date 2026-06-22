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
  { src: "/carousel/slide-01.avif", topic: "Problem", topicHe: "הבעיה", alt: "Editorial problem slide showing the gap between operating evidence and investor confidence", altHe: "שקף בעיה עריכתי המציג את הפער בין ראיות תפעוליות לביטחון המשקיע", row: 0, priority: false },
  { src: "/carousel/slide-02.avif", topic: "Economic impact", topicHe: "השפעה כלכלית", alt: "Comparison slide showing how structured evidence shortens decision time", altHe: "שקף השוואה המציג כיצד ראיות מובנות מקצרות את זמן ההחלטה", row: 0, priority: false },
  { src: "/carousel/slide-03.avif", topic: "Solution", topicHe: "הפתרון", alt: "Solution slide combining a fundraising workspace with a three-step process", altHe: "שקף פתרון המשלב סביבת עבודה לגיוס עם תהליך בן שלושה שלבים", row: 0, priority: false },
  { src: "/carousel/slide-04.avif", topic: "Product", topicHe: "המוצר", alt: "Product-led slide showing a fundraising dashboard and contextual metric cards", altHe: "שקף מוצר המציג לוח גיוס וכרטיסי מדדים בהקשר", row: 0, priority: false },
  { src: "/carousel/slide-05.avif", topic: "Product workflow", topicHe: "תהליך המוצר", alt: "Four-stage product workflow from deck upload to a meeting-ready pitch", altHe: "תהליך מוצר בן ארבעה שלבים מהעלאת המצגת ועד פיץ' מוכן לפגישה", row: 0, priority: false },
  { src: "/carousel/slide-06.avif", topic: "Founder experience", topicHe: "חוויית היזם", alt: "Mobile product slide showing how founders review and improve their raise", altHe: "שקף מוצר מובייל המציג כיצד יזמים בודקים ומשפרים את הגיוס", row: 0, priority: false },
  { src: "/carousel/slide-07.avif", topic: "Why now", topicHe: "למה עכשיו", alt: "Sparse why-now slide explaining greater scrutiny, longer cycles, and better tooling", altHe: "שקף למה עכשיו המסביר על בדיקה מחמירה, סבבים ארוכים וכלים טובים יותר", row: 0, priority: false },
  { src: "/carousel/slide-08.avif", topic: "Market", topicHe: "השוק", alt: "Market-stat slide defining a focused initial fundraising advisory market", altHe: "שקף נתוני שוק המגדיר שוק התחלתי ממוקד לליווי גיוס", row: 0, priority: false },
  { src: "/carousel/slide-09.avif", topic: "Business model", topicHe: "מודל עסקי", alt: "Business model slide showing expansion from diagnostic to support and execution", altHe: "שקף מודל עסקי המציג התרחבות מאבחון לליווי ולביצוע", row: 1, priority: false },
  { src: "/carousel/slide-10.avif", topic: "Traction", topicHe: "צמיחה", alt: "Traction slide combining an engagement curve with continuation and iteration metrics", altHe: "שקף צמיחה המשלב עקומת פעילות עם מדדי המשך ואיטרציה", row: 1, priority: true },
  { src: "/carousel/slide-11.avif", topic: "Case study", topicHe: "מקרה בוחן", alt: "Before-and-after narrative case study leading to an investor meeting", altHe: "מקרה בוחן של נרטיב לפני ואחרי שהוביל לפגישת משקיע", row: 1, priority: false },
  { src: "/carousel/slide-12.avif", topic: "Go-to-market", topicHe: "חדירה לשוק", alt: "Go-to-market slide showing the path from founder communities to referrals", altHe: "שקף חדירה לשוק המציג דרך מקהילות יזמים ועד הפניות", row: 1, priority: false },
  { src: "/carousel/slide-13.avif", topic: "Positioning", topicHe: "מיצוב", alt: "Competitive positioning matrix for fundraising-specific strategy and execution", altHe: "מפת מיצוב תחרותי לאסטרטגיה וביצוע הממוקדים בגיוס", row: 1, priority: false },
  { src: "/carousel/slide-14.avif", topic: "Defensibility", topicHe: "יתרון בר-הגנה", alt: "Defensibility slide connecting investor patterns, founder context, and execution assets", altHe: "שקף יתרון בר-הגנה המחבר דפוסי משקיעים, הקשר יזמי ונכסי ביצוע", row: 1, priority: false },
  { src: "/carousel/slide-15.avif", topic: "Financial outlook", topicHe: "תחזית פיננסית", alt: "Financial outlook slide showing increasing recurring revenue leverage", altHe: "שקף תחזית פיננסית המציג מינוף גדל של הכנסות חוזרות", row: 1, priority: false },
  { src: "/carousel/slide-16.avif", topic: "The round", topicHe: "סבב הגיוס", alt: "Milestone slide moving from codification to proof and productized scale", altHe: "שקף אבני דרך העובר מסטנדרטיזציה להוכחה ולצמיחה מוצרית", row: 1, priority: false },
];
