import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDir = path.resolve("public", "brand");
const width = 1200;
const height = 630;

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const logoPath =
  "M412.817 0L824.817 676C830.317 685.5 823.317 694 809.317 694H16.3169C2.31689 694-3.68311 685 2.31689 676L412.817 0ZM412.817 19L297.317 241L377.317 177L412.817 233L447.317 177L528.317 241L412.817 19ZM412.317 278C434.317 299 448.317 338 448.317 377V455L493.317 531V577L436.317 535V578L558.317 694H266.317L385.317 578V535L329.317 577V531L375.317 455V377C375.317 338 390.317 299 412.317 278Z";

const brandLockupSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="240" height="42" viewBox="0 0 240 42">
    <g transform="translate(0 1) scale(.052)" fill="#f5f2eb"><path d="${logoPath}"/></g>
    <text x="54" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="3" fill="#f5f2eb">FOUNDTERRA</text>
  </svg>`;

const previewSvg = ({
  language,
  headlineLines,
  services,
  before,
  after,
  beforeDetail,
  afterDetail,
}) => {
  const isHebrew = language === "he";
  const headlineX = isHebrew ? 552 : 64;
  const headlineAnchor = isHebrew ? "end" : "start";
  const serviceX = isHebrew ? 552 : 64;
  const family = isHebrew ? "Arial, 'Heebo', sans-serif" : "Georgia, serif";

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" direction="ltr">
      <rect width="1200" height="630" fill="#08080f"/>
      <circle cx="1090" cy="-40" r="300" fill="#7738ed" opacity=".16"/>
      <circle cx="140" cy="710" r="320" fill="#10d9a0" opacity=".12"/>
      <path d="M0 544 C245 480 360 610 610 548 C850 488 966 570 1200 500" fill="none" stroke="#10d9a0" stroke-width="2" opacity=".2"/>

      <g>
        ${headlineLines
          .map(
            (line, index) =>
              `<text x="${headlineX}" y="${158 + index * 57}" text-anchor="${headlineAnchor}" font-family="${family}" font-size="${isHebrew ? 47 : 48}" font-weight="${isHebrew ? 700 : 500}" fill="#f5f2eb">${escapeXml(line)}</text>`,
          )
          .join("")}
      </g>

      <g transform="translate(64 420)">
        <rect width="488" height="1" fill="#f5f2eb" opacity=".18"/>
        ${services
          .map(
            (service, index) => `
              <g transform="translate(${index % 2 === 0 ? 0 : 250} ${32 + Math.floor(index / 2) * 54})">
                <circle cx="7" cy="-5" r="5" fill="${index === 3 ? "#10d9a0" : "#7738ed"}"/>
                <text x="22" y="0" text-anchor="start" font-family="Arial, 'Heebo', sans-serif" font-size="18" font-weight="600" fill="#b8b6c0">${escapeXml(service)}</text>
              </g>`,
          )
          .join("")}
      </g>

      <g transform="translate(620 105)">
        <rect width="516" height="432" rx="24" fill="#11111b" stroke="#292936"/>
        <text x="34" y="43" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="#8f8c9b">FOUNDER MATERIALS → INVESTOR READY</text>

        <g transform="translate(34 72)">
          <rect width="206" height="302" rx="14" fill="#171722" stroke="#343443"/>
          <rect x="18" y="20" width="88" height="9" rx="4" fill="#555362"/>
          <rect x="18" y="42" width="154" height="7" rx="3" fill="#373744"/>
          <rect x="18" y="59" width="136" height="7" rx="3" fill="#373744"/>
          <rect x="18" y="91" width="170" height="77" rx="7" fill="#222230"/>
          ${[0, 1, 2, 3, 4, 5]
            .map(
              (index) =>
                `<rect x="${28 + index * 25}" y="${149 - index * 7}" width="13" height="${15 + index * 7}" fill="${index % 2 ? "#625d70" : "#474451"}"/>`,
            )
            .join("")}
          ${[0, 1, 2, 3, 4]
            .map(
              (index) =>
                `<rect x="18" y="${190 + index * 18}" width="${index === 3 ? 112 : 166 - index * 9}" height="6" rx="3" fill="#3a3947"/>`,
            )
            .join("")}
          <rect x="18" y="281" width="75" height="4" rx="2" fill="#f46f63"/>
          <text x="103" y="334" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#8f8c9b">${escapeXml(before)}</text>
          <text x="103" y="356" text-anchor="middle" font-family="Arial, 'Heebo', sans-serif" font-size="12" fill="#686674">${escapeXml(beforeDetail)}</text>
        </g>

        <g transform="translate(276 72)">
          <rect width="206" height="302" rx="14" fill="#f5f2eb"/>
          <text x="18" y="28" font-family="Arial, sans-serif" font-size="8" font-weight="700" letter-spacing="1" fill="#74727b">INVESTOR TAKEAWAY</text>
          <text x="18" y="65" font-family="Georgia, serif" font-size="25" fill="#11111b">Expansion drives</text>
          <text x="18" y="91" font-family="Georgia, serif" font-size="25" fill="#11111b">the next stage.</text>
          <text x="18" y="124" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#0a9b70">118% NRR</text>
          ${[0, 1, 2, 3, 4, 5]
            .map((index) => {
              const barHeight = 35 + index * 19;
              const expansionHeight = 8 + index * 9;
              return `<rect x="${22 + index * 28}" y="${258 - barHeight}" width="16" height="${barHeight}" fill="#3157e3"/><rect x="${22 + index * 28}" y="${258 - expansionHeight}" width="16" height="${expansionHeight}" fill="#10a678"/>`;
            })
            .join("")}
          <text x="103" y="334" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#10d9a0">${escapeXml(after)}</text>
          <text x="103" y="356" text-anchor="middle" font-family="Arial, 'Heebo', sans-serif" font-size="12" fill="#8f8c9b">${escapeXml(afterDetail)}</text>
        </g>

        <g transform="translate(246 218)">
          <circle r="24" fill="#7738ed"/>
          <path d="M-8 0H9M4-6L10 0L4 6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </g>
    </svg>`;
};

const previews = [
  {
    filename: "foundterra-og-v2-en.webp",
    svg: previewSvg({
      language: "en",
      headlineLines: ["Fundraising takes", "too much founder time", "to do it wrong."],
      services: ["Pitch deck", "Financial model", "Investor outreach", "Raise support"],
      before: "BEFORE",
      after: "AFTER",
      beforeDetail: "Information without a conclusion",
      afterDetail: "One clear investor takeaway",
    }),
  },
  {
    filename: "foundterra-og-v2-he.webp",
    svg: previewSvg({
      language: "he",
      headlineLines: ["גיוס הון גוזל יותר מדי זמן", "של יזמים מכדי לעשות אותו", "לא נכון."],
      services: ["מצגת משקיעים", "מודל פיננסי", "פנייה למשקיעים", "ליווי גיוס"],
      before: "לפני",
      after: "אחרי",
      beforeDetail: "מידע ללא מסקנה",
      afterDetail: "מסקנה ברורה למשקיע",
    }),
  },
];

await fs.mkdir(outputDir, { recursive: true });
await Promise.all(
  previews.map(({ filename, svg }) =>
    sharp(Buffer.from(svg))
      .resize(width, height)
      .composite([{ input: Buffer.from(brandLockupSvg), left: 64, top: 48 }])
      .webp({ quality: 92, smartSubsample: true })
      .toFile(path.join(outputDir, filename)),
  ),
);

console.log(`[social-previews] Generated ${previews.length} localized previews.`);
