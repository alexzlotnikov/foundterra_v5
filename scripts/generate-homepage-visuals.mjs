import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const carouselDir = path.resolve("public", "carousel");
const brandDir = path.resolve("public", "brand");
const assetDir = path.resolve("src", "assets");

const supplied = {
  boardy: "C:/Users/Batman/Pictures/690d8bb37b555132c802fce0_mobiletitle.webp",
  flashpoint: "C:/Users/Batman/Pictures/292e65e9-a9e8-4e90-b726-3b055b8f9025-0.webp",
  ganas: "C:/Users/Batman/Pictures/GANAS_VC-removebg-preview_m3an0HJ.webp",
  ggw: path.resolve("src", "assets", "ggw-ventures-logo-optimized.webp"),
};

const c = {
  ink: "#101114",
  dark: "#090A0E",
  white: "#FFFFFF",
  paper: "#F7F7F4",
  soft: "#F0F1F4",
  line: "#D9DCE3",
  muted: "#68707D",
  blue: "#3157E3",
  lavender: "#E9E5FF",
  violet: "#7257E8",
  coral: "#F46F63",
  peach: "#FFE5D8",
  green: "#26A66F",
  mint: "#DDF6EA",
  yellow: "#F2CC64",
};

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const wrap = (text, max = 34) => {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (current && next.length > max) {
      lines.push(current);
      current = word;
    } else current = next;
  }
  if (current) lines.push(current);
  return lines;
};

const text = ({
  value,
  x,
  y,
  size = 20,
  fill = c.ink,
  weight = 500,
  family = "Arial, sans-serif",
  max = 36,
  line = 1.12,
  anchor = "start",
}) =>
  wrap(value, max)
    .map(
      (row, index) =>
        `<text x="${x}" y="${y + index * size * line}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(row)}</text>`,
    )
    .join("");

const svg = (body, width = 800, height = 450, background = c.paper) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${background}"/>
  ${body}
</svg>`;

const label = (topic, dark = false) => `
  <text x="34" y="32" font-family="Arial, sans-serif" font-size="8" font-weight="700" letter-spacing="1.5" fill="${dark ? "#B8BECA" : c.muted}">ILLUSTRATIVE EXAMPLE  /  ${esc(topic.toUpperCase())}</text>
`;

const browser = ({ x, y, width, height, accent = c.violet, dark = false }) => {
  const bg = dark ? "#111521" : c.white;
  const panel = dark ? "#1A2030" : "#F5F6F8";
  const fg = dark ? c.white : c.ink;
  return `
    <g transform="translate(${x} ${y})">
      <rect width="${width}" height="${height}" rx="5" fill="${bg}" stroke="${dark ? "#333D53" : c.line}"/>
      <rect width="${width}" height="22" rx="5" fill="${panel}"/>
      <circle cx="13" cy="11" r="3" fill="${c.coral}"/><circle cx="24" cy="11" r="3" fill="${c.yellow}"/><circle cx="35" cy="11" r="3" fill="${c.green}"/>
      <rect x="14" y="38" width="${width * 0.18}" height="${height - 52}" rx="3" fill="${panel}"/>
      ${[0, 1, 2, 3].map((i) => `<rect x="25" y="${53 + i * 23}" width="${width * (i === 1 ? 0.12 : 0.1)}" height="5" rx="2" fill="${i === 1 ? accent : dark ? "#5A657B" : "#C8CDD6"}"/>`).join("")}
      <rect x="${width * 0.23}" y="40" width="${width * 0.7}" height="22" rx="3" fill="${panel}"/>
      <text x="${width * 0.25}" y="55" font-family="Arial" font-size="8" font-weight="700" fill="${fg}">Workspace overview</text>
      <rect x="${width * 0.23}" y="74" width="${width * 0.32}" height="${height * 0.32}" rx="3" fill="${panel}"/>
      <rect x="${width * 0.57}" y="74" width="${width * 0.36}" height="${height * 0.32}" rx="3" fill="${panel}"/>
      <path d="M ${width * 0.25} ${height * 0.57} L ${width * 0.31} ${height * 0.5} L ${width * 0.37} ${height * 0.53} L ${width * 0.43} ${height * 0.39} L ${width * 0.51} ${height * 0.32}" fill="none" stroke="${accent}" stroke-width="3"/>
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="${width * 0.61 + i * width * 0.055}" y="${height * (0.51 - i * 0.035)}" width="${width * 0.035}" height="${height * (0.13 + i * 0.035)}" fill="${i === 4 ? accent : dark ? "#58647A" : "#C5CBD5"}"/>`).join("")}
      <rect x="${width * 0.23}" y="${height * 0.72}" width="${width * 0.7}" height="${height * 0.16}" rx="3" fill="${panel}"/>
      ${[0, 1, 2].map((i) => `<rect x="${width * 0.25}" y="${height * (0.755 + i * 0.035)}" width="${width * (0.42 + i * 0.07)}" height="4" rx="2" fill="${dark ? "#606B80" : "#C6CBD3"}"/>`).join("")}
    </g>`;
};

const phone = ({ x, y, width = 118, height = 224, accent = c.violet }) => `
  <g transform="translate(${x} ${y})">
    <rect width="${width}" height="${height}" rx="22" fill="${c.ink}"/>
    <rect x="6" y="6" width="${width - 12}" height="${height - 12}" rx="17" fill="${c.white}"/>
    <rect x="${width * 0.35}" y="10" width="${width * 0.3}" height="7" rx="4" fill="${c.ink}"/>
    <rect x="18" y="34" width="${width - 36}" height="9" rx="4" fill="${c.line}"/>
    <rect x="18" y="55" width="${width - 36}" height="58" rx="8" fill="${accent}" opacity=".18"/>
    <circle cx="${width / 2}" cy="84" r="18" fill="${accent}"/>
    <rect x="18" y="126" width="${width - 36}" height="15" rx="6" fill="${c.soft}"/>
    <rect x="18" y="150" width="${width - 36}" height="15" rx="6" fill="${c.soft}"/>
    <rect x="18" y="181" width="${width - 36}" height="24" rx="8" fill="${accent}"/>
  </g>`;

const slide = (topic, content, dark = false) =>
  svg(`${label(topic, dark)}${content}`, 800, 450, dark ? c.dark : c.paper);

const slides = [
  slide(
    "Problem",
    `
      ${text({ value: "Teams lose the decision before the meeting starts.", x: 52, y: 100, size: 39, family: "Georgia, serif", max: 29, line: 1.02 })}
      ${text({ value: "Critical evidence is scattered across documents, inboxes, and dashboards.", x: 52, y: 205, size: 14, fill: c.muted, max: 46, line: 1.35 })}
      <g transform="translate(445 74)">
        <rect width="290" height="100" rx="4" fill="${c.white}" stroke="${c.line}"/>
        <text x="18" y="26" font-family="Arial" font-size="9" font-weight="700" fill="${c.muted}">OPERATING NOTE</text>
        <text x="18" y="53" font-family="Georgia" font-size="19" fill="${c.ink}">The pilot is working.</text>
        <rect x="18" y="69" width="210" height="5" fill="${c.line}"/><rect x="18" y="82" width="156" height="5" fill="${c.line}"/>
        <rect x="42" y="128" width="248" height="112" rx="4" fill="${c.white}" stroke="${c.line}"/>
        <text x="60" y="154" font-family="Arial" font-size="9" font-weight="700" fill="${c.muted}">INVESTOR QUESTION</text>
        <text x="60" y="185" font-family="Georgia" font-size="19" fill="${c.ink}">But is the growth repeatable?</text>
        <rect x="60" y="204" width="177" height="5" fill="${c.line}"/><rect x="60" y="218" width="126" height="5" fill="${c.line}"/>
      </g>
      <path d="M390 250 C425 220 430 190 462 174" fill="none" stroke="${c.coral}" stroke-width="2"/>
    `,
  ),
  slide(
    "Economic impact",
    `
      ${text({ value: "The hidden cost is decision latency.", x: 52, y: 94, size: 37, family: "Georgia, serif", max: 36 })}
      <g transform="translate(52 166)">
        <rect width="690" height="190" rx="8" fill="${c.lavender}"/>
        <text x="32" y="48" font-family="Arial" font-size="11" font-weight="700" fill="${c.muted}">WITHOUT A SHARED EVIDENCE LAYER</text>
        <text x="32" y="103" font-family="Georgia" font-size="45" fill="${c.ink}">16 days</text>
        <text x="32" y="133" font-family="Arial" font-size="12" fill="${c.muted}">from first review to a confident decision</text>
        <rect x="344" y="35" width="1" height="120" fill="#C8C0F2"/>
        <text x="388" y="48" font-family="Arial" font-size="11" font-weight="700" fill="${c.green}">WITH STRUCTURED EVIDENCE</text>
        <text x="388" y="103" font-family="Georgia" font-size="45" fill="${c.green}">4 days</text>
        <text x="388" y="133" font-family="Arial" font-size="12" fill="${c.muted}">with sources, owners, and decisions connected</text>
      </g>
    `,
  ),
  slide(
    "Solution",
    `
      ${text({ value: "One workspace turns evidence into an investor answer.", x: 45, y: 91, size: 34, family: "Georgia, serif", max: 31, line: 1.02 })}
      ${browser({ x: 355, y: 72, width: 390, height: 292, accent: c.violet })}
      <g transform="translate(48 214)">
        ${[
          ["01", "Connect", "Deck, metrics, pipeline"],
          ["02", "Challenge", "Find gaps and weak claims"],
          ["03", "Present", "Build the investor takeaway"],
        ].map(([n, titleValue, detail], i) => `
          <g transform="translate(0 ${i * 66})">
            <circle cx="16" cy="16" r="16" fill="${i === 2 ? c.green : c.violet}"/><text x="16" y="20" text-anchor="middle" font-family="Arial" font-size="9" font-weight="700" fill="white">${n}</text>
            <text x="45" y="13" font-family="Arial" font-size="13" font-weight="700" fill="${c.ink}">${titleValue}</text>
            <text x="45" y="31" font-family="Arial" font-size="10" fill="${c.muted}">${detail}</text>
          </g>`).join("")}
      </g>
    `,
  ),
  slide(
    "Product",
    `
      ${text({ value: "The fundraising workspace founders actually use.", x: 43, y: 84, size: 32, family: "Georgia, serif", max: 36 })}
      ${browser({ x: 188, y: 123, width: 500, height: 280, accent: c.blue })}
      <g transform="translate(71 180)">
        <rect width="150" height="76" rx="5" fill="${c.white}" stroke="${c.line}"/>
        <text x="16" y="24" font-family="Arial" font-size="9" font-weight="700" fill="${c.muted}">READINESS</text>
        <text x="16" y="55" font-family="Georgia" font-size="27" fill="${c.blue}">82%</text>
        <rect x="118" y="202" width="154" height="78" rx="5" fill="${c.white}" stroke="${c.line}"/>
        <text x="134" y="228" font-family="Arial" font-size="9" font-weight="700" fill="${c.muted}">FOLLOW-UP</text>
        <text x="134" y="257" font-family="Georgia" font-size="21" fill="${c.green}">6 open asks</text>
      </g>
    `,
  ),
  slide(
    "Product workflow",
    `
      ${text({ value: "From raw materials to a meeting-ready narrative.", x: 48, y: 92, size: 35, family: "Georgia, serif", max: 37 })}
      <g transform="translate(48 190)">
        ${[
          ["Deck", "Upload the current story", c.lavender],
          ["Evidence", "Connect metrics and proof", c.mint],
          ["Review", "Resolve gaps and objections", c.peach],
          ["Pitch", "Deliver one clear takeaway", "#E5EDFF"],
        ].map(([titleValue, detail, fill], i) => `
          <g transform="translate(${i * 184} 0)">
            <rect width="156" height="144" rx="9" fill="${fill}"/>
            <circle cx="24" cy="25" r="10" fill="${i === 1 ? c.green : i === 2 ? c.coral : c.blue}"/>
            <text x="18" y="75" font-family="Georgia" font-size="22" fill="${c.ink}">${titleValue}</text>
            ${text({ value: detail, x: 18, y: 101, size: 10, fill: c.muted, max: 22, line: 1.3 })}
            ${i < 3 ? `<path d="M162 72 H177" stroke="${c.ink}" stroke-width="1.5"/><path d="M172 68 L178 72 L172 76" fill="none" stroke="${c.ink}" stroke-width="1.5"/>` : ""}
          </g>`).join("")}
      </g>
    `,
  ),
  slide(
    "Founder experience",
    `
      ${text({ value: "Built for the raise founders are already running.", x: 48, y: 86, size: 34, family: "Georgia, serif", max: 34 })}
      ${phone({ x: 550, y: 102, width: 132, height: 260, accent: c.violet })}
      <g transform="translate(55 190)">
        ${[
          ["Know what is weak", "One prioritized review instead of conflicting feedback."],
          ["Prepare the next meeting", "Objections, answers, and proof stay connected."],
          ["Improve every week", "The deck evolves with the fundraising process."],
        ].map(([titleValue, detail], i) => `
          <g transform="translate(${(i % 2) * 226} ${Math.floor(i / 2) * 100})">
            <rect width="205" height="82" rx="6" fill="${i === 2 ? c.mint : c.white}" stroke="${i === 2 ? c.green : c.line}"/>
            <text x="16" y="28" font-family="Arial" font-size="12" font-weight="700" fill="${c.ink}">${titleValue}</text>
            ${text({ value: detail, x: 16, y: 49, size: 9, fill: c.muted, max: 31, line: 1.25 })}
          </g>`).join("")}
      </g>
    `,
  ),
  slide(
    "Why now",
    `
      ${text({ value: "The fundraising process became more measurable.", x: 48, y: 83, size: 34, family: "Georgia, serif", max: 38 })}
      <g transform="translate(48 194)">
        ${[
          ["More scrutiny", "Investors expect evidence behind every claim."],
          ["Longer cycles", "Founders must manage months of iteration."],
          ["Better tooling", "Deck, metrics, and outreach can finally connect."],
        ].map(([titleValue, detail], i) => `
          <g transform="translate(${i * 236} 0)">
            <circle cx="28" cy="28" r="27" fill="${[c.lavender, c.peach, c.mint][i]}"/>
            <path d="${i === 0 ? "M18 28h20M28 18v20" : i === 1 ? "M17 35L27 21L36 32" : "M17 31L25 38L40 20"}" fill="none" stroke="${[c.violet, c.coral, c.green][i]}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="0" y="88" font-family="Georgia" font-size="21" fill="${c.ink}">${titleValue}</text>
            ${text({ value: detail, x: 0, y: 115, size: 10, fill: c.muted, max: 29, line: 1.3 })}
          </g>`).join("")}
      </g>
    `,
  ),
  slide(
    "Market",
    `
      ${text({ value: "A focused entry point into a large advisory market.", x: 46, y: 84, size: 33, family: "Georgia, serif", max: 38 })}
      <g transform="translate(47 181)">
        ${[
          ["38K", "Pre-seed and seed rounds each year", c.lavender, c.violet],
          ["$7.2K", "Average external preparation spend", c.mint, c.green],
          ["$274M", "Initial serviceable workflow", c.peach, c.coral],
        ].map(([value, detail, fill, accent], i) => `
          <g transform="translate(${i * 236} 0)">
            <rect width="212" height="164" rx="9" fill="${fill}"/>
            <text x="20" y="69" font-family="Georgia" font-size="43" fill="${accent}">${value}</text>
            ${text({ value: detail, x: 20, y: 102, size: 11, fill: c.ink, max: 27, line: 1.3 })}
          </g>`).join("")}
      </g>
    `,
  ),
  slide(
    "Business model",
    `
      ${text({ value: "Start with clarity. Expand with the raise.", x: 48, y: 83, size: 34, family: "Georgia, serif", max: 38 })}
      <g transform="translate(48 166)">
        <path d="M0 164 H690" stroke="${c.line}"/>
        ${[
          ["Diagnostic", "$100", "One focused review", 0, 88, c.lavender, c.violet],
          ["Support", "$500/mo", "Weekly fundraising iteration", 226, 132, c.mint, c.green],
          ["Execution", "$1.5K+", "Deck and model projects", 452, 176, c.peach, c.coral],
        ].map(([name, price, detail, x, height, fill, accent]) => `
          <g transform="translate(${x} ${176 - height})">
            <rect width="210" height="${height}" rx="8" fill="${fill}"/>
            <text x="18" y="31" font-family="Arial" font-size="10" font-weight="700" fill="${accent}">${name.toUpperCase()}</text>
            <text x="18" y="67" font-family="Georgia" font-size="28" fill="${c.ink}">${price}</text>
            ${text({ value: detail, x: 18, y: 91, size: 9, fill: c.muted, max: 27, line: 1.25 })}
          </g>`).join("")}
      </g>
    `,
  ),
  slide(
    "Traction",
    `
      ${text({ value: "Founders return when the raise gets real.", x: 45, y: 82, size: 34, family: "Georgia, serif", max: 38 })}
      <g transform="translate(48 174)">
        <rect width="438" height="194" rx="7" fill="${c.white}" stroke="${c.line}"/>
        <text x="20" y="28" font-family="Arial" font-size="9" font-weight="700" fill="${c.muted}">ACTIVE ENGAGEMENTS</text>
        <path d="M30 156 L76 146 L122 151 L168 122 L214 129 L260 95 L306 74 L352 51 L401 28" fill="none" stroke="${c.violet}" stroke-width="4"/>
        ${[[30,156],[76,146],[122,151],[168,122],[214,129],[260,95],[306,74],[352,51],[401,28]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="${c.white}" stroke="${c.violet}" stroke-width="3"/>`).join("")}
        <g transform="translate(478 0)">
          <rect width="214" height="91" rx="7" fill="${c.mint}"/>
          <text x="18" y="34" font-family="Georgia" font-size="29" fill="${c.green}">71%</text>
          <text x="18" y="60" font-family="Arial" font-size="10" fill="${c.ink}">continue after the diagnostic</text>
          <rect y="103" width="214" height="91" rx="7" fill="${c.lavender}"/>
          <text x="18" y="137" font-family="Georgia" font-size="29" fill="${c.violet}">4.6×</text>
          <text x="18" y="163" font-family="Arial" font-size="10" fill="${c.ink}">more iterations during active raises</text>
        </g>
      </g>
    `,
  ),
  slide(
    "Case study",
    `
      ${text({ value: "One narrative change unlocked the next meeting.", x: 47, y: 82, size: 34, family: "Georgia, serif", max: 38 })}
      <g transform="translate(48 164)">
        <rect width="318" height="192" rx="8" fill="${c.peach}"/>
        <text x="20" y="31" font-family="Arial" font-size="9" font-weight="700" fill="${c.coral}">BEFORE</text>
        ${text({ value: "A broad platform story with six competing use cases.", x: 20, y: 72, size: 22, family: "Georgia, serif", max: 25, line: 1.05 })}
        <text x="20" y="166" font-family="Arial" font-size="10" fill="${c.muted}">Investor response: “Who needs this first?”</text>
        <path d="M339 96 H365" stroke="${c.ink}" stroke-width="2"/><path d="M358 89L367 96L358 103" fill="none" stroke="${c.ink}" stroke-width="2"/>
        <rect x="384" width="318" height="192" rx="8" fill="${c.mint}"/>
        <text x="404" y="31" font-family="Arial" font-size="9" font-weight="700" fill="${c.green}">AFTER</text>
        ${text({ value: "One urgent buyer, one workflow, one measurable outcome.", x: 404, y: 72, size: 22, family: "Georgia, serif", max: 25, line: 1.05 })}
        <text x="404" y="166" font-family="Arial" font-size="10" fill="${c.muted}">Result: partner meeting scheduled.</text>
      </g>
    `,
  ),
  slide(
    "Go-to-market",
    `
      ${text({ value: "A narrow founder-led path to repeatable demand.", x: 48, y: 84, size: 34, family: "Georgia, serif", max: 38 })}
      <g transform="translate(48 192)">
        ${[
          ["01", "Founder communities", "Trusted access to active raisers"],
          ["02", "Diagnostics", "A low-friction paid entry point"],
          ["03", "Monthly support", "Expansion as the raise progresses"],
          ["04", "Referrals", "Partners and founder outcomes"],
        ].map(([n, titleValue, detail], i) => `
          <g transform="translate(${i * 180} 0)">
            <text x="0" y="16" font-family="Arial" font-size="9" font-weight="700" fill="${i === 3 ? c.green : c.violet}">${n}</text>
            <line x1="0" y1="34" x2="145" y2="34" stroke="${i === 3 ? c.green : c.violet}" stroke-width="4"/>
            <text x="0" y="71" font-family="Georgia" font-size="18" fill="${c.ink}">${titleValue}</text>
            ${text({ value: detail, x: 0, y: 99, size: 9, fill: c.muted, max: 22, line: 1.3 })}
          </g>`).join("")}
      </g>
    `,
  ),
  slide(
    "Positioning",
    `
      ${text({ value: "Strategy and execution in the same room.", x: 49, y: 81, size: 34, family: "Georgia, serif", max: 38 })}
      <g transform="translate(69 146)">
        <line x1="0" y1="226" x2="624" y2="226" stroke="${c.ink}" stroke-width="1.5"/>
        <line x1="0" y1="226" x2="0" y2="0" stroke="${c.ink}" stroke-width="1.5"/>
        <text x="312" y="255" text-anchor="middle" font-family="Arial" font-size="9" fill="${c.muted}">GENERIC FEEDBACK  →  FUNDRAISING-SPECIFIC</text>
        <text x="-113" y="-27" transform="rotate(-90)" text-anchor="middle" font-family="Arial" font-size="9" fill="${c.muted}">ADVICE ONLY  →  HANDS-ON EXECUTION</text>
        ${[
          [145, 167, "General advisors", "#A4A9B3"],
          [294, 94, "Design studios", "#A4A9B3"],
          [443, 170, "Deck tools", "#A4A9B3"],
          [543, 45, "Foundterra", c.violet],
        ].map(([x, y, name, fill]) => `<circle cx="${x}" cy="${y}" r="${name === "Foundterra" ? 17 : 10}" fill="${fill}"/><text x="${x}" y="${y - 20}" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="${fill}">${name}</text>`).join("")}
        <rect x="480" y="2" width="130" height="83" fill="none" stroke="${c.violet}" stroke-dasharray="5 4"/>
      </g>
    `,
  ),
  slide(
    "Defensibility",
    `
      ${text({ value: "The advantage compounds across every founder review.", x: 48, y: 85, size: 34, family: "Georgia, serif", max: 37 })}
      <g transform="translate(52 173)">
        ${[
          ["Investor patterns", "Repeated objections and decision criteria"],
          ["Founder context", "Stage, category, metrics, and constraints"],
          ["Execution library", "Deck structures, models, and responses"],
        ].map(([titleValue, detail], i) => `
          <g transform="translate(${i * 232} 0)">
            <rect width="208" height="142" rx="8" fill="${[c.lavender, c.mint, c.peach][i]}"/>
            <circle cx="28" cy="28" r="11" fill="${[c.violet, c.green, c.coral][i]}"/>
            <text x="18" y="73" font-family="Georgia" font-size="20" fill="${c.ink}">${titleValue}</text>
            ${text({ value: detail, x: 18, y: 100, size: 9, fill: c.muted, max: 28, line: 1.28 })}
          </g>`).join("")}
        <path d="M211 71 H226M443 71H458" stroke="${c.ink}" stroke-width="1.5"/>
      </g>
      <text x="400" y="374" text-anchor="middle" font-family="Arial" font-size="11" font-weight="700" fill="${c.violet}">BETTER DIAGNOSIS  →  FASTER ITERATION  →  STRONGER MATERIALS</text>
    `,
  ),
  slide(
    "Financial outlook",
    `
      ${text({ value: "A services model with increasing operating leverage.", x: 48, y: 85, size: 33, family: "Georgia, serif", max: 39 })}
      <g transform="translate(52 171)">
        <rect width="690" height="191" rx="8" fill="${c.white}" stroke="${c.line}"/>
        <text x="22" y="28" font-family="Arial" font-size="9" font-weight="700" fill="${c.muted}">ILLUSTRATIVE REVENUE MIX</text>
        ${[0,1,2,3,4].map((i) => {
          const total = [48,78,112,148,182][i];
          const recurring = [8,24,48,78,110][i];
          const x = 65 + i * 112;
          return `<rect x="${x}" y="${166 - total}" width="48" height="${total}" fill="${c.lavender}"/><rect x="${x}" y="${166 - recurring}" width="48" height="${recurring}" fill="${c.violet}"/><text x="${x + 24}" y="184" text-anchor="middle" font-family="Arial" font-size="9" fill="${c.muted}">Y${i + 1}</text>`;
        }).join("")}
        <text x="580" y="35" font-family="Arial" font-size="9" fill="${c.violet}">■ Recurring support</text>
        <text x="580" y="55" font-family="Arial" font-size="9" fill="#B9AFE8">■ Project work</text>
      </g>
    `,
  ),
  slide(
    "The round",
    `
      ${text({ value: "This round funds the move from expert service to repeatable system.", x: 47, y: 79, size: 31, family: "Georgia, serif", max: 44 })}
      <g transform="translate(48 177)">
        ${[
          ["0–6 months", "Codify", "Standardize diagnostic and review workflows", c.lavender, c.violet],
          ["6–12 months", "Prove", "Grow recurring support and partner channels", c.mint, c.green],
          ["12–18 months", "Scale", "Productize the highest-value workflows", c.peach, c.coral],
        ].map(([period, titleValue, detail, fill, accent], i) => `
          <g transform="translate(${i * 232} 0)">
            <text x="0" y="13" font-family="Arial" font-size="9" font-weight="700" fill="${accent}">${period.toUpperCase()}</text>
            <rect y="30" width="208" height="144" rx="8" fill="${fill}"/>
            <text x="18" y="77" font-family="Georgia" font-size="24" fill="${c.ink}">${titleValue}</text>
            ${text({ value: detail, x: 18, y: 105, size: 9, fill: c.muted, max: 28, line: 1.3 })}
            ${i < 2 ? `<path d="M214 102 H225" stroke="${c.ink}"/><path d="M221 98L226 102L221 106" fill="none" stroke="${c.ink}"/>` : ""}
          </g>`).join("")}
      </g>
    `,
  ),
];

const heroGood = slide(
  "Founder-built traction",
  `
    ${text({ value: "Strong growth across the last 12 months.", x: 46, y: 84, size: 32, family: "Georgia, serif", max: 36 })}
    <g transform="translate(48 153)">
      ${[["$920K", "ARR"], ["118%", "NRR"], ["84", "Customers"]].map(([value, name], i) => `
        <g transform="translate(${i * 224} 0)"><rect width="202" height="67" rx="5" fill="${c.white}" stroke="${c.line}"/><text x="16" y="31" font-family="Arial" font-size="21" font-weight="700" fill="${c.ink}">${value}</text><text x="16" y="51" font-family="Arial" font-size="9" fill="${c.muted}">${name}</text></g>
      `).join("")}
      <rect y="88" width="650" height="128" rx="5" fill="${c.white}" stroke="${c.line}"/>
      <path d="M22 193 L86 180 L150 184 L214 154 L278 160 L342 126 L406 116 L470 81 L534 68 L620 37" fill="none" stroke="${c.blue}" stroke-width="3"/>
    </g>
  `,
);

const heroReady = slide(
  "Investor-ready traction",
  `
    ${text({ value: "Expansion now accounts for 54% of new revenue.", x: 45, y: 82, size: 31, family: "Georgia, serif", max: 38 })}
    <text x="47" y="143" font-family="Arial" font-size="11" fill="${c.muted}">The business is becoming less dependent on new customer acquisition.</text>
    <g transform="translate(47 184)">
      <rect width="255" height="159" rx="7" fill="${c.mint}"/>
      <text x="20" y="31" font-family="Arial" font-size="9" font-weight="700" fill="${c.green}">THE INVESTOR TAKEAWAY</text>
      <text x="20" y="82" font-family="Georgia" font-size="34" fill="${c.green}">118%</text>
      <text x="20" y="105" font-family="Arial" font-size="10" fill="${c.ink}">net revenue retention</text>
      ${text({ value: "Existing customers are becoming the primary growth engine.", x: 20, y: 132, size: 9, fill: c.muted, max: 31, line: 1.25 })}
      <rect x="281" width="424" height="159" rx="7" fill="${c.white}" stroke="${c.line}"/>
      ${[0,1,2,3,4,5,6,7].map((i) => {
        const total = 42 + i * 13;
        const exp = 8 + i * 7;
        return `<rect x="${304 + i * 47}" y="${137 - total}" width="25" height="${total}" fill="#CBD2DF"/><rect x="${304 + i * 47}" y="${137 - exp}" width="25" height="${exp}" fill="${c.green}"/>`;
      }).join("")}
      <text x="304" y="151" font-family="Arial" font-size="8" fill="${c.muted}">New logo revenue</text>
      <text x="500" y="151" font-family="Arial" font-size="8" fill="${c.green}">Expansion revenue</text>
    </g>
  `,
);

await Promise.all([carouselDir, brandDir, assetDir].map((directory) => fs.mkdir(directory, { recursive: true })));

const atomic = async (target, operation) => {
  const temporary = `${target}.next`;
  await operation(temporary);
  await fs.rm(target, { force: true });
  await fs.rename(temporary, target);
};

const renderAvif = (source, target, width = 800, height = 450) =>
  atomic(target, (temporary) =>
    sharp(Buffer.from(source)).resize(width, height).avif({ quality: 67, effort: 7, chromaSubsampling: "4:4:4" }).toFile(temporary),
  );

await Promise.all(
  slides.map((source, index) => renderAvif(source, path.join(carouselDir, `slide-${String(index + 1).padStart(2, "0")}.avif`))),
);
await Promise.all([
  renderAvif(heroGood, path.join(carouselDir, "hero-good.avif")),
  renderAvif(heroReady, path.join(carouselDir, "hero-investor-ready.avif")),
]);

await Promise.all([
  atomic(path.join(assetDir, "boardy-logo-original.webp"), (temporary) =>
    sharp(supplied.boardy).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize({ width: 620 }).webp({ quality: 88 }).toFile(temporary),
  ),
  atomic(path.join(assetDir, "flashpoint-vc-logo-dark.webp"), async (temporary) => {
    const image = sharp(supplied.flashpoint).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize({ width: 620 });
    const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) continue;
      const isPink = data[i] > 120 && data[i] > data[i + 1] * 1.5;
      if (!isPink) {
        data[i] = 243;
        data[i + 1] = 239;
        data[i + 2] = 230;
      }
    }
    await sharp(data, { raw: info }).webp({ quality: 90 }).toFile(temporary);
  }),
  atomic(path.join(assetDir, "ganas-ventures-logo-dark.webp"), (temporary) =>
    sharp(supplied.ganas)
      .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .resize({ width: 340 })
      .negate({ alpha: false })
      .sharpen({ sigma: 0.8, m1: 1, m2: 2 })
      .webp({ quality: 92 })
      .toFile(temporary),
  ),
  atomic(path.join(assetDir, "ggw-ventures-logo-dark.webp"), (temporary) =>
    sharp(supplied.ggw)
      .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .resize({ width: 280 })
      .negate({ alpha: false })
      .webp({ quality: 92 })
      .toFile(temporary),
  ),
]);

console.log(`[homepage-visuals] Generated ${slides.length + 2} reference-led slides and 4 optimized logo variants.`);
