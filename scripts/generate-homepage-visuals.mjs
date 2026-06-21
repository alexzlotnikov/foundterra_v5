import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outDir = path.resolve("public", "carousel");
const brandDir = path.resolve("public", "brand");

const palette = {
  carbon: "#080A0D",
  navy: "#0D1726",
  ivory: "#F3EFE6",
  white: "#FFFFFF",
  cobalt: "#155EEF",
  orange: "#FF5A36",
  emerald: "#0B8F67",
  ink: "#101828",
  muted: "#667085",
  line: "#D0D5DD",
  paleBlue: "#DCE7FF",
  paleGreen: "#DDF3EA",
  paleOrange: "#FFE3DA",
};

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const wrap = (text, max = 34) => {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const textBlock = ({
  text,
  x,
  y,
  size = 24,
  weight = 500,
  fill = palette.ink,
  family = "Arial, sans-serif",
  max = 36,
  lineHeight = 1.12,
  anchor = "start",
}) =>
  wrap(text, max)
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * size * lineHeight}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${escapeXml(line)}</text>`,
    )
    .join("");

const frame = ({ dark = false, label, index, title, subtitle = "" }) => {
  const bg = dark ? palette.carbon : palette.ivory;
  const fg = dark ? palette.white : palette.ink;
  const muted = dark ? "#A9B2C3" : palette.muted;
  return `
    <rect width="800" height="450" fill="${bg}"/>
    <rect x="28" y="24" width="744" height="402" fill="none" stroke="${dark ? "#27364C" : "#D5D0C6"}"/>
    <text x="48" y="51" font-family="Arial, sans-serif" font-size="10" font-weight="700" letter-spacing="1.8" fill="${muted}">ILLUSTRATIVE SAMPLE · ${escapeXml(label.toUpperCase())}</text>
    <text x="748" y="51" font-family="Arial, sans-serif" font-size="10" font-weight="700" text-anchor="end" fill="${muted}">${String(index).padStart(2, "0")}</text>
    ${textBlock({ text: title, x: 48, y: 102, size: 34, weight: 500, fill: fg, family: "Georgia, serif", max: 34, lineHeight: 1.02 })}
    ${subtitle ? textBlock({ text: subtitle, x: 48, y: 176, size: 13, weight: 400, fill: muted, max: 76, lineHeight: 1.35 }) : ""}
  `;
};

const svg = (body, width = 800, height = 450) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${palette.carbon}"/>
    ${body}
  </svg>
`;

const linePath = (points) =>
  points.map(([x, y], index) => `${index ? "L" : "M"} ${x} ${y}`).join(" ");

const slides = [
  {
    slug: "why-now",
    label: "Why now?",
    title: "AI adoption has crossed the infrastructure threshold.",
    render: () => {
      const points = [[64, 354], [126, 342], [188, 349], [250, 316], [312, 324], [374, 280], [436, 292], [498, 226], [560, 205], [622, 148], [730, 112]];
      return svg(`
        ${frame({ dark: true, label: "Why now?", index: 1, title: "AI adoption has crossed the infrastructure threshold." })}
        <g opacity=".35">${[0, 1, 2, 3, 4].map((i) => `<path d="M 48 ${328 + i * 13} C 180 ${280 + i * 8}, 330 ${360 - i * 13}, 752 ${150 + i * 18}" fill="none" stroke="#426AA8"/>`).join("")}</g>
        <path d="${linePath(points)}" fill="none" stroke="${palette.cobalt}" stroke-width="4"/>
        ${points.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${palette.ivory}"/>`).join("")}
        <text x="50" y="396" font-family="Arial" font-size="12" fill="#A9B2C3">Enterprise AI workloads in production</text>
        <text x="748" y="396" font-family="Georgia" font-size="34" text-anchor="end" fill="${palette.white}">69%</text>
      `);
    },
  },
  {
    slug: "problem",
    label: "Problem",
    title: "Manual diligence delays every deal by 11 days.",
    render: () => svg(`
      ${frame({ label: "Problem & economic impact", index: 2, title: "Manual diligence delays every deal by 11 days.", subtitle: "The cost is not document review. It is decision latency across the investment team." })}
      ${[
        ["14 hrs", "Analyst preparation", palette.cobalt],
        ["3.2×", "Repeated data requests", palette.orange],
        ["11 days", "Lost decision time", palette.emerald],
      ].map(([value, label, color], i) => `
        <g transform="translate(${48 + i * 242} 234)">
          <rect width="216" height="128" fill="${palette.white}" stroke="${palette.line}"/>
          <rect width="6" height="128" fill="${color}"/>
          <text x="24" y="55" font-family="Georgia" font-size="38" fill="${palette.ink}">${value}</text>
          <text x="24" y="84" font-family="Arial" font-size="13" fill="${palette.muted}">${label}</text>
          <line x1="24" y1="101" x2="188" y2="101" stroke="${palette.line}"/>
          <text x="24" y="119" font-family="Arial" font-size="10" fill="${palette.muted}">Median across 18 pilot teams</text>
        </g>
      `).join("")}
    `),
  },
  {
    slug: "existing-workflow",
    label: "Existing workflow",
    title: "Critical context gets lost between five disconnected tools.",
    render: () => svg(`
      ${frame({ label: "Existing workflow", index: 3, title: "Critical context gets lost between five disconnected tools." })}
      <g transform="translate(50 226)">
        ${["Inbox", "Drive", "CRM", "Notes", "Model"].map((name, i) => `
          <g transform="translate(${i * 144} 0)">
            <rect width="108" height="58" rx="3" fill="${palette.white}" stroke="${palette.line}"/>
            <text x="54" y="35" font-family="Arial" font-size="14" font-weight="700" fill="${palette.ink}" text-anchor="middle">${name}</text>
            ${i < 4 ? `<path d="M112 29 H136" stroke="${i % 2 ? palette.orange : palette.cobalt}" stroke-width="2" stroke-dasharray="4 4"/><path d="M132 25 L138 29 L132 33" fill="none" stroke="${i % 2 ? palette.orange : palette.cobalt}" stroke-width="2"/>` : ""}
          </g>
        `).join("")}
        <path d="M 54 84 C 180 132, 510 132, 630 84" fill="none" stroke="${palette.orange}" stroke-width="3"/>
        <text x="342" y="126" font-family="Georgia" font-size="22" fill="${palette.ink}" text-anchor="middle">Every handoff creates another version of the truth.</text>
      </g>
    `),
  },
  {
    slug: "solution",
    label: "Solution",
    title: "One evidence layer turns scattered inputs into an investment decision.",
    render: () => svg(`
      ${frame({ dark: true, label: "Product solution", index: 4, title: "One evidence layer turns scattered inputs into an investment decision." })}
      <g transform="translate(52 232)">
        <rect x="0" y="0" width="170" height="120" fill="#111E31" stroke="#31415B"/>
        <text x="20" y="28" font-family="Arial" font-size="11" fill="#A9B2C3">INPUTS</text>
        ${["Documents", "CRM activity", "Financial data"].map((name, i) => `<text x="20" y="${58 + i * 24}" font-family="Arial" font-size="13" fill="${palette.white}">${name}</text>`).join("")}
        <path d="M190 60 H268" stroke="${palette.cobalt}" stroke-width="3"/><path d="M260 52 L272 60 L260 68" fill="none" stroke="${palette.cobalt}" stroke-width="3"/>
        <rect x="284" y="-18" width="190" height="156" fill="${palette.cobalt}"/>
        <text x="379" y="45" font-family="Georgia" font-size="25" fill="${palette.white}" text-anchor="middle">Evidence</text>
        <text x="379" y="75" font-family="Georgia" font-size="25" fill="${palette.white}" text-anchor="middle">intelligence</text>
        <text x="379" y="109" font-family="Arial" font-size="11" fill="${palette.paleBlue}" text-anchor="middle">Structured · sourced · comparable</text>
        <path d="M492 60 H570" stroke="${palette.emerald}" stroke-width="3"/><path d="M562 52 L574 60 L562 68" fill="none" stroke="${palette.emerald}" stroke-width="3"/>
        <rect x="590" y="0" width="158" height="120" fill="#10281F" stroke="${palette.emerald}"/>
        <text x="610" y="28" font-family="Arial" font-size="11" fill="#A9DCCB">DECISION</text>
        <text x="610" y="63" font-family="Georgia" font-size="22" fill="${palette.white}">Investment memo</text>
        <text x="610" y="92" font-family="Arial" font-size="12" fill="#A9DCCB">Ready in minutes</text>
      </g>
    `),
  },
  {
    slug: "product-workflow",
    label: "Product workflow",
    title: "From fragmented documents to an investment memo in minutes.",
    render: () => svg(`
      ${frame({ label: "Product workflow", index: 5, title: "From fragmented documents to an investment memo in minutes." })}
      <g transform="translate(48 236)">
        ${[
          ["01", "Connect", "Secure source access"],
          ["02", "Structure", "Normalize evidence"],
          ["03", "Challenge", "Surface gaps and risks"],
          ["04", "Decide", "Publish the memo"],
        ].map(([n, title, detail], i) => `
          <g transform="translate(${i * 184} 0)">
            <text x="0" y="16" font-family="Arial" font-size="11" font-weight="700" fill="${i === 3 ? palette.emerald : palette.cobalt}">${n}</text>
            <rect x="0" y="32" width="152" height="92" fill="${i === 3 ? palette.navy : palette.white}" stroke="${i === 3 ? palette.navy : palette.line}"/>
            <text x="16" y="66" font-family="Georgia" font-size="21" fill="${i === 3 ? palette.white : palette.ink}">${title}</text>
            <text x="16" y="94" font-family="Arial" font-size="11" fill="${i === 3 ? "#B8C5D9" : palette.muted}">${detail}</text>
            ${i < 3 ? `<path d="M158 78 H176" stroke="${palette.orange}" stroke-width="2"/><path d="M171 73 L178 78 L171 83" fill="none" stroke="${palette.orange}" stroke-width="2"/>` : ""}
          </g>
        `).join("")}
      </g>
    `),
  },
  {
    slug: "customer-roi",
    label: "Customer ROI",
    title: "The product pays back before the second investment committee.",
    render: () => svg(`
      ${frame({ dark: true, label: "Customer ROI", index: 6, title: "The product pays back before the second investment committee." })}
      <g transform="translate(50 232)">
        <rect width="700" height="126" fill="#0E1A2B" stroke="#2A3A52"/>
        <line x1="54" y1="92" x2="652" y2="92" stroke="#526078"/>
        ${[0, 1, 2, 3, 4].map((i) => `<line x1="${54 + i * 149}" y1="86" x2="${54 + i * 149}" y2="98" stroke="#526078"/><text x="${54 + i * 149}" y="116" text-anchor="middle" font-family="Arial" font-size="10" fill="#A9B2C3">${i * 30} days</text>`).join("")}
        <rect x="54" y="35" width="124" height="26" fill="${palette.orange}"/><text x="116" y="53" text-anchor="middle" font-family="Arial" font-size="11" font-weight="700" fill="${palette.white}">IMPLEMENTATION</text>
        <path d="M178 48 H308" stroke="#A9B2C3" stroke-dasharray="5 5"/>
        <circle cx="308" cy="48" r="9" fill="${palette.emerald}"/>
        <text x="326" y="45" font-family="Georgia" font-size="24" fill="${palette.white}">Payback on day 51</text>
        <text x="326" y="66" font-family="Arial" font-size="11" fill="#A9B2C3">Based on 22 analyst hours saved each month</text>
      </g>
    `),
  },
  {
    slug: "market-size",
    label: "Market size",
    title: "A reachable $680M initial market.",
    render: () => {
      const values = [2180, 620, 430, 300, 680];
      const labels = ["Total spend", "Excluded: non-AI", "Excluded: hyperscalers", "Excluded: analysts", "Initial market"];
      const heights = [118, 34, 24, 17, 72];
      return svg(`
        ${frame({ label: "Bottom-up market sizing", index: 7, title: "A reachable $680M initial market.", subtitle: "Built from target accounts, annual contract value, and a defined initial buying segment." })}
        <g transform="translate(54 246)">
          <line x1="0" y1="118" x2="682" y2="118" stroke="${palette.line}"/>
          ${values.map((value, i) => {
            const x = i * 145;
            const y = 118 - heights[i];
            const color = i === 0 || i === 4 ? palette.cobalt : "#A7ABB3";
            return `<rect x="${x}" y="${y}" width="78" height="${heights[i]}" fill="${color}"/>
              <text x="${x + 39}" y="${y - 10}" text-anchor="middle" font-family="Georgia" font-size="18" fill="${palette.ink}">$${value}M</text>
              ${textBlock({ text: labels[i], x: x + 39, y: 142, size: 9, weight: 600, fill: palette.muted, max: 13, lineHeight: 1.15, anchor: "middle" })}`;
          }).join("")}
        </g>
      `);
    },
  },
  {
    slug: "market-expansion",
    label: "Market expansion",
    title: "The wedge expands with every new evidence workflow.",
    render: () => svg(`
      ${frame({ dark: true, label: "Market expansion", index: 8, title: "The wedge expands with every new evidence workflow." })}
      <g transform="translate(70 226)">
        ${[
          [0, 60, 182, 112, palette.cobalt, "Investment teams", "$680M"],
          [120, 36, 290, 160, palette.emerald, "Advisory & diligence", "$2.1B"],
          [270, 8, 380, 214, palette.orange, "Regulated decisions", "$6.4B"],
        ].map(([x, y, w, h, color, label, value]) => `
          <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}" opacity=".9"/>
          <text x="${x + 18}" y="${y + 34}" font-family="Arial" font-size="11" font-weight="700" fill="${palette.white}">${escapeXml(label)}</text>
          <text x="${x + 18}" y="${y + 70}" font-family="Georgia" font-size="28" fill="${palette.white}">${value}</text>
        `).join("")}
      </g>
    `),
  },
  {
    slug: "business-model",
    label: "Business model",
    title: "Land with one team. Expand through evidence volume.",
    render: () => svg(`
      ${frame({ label: "Business model", index: 9, title: "Land with one team. Expand through evidence volume." })}
      <g transform="translate(50 228)">
        ${[
          ["Team", "$18K", "1 workflow", palette.cobalt],
          ["Fund", "$54K", "4 workflows", palette.emerald],
          ["Platform", "$120K+", "Portfolio-wide", palette.orange],
        ].map(([name, price, detail, color], i) => `
          <g transform="translate(${i * 236} 0)">
            <rect width="210" height="142" fill="${palette.white}" stroke="${palette.line}"/>
            <rect width="210" height="7" fill="${color}"/>
            <text x="20" y="48" font-family="Arial" font-size="12" font-weight="700" fill="${palette.muted}">${name.toUpperCase()}</text>
            <text x="20" y="86" font-family="Georgia" font-size="31" fill="${palette.ink}">${price}</text>
            <text x="20" y="116" font-family="Arial" font-size="12" fill="${palette.muted}">${detail}</text>
          </g>
        `).join("")}
      </g>
    `),
  },
  {
    slug: "traction",
    label: "Traction",
    title: "Expansion revenue now drives 61% of growth.",
    render: () => {
      const bars = [112, 126, 146, 165, 190, 214, 238, 266, 292, 315, 340, 365];
      return svg(`
        ${frame({ dark: true, label: "Traction", index: 10, title: "Expansion revenue now drives 61% of growth.", subtitle: "Net revenue retention of 142% reflects durable, land-and-expand motion." })}
        <g transform="translate(408 214)">
          <line x1="0" y1="152" x2="338" y2="152" stroke="#3C4A61"/>
          ${bars.map((h, i) => {
            const total = h * 0.38;
            const expansion = total * (0.29 + i * 0.029);
            const x = i * 27;
            return `<rect x="${x}" y="${152 - total}" width="18" height="${total - expansion}" fill="#B8C5D9"/><rect x="${x}" y="${152 - expansion}" width="18" height="${expansion}" fill="${palette.emerald}"/>`;
          }).join("")}
        </g>
        <g transform="translate(52 250)">
          <text x="0" y="0" font-family="Georgia" font-size="32" fill="${palette.emerald}">$1.8M</text><text x="0" y="23" font-family="Arial" font-size="10" fill="#A9B2C3">ARR · +48% YoY</text>
          <text x="116" y="0" font-family="Georgia" font-size="32" fill="${palette.emerald}">142%</text><text x="116" y="23" font-family="Arial" font-size="10" fill="#A9B2C3">NET REVENUE RETENTION</text>
          <rect x="0" y="64" width="284" height="60" fill="#0E1A2B" stroke="#31415B"/>
          <text x="18" y="89" font-family="Arial" font-size="12" font-weight="700" fill="${palette.white}">The investor takeaway</text>
          <text x="18" y="109" font-family="Arial" font-size="11" fill="#A9B2C3">Growth is becoming less dependent on new logos.</text>
        </g>
      `);
    },
  },
  {
    slug: "retention",
    label: "Retention",
    title: "High retention. Rising expansion.",
    render: () => {
      const lines = [
        { color: palette.cobalt, values: [102, 107, 115, 119, 124, 130, 139, 145, 151, 158] },
        { color: palette.emerald, values: [100, 103, 106, 112, 115, 121, 128, 134, 138, 142] },
        { color: "#98A2B3", values: [100, 99, 101, 97, 96, 98, 97, 96, 97, 98] },
      ];
      return svg(`
        ${frame({ label: "Retention & cohorts", index: 11, title: "High retention. Rising expansion.", subtitle: "Customer outcomes improve as teams add workflows and evidence sources." })}
        <g transform="translate(72 226)">
          ${[0, 1, 2, 3].map((i) => `<line x1="0" y1="${i * 42}" x2="620" y2="${i * 42}" stroke="${palette.line}"/>`).join("")}
          ${lines.map(({ color, values }) => `<path d="${linePath(values.map((v, i) => [i * 68, 128 - (v - 90) * 1.8]))}" fill="none" stroke="${color}" stroke-width="3"/>`).join("")}
          <text x="632" y="4" font-family="Arial" font-size="11" font-weight="700" fill="${palette.cobalt}">158% top quartile</text>
          <text x="632" y="45" font-family="Arial" font-size="11" font-weight="700" fill="${palette.emerald}">142% portfolio</text>
          <text x="632" y="88" font-family="Arial" font-size="11" font-weight="700" fill="#667085">98% baseline</text>
        </g>
      `);
    },
  },
  {
    slug: "go-to-market",
    label: "Go-to-market",
    title: "A focused path from design partners to category leadership.",
    render: () => svg(`
      ${frame({ dark: true, label: "Go-to-market", index: 12, title: "A focused path from design partners to category leadership." })}
      <g transform="translate(60 228)">
        ${[
          ["01", "Design partners", "10 funds", "Prove repeatability"],
          ["02", "Focused outbound", "60 accounts", "Win the initial segment"],
          ["03", "Channel leverage", "4 partners", "Expand distribution"],
          ["04", "Category platform", "Global", "Own the evidence layer"],
        ].map(([n, title, metric, detail], i) => `
          <g transform="translate(${i * 176} 0)">
            <circle cx="18" cy="18" r="18" fill="${i === 3 ? palette.orange : palette.cobalt}"/><text x="18" y="22" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="${palette.white}">${n}</text>
            ${i < 3 ? `<line x1="38" y1="18" x2="168" y2="18" stroke="#344054" stroke-width="2"/>` : ""}
            <text x="0" y="66" font-family="Georgia" font-size="19" fill="${palette.white}">${title}</text>
            <text x="0" y="96" font-family="Arial" font-size="19" font-weight="700" fill="${i === 3 ? palette.orange : palette.emerald}">${metric}</text>
            <text x="0" y="121" font-family="Arial" font-size="10" fill="#A9B2C3">${detail}</text>
          </g>
        `).join("")}
      </g>
    `),
  },
  {
    slug: "competition",
    label: "Competition",
    title: "Purpose-built for regulated mid-market teams.",
    render: () => svg(`
      ${frame({ label: "Competitive positioning", index: 13, title: "Purpose-built for regulated mid-market teams." })}
      <g transform="translate(86 218)">
        <line x1="0" y1="152" x2="590" y2="152" stroke="${palette.ink}" stroke-width="2"/>
        <line x1="0" y1="152" x2="0" y2="0" stroke="${palette.ink}" stroke-width="2"/>
        <text x="294" y="182" text-anchor="middle" font-family="Arial" font-size="10" fill="${palette.muted}">GENERIC → PURPOSE-BUILT</text>
        <text x="-78" y="-18" transform="rotate(-90)" text-anchor="middle" font-family="Arial" font-size="10" fill="${palette.muted}">SELF-SERVE → REGULATED</text>
        ${[
          [122, 112, "Point tools", "#98A2B3"],
          [240, 70, "Consultancies", "#98A2B3"],
          [380, 116, "Horizontal AI", "#98A2B3"],
          [518, 34, "Our wedge", palette.cobalt],
        ].map(([x, y, label, color]) => `<circle cx="${x}" cy="${y}" r="${label === "Our wedge" ? 17 : 10}" fill="${color}"/><text x="${x}" y="${y - 18}" text-anchor="middle" font-family="Arial" font-size="11" font-weight="700" fill="${color}">${label}</text>`).join("")}
        <rect x="436" y="0" width="154" height="80" fill="none" stroke="${palette.cobalt}" stroke-dasharray="5 4"/>
      </g>
    `),
  },
  {
    slug: "defensibility",
    label: "Defensibility",
    title: "Every decision improves the evidence graph.",
    render: () => svg(`
      ${frame({ dark: true, label: "Defensibility", index: 14, title: "Every decision improves the evidence graph." })}
      <g transform="translate(74 224)">
        <circle cx="330" cy="78" r="62" fill="${palette.cobalt}"/>
        <text x="330" y="72" text-anchor="middle" font-family="Georgia" font-size="21" fill="${palette.white}">Evidence</text>
        <text x="330" y="98" text-anchor="middle" font-family="Georgia" font-size="21" fill="${palette.white}">graph</text>
        ${[
          [40, 12, "More sources", palette.emerald],
          [40, 134, "Better benchmarks", palette.orange],
          [530, 12, "Faster decisions", palette.emerald],
          [530, 134, "Higher trust", palette.orange],
        ].map(([x, y, label, color], i) => `
          <rect x="${x}" y="${y}" width="150" height="52" fill="#101D2E" stroke="${color}"/>
          <text x="${x + 75}" y="${y + 31}" text-anchor="middle" font-family="Arial" font-size="12" font-weight="700" fill="${palette.white}">${label}</text>
          <path d="M ${i < 2 ? x + 150 : x} ${y + 26} C ${i < 2 ? 230 : 480} ${y + 26}, ${i < 2 ? 245 : 415} 78, ${i < 2 ? 268 : 392} 78" fill="none" stroke="${color}" stroke-width="2"/>
        `).join("")}
      </g>
    `),
  },
  {
    slug: "financials",
    label: "Financial trajectory",
    title: "A disciplined path to $9.4M ARR.",
    render: () => {
      const arr = [0.8, 1.8, 3.6, 6.1, 9.4];
      const burn = [1.5, 2.1, 2.7, 3.3, 3.8];
      return svg(`
        ${frame({ label: "Financial trajectory", index: 15, title: "A disciplined path to $9.4M ARR.", subtitle: "Growth outpaces operating expense while gross margin expands to 82%." })}
        <g transform="translate(66 230)">
          <line x1="0" y1="132" x2="640" y2="132" stroke="${palette.line}"/>
          ${arr.map((value, i) => {
            const h = value * 12;
            const burnH = burn[i] * 12;
            const x = i * 130;
            return `<rect x="${x}" y="${132 - h}" width="34" height="${h}" fill="${palette.cobalt}"/><rect x="${x + 40}" y="${132 - burnH}" width="34" height="${burnH}" fill="${palette.orange}"/><text x="${x + 37}" y="154" text-anchor="middle" font-family="Arial" font-size="10" fill="${palette.muted}">FY${25 + i}</text>`;
          }).join("")}
          <text x="650" y="16" font-family="Arial" font-size="11" fill="${palette.cobalt}">■ ARR</text>
          <text x="650" y="38" font-family="Arial" font-size="11" fill="${palette.orange}">■ OPEX</text>
        </g>
      `);
    },
  },
  {
    slug: "use-of-funds",
    label: "The round",
    title: "$1.8M funds 18 months to repeatable growth.",
    render: () => svg(`
      ${frame({ label: "Round milestones & use of funds", index: 16, title: "$1.8M funds 18 months to repeatable growth." })}
      <g transform="translate(54 220)">
        ${[
          ["0–6", "Prove", "10 design partners", palette.cobalt],
          ["6–12", "Repeat", "$1.8M ARR", palette.emerald],
          ["12–18", "Scale", "Net retention >130%", palette.orange],
        ].map(([months, title, metric, color], i) => `
          <g transform="translate(${i * 196} 0)">
            <text x="0" y="18" font-family="Arial" font-size="10" font-weight="700" fill="${color}">${months} MONTHS</text>
            <rect x="0" y="34" width="170" height="94" fill="${palette.white}" stroke="${palette.line}"/>
            <text x="16" y="68" font-family="Georgia" font-size="22" fill="${palette.ink}">${title}</text>
            <text x="16" y="99" font-family="Arial" font-size="11" fill="${palette.muted}">${metric}</text>
            ${i < 2 ? `<path d="M176 82 H190" stroke="${palette.ink}" stroke-width="2"/><path d="M186 77 L192 82 L186 87" fill="none" stroke="${palette.ink}" stroke-width="2"/>` : ""}
          </g>
        `).join("")}
        <g transform="translate(612 18)">
          <circle cx="66" cy="66" r="54" fill="none" stroke="${palette.line}" stroke-width="20"/>
          <path d="M66 12 A54 54 0 0 1 117 48" fill="none" stroke="${palette.cobalt}" stroke-width="20"/>
          <path d="M117 48 A54 54 0 0 1 79 118" fill="none" stroke="${palette.emerald}" stroke-width="20"/>
          <path d="M79 118 A54 54 0 0 1 18 88" fill="none" stroke="${palette.orange}" stroke-width="20"/>
          <text x="66" y="63" text-anchor="middle" font-family="Georgia" font-size="18" fill="${palette.ink}">$1.8M</text>
          <text x="66" y="82" text-anchor="middle" font-family="Arial" font-size="9" fill="${palette.muted}">ROUND</text>
        </g>
      </g>
    `),
  },
];

const heroGood = svg(`
  ${frame({ label: "Founder-built traction slide", index: 0, title: "Strong growth across the last 12 months." })}
  <g transform="translate(54 214)">
    ${[["$1.8M", "ARR"], ["142%", "Net revenue retention"], ["1,250", "Customers"]].map(([value, label], i) => `
      <g transform="translate(${i * 228} 0)"><rect width="204" height="70" fill="${palette.white}" stroke="${palette.line}"/><text x="16" y="31" font-family="Arial" font-size="22" font-weight="700" fill="${palette.ink}">${value}</text><text x="16" y="53" font-family="Arial" font-size="10" fill="${palette.muted}">${label}</text></g>
    `).join("")}
    <line x1="0" y1="154" x2="660" y2="154" stroke="${palette.line}"/>
    <path d="M 10 145 L 80 132 L 150 120 L 220 124 L 290 96 L 360 102 L 430 80 L 500 62 L 570 44 L 650 31" fill="none" stroke="${palette.cobalt}" stroke-width="3"/>
    <text x="0" y="184" font-family="Arial" font-size="10" fill="${palette.muted}">Monthly recurring revenue</text>
  </g>
`);

const diagnostic = svg(`
  <rect width="1200" height="760" fill="${palette.carbon}"/>
  <text x="48" y="62" font-family="Georgia" font-size="34" fill="${palette.ivory}">The feedback founders can actually act on.</text>
  <text x="48" y="91" font-family="Arial" font-size="13" fill="#A9B2C3">A senior review of narrative, evidence, hierarchy, market logic, metric framing, and investor takeaway.</text>
  <rect x="272" y="132" width="656" height="470" fill="${palette.ivory}" stroke="#3B4657"/>
  <text x="310" y="177" font-family="Arial" font-size="10" font-weight="700" fill="${palette.muted}">ILLUSTRATIVE DECK DIAGNOSTIC</text>
  ${textBlock({ text: "We are building the future of data infrastructure.", x: 310, y: 228, size: 34, weight: 500, fill: palette.ink, family: "Georgia, serif", max: 32, lineHeight: 1.02 })}
  <text x="310" y="305" font-family="Arial" font-size="12" fill="${palette.muted}">Our platform helps teams store, move, and analyze data in the cloud.</text>
  ${[["10K+", "Users"], ["500+", "Customers"], ["$2M", "ARR"]].map(([value, label], i) => `<g transform="translate(${310 + i * 180} 336)"><rect width="160" height="64" fill="${palette.white}" stroke="${palette.line}"/><text x="14" y="28" font-family="Arial" font-size="20" font-weight="700" fill="${palette.ink}">${value}</text><text x="14" y="48" font-family="Arial" font-size="10" fill="${palette.muted}">${label}</text></g>`).join("")}
  <rect x="310" y="424" width="340" height="130" fill="${palette.white}" stroke="${palette.line}"/>
  <path d="M330 530 L380 512 L430 518 L480 484 L530 478 L580 454 L628 442" fill="none" stroke="${palette.cobalt}" stroke-width="3"/>
  <rect x="670" y="424" width="220" height="130" fill="${palette.white}" stroke="${palette.line}"/>
  ${["Fast and easy to use", "Secure and reliable", "Scales with your needs"].map((value, i) => `<text x="690" y="${458 + i * 30}" font-family="Arial" font-size="11" fill="${palette.ink}">• ${value}</text>`).join("")}
  ${[
    [1, 44, 180, 272, 205, "NARRATIVE", "Lead with the customer outcome and why it matters now."],
    [2, 44, 334, 310, 305, "EVIDENCE", "Add context and benchmarks so the numbers become meaningful."],
    [3, 44, 508, 310, 354, "HIERARCHY", "Reduce headline noise and elevate the single insight."],
    [4, 954, 180, 928, 228, "MARKET LOGIC", "Show a clear bottom-up path to the market opportunity."],
    [5, 954, 334, 890, 472, "METRIC FRAMING", "Shift from activity to the outcomes investors care about."],
    [6, 954, 508, 890, 520, "INVESTOR TAKEAWAY", "Make the conclusion obvious in one line."],
  ].map(([n, tx, ty, px, py, title, note]) => `
    <circle cx="${tx}" cy="${ty}" r="12" fill="${palette.orange}"/><text x="${tx}" y="${ty + 4}" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="${palette.white}">${n}</text>
    <text x="${tx + (tx < 600 ? 22 : -22)}" y="${ty - 7}" text-anchor="${tx < 600 ? "start" : "end"}" font-family="Arial" font-size="11" font-weight="700" fill="${palette.orange}">${title}</text>
    ${textBlock({ text: note, x: tx + (tx < 600 ? 22 : -22), y: ty + 15, size: 10, fill: "#C6CDD8", max: 28, lineHeight: 1.22, anchor: tx < 600 ? "start" : "end" })}
    <path d="M ${tx < 600 ? tx + 12 : tx - 12} ${ty} H ${px}" stroke="${palette.orange}" stroke-width="1.5"/><circle cx="${px}" cy="${py}" r="4" fill="${palette.orange}"/>
  `).join("")}
`, 1200, 760);

const resources = svg(`
  <rect width="1200" height="760" fill="${palette.carbon}"/>
  <text x="48" y="64" font-family="Georgia" font-size="35" fill="${palette.ivory}">Frameworks and tools for stronger fundraising decisions.</text>
  <g transform="translate(48 118)">
    ${[
      [0, palette.navy, palette.cobalt, "Investor", "Readiness Checklist", "A practical guide to pressure-test your story before you raise."],
      [238, palette.emerald, palette.ivory, "Bottom-Up", "Market Sizing", "A step-by-step playbook for a defensible market model."],
      [476, palette.ivory, palette.ink, "Fundraising", "Data Room", "What to include, how to organize it, and how to keep it ready."],
    ].map(([x, bg, fg, top, title, body], i) => `
      <g transform="translate(${x} 0)">
        <rect width="212" height="332" fill="${bg}" stroke="#394354"/>
        <text x="22" y="35" font-family="Arial" font-size="9" font-weight="700" letter-spacing="1.5" fill="${fg}">GUIDE 0${i + 1}</text>
        <text x="22" y="92" font-family="Georgia" font-size="28" fill="${fg}">${top}</text>
        <text x="22" y="123" font-family="Georgia" font-size="28" fill="${fg}">${title}</text>
        ${textBlock({ text: body, x: 22, y: 176, size: 11, fill: fg, max: 26, lineHeight: 1.35 })}
        ${[0,1,2,3].map((j) => `<path d="M20 ${286 - j * 15} C 80 ${250 - j * 10}, 138 ${310 - j * 14}, 194 ${242 - j * 8}" fill="none" stroke="${fg}" opacity="${0.18 + j * 0.12}"/>`).join("")}
      </g>
    `).join("")}
    <g transform="translate(728 0)">
      <rect width="424" height="156" fill="${palette.ivory}" stroke="#394354"/>
      <text x="20" y="27" font-family="Arial" font-size="9" font-weight="700" fill="${palette.cobalt}">TOOL · RUNWAY CALCULATOR</text>
      <text x="20" y="67" font-family="Georgia" font-size="24" fill="${palette.ink}">7.4 months</text>
      <path d="M174 42 L220 58 L266 82 L312 104 L380 134" fill="none" stroke="${palette.cobalt}" stroke-width="3"/>
      <line x1="174" y1="134" x2="390" y2="134" stroke="${palette.line}"/>
      <text x="20" y="103" font-family="Arial" font-size="11" fill="${palette.muted}">$2.0M cash · $250K monthly burn</text>
      <rect y="176" width="424" height="156" fill="${palette.ivory}" stroke="#394354"/>
      <text x="20" y="205" font-family="Arial" font-size="9" font-weight="700" fill="${palette.emerald}">TOOL · VC FIT FINDER</text>
      ${[["Fund A", 94], ["Fund B", 86], ["Fund C", 74]].map(([name, score], i) => `<text x="20" y="${242 + i * 34}" font-family="Arial" font-size="11" fill="${palette.ink}">${name}</text><rect x="104" y="${232 + i * 34}" width="240" height="11" fill="${palette.line}"/><rect x="104" y="${232 + i * 34}" width="${score * 2.4}" height="11" fill="${i === 0 ? palette.cobalt : palette.emerald}"/><text x="376" y="${242 + i * 34}" text-anchor="end" font-family="Arial" font-size="10" fill="${palette.muted}">${score}%</text>`).join("")}
    </g>
  </g>
`, 1200, 760);

const social = svg(`
  <rect width="1200" height="630" fill="${palette.carbon}"/>
  <text x="64" y="72" font-family="Arial" font-size="18" font-weight="700" letter-spacing="2" fill="#A9B2C3">FOUNDTERRA</text>
  ${textBlock({ text: "From a good slide to investor-ready.", x: 64, y: 145, size: 53, weight: 500, fill: palette.ivory, family: "Georgia, serif", max: 25, lineHeight: 1.02 })}
  <text x="64" y="276" font-family="Arial" font-size="18" fill="#A9B2C3">Strategy, narrative, financial logic, and design for pre-seed and seed founders.</text>
  <g transform="translate(600 80) scale(.69)">
    <rect width="800" height="450" fill="${palette.ivory}" stroke="#41506A"/>
    ${textBlock({ text: "Expansion revenue now drives 61% of growth.", x: 44, y: 75, size: 36, weight: 500, fill: palette.ink, family: "Georgia, serif", max: 31, lineHeight: 1.02 })}
    <text x="44" y="166" font-family="Georgia" font-size="32" fill="${palette.emerald}">$1.8M</text><text x="44" y="190" font-family="Arial" font-size="11" fill="${palette.muted}">ARR · +48% YOY</text>
    ${[0,1,2,3,4,5,6,7,8].map((i) => `<rect x="${330 + i * 43}" y="${330 - i * 20}" width="28" height="${70 + i * 20}" fill="${palette.cobalt}"/><rect x="${330 + i * 43}" y="${350 - i * 12}" width="28" height="${50 + i * 12}" fill="${palette.emerald}"/>`).join("")}
  </g>
  <rect x="64" y="532" width="214" height="4" fill="${palette.orange}"/>
`, 1200, 630);

await fs.mkdir(outDir, { recursive: true });
await fs.mkdir(brandDir, { recursive: true });

const renderAvif = async (source, target, width = 800, height = 450) => {
  const temporaryTarget = `${target}.next`;
  await sharp(Buffer.from(source))
    .resize(width, height)
    .avif({ quality: 64, effort: 7, chromaSubsampling: "4:4:4" })
    .toFile(temporaryTarget);
  await fs.rm(target, { force: true });
  await fs.rename(temporaryTarget, target);
};

await Promise.all(
  slides.map((slide, index) =>
    renderAvif(slide.render(), path.join(outDir, `slide-${String(index + 1).padStart(2, "0")}.avif`)),
  ),
);
await Promise.all([
  renderAvif(heroGood, path.join(outDir, "hero-good.avif")),
  renderAvif(slides[9].render(), path.join(outDir, "hero-investor-ready.avif")),
  renderAvif(diagnostic, path.join(outDir, "deck-diagnostic.avif"), 1200, 760),
  renderAvif(resources, path.join(outDir, "resource-library.avif"), 1200, 760),
  (async () => {
    const target = path.join(brandDir, "foundterra-og.webp");
    const temporaryTarget = `${target}.next`;
    await sharp(Buffer.from(social)).resize(1200, 630).webp({ quality: 86, effort: 6 }).toFile(temporaryTarget);
    await fs.rm(target, { force: true });
    await fs.rename(temporaryTarget, target);
  })(),
]);

console.log(`[homepage-visuals] Generated ${slides.length + 5} optimized assets.`);
