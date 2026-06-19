import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface GuideData {
  title: string;
  subtitle: string;
  sections: Array<{ heading: string; body: string[] }>;
  externalUrl?: string;
  externalLabel?: string;
}

const PreSeedChecklistArticle = () => (
  <div className="space-y-8">
    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">I. Legal Counsel &amp; Company Formation</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Engage legal counsel specializing in start-ups</li>
        <li>Form (or transition to) a Delaware C Corporation</li>
        <li>Prepare and gather company formation documents</li>
      </ul>
      <ul className="mt-3 space-y-1">
        <li>✅ Certificate of Incorporation</li>
        <li>✅ Bylaws</li>
        <li>✅ Board Consents</li>
      </ul>
      <ul className="list-disc pl-6 space-y-2 mt-3">
        <li>Prepare paperwork to transfer founder IP to the company</li>
        <li>Document founder equity stakes and vesting schedules</li>
        <li>File an 83(b) election with the IRS (if applicable)</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">II. Capitalization Table &amp; Equity Structure</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Set up a clean Cap Table (accurate ownership record)</li>
        <li>Establish a fair equity split among founders</li>
        <li>Create an Equity Incentive Plan (e.g., option pool) for team/advisors</li>
        <li>Implement 4-year vesting with a 1-year cliff for all contributors</li>
        <li>Ensure shares have transfer restrictions and Right of First Refusal (ROFR)</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">III. Fundraising Strategy &amp; Due Diligence</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Define fundraising plan</li>
      </ul>
      <ul className="mt-3 space-y-1">
        <li>✅ Target amount</li>
        <li>✅ Use of funds</li>
        <li>✅ Instrument (SAFE / Note / Priced Round)</li>
      </ul>
      <ul className="list-disc pl-6 space-y-2 mt-3">
        <li>Use market-standard docs (e.g., Y Combinator SAFE)</li>
        <li>Avoid investors requesting off-market or complex terms</li>
        <li>Confirm all investors are Accredited Investors</li>
        <li>Organize all company records &amp; legal documents for diligence</li>
        <li>Resolve open items (e.g., pre-round advisor grants) before fundraising</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">IV. Agreements with Service Providers</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Ensure every employee, advisor, and consultant signs written agreements</li>
        <li>Use Non-Disclosure &amp; Invention Assignment Agreements (NDIAA) for employees</li>
        <li>Include work-made-for-hire and IP assignment clauses</li>
        <li>Add indemnification clauses confirming originality of work</li>
        <li>Control and document open-source software usage in products</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">V. Intellectual Property (IP) Protection</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Register copyrights for key materials (software, content, etc.)</li>
        <li>Use proper , ™, and  notices on all assets</li>
        <li>Secure rights of publicity / model releases for any individual’s likeness</li>
        <li>Designate a DMCA agent and implement a takedown policy (if applicable)</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">VI. Privacy Policy &amp; Terms of Use</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Draft custom Privacy Policy and Terms of Use (don’t copy others!)</li>
        <li>Privacy Policy: Describe data collection, use, and sharing clearly</li>
        <li>Privacy Policy: Include opt-out mechanism and data security practices</li>
        <li>Terms of Use: Define permissible use, warranties, liability limits, governing law</li>
        <li>Terms of Use: Clarify ownership and license rights for user-generated content</li>
      </ul>
    </article>
  </div>
);

const ColdReachInvestorsArticle = () => (
  <div className="space-y-8">
    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-2">🚀 Investor Outreach System: The Master Guide</h2>
      <blockquote className="border-l-4 pl-4 text-foreground/90">
        <p className="font-semibold">🎯 The Goal:</p>
        <p>
          Industry average cold reply rates are <strong>1%</strong>. Following this protocol (personalization +
          technical hygiene + strategic persistence) can elevate reply rates to <strong>15–25%</strong>.
        </p>
      </blockquote>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-2">🛠 Phase 1: Technical &amp; Research Setup</h2>
      <p className="italic mb-4">Do not skip this. Technical failure ensures you hit the spam folder.</p>

      <h3 className="text-xl font-semibold mb-2">1. Technical Hygiene (The &quot;Inbox&quot; Rules)</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          <strong>Use a Secondary Domain:</strong> Never send mass cold emails from your primary domain (e.g.,
          use company.co instead of company.com). If you get flagged as spam, you don&apos;t want to kill your main
          email functionality.
        </li>
        <li>
          <strong>The Warm-Up:</strong> New domains require a <strong>21-day warm-up period</strong> before sending
          volume outreach.
        </li>
        <li>
          <strong>Authentication:</strong> You must configure <strong>SPF, DKIM, and DMARC</strong> settings.
          Without these, you are invisible.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">2. Targeted Selection</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Verify Fit:</strong> Only target investors who invest in your <strong>Vertical</strong> (e.g.,
          Fintech) and <strong>Stage</strong> (e.g., Pre-Seed vs. Series A).
        </li>
        <li>
          <strong>Thesis Alignment:</strong> Look for public statements or past investments that match your model.
        </li>
        <li>
          <strong>Blacklist Warning:</strong> Generic &quot;mass blasts&quot; get you blacklisted. Personalization is
          a requirement, not a bonus.
        </li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-2">📝 Phase 2: The 4 Rules of Construction</h2>

      <h3 className="text-xl font-semibold mb-2">1. The &quot;Movie Trailer&quot; Analogy</h3>
      <p className="mb-4">
        Think of your email as a trailer, not the full movie. You are not trying to &quot;close the deal&quot; (sell the
        movie ticket); you are trying to <strong>get the meeting</strong> (convince them the trailer is interesting
        enough to watch).
      </p>

      <h3 className="text-xl font-semibold mb-2">2. Brevity &amp; Structure</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          <strong>Length:</strong> 50–150 words maximum.
        </li>
        <li>
          <strong>Mobile-First:</strong> Investors decide in seconds on their phones.
        </li>
        <li>
          <strong>Subject Line:</strong> A &quot;6-word pitch.&quot; High signal, hard data. Avoid spam words like
          &quot;Opportunity,&quot; &quot;Partner,&quot; or &quot;Million.&quot;
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">3. &quot;Lines, Not Dots&quot;</h3>
      <p className="mb-2">Investors invest in trajectories.</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          <strong>Don&apos;t say:</strong> &quot;We are a disruptive platform.&quot;
        </li>
        <li>
          <strong>Do say:</strong> &quot;$20k MRR, growing 20% MoM.&quot;
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">4. Low-Friction CTA</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>The Ask:</strong> Do not ask for 1 hour. Ask for a &quot;brief chat&quot; or &quot;mind if I send the
          deck?&quot;
        </li>
        <li>
          <strong>Scheduling:</strong> Suggest specific times (e.g., &quot;Tuesday at 10 AM&quot;) to reduce cognitive
          load.
        </li>
        <li>
          <strong>No NDAs:</strong> Never ask for an NDA in cold outreach. It signals amateurism.
        </li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">📧 Phase 3: The Templates</h2>
      <h3 className="text-xl font-semibold mb-2">🟢 Template A: Seed Stage (Post-Traction)</h3>
      <p className="italic mb-3">Use this when you have MRR, active users, or growth metrics.</p>
      <p className="mb-2 font-medium">codeText</p>
      <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md mb-6">{`Subject: [Company Name]: [Metric] | [Growth %] | [Sector]
(Example: Acme AI: $25k MRR, +25% MoM | Seed | Fintech)

Hi [Investor Name],

[Personalized Hook]: I listened to your interview on [Podcast Name] regarding [Specific Topic]. Your point about [Insight] was particularly compelling given what we are seeing in the market.

[The One-Sentence Pitch]: We are building [Company Name] to solve [Problem] for [Target Audience].

[The Signal/Traction]: We’ve hit several milestones recently that align with your thesis in [Sector]:
• Traction: [e.g., $15k MRR growing 20% month-over-month].
• Customers: Currently serving [Number] of [Customer Type].
• Team: Founders from [Previous Company/University] with expertise in [Field].
• Social Proof: Recently backed by [Lead Investor/Angel Name].

[The Ask]: We are raising a [Round Amount] Seed round to expand our product line. Given your focus on [Relevant Area], would you be open to a 15-minute call next Tuesday at 10 AM?

[Friction Reducer]: I’ve attached our pitch deck here (no link required) for your review.

Best,
[Your Name]
[LinkedIn Profile Link]`}</pre>

      <h3 className="text-xl font-semibold mb-2">🟡 Template B: Pre-Seed (Pre-Traction)</h3>
      <p className="italic mb-3">Use this when you have no revenue. Focus on Founder-Market Fit and &quot;Soft&quot; Signal.</p>
      <p className="mb-2 font-medium">codeText</p>
      <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md">{`Subject: [Company Name]: [Problem Hook] | Pre-Seed
(Example: Acme Health: Automating patient intake for 50+ beta clinics | Pre-Seed)

Hi [Investor Name],

[Personalized Hook]: I saw your recent investment in [Related Early Stage Startup] and was impressed by your thesis on [Specific Industry Trend].

[The Problem/Solution]: We are building [Company Name] to solve [Specific Problem]. My co-founder and I previously led teams at [Previous Notable Company], where we realized that [Specific Market Insight] was being ignored.

[Early Signal]: While we are pre-revenue, we have already achieved:
• Validation: [Waitlist of 500+ users / Pilot agreement with X Partner].
• Product: MVP is live with [Number] of active beta testers.
• Advisors: Supported by [Name], former [Title] at [Well-Known Company].

[The Ask]: We are raising a [Amount] pre-seed round to move from beta to full launch. Would you be open to a brief 15-minute chat or mind if I sent the deck over?

Best,
[Your Name]`}</pre>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-2">🔄 Phase 4: The Follow-Up Strategy</h2>
      <p className="mb-4">
        Persistence wins deals, but <strong>annoying persistence</strong> kills them.
      </p>

      <h3 className="text-xl font-semibold mb-2">The Protocol</h3>
      <ol className="list-decimal pl-6 space-y-2 mb-4">
        <li>
          <strong>Cadence:</strong> Most successful rounds require <strong>4–7 follow-ups</strong>.
        </li>
        <li>
          <strong>Timing:</strong> The first follow-up should be <strong>2–3 business days</strong> after the initial
          email.
          <ul className="list-disc pl-6 mt-2">
            <li>
              <em>Best Windows:</em> Tuesday–Thursday mornings.
            </li>
          </ul>
        </li>
        <li>
          <strong>The &quot;Value-Add&quot; Rule:</strong> Never send a &quot;Just checking in&quot; email. Every email
          must add value.
        </li>
      </ol>

      <h3 className="text-xl font-semibold mb-2">Follow-Up Content Ideas</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Touch 2:</strong> &quot;Since my last email, we just signed [Customer Name]...&quot;
        </li>
        <li>
          <strong>Touch 3:</strong> &quot;Thought you might find this article on [Sector Trend] interesting...&quot;
        </li>
        <li>
          <strong>Touch 4:</strong> &quot;We just hit [New Milestone] in our beta...&quot;
        </li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">✅ Checklist Before Sending</h2>
      <ul className="space-y-2">
        <li>✅ Is the domain warmed up (SPF/DKIM set)?</li>
        <li>✅ Is the investor verified for Stage and Sector fit?</li>
        <li>✅ Is the deck attached (PDF) to reduce clicks?</li>
        <li>✅ Is the subject line under 6 words with hard data/hooks?</li>
        <li>✅ Is the CTA specific (time/date) and low friction?</li>
      </ul>
    </article>
  </div>
);

const ViralLaunchChecklistArticle = () => (
  <div className="space-y-8">
    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-2">
        A structured and tactical system to engineer a viral launch — focused on preparation, execution, and amplification.
      </h2>
      <p>
        The objective: maximize visibility, accelerate feedback loops, and compound early traction through network
        coordination.
      </p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-2">I. Pre-Launch Preparation</h2>
      <p className="mb-4">
        <strong>Goal:</strong> Build your support infrastructure, align timing, and pre-assemble viral assets.
      </p>

      <h3 className="text-xl font-semibold mb-2">🧠 A. Building the Support Circle</h3>
      <ul className="space-y-3">
        <li>✅ <strong>Compile the core circle (30–150 supporters).</strong></li>
        <li className="ml-6 list-none">Include a mix of ideal customers, operators, investors, close peers, and friends.</li>
        <li className="ml-6 list-none">Each segment brings credibility and algorithmic reach.</li>
        <li>✅ <strong>Segment your supporters by expected responsiveness.</strong></li>
        <li className="ml-6 list-none"><strong>Tier 1 (Immediate):</strong> Engage within the first 5 minutes after posting.</li>
        <li className="ml-6 list-none"><strong>Tier 2 (Prompt):</strong> Engage within the first 15 minutes.</li>
        <li className="ml-6 list-none"><strong>Tier 3 (Extended):</strong> Engage within the first hour.</li>
        <li>✅ <strong>Map communication channels.</strong></li>
        <li className="ml-6 list-none">
          Activate multiple layers of reach — WhatsApp, Telegram, Slack, private DM pods, internal groups
          (accelerators, masterminds, etc.).
        </li>
        <li className="ml-6 list-none">Leverage “shared context” networks that lift conversion rates.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">⏰ B. Launch Preparation Cadence</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Timeframe</th>
              <th className="text-left p-2">Action</th>
              <th className="text-left p-2">Message Example</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2"><strong>One Week Before Launch</strong></td>
              <td className="p-2">Send a soft heads-up and gauge interest.</td>
              <td className="p-2">“Quick heads-up — launching something next week. If you’re open to supporting, a like or quick comment in the first few minutes helps the algo push it. Should I ping you when it’s live?”</td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><strong>Three Days Before Launch</strong></td>
              <td className="p-2">Circulate draft post and visuals privately for early feedback.</td>
              <td className="p-2">“Would love a gut-check on this — does the hook land?”</td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><strong>The Day Before Launch</strong></td>
              <td className="p-2">Share exact launch time and prewritten snippets.</td>
              <td className="p-2">“Dropping tomorrow at 10:00 AM sharp. Here’s a one-liner if helpful: ‘X’. I’ll send the direct link once it’s live.”</td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><strong>Launch Hour (Go Live)</strong></td>
              <td className="p-2">Deliver personalized nudges with the live link.</td>
              <td className="p-2">“We’re live 🚀. A quick like or comment would be gold. Here’s the link — thank you for helping this take off.”</td>
            </tr>
            <tr>
              <td className="p-2"><strong>First Hour Post-Launch</strong></td>
              <td className="p-2">Trigger the second wave (Tier 2) and ask for supportive comments or quote reposts.</td>
              <td className="p-2">“Appreciate the early traction — any comment or quote repost with your take helps a ton.”</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">🧩 C. Pre-Baked Launch Assets</h3>
      <p className="mb-3">Prepare the assets you’ll need to respond quickly and amplify efficiently:</p>
      <ul className="space-y-2">
        <li>✅ 10 pre-collected screenshots of comments, reactions, or quotes (for social proof).</li>
        <li>✅ 3 alternate thumbnails for A/B testing visuals.</li>
        <li>✅ 2 short, polished replies to common objections.</li>
        <li>✅ 1 shared Google Doc with prewritten blurbs for your supporters (for copy-paste engagement).</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-2">II. Launch Execution Playbook</h2>
      <p className="mb-4">
        <strong>Goal:</strong> Deliver precision coordination during the first hours — the compounding window that
        determines reach.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Time (relative to post)</th>
              <th className="text-left p-2">Action</th>
              <th className="text-left p-2">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2"><strong>1 Hour Before Posting</strong></td>
              <td className="p-2">Final readiness check.</td>
              <td className="p-2">Verify that the post is scheduled, all links are functional, and your lead magnet CTA (first comment) is pre-drafted.</td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><strong>At Launch (Post Time)</strong></td>
              <td className="p-2">Execute.</td>
              <td className="p-2">Publish the post, immediately add your lead comment, and notify Tier 1 supporters.</td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><strong>Within 10 Minutes</strong></td>
              <td className="p-2">Engage the first responders.</td>
              <td className="p-2">Reply to every comment with thoughtful follow-ups or micro-value. DM the lead magnet to those who ask.</td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><strong>Within 1 Hour</strong></td>
              <td className="p-2">Amplify.</td>
              <td className="p-2">Post a quote RT (or repost) from your own account with a fresh angle. Share the post across 2–3 niche groups or community chats.</td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><strong>Within 3 Hours</strong></td>
              <td className="p-2">Sustain momentum.</td>
              <td className="p-2">Post a short “behind-the-scenes” update on Stories or Threads. Activate Tier 2 supporter nudges.</td>
            </tr>
            <tr>
              <td className="p-2"><strong>End of Day</strong></td>
              <td className="p-2">Consolidate and tease.</td>
              <td className="p-2">Summarize key outcomes, highlight comments, and tease upcoming content or next steps.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-2">III. Proven Launch Archetypes</h2>
      <p className="mb-4">
        <strong>Goal:</strong> Choose one core structure and execute with consistency.
      </p>

      <h3 className="text-xl font-semibold mb-2">1. Cinematic Announcement + Lead Magnet Hook</h3>
      <p className="italic mb-2">(Big visual moment leading to a free resource)</p>
      <ul className="space-y-2 mb-4">
        <li>✅ Hook lands within the first 2 seconds — a strong pattern break.</li>
        <li>✅ Narrative follows a clean 3-beat arc: <strong>Problem → Aha → Payoff.</strong></li>
        <li>✅ Offer the lead magnet in comments (e.g., “Comment LAUNCH for access”).</li>
        <li>✅ Respond or auto-DM within 3 minutes of any comment.</li>
        <li>✅ Keep a fallback landing page if DMs fail.</li>
        <li>✅ Pre-seed 10–20 comments and quote reposts before going live.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">2. Lead Magnet First Approach</h3>
      <p className="italic mb-2">(Deliver undeniable value upfront)</p>
      <ul className="space-y-2 mb-4">
        <li>✅ Headline is a direct promise — concise, specific, tangible.</li>
        <li>✅ Reveal roughly 10% of the resource in the post to prove authenticity.</li>
        <li>✅ Deliver via native interaction: comment keyword, DM keyword, or message request.</li>
        <li>✅ Track conversion by rotating keywords per channel.</li>
        <li>✅ Use a gentle follow-up ask: “Would you like early access — yes or no?”</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">3. Narrative Series / Curiosity Thread</h3>
      <p className="italic mb-2">(Mini-series format building anticipation)</p>
      <ul className="space-y-2 mb-4">
        <li>✅ Release 3–5 breadcrumb posts leading to the reveal.</li>
        <li>✅ Maintain consistent visual identity and title pattern for recognition.</li>
        <li>✅ Each breadcrumb post includes a micro-CTA (poll, question, remix request).</li>
        <li>✅ The final post ties the loop and introduces the lead magnet.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">4. Milestone or Announcement Format</h3>
      <p className="italic mb-2">(Updates people naturally want to share)</p>
      <ul className="space-y-2">
        <li>✅ Use formats that algorithms already favor (e.g., LinkedIn “new job” or “update” templates).</li>
        <li>✅ Coordinate with investors, advisors, or employees to cross-post announcements.</li>
        <li>✅ Include a milestone carousel showing metrics, a chart, and three concise lessons.</li>
        <li>✅ End with a “thank-you wall” tagging supporters to trigger reciprocity.</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-2">IV. Post-Launch Amplification &amp; Measurement</h2>
      <p className="mb-4">
        <strong>Goal:</strong> Convert engagement into relationships and insights into optimization.
      </p>

      <h3 className="text-xl font-semibold mb-2">A. Comment Ladder Follow-Up</h3>
      <p className="mb-3">Turn top-of-funnel engagement into qualified interest.</p>
      <ul className="space-y-3 mb-6">
        <li>✅ <strong>Immediately after engagement (within 15 minutes):</strong></li>
        <li className="ml-6 list-none">Send the resource — “Here’s the full version, enjoy and save it.”</li>
        <li>✅ <strong>24 Hours Later:</strong></li>
        <li className="ml-6 list-none">Follow up for feedback — “Quick one: which part was most useful for you?”</li>
        <li>✅ <strong>72 Hours Later:</strong></li>
        <li className="ml-6 list-none">Offer conversion — “We’re opening a limited early access round — interested?”</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">B. Metrics &amp; Continuous Optimization</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Metric</th>
              <th className="text-left p-2">Target</th>
              <th className="text-left p-2">Optimization Lever</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2"><strong>Engagement Metrics</strong></td>
              <td className="p-2">Impressions, saves, shares, profile visits</td>
              <td className="p-2">Identify posts with highest interaction velocity and repurpose format.</td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><strong>Comment Rate</strong></td>
              <td className="p-2">≥ 1.5% per 1k impressions</td>
              <td className="p-2">Run 3 hook variants 30 minutes apart; refine opening line clarity.</td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><strong>Delivery Conversion</strong></td>
              <td className="p-2">Ratio of DMs sent per comment</td>
              <td className="p-2">Reduce delay in replies; personalize opening line.</td>
            </tr>
            <tr>
              <td className="p-2"><strong>Opt-In Rate</strong></td>
              <td className="p-2">≥ 35%</td>
              <td className="p-2">Adjust thumbnail or first 3-second framing if view rate is low.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-2">V. Avoiding Common Failure Modes</h2>
      <p className="mb-3">To sustain momentum and credibility:</p>
      <ul className="space-y-2">
        <li>✅ Don’t overload asks (no long forms, surveys, or Calendly links too early).</li>
        <li>✅ Don’t tease products without tangible value.</li>
        <li>✅ Don’t post impulsively — A/B test time slots beforehand.</li>
        <li>✅ Don’t polish tone excessively — authenticity outperforms corporate voice.</li>
        <li>✅ Don’t delay responses — engagement half-life decays within 60 minutes.</li>
      </ul>
    </article>
  </div>
);

const EarlyTractionMetricsArticle = () => (
  <div className="space-y-8">
    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-2">What investors really want to see at Pre-Seed &amp; Seed stages</h2>
      <p>
        The right KPIs tell that story. Below is a detailed breakdown of the metrics investors actually care about,
        how to measure them, what good looks like at each stage, and how to present them.
      </p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">1. Core Revenue &amp; Growth Metrics</h2>
      <h3 className="text-xl font-semibold mb-2">Monthly Recurring Revenue (MRR) / Annual Recurring Revenue (ARR)</h3>
      <p><strong>Definition / formula:</strong></p>
      <ul className="list-disc pl-6 mb-3">
        <li>MRR = total recurring revenue from all active customers per month</li>
        <li>ARR = MRR × 12</li>
      </ul>
      <p><strong>Why it matters:</strong> Investors love MRR and ARR because they show consistent, predictable revenue and help benchmark your growth potential.</p>
      <p><strong>Expectations:</strong></p>
      <ul className="list-disc pl-6 mb-3">
        <li>Pre-Seed: Evidence of early customers or pilot revenue ($1k–$5k MRR is enough if growth trend is visible).</li>
        <li>Seed: Repeatable revenue and acceleration, typically $10k–$100k+ MRR with steady 10–30% MoM growth.</li>
      </ul>
      <p><strong>Improve it:</strong> Turn pilots into paid pilots, document proof of customer value, and keep the trend line up and to the right.</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Growth Rate (Month-over-Month or Year-over-Year)</h3>
      <p><strong>Formula:</strong></p>
      <p>(MRR this month − MRR last month) ÷ MRR last month × 100</p>
      <p><strong>Why it matters:</strong> Momentum is more important than absolute numbers. Investors care about consistent positive trends.</p>
      <p><strong>Expectations:</strong></p>
      <ul className="list-disc pl-6 mb-3">
        <li>Pre-Seed: Any steady upward movement with clear reasoning.</li>
        <li>Seed: Sustained 10–30% MoM growth depending on model.</li>
      </ul>
      <p><strong>Improve it:</strong> Optimize marketing channels, refine onboarding, and double down on what drives conversions.</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">2. Customer Metrics &amp; Unit Economics</h2>
      <h3 className="text-xl font-semibold mb-2">Customer Acquisition Cost (CAC)</h3>
      <p><strong>Formula:</strong></p>
      <p>(Total Sales + Marketing Spend) ÷ New Customers Acquired</p>
      <p><strong>Why it matters:</strong> Shows how efficient your growth is and whether scaling is sustainable.</p>
      <p><strong>Expectations:</strong></p>
      <ul className="list-disc pl-6 mb-3">
        <li>Pre-Seed: CAC can fluctuate. Show early signs of cost efficiency and understanding of your channels.</li>
        <li>Seed: CAC payback ideally &lt; 12 months, with a healthy LTV:CAC ratio.</li>
      </ul>
      <p><strong>Improve it:</strong> Refine targeting, improve organic channels, and track CAC by acquisition source.</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Lifetime Value (LTV)</h3>
      <p><strong>Formula:</strong></p>
      <p>(Average Revenue Per Account × Gross Margin %) ÷ Churn Rate</p>
      <p><strong>Why it matters:</strong> Reveals the total gross profit per customer and helps investors evaluate profitability potential.</p>
      <p><strong>Expectations:</strong></p>
      <ul className="list-disc pl-6 mb-3">
        <li>Pre-Seed: LTV greater than CAC, even if early.</li>
        <li>Seed: LTV:CAC ≈ 3:1 is a solid benchmark for SaaS.</li>
      </ul>
      <p><strong>Improve it:</strong> Increase retention, raise prices, improve upsells, and optimize customer success.</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">LTV:CAC Ratio</h3>
      <p><strong>Formula:</strong></p>
      <p>LTV ÷ CAC</p>
      <p><strong>Why it matters:</strong> Quick snapshot of your profitability per customer.</p>
      <p><strong>Expectations:</strong></p>
      <ul className="list-disc pl-6 mb-3">
        <li>Pre-Seed: Directionally positive (LTV &gt; CAC).</li>
        <li>Seed: 3:1 ratio is desirable.</li>
      </ul>
      <p><strong>Improve it:</strong> Focus on churn reduction and pricing optimization.</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Payback Period</h3>
      <p><strong>Formula:</strong></p>
      <p>CAC ÷ (ARPA × Gross Margin %)</p>
      <p><strong>Why it matters:</strong> Shows how fast you recover acquisition cost.</p>
      <p><strong>Expectations:</strong></p>
      <ul className="list-disc pl-6">
        <li>Pre-Seed: Clear path to improvement.</li>
        <li>Seed: 6–12 month payback preferred.</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">3. Retention &amp; Engagement Metrics</h2>
      <h3 className="text-xl font-semibold mb-2">Churn Rate</h3>
      <p><strong>Formula:</strong></p>
      <p>(Customers lost ÷ Customers at start of month) × 100</p>
      <p><strong>Why it matters:</strong> High churn kills growth. Investors watch retention as a signal of product-market fit.</p>
      <p><strong>Expectations:</strong></p>
      <ul className="list-disc pl-6 mb-3">
        <li>Pre-Seed: Show improving cohort retention.</li>
        <li>Seed: SaaS under 3% monthly churn is solid.</li>
      </ul>
      <p><strong>Improve it:</strong> Better onboarding, proactive support, and customer feedback loops.</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Activation Rate</h3>
      <p><strong>Definition:</strong></p>
      <p>% of new users who reach your “aha” moment (first key value event).</p>
      <p><strong>Why it matters:</strong> Shows how effectively users experience value early.</p>
      <p><strong>Expectations:</strong></p>
      <ul className="list-disc pl-6 mb-3">
        <li>Pre-Seed: Prove people can find value fast.</li>
        <li>Seed: Measurable improvement and strong link to retention.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">DAU/MAU Ratio (Stickiness)</h3>
      <p><strong>Formula:</strong></p>
      <p>Daily Active Users ÷ Monthly Active Users</p>
      <p><strong>Why it matters:</strong> Higher ratio = higher engagement.</p>
      <p><strong>Expectations:</strong></p>
      <ul className="list-disc pl-6">
        <li>Consumer products: &gt;20–30% is healthy.</li>
        <li>B2B: Depends on usage pattern (daily vs weekly use).</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">4. Funnel &amp; Conversion Metrics</h2>
      <h3 className="text-xl font-semibold mb-2">Conversion Rates</h3>
      <p><strong>Definition:</strong></p>
      <p>% of users who move from one stage to another (Signup → Activated → Paid).</p>
      <p><strong>Why it matters:</strong> Shows funnel efficiency and whether users are convinced by your product.</p>
      <p><strong>Expectations:</strong></p>
      <ul className="list-disc pl-6 mb-3">
        <li>Pre-Seed: Basic funnel clarity with improving trend.</li>
        <li>Seed: Proven repeatable conversion path.</li>
      </ul>
      <p><strong>Improve it:</strong> Simplify onboarding, refine messaging, and test pricing tiers.</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Funnel Velocity &amp; Cohort Analysis</h3>
      <p><strong>Why it matters:</strong> Shows how quickly leads move through your funnel and whether retention improves over time.</p>
      <p><strong>Tip:</strong> Use a cohort retention heatmap to visualize improvement month by month.</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">5. Revenue Composition &amp; Quality</h2>
      <h3 className="text-xl font-semibold mb-2">Revenue Concentration</h3>
      <p><strong>Definition:</strong></p>
      <p>% of revenue from top 1–5 customers.</p>
      <p><strong>Why it matters:</strong> Heavy reliance on one or two customers = risk.</p>
      <p><strong>Expectations:</strong></p>
      <ul className="list-disc pl-6 mb-3">
        <li>Pre-Seed: Some concentration is okay. Show pipeline to diversify.</li>
        <li>Seed: Expect broader revenue distribution.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">Gross Margin</h3>
      <p><strong>Formula:</strong></p>
      <p>(Revenue − Cost of Goods Sold) ÷ Revenue</p>
      <p><strong>Why it matters:</strong> Determines scalability and profitability.</p>
      <p><strong>Expectations:</strong></p>
      <ul className="list-disc pl-6">
        <li>SaaS: 70–80%+</li>
        <li>Marketplaces / D2C: Lower, but improving trend is key</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">6. Pre-Revenue Traction Signals</h2>
      <p>If you’re still pre-revenue, you can still show strong traction:</p>
      <ul className="list-disc pl-6 mb-3">
        <li>Pilot customers or LOIs</li>
        <li>Waitlist signups with intent surveys</li>
        <li>Beta user retention (D7/D30)</li>
        <li>Partnerships or distribution deals</li>
        <li>Engaged community (open rates, Discord, Slack, etc.)</li>
        <li>Early willingness-to-pay data</li>
      </ul>
      <p><strong>Tip:</strong> Document everything — pilots, feedback, testimonials, learnings.</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">7. Model-Specific Metrics</h2>
      <h3 className="text-xl font-semibold mb-2">B2B / SaaS</h3>
      <p>MRR, ARR, CAC, LTV, churn, payback, gross margin, NRR, sales cycle length.</p>
      <p><strong>Investors want:</strong> Proof of paying customers, improving unit economics, and repeatable pipeline.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Marketplaces</h3>
      <p>GMV, take rate, liquidity, supply/demand balance, CAC on both sides.</p>
      <p><strong>Investors want:</strong> Clear network effects and healthy supply-demand loop.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Consumer Apps</h3>
      <p>DAU/MAU, retention (D1, D7, D30), CAC per install, LTV, virality.</p>
      <p><strong>Investors want:</strong> Stickiness, organic growth, and scalable paid acquisition.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">D2C / E-Commerce</h3>
      <p>Repeat purchase rate, AOV, gross margin, CAC, LTV.</p>
      <p><strong>Investors want:</strong> Repeat buyers and improving margin structure.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Hardware / Deep Tech</h3>
      <p>Preorders, partnerships, regulatory milestones, production readiness.</p>
      <p><strong>Investors want:</strong> Technical validation and customer interest.</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">8. Financial Health Metrics</h2>
      <h3 className="text-xl font-semibold mb-2">Burn Rate &amp; Runway</h3>
      <p><strong>Why it matters:</strong> Shows how long you can operate before running out of cash.</p>
      <p><strong>Expectations:</strong></p>
      <ul className="list-disc pl-6 mb-3">
        <li>12–18 months of runway after raise.</li>
        <li>Clear plan on how new capital will improve key KPIs.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">Net Revenue Retention (NRR)</h3>
      <p><strong>Formula:</strong></p>
      <p>(Starting MRR + Expansion − Contraction − Churn) ÷ Starting MRR</p>
      <p><strong>Why it matters:</strong> Shows expansion revenue from existing customers.</p>
      <p><strong>Expectations:</strong> NRR &gt; 100% is strong for SaaS at seed stage.</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">9. How Investors Interpret Metrics</h2>
      <p>Investors focus on:</p>
      <ul className="list-disc pl-6">
        <li>Momentum — Are numbers improving consistently?</li>
        <li>Repeatability — Can you acquire and retain predictably?</li>
        <li>Unit economics — Do CAC and LTV make sense?</li>
        <li>Market potential — Can margins and pricing scale?</li>
        <li>Founder efficiency — Are you learning quickly and adapting?</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">10. How to Present Metrics in a Pitch</h2>
      <p><strong>Recommended traction slide layout:</strong></p>
      <ul className="list-disc pl-6 mb-3">
        <li>Top: 3–4 headline KPIs (MRR, MoM growth, customers, margin)</li>
        <li>Middle: Line chart showing MRR trend</li>
        <li>Bottom left: CAC, LTV, payback</li>
        <li>Bottom right: Key customers or pilot logos</li>
      </ul>
      <p><strong>Bonus slides (appendix):</strong></p>
      <ul className="list-disc pl-6">
        <li>Cohort retention heatmap</li>
        <li>Unit economics table</li>
        <li>CAC by channel breakdown</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">11. Common Mistakes to Avoid</h2>
      <ul className="list-disc pl-6">
        <li>Vanity metrics (downloads, followers, page views without context)</li>
        <li>Ignoring churn and retention</li>
        <li>Over-optimistic LTV assumptions</li>
        <li>Lack of segmentation or attribution clarity</li>
        <li>Missing context (no explanation for metric changes)</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">12. Fast Experiments to Improve KPIs</h2>
      <ul className="list-disc pl-6">
        <li>Simplify onboarding to boost activation</li>
        <li>Improve messaging for conversions</li>
        <li>Run pricing A/B tests</li>
        <li>Reduce churn with customer success check-ins</li>
        <li>Optimize organic content to reduce CAC</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">13. Benchmarks Summary</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Metric</th>
              <th className="text-left p-2">Pre-Seed</th>
              <th className="text-left p-2">Seed</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">MRR</td><td className="p-2">$1k–$5k+ or early pilots</td><td className="p-2">$10k–$100k+</td></tr>
            <tr className="border-b"><td className="p-2">MoM Growth</td><td className="p-2">Upward trend</td><td className="p-2">10–30%</td></tr>
            <tr className="border-b"><td className="p-2">CAC</td><td className="p-2">Improving trend</td><td className="p-2">Payback ≤ 12 mo</td></tr>
            <tr className="border-b"><td className="p-2">LTV:CAC</td><td className="p-2">&gt;1:1 and improving</td><td className="p-2">≈3:1</td></tr>
            <tr className="border-b"><td className="p-2">NRR</td><td className="p-2">N/A</td><td className="p-2">&gt;100% ideal</td></tr>
            <tr className="border-b"><td className="p-2">Churn</td><td className="p-2">Improving cohorts</td><td className="p-2">&lt;3% monthly</td></tr>
            <tr className="border-b"><td className="p-2">DAU/MAU</td><td className="p-2">N/A</td><td className="p-2">20–30%+ consumer</td></tr>
            <tr><td className="p-2">Payback</td><td className="p-2">Transparent plan</td><td className="p-2">&lt;12 months</td></tr>
          </tbody>
        </table>
      </div>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">14. Example Narratives</h2>
      <p className="mb-2"><strong>If you have paying customers:</strong></p>
      <p className="mb-4">“We launched in March. MRR grew from $2.4k to $18k with 28% MoM growth. CAC is $1,000, ARPA $1,200, gross margin 80%. Our payback is 9 months and LTV:CAC ≈ 21. Growth driven by organic content and outbound SDRs.”</p>
      <p className="mb-2"><strong>If you’re pre-revenue:</strong></p>
      <p>“We have two enterprise pilots, 1,200 waitlist leads, 42% D30 retention, and 35% of testers indicate willingness to pay. One pilot converted to a paid $12k trial, validating our pricing and demand.”</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">15. Final Checklist</h2>
      <ul className="space-y-2">
        <li>✅ 1 traction slide (3–4 key metrics + trend)</li>
        <li>✅ Cohort heatmap (retention)</li>
        <li>✅ Unit economics table (CAC, LTV, payback)</li>
        <li>✅ Customer logos or pilot list</li>
        <li>✅ Channel breakdown</li>
        <li>✅ Burn and runway</li>
        <li>✅ Honest notes on churn and concentration</li>
        <li>✅ Backup data spreadsheet</li>
      </ul>
    </article>
  </div>
);

const CustomerInterviewScriptArticle = () => (
  <div className="space-y-8">
    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-2">Customer Interview Script Framework</h2>
      <p className="mb-4">
        Stop building products nobody wants. Use this proven script to uncover real customer problems and validate
        your startup idea.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2"><strong>Metric</strong></th>
              <th className="text-left p-2"><strong>Detail</strong></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2"><strong>Total Questions</strong></td><td className="p-2">40+</td></tr>
            <tr className="border-b"><td className="p-2"><strong>Interview Length</strong></td><td className="p-2">30-45 Minutes</td></tr>
            <tr className="border-b"><td className="p-2"><strong>Recommended Interviews</strong></td><td className="p-2">10-15</td></tr>
            <tr><td className="p-2"><strong>Insight Accuracy</strong></td><td className="p-2">85%</td></tr>
          </tbody>
        </table>
      </div>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h3 className="text-xl font-semibold mb-2">👋 1. Opening &amp; Context (2-3 min)</h3>
      <p><strong>Goal:</strong> Build rapport, set expectations, and make the participant comfortable.</p>
      <p className="mt-2"><strong>Sample Questions:</strong></p>
      <ul className="list-disc pl-6 mt-2 space-y-2">
        <li>&quot;Thanks so much for taking the time to talk with me today.&quot;</li>
        <li>&quot;I&apos;m trying to learn more about [problem space, e.g., how small teams manage their social media], and I&apos;m not selling anything.&quot;</li>
        <li>&quot;Can you tell me a little about your role and what a typical day looks like?&quot;</li>
        <li>&quot;What are your main responsibilities regarding [relevant area]?&quot;</li>
      </ul>
      <p className="mt-3"><strong>💡 Pro Tip:</strong> Don&apos;t pitch your idea. Be clear that you&apos;re here to learn from their experience.</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h3 className="text-xl font-semibold mb-2">🔍 2. Problem Discovery (10-15 min)</h3>
      <p><strong>Goal:</strong> Understand the problem in depth by focusing on past behaviors and specific incidents.</p>
      <p className="mt-2"><strong>Sample Questions:</strong></p>
      <ul className="list-disc pl-6 mt-2 space-y-2">
        <li>&quot;Walk me through the last time you encountered [problem].&quot;</li>
        <li>&quot;How often does this situation happen?&quot;</li>
        <li>&quot;What is the hardest part about [their current process]?&quot;</li>
        <li>&quot;Why is that part so difficult?&quot;</li>
        <li>&quot;What happens if this problem isn&apos;t solved?&quot;</li>
      </ul>
      <p className="mt-3"><strong>💡 Pro Tip:</strong> Focus on specific past events, not hypotheticals. Dig deeper with successive &quot;why&quot; questions.</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h3 className="text-xl font-semibold mb-2">🛠️ 3. Current Solutions (5-10 min)</h3>
      <p><strong>Goal:</strong> Learn about their existing workflow, tools, and the pain points they create.</p>
      <p className="mt-2"><strong>Sample Questions:</strong></p>
      <ul className="list-disc pl-6 mt-2 space-y-2">
        <li>&quot;How do you currently deal with [problem]?&quot;</li>
        <li>&quot;What tools or processes do you use for this?&quot;</li>
        <li>&quot;What do you like about your current solution?&quot;</li>
        <li>&quot;What&apos;s the most frustrating part about it?&quot;</li>
        <li>&quot;Have you tried other solutions before? What happened?&quot;</li>
      </ul>
      <p className="mt-3"><strong>💡 Pro Tip:</strong> Pay close attention to workarounds and &quot;hacks&quot; they&apos;ve created—these are major pain points.</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h3 className="text-xl font-semibold mb-2">💰 4. Value &amp; Priority (5-10 min)</h3>
      <p><strong>Goal:</strong> Quantify the problem&apos;s impact and understand its priority and budget.</p>
      <p className="mt-2"><strong>Sample Questions:</strong></p>
      <ul className="list-disc pl-6 mt-2 space-y-2">
        <li>&quot;Roughly how much time or money do you spend dealing with this?&quot;</li>
        <li>&quot;Who else is involved in solving this problem?&quot;</li>
        <li>&quot;What&apos;s the impact on the business when this goes wrong?&quot;</li>
        <li>&quot;Where does solving this rank on your list of priorities?&quot;</li>
        <li>&quot;Have you allocated a budget for a better solution?&quot;</li>
      </ul>
      <p className="mt-3"><strong>💡 Pro Tip:</strong> Quantifying the problem (time, cost, risk) helps validate its importance and potential value.</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h3 className="text-xl font-semibold mb-2">✨ 5. Ideal Solution (5-10 min)</h3>
      <p><strong>Goal:</strong> Let the customer describe their perfect solution without leading them to yours.</p>
      <p className="mt-2"><strong>Sample Questions:</strong></p>
      <ul className="list-disc pl-6 mt-2 space-y-2">
        <li>&quot;If you had a magic wand, how would you solve this problem?&quot;</li>
        <li>&quot;What would need to change for this process to be 10x easier?&quot;</li>
        <li>&quot;What&apos;s the one thing that would make the biggest difference for you?&quot;</li>
        <li>&quot;What features would be absolute must-haves versus nice-to-haves?&quot;</li>
      </ul>
      <p className="mt-3"><strong>💡 Pro Tip:</strong> Resist the urge to suggest your idea. Let them design the solution for you.</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h3 className="text-xl font-semibold mb-2">🎯 6. Closing &amp; Next Steps (2-3 min)</h3>
      <p><strong>Goal:</strong> Conclude gracefully, gather referrals, and leave the door open for follow-up.</p>
      <p className="mt-2"><strong>Sample Questions:</strong></p>
      <ul className="list-disc pl-6 mt-2 space-y-2">
        <li>&quot;Is there anything else about [problem] that I should know?&quot;</li>
        <li>&quot;Who else do you think I should talk to about this?&quot;</li>
        <li>&quot;Can I follow up with you if I have more questions?&quot;</li>
        <li>&quot;Would you be interested in staying updated on what we learn?&quot;</li>
      </ul>
      <p className="mt-3"><strong>💡 Pro Tip:</strong> Always ask for referrals. A genuine thank you goes a long way.</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h3 className="text-xl font-semibold mb-3">🚫 ✅ Do&apos;s and Don&apos;ts</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2"><strong>🚫Don&apos;t</strong></th>
              <th className="text-left p-2"><strong>✅Do</strong></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">🚫Talk about your idea</td><td className="p-2">✅Focus on their problems and experiences</td></tr>
            <tr className="border-b"><td className="p-2">🚫Ask leading or &quot;would you use&quot; questions</td><td className="p-2">✅Ask &quot;how do you currently...&quot; questions</td></tr>
            <tr className="border-b"><td className="p-2">🚫Accept vague compliments (&quot;That sounds great!&quot;)</td><td className="p-2">✅Dig into the specifics behind the compliment</td></tr>
            <tr className="border-b"><td className="p-2">🚫Ask for opinions about the future</td><td className="p-2">✅Ask for examples from the past</td></tr>
            <tr className="border-b"><td className="p-2">🚫Pitch your features</td><td className="p-2">✅Understand their entire workflow</td></tr>
            <tr><td className="p-2">🚫Plan to take notes later</td><td className="p-2">✅Document everything during the interview</td></tr>
          </tbody>
        </table>
      </div>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h3 className="text-xl font-semibold mb-3">✅ Best Practices Checklist</h3>
      <ul className="space-y-2">
        <li>✅ Record the interview (with explicit permission).</li>
        <li>✅ Bring a dedicated note-taker.</li>
        <li>✅ Follow the 80/20 rule: You listen 80% of the time, talk 20%.</li>
        <li>✅ Ask for specific stories and examples, not general opinions.</li>
        <li>✅ Embrace awkward silences; let the participant think and elaborate.</li>
        <li>✅ Always ask for referrals at the end of the call.</li>
      </ul>
    </article>
  </div>
);

const MarketSizeGuideArticle = () => (
  <div className="space-y-8">
    <article className="bg-card rounded-xl border p-6">
      <p className="mb-4">
        A startup’s potential scale is bound by the size of its target market. One of the first questions investors
        ask is: “What is your market size?” Understanding and communicating your market size demonstrates that you are
        targeting a large opportunity and that you understand it deeply.
      </p>
      <h3 className="text-xl font-semibold mb-2">Key Takeaways</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Big companies can only exist in big markets.</li>
        <li>Use a bottom-up approach to estimate market size: multiply the number of customers by average revenue per customer per year.</li>
        <li>Present your total addressable market (TAM) and projected revenue for 5+ years.</li>
        <li>Market sizing is a rough estimation, clarity and ambition matter more than precise numbers.</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-3">1. Why Market Size Matters</h2>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Perspective</th>
              <th className="text-left p-2">Key Insight</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">Founder</td>
              <td className="p-2">To build a company with a significant impact, you need a sufficiently large market.</td>
            </tr>
            <tr>
              <td className="p-2">Investor</td>
              <td className="p-2">To attract funding, you need to show potential for substantial returns within a multi-billion-dollar market.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        If you want to create a company with a DoorDash-sized impact, you need a large market. Investors want to see
        that your startup can generate hundreds of millions of dollars in high-margin revenue within the next decade.
      </p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-3">2. How to Estimate Market Size</h2>
      <p className="mb-3">
        The bottom-up approach is the most reliable. It uses real assumptions grounded in your business model and is
        testable by investors.
      </p>
      <p><strong>Steps:</strong></p>
      <ul className="list-disc pl-6 mb-4">
        <li>Identify target customers</li>
        <li>Estimate average revenue per customer per year</li>
        <li>Multiply to calculate market size</li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Bottom-Up vs. Top-Down</h3>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Approach</th>
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Pros</th>
              <th className="text-left p-2">Cons</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">Bottom-Up</td>
              <td className="p-2">Multiply number of customers by average revenue per customer</td>
              <td className="p-2">More accurate, testable, aligned with your model</td>
              <td className="p-2">Requires clear assumptions</td>
            </tr>
            <tr>
              <td className="p-2">Top-Down</td>
              <td className="p-2">Estimate total market and assume % capture</td>
              <td className="p-2">Quick, sanity check</td>
              <td className="p-2">Often unrealistic and unsubstantiated</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Keep it simple, complex calculations do not add credibility early on.</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-3">3. What is Market Size?</h2>
      <p className="mb-3">Rather than focusing on jargon like TAM, SAM, or SOM, focus on:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Total Addressable Market (TAM) – the total revenue opportunity if your company captured 100% of the relevant market.</li>
        <li>Projected Revenue (5+ years) – realistic revenue estimates based on a bottom-up calculation.</li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Presenting Incremental Market Expansion</h3>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Stage</th>
              <th className="text-left p-2">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Initial</td><td className="p-2">Sell Product A to Customer Segment X</td></tr>
            <tr className="border-b"><td className="p-2">Expansion</td><td className="p-2">Cross-sell Product B to Segment X</td></tr>
            <tr><td className="p-2">Growth</td><td className="p-2">Sell Products A &amp; B to Customer Segment Y</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        This method communicates growth potential clearly, without overcomplicating or relying on untested assumptions.
      </p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-3">4. When to Estimate Market Size</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Estimate for 5+ years into the future. For long-term trends, consider 7–10 years.</li>
        <li>If the market is growing rapidly, also present current market size alongside future projections.</li>
        <li>This demonstrates that you understand both the existing and emerging opportunity.</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-3">5. Building Your Market Size Assumptions</h2>
      <h3 className="text-xl font-semibold mb-2">Step 1: Number of Customers</h3>
      <p><strong>Define target customers</strong></p>
      <p className="mb-2">Focus on the segment that contributes most revenue.</p>
      <p><strong>Example:</strong></p>
      <ul className="list-disc pl-6 mb-3">
        <li>Broader market: all US residents</li>
        <li>Convincing segment: 25–40-year-olds who eat out weekly</li>
      </ul>
      <p><strong>Estimate total customers</strong></p>
      <p className="mb-2">Sources vary by business type:</p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Business Type</th>
              <th className="text-left p-2">Data Sources</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Consumer</td><td className="p-2">US Census, demographic data</td></tr>
            <tr className="border-b"><td className="p-2">Vertical B2B</td><td className="p-2">Industry-specific registries, government reports</td></tr>
            <tr><td className="p-2">Enterprise</td><td className="p-2">Fortune 100/500 company data</td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>Estimate customers captured in 5 years</strong></p>
      <ul className="list-disc pl-6 mb-4">
        <li>Consider customer acquisition and retention per year</li>
        <li>Compare with market share of dominant competitors</li>
        <li>Factor in network effects, distribution, and market fragmentation</li>
      </ul>

      <p><strong>Example calculation:</strong></p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Segment</th>
              <th className="text-left p-2"># Customers</th>
              <th className="text-left p-2">Seats per Customer</th>
              <th className="text-left p-2">$ per Seat</th>
              <th className="text-left p-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">SMB</td><td className="p-2">100,000</td><td className="p-2">5</td><td className="p-2">$10,000</td><td className="p-2">$5B</td></tr>
            <tr className="border-b"><td className="p-2">Enterprise</td><td className="p-2">1,000</td><td className="p-2">100</td><td className="p-2">$20,000</td><td className="p-2">$2B</td></tr>
            <tr><td className="p-2">Total</td><td className="p-2">-</td><td className="p-2">-</td><td className="p-2">-</td><td className="p-2">$7B</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mb-2">Step 2: Average Revenue per Customer per Year</h3>
      <p><strong>Choose revenue model</strong></p>
      <p className="mb-2">Focus on the core revenue stream. Examples:</p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Model</th>
              <th className="text-left p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Subscription</td><td className="p-2">Monthly/annual fee per user or company</td></tr>
            <tr className="border-b"><td className="p-2">Transaction</td><td className="p-2">Per transaction fee</td></tr>
            <tr className="border-b"><td className="p-2">Fee-for-Service</td><td className="p-2">Project-based pricing</td></tr>
            <tr><td className="p-2">Marketplace</td><td className="p-2">Take rate on transactions</td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>Estimate transaction volume</strong></p>
      <p className="mb-2">Understand customer behavior: how often they will use the product or service.</p>
      <p><strong>Estimate pricing</strong></p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Approach</th>
              <th className="text-left p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Value-Based</td><td className="p-2">Charge a percentage of the value you create for the customer (10–30%)</td></tr>
            <tr className="border-b"><td className="p-2">Competitor-Based</td><td className="p-2">Align with existing market prices</td></tr>
            <tr><td className="p-2">Cost-Based</td><td className="p-2">Cost plus margin</td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>Examples by business category:</strong></p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Category</th>
              <th className="text-left p-2">Pricing Method</th>
              <th className="text-left p-2">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">B2B SaaS</td><td className="p-2">Value-Based</td><td className="p-2">$100–300k subscription for $1M in customer profit</td></tr>
            <tr className="border-b"><td className="p-2">Consumer</td><td className="p-2">Competitor-Based</td><td className="p-2">Anchor pricing to similar products</td></tr>
            <tr className="border-b"><td className="p-2">Healthcare</td><td className="p-2">Fee per member/month or % cost savings</td><td className="p-2">B2B or D2C variations</td></tr>
            <tr><td className="p-2">Marketplaces</td><td className="p-2">Take rate</td><td className="p-2">% of transaction volume</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mb-2">Step 3: Calculate Market Size</h3>
      <p>Multiply # of customers × average revenue per customer.</p>
      <div className="overflow-x-auto mb-3">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Metric</th>
              <th className="text-left p-2">Formula</th>
              <th className="text-left p-2">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Market Size</td>
              <td className="p-2"># Customers × Avg Revenue per Customer</td>
              <td className="p-2">100,000 × $1,000 = $100M</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Adjust assumptions iteratively to align with your overall vision and long-term growth.</p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-3">6. Additional Tips</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Think long-term: Estimate potential demand 5–10 years out.</li>
        <li>Focus geographically: If starting in one country, present addressable market there first.</li>
        <li>Use annual revenue: Avoid inflating numbers.</li>
        <li>Include take rate for marketplaces or fees for financial products.</li>
        <li>Leverage S-1 filings of public companies to validate assumptions and projections.</li>
      </ul>

      <p><strong>Template:</strong></p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Market Level</th>
              <th className="text-left p-2">Calculation Formula</th>
              <th className="text-left p-2">Target Segment</th>
              <th className="text-left p-2"># Customers</th>
              <th className="text-left p-2">ARPU (Annual Revenue Per User)</th>
              <th className="text-left p-2">Calculated Value</th>
              <th className="text-left p-2">Notes/Assumptions</th>
              <th className="text-left p-2">Sources</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">TAM</td><td className="p-2"># Customers × ARPU</td><td className="p-2">Entire industry</td><td className="p-2"></td><td className="p-2"></td><td className="p-2"></td><td className="p-2"></td><td className="p-2"></td></tr>
            <tr className="border-b"><td className="p-2">SAM</td><td className="p-2"># Customers × ARPU</td><td className="p-2">Serviceable Target</td><td className="p-2"></td><td className="p-2"></td><td className="p-2"></td><td className="p-2"></td><td className="p-2"></td></tr>
            <tr><td className="p-2">SOM</td><td className="p-2">% SAM (or last year’s share × current SAM value)</td><td className="p-2">Short-term realistic share</td><td className="p-2"></td><td className="p-2"></td><td className="p-2"></td><td className="p-2"></td><td className="p-2"></td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>Example:</strong></p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Market Level</th>
              <th className="text-left p-2">Calculation Formula</th>
              <th className="text-left p-2">Target Segment</th>
              <th className="text-left p-2"># Customers</th>
              <th className="text-left p-2">ARPU</th>
              <th className="text-left p-2">Calculated Value</th>
              <th className="text-left p-2">Notes/Assumptions</th>
              <th className="text-left p-2">Sources</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">TAM</td>
              <td className="p-2">N×ARPUN×ARPU</td>
              <td className="p-2">All SMBs in US</td>
              <td className="p-2">31,000,000</td>
              <td className="p-2">$2,000</td>
              <td className="p-2">$62B</td>
              <td className="p-2">Based on 2024 census, avg SaaS spend</td>
              <td className="p-2">census.gov, Gartner</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">SAM</td>
              <td className="p-2">N×ARPUN×ARPU</td>
              <td className="p-2">SMBs in CA, NY, TX</td>
              <td className="p-2">8,500,000</td>
              <td className="p-2">$2,000</td>
              <td className="p-2">$17B</td>
              <td className="p-2">Target only major states, SaaS-adoption</td>
              <td className="p-2">census.gov, SaaSBenchmarks</td>
            </tr>
            <tr>
              <td className="p-2">SOM</td>
              <td className="p-2">% SAM</td>
              <td className="p-2">First-year target</td>
              <td className="p-2">10,000</td>
              <td className="p-2">$2,000</td>
              <td className="p-2">$20M</td>
              <td className="p-2">Realistic sales with current resources</td>
              <td className="p-2">Sales plan, pipeline</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </div>
);

const StartupCompetitiveAnalysisArticle = () => (
  <div className="space-y-8">
    <article className="bg-card rounded-xl border p-6">
      <p>
        In the fast-paced startup world, understanding your competitive landscape is essential. A thorough competitive
        analysis helps you identify your competitors’ strengths and weaknesses, uncover market opportunities, and make
        informed strategic decisions. This guide provides a structured framework to conduct competitive analysis and
        stay ahead in your market.
      </p>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-3">Why Competitive Analysis Matters</h2>
      <p className="mb-4">
        Startups often operate in crowded markets with multiple players. Without a clear understanding of your
        competitors, differentiation and strategy become challenging.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Purpose</th>
              <th className="text-left p-2">Benefits</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2"><strong>Market Positioning</strong></td><td className="p-2">Identify your place relative to competitors.</td></tr>
            <tr className="border-b"><td className="p-2"><strong>Strengths &amp; Weaknesses</strong></td><td className="p-2">Highlight what you do well and areas to improve.</td></tr>
            <tr className="border-b"><td className="p-2"><strong>Strategic Planning</strong></td><td className="p-2">Inform business strategy and tactical decisions.</td></tr>
            <tr><td className="p-2"><strong>Customer Insights</strong></td><td className="p-2">Understand preferences, behaviors, and pain points.</td></tr>
          </tbody>
        </table>
      </div>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-3">Key Elements of Competitive Analysis</h2>
      <p className="mb-4">A robust analysis typically covers the following components:</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Element</th>
              <th className="text-left p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2"><strong>Identifying Competitors</strong></td><td className="p-2">Categorize as direct, indirect, or potential competitors.</td></tr>
            <tr className="border-b"><td className="p-2"><strong>SWOT Analysis</strong></td><td className="p-2">Assess strengths, weaknesses, opportunities, and threats of each competitor.</td></tr>
            <tr className="border-b"><td className="p-2"><strong>Market Analysis</strong></td><td className="p-2">Study market size, growth rate, and trends.</td></tr>
            <tr className="border-b"><td className="p-2"><strong>Product Comparison</strong></td><td className="p-2">Compare features, pricing, and unique selling propositions (USPs).</td></tr>
            <tr className="border-b"><td className="p-2"><strong>Marketing &amp; Sales Strategies</strong></td><td className="p-2">Review campaigns, channels, customer reach, and messaging.</td></tr>
            <tr><td className="p-2"><strong>Financial Performance</strong></td><td className="p-2">Examine revenue, funding, and overall financial health if available.</td></tr>
          </tbody>
        </table>
      </div>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-3">Steps to Conduct Competitive Analysis</h2>

      <h3 className="text-xl font-semibold mb-2">Step 1: Identify Your Competitors</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>List direct competitors (same product/service), indirect competitors (alternative solutions), and potential competitors (emerging players).</li>
        <li>Tools: Google, industry reports, Crunchbase, PitchBook, CB Insights.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Step 2: Gather Data</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Collect information from websites, social media, customer reviews, and industry publications.</li>
        <li>Tools: SEMrush, Ahrefs, SimilarWeb, LinkedIn, Glassdoor.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Step 3: Perform SWOT Analysis</h3>
      <p className="mb-2">For each competitor, map:</p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">SWOT</th>
              <th className="text-left p-2">Questions to Answer</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Strengths</td><td className="p-2">What do they excel at?</td></tr>
            <tr className="border-b"><td className="p-2">Weaknesses</td><td className="p-2">Where do they fall short?</td></tr>
            <tr className="border-b"><td className="p-2">Opportunities</td><td className="p-2">What market gaps can they exploit?</td></tr>
            <tr><td className="p-2">Threats</td><td className="p-2">What external risks could affect them?</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mb-2">Step 4: Analyze Product Offerings</h3>
      <p className="mb-2">Compare features, pricing, quality, customer feedback, and USPs.</p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Feature</th>
              <th className="text-left p-2">Competitor A</th>
              <th className="text-left p-2">Competitor B</th>
              <th className="text-left p-2">Your Startup</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Price</td><td className="p-2">$</td><td className="p-2">$</td><td className="p-2">$</td></tr>
            <tr className="border-b"><td className="p-2">Key Features</td><td className="p-2"></td><td className="p-2"></td><td className="p-2"></td></tr>
            <tr className="border-b"><td className="p-2">Customer Ratings</td><td className="p-2"></td><td className="p-2"></td><td className="p-2"></td></tr>
            <tr><td className="p-2">Unique Value</td><td className="p-2"></td><td className="p-2"></td><td className="p-2"></td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mb-2">Step 5: Evaluate Marketing &amp; Sales Strategies</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Examine campaigns, social media activity, content strategy, and sales tactics.</li>
        <li>Tools: Hootsuite, BuzzSumo, Social Blade.</li>
      </ul>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Channel</th>
              <th className="text-left p-2">Competitor Activity</th>
              <th className="text-left p-2">Insights</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Social Media</td><td className="p-2">Posts per week, engagement</td><td className="p-2"></td></tr>
            <tr className="border-b"><td className="p-2">Content Marketing</td><td className="p-2">Blog, videos, newsletters</td><td className="p-2"></td></tr>
            <tr className="border-b"><td className="p-2">Ads</td><td className="p-2">Paid campaigns, targeting</td><td className="p-2"></td></tr>
            <tr><td className="p-2">Sales Approach</td><td className="p-2">Direct, partnership, inbound/outbound</td><td className="p-2"></td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mb-2">Step 6: Financial Review</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Assess revenue, funding rounds, and profitability (if publicly available).</li>
        <li>Sources: Crunchbase, PitchBook, SEC filings, company reports.</li>
      </ul>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Metric</th>
              <th className="text-left p-2">Competitor A</th>
              <th className="text-left p-2">Competitor B</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Revenue</td><td className="p-2">$</td><td className="p-2">$</td></tr>
            <tr className="border-b"><td className="p-2">Funding</td><td className="p-2">$</td><td className="p-2">$</td></tr>
            <tr><td className="p-2">Profitability</td><td className="p-2">Yes/No</td><td className="p-2">Yes/No</td></tr>
          </tbody>
        </table>
      </div>
    </article>

    <article className="bg-card rounded-xl border p-6">
      <h2 className="text-2xl font-semibold mb-3">Formulating Your Competitive Strategy</h2>
      <p className="mb-4">
        After collecting and analyzing the data, convert insights into actionable strategies:
      </p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Strategy Area</th>
              <th className="text-left p-2">Action Steps</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2"><strong>Differentiation</strong></td><td className="p-2">Identify unique features or benefits that set you apart.</td></tr>
            <tr className="border-b"><td className="p-2"><strong>Target Market</strong></td><td className="p-2">Focus on underserved customer segments.</td></tr>
            <tr className="border-b"><td className="p-2"><strong>Pricing Strategy</strong></td><td className="p-2">Design pricing that balances competitiveness with value.</td></tr>
            <tr className="border-b"><td className="p-2"><strong>Marketing Plan</strong></td><td className="p-2">Highlight USPs in campaigns and messaging.</td></tr>
            <tr><td className="p-2"><strong>Product Roadmap</strong></td><td className="p-2">Improve features or add offerings to address market gaps.</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mb-2">Additional Tips</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Update your analysis regularly as markets and competitors evolve.</li>
        <li>Prioritize actionable insights over exhaustive data.</li>
        <li>Combine qualitative insights (customer feedback) with quantitative metrics (traffic, revenue).</li>
        <li>Use visual dashboards in Notion for easy comparison between competitors.</li>
      </ul>
    </article>
  </div>
);


const CashRunwayArticle = () => (
  <div className="space-y-8">
    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">💰 What is Cash Runway?</h2>
      <p>
        <strong>Cash runway</strong> is the number of months a startup can continue operating before it runs out
        of cash — assuming current spending levels stay the same.
      </p>
      <p>
        It helps founders understand how long their company can sustain operations with existing funds,
        especially when relying on investor capital.
      </p>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">📘 Cash Runway Explained</h2>
      <p>
        Early-stage startups often operate at a loss while building products and acquiring customers.
      </p>
      <p>
        The <strong>cash runway</strong> measures how long that growth phase can continue before new funding is
        needed.
      </p>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">🧮 How to Calculate Cash Runway</h2>
      <p>To calculate your cash runway, you&apos;ll need two key metrics:</p>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          <strong>Current Cash Balance (Cash on Hand)</strong> – the total cash available.
        </li>
        <li>
          <strong>Net Burn Rate</strong> – how much cash the company loses per month.
        </li>
      </ol>

      <div>
        <p className="font-semibold mb-2">Burn Rate Basics:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Gross Burn</strong> = Monthly Cash Expenses
          </li>
          <li>
            <strong>Net Burn</strong> = Monthly Cash Expenses – Monthly Cash Sales
          </li>
        </ul>
      </div>

      <blockquote className="border-l-4 pl-4 text-foreground/90">
        💡 The net burn rate reflects how much cash the company is losing each month after accounting for revenue.
      </blockquote>

      <blockquote className="border-l-4 pl-4 text-foreground/90">
        🧾 <strong>Cash Runway = Current Cash Balance ÷ Monthly Net Burn Rate</strong>
      </blockquote>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">📊 Example</h2>
      <p>A startup has <strong>$250,000</strong> in the bank.</p>
      <p>
        It&apos;s spending <strong>$90,000</strong> per month and bringing in <strong>$20,000</strong> in cash sales.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Gross Burn:</strong> $90,000
        </li>
        <li>
          <strong>Net Burn:</strong> $90,000 – $20,000 = <strong>$70,000</strong>
        </li>
      </ul>
      <p>
        ✅ <strong>Cash Runway = $250,000 ÷ $70,000 ≈ 3.6 months</strong>
      </p>
      <p>
        This means the startup will run out of cash in about <strong>3.6 months</strong> unless it raises new
        capital or cuts costs to extend its runway.
      </p>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">📆 What Is a Good Cash Runway?</h2>
      <p>
        There&apos;s no universal answer — the ideal runway depends on stage, industry, and growth rate.
      </p>
      <p>That said, most startups aim for <strong>6–12 months</strong> of runway. This provides enough time to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Hit key product or revenue milestones</li>
        <li>Adjust spending if needed</li>
        <li>Raise new funds without last-minute pressure</li>
      </ul>
      <p>
        Some investors recommend maintaining <strong>12–18 months</strong> of runway to provide extra cushion in
        uncertain markets.
      </p>
      <blockquote className="border-l-4 pl-4 text-foreground/90">
        ⚖️ Early-stage startups might get by with less, while established businesses often maintain longer runways
        supported by detailed forecasts.
      </blockquote>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">⚙️ How to Extend Cash Runway</h2>
      <p>If your runway is too short, act early and strategically. Common tactics include:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Cut nonessential spending:</strong> Reduce discretionary costs like travel, events, or underused
          software.
        </li>
        <li>
          <strong>Pause major hires or expenses:</strong> Delay new hires or capital purchases until funding is
          secured.
        </li>
        <li>
          <strong>Speed up collections:</strong> Improve invoicing, shorten payment terms, or offer early payment
          discounts.
        </li>
        <li>
          <strong>Renegotiate terms:</strong> Extend payment deadlines or restructure costs with vendors and
          creditors.
        </li>
      </ul>
      <p>
        Even small savings can add up, buying crucial time to raise funds or increase revenue.
      </p>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">📈 Why Cash Flow Forecasting Matters</h2>
      <p>
        A <strong>cash flow forecast</strong> shows how much cash your startup will have in the coming weeks and
        months.
      </p>
      <p>
        Without accurate forecasts, it&apos;s easy to overspend or miss early warning signs of a shortfall.
      </p>
      <p className="font-semibold">Regular forecasting helps you:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Spot potential runway issues early</li>
        <li>Run “what-if” scenarios (e.g., delays in fundraising, new hires, pricing changes)</li>
        <li>Make faster, informed financial decisions</li>
      </ul>
      <blockquote className="border-l-4 pl-4 text-foreground/90">
        Updating your forecast regularly ensures your cash runway stays accurate — helping you act before cash
        becomes critical.
      </blockquote>
    </article>
  </div>
);



const FeaturePrioritizationFrameworkArticle = () => (
  <div className="space-y-8">
    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Choose Your Prioritization Method</h2>
      <p>Select the framework that best fits your current needs.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-4 font-semibold">Method</th>
              <th className="py-2 font-semibold">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="py-2 pr-4">MoSCoW Method</td><td className="py-2">Clear, stakeholder-friendly categorization of requirements.</td></tr>
            <tr className="border-b"><td className="py-2 pr-4">Kano Model</td><td className="py-2">Understanding user satisfaction and feature delighters.</td></tr>
            <tr className="border-b"><td className="py-2 pr-4">RICE Scoring</td><td className="py-2">Data-driven, quantitative comparison of features.</td></tr>
            <tr className="border-b"><td className="py-2 pr-4">Feasibility, Desirability, Viability</td><td className="py-2">Holistic alignment across technical, user, and business needs.</td></tr>
            <tr><td className="py-2 pr-4">Value/Effort Scale</td><td className="py-2">Quick, intuitive visual prioritization based on impact vs. cost.</td></tr>
          </tbody>
        </table>
      </div>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">MoSCoW Method</h2>
      <p className="font-semibold">Definition</p>
      <p>A method for categorizing requirements into four buckets:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Must have:</strong> Non-negotiable for launch.</li>
        <li><strong>Should have:</strong> High-priority, but the product won&apos;t fail without them.</li>
        <li><strong>Could have:</strong> Nice-to-haves if resources allow.</li>
        <li><strong>Won&apos;t have:</strong> Explicitly not in the current scope.</li>
      </ul>
      <p className="font-semibold">Prioritization Guidelines</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Define your core business values.</li>
        <li>Identify potential risks.</li>
        <li>Edit the priority categories to fit your project&apos;s context.</li>
      </ul>
      <p className="font-semibold">Example: Book Review Website</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-3">Must have</th><th className="py-2 pr-3">Should have</th><th className="py-2 pr-3">Could have</th><th className="py-2">Won&apos;t have</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="py-2 pr-3">Create account function</td><td className="py-2 pr-3">Mobile compatibility</td><td className="py-2 pr-3">Automatically remember old help sessions</td><td className="py-2">Reading speed tracker</td></tr>
            <tr className="border-b"><td className="py-2 pr-3">Login function</td><td className="py-2 pr-3">Fast page load time</td><td className="py-2 pr-3">Nav bar freeze on scroll</td><td className="py-2">In-depth sub-genre evaluation</td></tr>
            <tr className="border-b"><td className="py-2 pr-3">Leave text review</td><td className="py-2 pr-3">Ask for help feature</td><td className="py-2 pr-3">&quot;More books like this&quot; feature</td><td className="py-2">Chat with other users</td></tr>
            <tr><td className="py-2 pr-3">Giving review stars</td><td className="py-2 pr-3">Personal library of old reviews</td><td className="py-2 pr-3">Book search function / Personal timeline of books read / Fix redirect bug</td><td className="py-2">Follow other users function</td></tr>
          </tbody>
        </table>
      </div>
      <p className="font-semibold">Your MoSCoW Board</p>
      <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b"><th className="py-2 pr-4">Feature</th><th className="py-2 pr-4">Priority (M/S/C/W)</th><th className="py-2">Notes</th></tr></thead><tbody><tr><td className="py-2 pr-4">&nbsp;</td><td className="py-2 pr-4">&nbsp;</td><td className="py-2">&nbsp;</td></tr></tbody></table></div>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Kano Model</h2>
      <p className="font-semibold">Definition</p>
      <p>A theory for understanding customer preferences and satisfaction, categorizing features into five types:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Basic:</strong> Expected features. Their absence causes dissatisfaction.</li>
        <li><strong>Performance:</strong> The more, the better.</li>
        <li><strong>Delighters:</strong> Unexpected features that create high satisfaction.</li>
        <li><strong>Indifferent:</strong> Features that users don&apos;t care about.</li>
        <li><strong>Reverse:</strong> Features that cause dissatisfaction when present.</li>
      </ul>
      <blockquote className="border-l-4 pl-4 text-foreground/90">Delighters often become Basic features over time as user expectations evolve.</blockquote>
      <p className="font-semibold">Prioritization Guidelines</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Classify your features into Delighters, Performance, Basic, and Indifferent.</li>
        <li>Build Basic first, then Performance, and finally Delighters.</li>
        <li>Deprioritize or eliminate Indifferent features.</li>
      </ul>
      <p className="font-semibold">Example: Book Review Website</p>
      <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b"><th className="py-2 pr-3">Delighters</th><th className="py-2 pr-3">Performance</th><th className="py-2 pr-3">Basic</th><th className="py-2">Indifferent</th></tr></thead><tbody>
      <tr className="border-b"><td className="py-2 pr-3">Creative book tagging</td><td className="py-2 pr-3">Fix redirect bug</td><td className="py-2 pr-3">Improve signup questionnaire</td><td className="py-2">Chat with other users</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">&quot;For you&quot; list</td><td className="py-2 pr-3">Mobile compatibility</td><td className="py-2 pr-3">Improve login function</td><td className="py-2">Nav bar freeze on scroll</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">&quot;On my shelf&quot; - To be read</td><td className="py-2 pr-3">Fast page load time</td><td className="py-2 pr-3">Leave text review function</td><td className="py-2">&quot;More books like this&quot; feature</td></tr>
      <tr><td className="py-2 pr-3">Ask for help feature</td><td className="py-2 pr-3">Giving review stars</td><td className="py-2 pr-3">Follow other users function / Book search function</td><td className="py-2">Reading speed tracker / Personal library of old reviews</td></tr>
      </tbody></table></div>
      <p className="font-semibold">Your Feature Classification</p>
      <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b"><th className="py-2 pr-4">Feature</th><th className="py-2">Classification (Basic/Performance/Delighter/Indifferent)</th></tr></thead><tbody><tr><td className="py-2 pr-4">&nbsp;</td><td className="py-2">&nbsp;</td></tr></tbody></table></div>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">RICE Scoring</h2>
      <p className="font-semibold">Definition</p>
      <p>A quantitative method for scoring features based on four factors:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Reach:</strong> How many people this impacts per time period.</li>
        <li><strong>Impact:</strong> Effect on each user (3=Massive, 2=High, 1=Medium, 0.5=Low, 0.25=Minimal).</li>
        <li><strong>Confidence:</strong> Confidence in estimates (100% high, 80% medium, 50% low).</li>
        <li><strong>Effort:</strong> Work required (person-months or story points).</li>
      </ul>
      <blockquote className="border-l-4 pl-4 text-foreground/90"><strong>RICE Score = (Reach × Impact × Confidence) / Effort</strong></blockquote>
      <p className="font-semibold">Example: Book Review Website</p>
      <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b"><th className="py-2 pr-3">Feature</th><th className="py-2 pr-3">Reach/week</th><th className="py-2 pr-3">Impact</th><th className="py-2 pr-3">Confidence</th><th className="py-2 pr-3">Effort</th><th className="py-2">RICE Score</th></tr></thead><tbody>
      <tr className="border-b"><td className="py-2 pr-3">Login function</td><td className="py-2 pr-3">5000</td><td className="py-2 pr-3">3</td><td className="py-2 pr-3">75%</td><td className="py-2 pr-3">4</td><td className="py-2">2812.5</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">Search feature</td><td className="py-2 pr-3">4500</td><td className="py-2 pr-3">3</td><td className="py-2 pr-3">90%</td><td className="py-2 pr-3">5</td><td className="py-2">2430.0</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">Review feature</td><td className="py-2 pr-3">2000</td><td className="py-2 pr-3">2</td><td className="py-2 pr-3">90%</td><td className="py-2 pr-3">3</td><td className="py-2">1200.0</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">Sign up function</td><td className="py-2 pr-3">300</td><td className="py-2 pr-3">3</td><td className="py-2 pr-3">90%</td><td className="py-2 pr-3">3</td><td className="py-2">270.0</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">&quot;More books like this&quot; feature</td><td className="py-2 pr-3">3000</td><td className="py-2 pr-3">1</td><td className="py-2 pr-3">60%</td><td className="py-2 pr-3">8</td><td className="py-2">225.0</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">Ask for help feature</td><td className="py-2 pr-3">500</td><td className="py-2 pr-3">1</td><td className="py-2 pr-3">50%</td><td className="py-2 pr-3">7</td><td className="py-2">35.7</td></tr>
      <tr><td className="py-2 pr-3">Chat with other users</td><td className="py-2 pr-3">100</td><td className="py-2 pr-3">0.5</td><td className="py-2 pr-3">30%</td><td className="py-2 pr-3">6</td><td className="py-2">2.5</td></tr>
      </tbody></table></div>
      <p className="font-semibold">Your RICE Scoring Table</p>
      <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b"><th className="py-2 pr-3">Feature</th><th className="py-2 pr-3">Reach</th><th className="py-2 pr-3">Impact</th><th className="py-2 pr-3">Confidence</th><th className="py-2 pr-3">Effort</th><th className="py-2">RICE Score</th></tr></thead><tbody><tr><td className="py-2 pr-3">&nbsp;</td><td className="py-2 pr-3">&nbsp;</td><td className="py-2 pr-3">&nbsp;</td><td className="py-2 pr-3">&nbsp;</td><td className="py-2 pr-3">&nbsp;</td><td className="py-2">&nbsp;</td></tr></tbody></table></div>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Feasibility, Desirability, Viability</h2>
      <p className="font-semibold">Definition</p>
      <p>A balanced framework that evaluates features from three key perspectives:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Feasibility:</strong> How technically possible it is.</li>
        <li><strong>Desirability:</strong> Whether users want it.</li>
        <li><strong>Viability:</strong> Whether it aligns with business strategy.</li>
      </ul>
      <p className="font-semibold">Prioritization Guidelines</p>
      <ul className="list-disc pl-6 space-y-1"><li>Score each feature from 1-10 in each dimension.</li><li>Sum scores and prioritize the highest totals.</li></ul>
      <p className="font-semibold">Example: Book Review Website (Beta Launch)</p>
      <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b"><th className="py-2 pr-3">Feature</th><th className="py-2 pr-3">Feasibility (/10)</th><th className="py-2 pr-3">Desirability (/10)</th><th className="py-2 pr-3">Viability (/10)</th><th className="py-2">Total</th></tr></thead><tbody>
      <tr className="border-b"><td className="py-2 pr-3">Sign up function</td><td className="py-2 pr-3">10</td><td className="py-2 pr-3">10</td><td className="py-2 pr-3">10</td><td className="py-2">30</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">Login function</td><td className="py-2 pr-3">10</td><td className="py-2 pr-3">10</td><td className="py-2 pr-3">10</td><td className="py-2">30</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">Search feature</td><td className="py-2 pr-3">8</td><td className="py-2 pr-3">10</td><td className="py-2 pr-3">10</td><td className="py-2">28</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">Review feature</td><td className="py-2 pr-3">7</td><td className="py-2 pr-3">9</td><td className="py-2 pr-3">10</td><td className="py-2">26</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">&quot;More books like this&quot; feature</td><td className="py-2 pr-3">6</td><td className="py-2 pr-3">8</td><td className="py-2 pr-3">8</td><td className="py-2">22</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">Ask for help feature</td><td className="py-2 pr-3">8</td><td className="py-2 pr-3">7</td><td className="py-2 pr-3">6</td><td className="py-2">21</td></tr>
      <tr><td className="py-2 pr-3">Chat with other users</td><td className="py-2 pr-3">6</td><td className="py-2 pr-3">4</td><td className="py-2 pr-3">7</td><td className="py-2">17</td></tr>
      </tbody></table></div>
      <p className="font-semibold">Your FDV Scoring Table</p>
      <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b"><th className="py-2 pr-3">Feature</th><th className="py-2 pr-3">Feasibility</th><th className="py-2 pr-3">Desirability</th><th className="py-2 pr-3">Viability</th><th className="py-2">Total</th></tr></thead><tbody><tr><td className="py-2 pr-3">&nbsp;</td><td className="py-2 pr-3">&nbsp;</td><td className="py-2 pr-3">&nbsp;</td><td className="py-2 pr-3">&nbsp;</td><td className="py-2">&nbsp;</td></tr></tbody></table></div>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Value/Effort Scale</h2>
      <p className="font-semibold">Definition</p>
      <p>A simple 2x2 matrix to map features based on effort to build versus business value delivered.</p>
      <p className="font-semibold">Prioritization Guidelines</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Rate each feature&apos;s effort and business value.</li>
        <li>Plot on the 2x2 grid.</li>
        <li><strong>Build First:</strong> High Value, Low Effort.</li>
        <li><strong>Consider Next:</strong> High Value, High Effort.</li>
        <li><strong>Deprioritize:</strong> Low Value, Low Effort.</li>
        <li><strong>Avoid:</strong> Low Value, High Effort.</li>
      </ul>
      <p className="font-semibold">Example: Book Review Website (Beta Launch)</p>
      <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b"><th className="py-2 pr-3">Feature</th><th className="py-2 pr-3">Effort to build (/10)</th><th className="py-2">Business value (/10)</th></tr></thead><tbody>
      <tr className="border-b"><td className="py-2 pr-3">Login function</td><td className="py-2 pr-3">3</td><td className="py-2">10</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">Sign up function</td><td className="py-2 pr-3">3</td><td className="py-2">10</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">Search feature</td><td className="py-2 pr-3">5</td><td className="py-2">10</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">Ask for help feature</td><td className="py-2 pr-3">4</td><td className="py-2">6</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">Chat with other users</td><td className="py-2 pr-3">5</td><td className="py-2">7</td></tr>
      <tr className="border-b"><td className="py-2 pr-3">Review feature</td><td className="py-2 pr-3">8</td><td className="py-2">10</td></tr>
      <tr><td className="py-2 pr-3">&quot;More books like this&quot; feature</td><td className="py-2 pr-3">8</td><td className="py-2">9</td></tr>
      </tbody></table></div>
    </article>
  </div>
);


const StartupDataRoomArticle = () => (
  <div className="space-y-8">
    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">🧩 Startup Data Room: The Complete Guide</h2>
      <p>Raising venture capital isn&apos;t just about a great pitch deck — it&apos;s about <strong>proving your startup is investment-ready</strong>.</p>
      <p>After early fundraising conversations, investors move into due diligence to verify claims, evaluate risks, and assess execution quality.</p>
      <p>A well-organized data room gives investors fast access to key documents while signaling professionalism, transparency, and trustworthiness.</p>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">💡 What Is a Data Room?</h2>
      <p>A <strong>data room</strong> is a secure digital space where you store company documents for investor due diligence review.</p>
      <p>Historically, this was a physical room of printed files. Today, it&apos;s a virtual workspace covering financials, metrics, legal materials, and strategy.</p>
      <p className="font-semibold">👉 Purpose:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Validate the claims in your pitch deck</li>
        <li>Demonstrate operational and financial discipline</li>
        <li>Speed up due diligence</li>
        <li>Build trust through transparency and structure</li>
      </ul>
      <blockquote className="border-l-4 pl-4 text-foreground/90">A strong data room doesn&apos;t just share data — it tells your company story with credibility.</blockquote>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">🧱 Core Components of a Data Room</h2>
      <p>Most investors expect these essentials:</p>
      <h3 className="text-xl font-semibold">1) Pitch Deck</h3>
      <p>Your high-level narrative. Keep one current version aligned with what you presented verbally.</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Vision &amp; mission</li><li>Product overview</li><li>Market opportunity</li><li>Traction metrics</li><li>Team</li><li>Funding roadmap</li>
      </ul>
      <h3 className="text-xl font-semibold">2) Cap Table</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Current shareholders and ownership stakes</li>
        <li>SAFEs, convertible notes, or other instruments</li>
        <li>Outstanding options or warrants</li>
      </ul>
      <p className="text-sm text-muted-foreground">Tip: Tools like Carta or Pulley can help keep this current.</p>
      <h3 className="text-xl font-semibold">3) Financials</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Historical P&amp;L (monthly or quarterly)</li>
        <li>Cash burn and runway</li>
        <li>Revenue breakdowns by product or segment</li>
        <li>Balance Sheet and Cash Flow Statements</li>
      </ul>
      <h3 className="text-xl font-semibold">4) Key Metrics</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Usage metrics: active users, engagement, retention</li>
        <li>Unit economics: LTV, CAC, payback period</li>
        <li>Growth trends: MoM / QoQ</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">⚙️ How to Set Up Your Data Room</h2>
      <h3 className="text-xl font-semibold">Step 1: Choose the Right Platform</h3>
      <p>Early-stage: Notion, Google Drive, Dropbox. Later-stage: DocSend, FirmRoom, CapLinked.</p>
      <p className="font-semibold">✅ Must-haves</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Permission control (view-only or time-limited access)</li>
        <li>Simple navigation</li>
        <li>Version control and update tracking</li>
      </ul>
      <h3 className="text-xl font-semibold">Step 2: Structure Your Data Logically</h3>
      <p>Use folders/pages with clear categories:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Verbal Story &amp; Marketing:</strong> Pitch deck, one-pager, video pitch</li>
        <li><strong>Financials &amp; Operations:</strong> Model, statements, KPI dashboard</li>
        <li><strong>Sales &amp; Validation:</strong> Pipeline, LOIs, partnerships</li>
        <li><strong>Product &amp; Technology:</strong> Demo, roadmap, architecture (if relevant)</li>
        <li><strong>Legal &amp; Administrative:</strong> Incorporation docs, IP, shareholder agreements</li>
        <li><strong>Research &amp; Market:</strong> Reports, market sizing, competitive analysis</li>
      </ul>
      <p className="font-semibold">🪶 Optional additions</p>
      <p>Investment memo, investor FAQ, press/awards, testimonials, risk-mitigation plan, compliance docs.</p>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">🚫 What Not to Include</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Team bios/org charts (LinkedIn usually covers this)</li>
        <li>Long-term forecasts beyond a practical 12–24 month view</li>
        <li>Tax returns or legal filings unless requested</li>
        <li>Board meeting minutes (share board decks instead)</li>
        <li>Generic, non-segment-specific market data</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">🚩 Red Flags That Scare Investors</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Inconsistent data across files</li>
        <li>Missing historical context behind metrics or revenue</li>
        <li>Cherry-picked metrics with no full visibility</li>
        <li>Outdated or mismatched document versions</li>
      </ul>
      <p>Cross-verify all files before granting access.</p>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">📊 Tailor by Business Model</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b"><th className="py-2 pr-4">Business Model</th><th className="py-2">Key Metrics to Include</th></tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="py-2 pr-4"><strong>Marketplaces</strong></td><td className="py-2">GMV, active buyers/sellers, CAC by side, retention</td></tr>
            <tr className="border-b"><td className="py-2 pr-4"><strong>Social Apps</strong></td><td className="py-2">DAU/MAU, engagement time, viral coefficient</td></tr>
            <tr className="border-b"><td className="py-2 pr-4"><strong>SaaS / Subscriptions</strong></td><td className="py-2">MRR, churn, LTV/CAC, plan distribution</td></tr>
            <tr><td className="py-2 pr-4"><strong>E-commerce</strong></td><td className="py-2">AOV, repeat rate, CAC, return rates</td></tr>
          </tbody>
        </table>
      </div>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">🧭 Best Practices for Management</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Clarity over quantity:</strong> Include only decision-relevant materials.</li>
        <li><strong>Consistency:</strong> Story and numbers must match everywhere.</li>
        <li><strong>Organization:</strong> Use clear folders/subfolders or linked pages.</li>
        <li><strong>Version control:</strong> Label updated versions clearly.</li>
        <li><strong>Access control:</strong> Use NDA + gated access for serious engagement.</li>
        <li><strong>Regular updates:</strong> Treat as a living document (monthly/quarterly).</li>
      </ul>
      <blockquote className="border-l-4 pl-4 text-foreground/90">Protect sensitive information. Some investors may overlap with potential competitors.</blockquote>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">🤝 Building Trust and Confidence</h2>
      <p>Your data room is more than compliance — it is a trust-building asset.</p>
      <p>A clean and transparent room signals operational excellence and investment readiness.</p>
      <p className="font-semibold">When investor-ready, you can:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Shorten due diligence time</li>
        <li>Build credibility faster</li>
        <li>Increase odds of closing the round sooner</li>
      </ul>
    </article>
  </div>
);


const InvestorsUpdateSystemArticle = () => (
  <div className="space-y-8">
    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">⚙️ Logistics: How &amp; When to Send</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Format:</strong> Plain text email, no heavy graphics, readable on mobile in ~30 seconds.</li>
        <li><strong>Cadence:</strong> Early stage (0–36 months) monthly; growth stage quarterly.</li>
        <li><strong>Timing:</strong> Tuesday/Wednesday/Thursday mornings. Avoid Mondays and Fridays.</li>
        <li><strong>Subject Line:</strong> <code>[Company Name] Investor Update — [Month/Year]</code></li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">🧠 Key Principles</h2>
      <p>Investors read dozens of updates monthly. The most trusted founders consistently apply these mental models.</p>

      <h3 className="text-xl font-semibold">1) Radical Transparency</h3>
      <p><strong>The Rule:</strong> Bad news ages poorly. Don&apos;t spin reality.</p>
      <p><strong>The Psychology:</strong> Early, honest disclosure signals leadership and problem-solving discipline.</p>
      <p className="font-semibold">❌ Sugar-Coated (Bad)</p>
      <blockquote className="border-l-4 pl-4 text-foreground/90">&quot;We are optimizing enterprise sales. Revenue is flat as we focus on quality over quantity.&quot;</blockquote>
      <p><strong>Investor reaction:</strong> This sounds vague and evasive.</p>
      <p className="font-semibold">✅ Radically Transparent (Good)</p>
      <blockquote className="border-l-4 pl-4 text-foreground/90">&quot;We missed Q3 revenue by 20% due to SOC-2 gaps blocking enterprise contracts. We paused outbound for 3 weeks to complete certification.&quot;</blockquote>
      <p><strong>Investor reaction:</strong> Clear diagnosis + concrete fix.</p>

      <h3 className="text-xl font-semibold">2) The “No Threes” Rule</h3>
      <p><strong>The Rule:</strong> On 1–5 ratings (Team/Product/Growth), do not use 3.</p>
      <p><strong>The Psychology:</strong> Removing the neutral zone forces clarity: working (4/5) or broken (1/2).</p>
      <p className="font-semibold">❌ Safe 3 (Bad)</p>
      <blockquote className="border-l-4 pl-4 text-foreground/90">Engineering Team: 3/5 — &quot;Shipping at a decent pace.&quot;</blockquote>
      <p>Too vague to be actionable.</p>
      <p className="font-semibold">✅ Forced Decision (Good)</p>
      <blockquote className="border-l-4 pl-4 text-foreground/90">Engineering Team: 2/5 — bug rate up 15%; technical debt rising; immediate QA lead hire needed.</blockquote>
      <p>Specific, measurable, and tied to action.</p>

      <h3 className="text-xl font-semibold">3) Closing the Loop</h3>
      <p><strong>The Rule:</strong> Treat updates like episodes: if you open a problem this month, resolve or progress it next month.</p>
      <p><strong>The Psychology:</strong> Investors track continuity; unresolved threads reduce confidence.</p>
      <p className="font-semibold">❌ Open Loop (Bad)</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>January: Head of Marketing quit.</li>
        <li>February: Launched TikTok campaign.</li>
        <li>March: Focus on sales hiring.</li>
      </ul>
      <p>Missing continuity creates doubt.</p>
      <p className="font-semibold">✅ Closed Loop (Good)</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>January: Marketing lead quit; founder covering interim.</li>
        <li>February: 4 candidates interviewed; still hiring.</li>
        <li>March: Hired replacement; start date confirmed.</li>
      </ul>
    </article>

    <article className="bg-card rounded-xl border p-6 space-y-4">
      <h2 className="text-2xl font-semibold">📋 The “Gold Standard” Email Template</h2>
      <p>Copy, adapt, and send with consistent structure every month.</p>
      <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md">{`Subject: [Company Name] Investor Update — [Month/Year] — [Status: e.g., +15% Growth]

Hi Team,

[EXECUTIVE SUMMARY / TL;DR]
• Sentiment: [One sentence on how the month felt]
• The Big Win: [Most important achievement]
• The Bottom Line: We have $[Amount] in the bank with [Number] months of runway.

[CORE METRICS & KPIs]
(Keep these identical every month. Do not cherry-pick.)
| Metric | Current Value | MoM Growth |
| :--- | :--- | :--- |
| Revenue (MRR) | $00,000 | +00% |
| Net Burn | $00,000 | -00% |
| Runway | 00 Months | (w/o revenue forecast) |
| Active Users | 0,000 | +00% |
| Churn Rate | 0.0% | -0.0% |

[PERFORMANCE RATINGS (1-5 Scale, NO 3s allowed)]
• Runway: [Score] (Prev: [Score])
• Team: [Score] (Prev: [Score])
• Product: [Score] (Prev: [Score])

[HIGHLIGHTS (The Wins)]
• Win 1: Successfully launched [Feature] which increased retention by [X]%.
• Win 2: Signed an LOI with [Major Client].
• Win 3: Key Hire: [Name] joined as [Role] (ex-[Company]).

[LOWLIGHTS (The Challenges)]
• Challenge 1: [Issue]
  → Solution: [Action + owner + timeline]
• Challenge 2: [Issue]
  → Solution: [Action + owner + timeline]

[THE ASK (How You Can Help)]
1. Introduction: Need intro to [Target Person].
   → Forwardable blurb included.
2. Hiring: Looking for [Role].
   → Please share: [Job link].

[CLOSING]
• Shout-outs: Thanks to [Investor Name] for [Specific Help].
• Focus: Next month is all about [Primary Goal].

Best,
[Founder Name]
[Link to Previous Month's Update]`}</pre>
    </article>
  </div>
);
const guides: Record<string, GuideData> = {
  "vc-list": {
    title: "VC List",
    subtitle: "Explore the investor database using the updated Google Sheet.",
    sections: [
      {
        heading: "How to use this database",
        body: [
          "This is a large VC database intended for filtering by geography, stage, and sector.",
          "Build a focused fundraising pipeline by selecting investors that match your exact stage and vertical.",
        ],
      },
    ],
    externalUrl:
      "https://docs.google.com/spreadsheets/d/1urWSx_XvI4hEq72GRp-X2NS7fv_AJA0L9id7UmsLJUE/edit?usp=sharing",
    externalLabel: "Open 10K VC List",
  },
  "pre-seed-checklist": {
    title: "Pre-Seed Checklist",
    subtitle: "A practical checklist to prepare for your first fundraising round.",
    sections: [
      {
        heading: "I. Legal Counsel & Company Formation",
        body: [
          "Engage legal counsel specializing in start-ups.",
          "Form (or transition to) a Delaware C Corporation.",
          "Prepare and gather company formation documents.",
          "- [ ] Certificate of Incorporation",
          "- [ ] Bylaws",
          "- [ ] Board Consents",
          "Prepare paperwork to transfer founder IP to the company.",
          "Document founder equity stakes and vesting schedules.",
          "File an 83(b) election with the IRS (if applicable).",
        ],
      },
      {
        heading: "II. Capitalization Table & Equity Structure",
        body: [
          "Set up a clean Cap Table (accurate ownership record).",
          "Establish a fair equity split among founders.",
          "Create an Equity Incentive Plan (e.g., option pool) for team/advisors.",
          "Implement 4-year vesting with a 1-year cliff for all contributors.",
          "Ensure shares have transfer restrictions and Right of First Refusal (ROFR).",
        ],
      },
      {
        heading: "III. Fundraising Strategy & Due Diligence",
        body: [
          "Define fundraising plan.",
          "- [ ] Target amount",
          "- [ ] Use of funds",
          "- [ ] Instrument (SAFE / Note / Priced Round)",
          "Use market-standard docs (e.g., Y Combinator SAFE).",
          "Avoid investors requesting off-market or complex terms.",
          "Confirm all investors are Accredited Investors.",
          "Organize all company records & legal documents for diligence.",
          "Resolve open items (e.g., pre-round advisor grants) before fundraising.",
        ],
      },
      {
        heading: "IV. Agreements with Service Providers",
        body: [
          "Ensure every employee, advisor, and consultant signs written agreements.",
          "Use Non-Disclosure & Invention Assignment Agreements (NDIAA) for employees.",
          "Include work-made-for-hire and IP assignment clauses.",
          "Add indemnification clauses confirming originality of work.",
          "Control and document open-source software usage in products.",
        ],
      },
      {
        heading: "V. Intellectual Property (IP) Protection",
        body: [
          "Register copyrights for key materials (software, content, etc.).",
          "Use proper ©, ™, and ® notices on all assets.",
          "Secure rights of publicity / model releases for any individual’s likeness.",
          "Designate a DMCA agent and implement a takedown policy (if applicable).",
        ],
      },
      {
        heading: "VI. Privacy Policy & Terms of Use",
        body: [
          "Draft custom Privacy Policy and Terms of Use (don’t copy others!).",
          "Privacy Policy: Describe data collection, use, and sharing clearly.",
          "Privacy Policy: Include opt-out mechanism and data security practices.",
          "Terms of Use: Define permissible use, warranties, liability limits, governing law.",
          "Terms of Use: Clarify ownership and license rights for user-generated content.",
        ],
      },
    ],
  },
  "startup-incorporation-guide": {
    title: "Startup Incorporation Guide",
    subtitle: "A founder-friendly overview for setting up your company correctly.",
    sections: [
      {
        heading: "Key Takeaways",
        body: [
          "Delaware C-Corporations are preferred for startups seeking venture capital.",
          "Early planning ensures equity clarity, IP protection, and fundraising readiness.",
          "International founders can incorporate remotely with a registered agent and virtual mailbox.",
          "Corporate hygiene matters: cap table discipline, annual reports, and compliance reduce legal risk.",
        ],
      },
      {
        heading: "1) Planning",
        body: [
          "Review employment contracts to ensure startup IP does not conflict with employer obligations.",
          "Consult startup legal and tax advisors before incorporation decisions.",
          "Align founder equity splits, vesting schedules, and founder contribution terms early.",
          "Sign releases for \"lost founders\" so no one can later claim equity from minimal past involvement.",
          "Choose entity type deliberately (Delaware C-Corp is generally the investor-preferred path).",
        ],
      },
    ],
  },
  "how-to-cold-reach-investors": {
    title: "How to Cold Reach Investors",
    subtitle: "A simple outbound playbook for warm-quality cold outreach.",
    sections: [
      {
        heading: "Phase 1: Technical & Research Setup",
        body: [
          "Industry-average cold reply rates are around 1%, but disciplined execution can materially improve them.",
          "Use a secondary outreach domain and complete a proper warm-up period before sending at scale.",
          "Configure SPF, DKIM, and DMARC; without authentication your emails often fail delivery.",
          "Target investors only where stage and thesis fit is real; generic mass outreach gets blacklisted.",
        ],
      },
      {
        heading: "Phase 2: Construction Rules",
        body: [
          "Treat outreach like a movie trailer: your goal is to earn the meeting, not close by email.",
          "Keep emails short (about 50–150 words), mobile-friendly, and signal-heavy.",
          "Use trajectory lines (e.g., growth metrics) rather than vague claims.",
          "Use low-friction CTAs (brief chat or permission to send deck), and avoid NDA asks in cold outreach.",
        ],
      },
    ],
  },
  "viral-startup-launch-checklist": {
    title: "Viral Startup Launch Checklist",
    subtitle: "A launch checklist focused on momentum and distribution.",
    sections: [
      {
        heading: "I. Pre-Launch Preparation",
        body: [
          "Objective: maximize visibility, accelerate feedback loops, and compound early traction through coordinated networks.",
          "Build a support circle (customers, operators, investors, peers, friends) before launch day.",
          "Use engagement tiers: first 5 minutes, first 15 minutes, and first hour.",
          "Pre-bake launch assets: social-proof screenshots, alternate thumbnails, objection replies, and supporter blurbs.",
        ],
      },
      {
        heading: "II. Launch Execution Playbook",
        body: [
          "Treat the first launch hours as a compounding window; speed and coordination determine reach.",
          "Choose a clear archetype: cinematic announcement + lead magnet, or lead-magnet-first value delivery.",
          "Pre-seed engagement and respond rapidly so momentum is sustained in public channels.",
        ],
      },
    ],
  },
  "early-traction-metrics": {
    title: "Early Traction Metrics That Matter",
    subtitle: "Key startup metrics to track before and during early fundraising.",
    sections: [
      {
        heading: "1) Core Revenue & Growth Metrics",
        body: [
          "Track MRR and ARR with explicit formulas and definitions.",
          "Track month-over-month growth rate and show consistent momentum lines.",
          "Pre-seed: early paid pilots and trend visibility can be enough.",
          "Seed: repeatable revenue and sustained acceleration are expected.",
        ],
      },
      {
        heading: "2) Customer Metrics & Unit Economics",
        body: [
          "Track CAC and acquisition efficiency by channel.",
          "Show realistic payback expectations and healthy LTV:CAC trajectory over time.",
          "Use metrics context: what changed, why it changed, and what action you took.",
        ],
      },
    ],
  },
  "customer-interview-script-framework": {
    title: "Customer Interview Script Framework",
    subtitle: "A practical interview structure to uncover real customer pain.",
    sections: [
      {
        heading: "1) Opening & Context (2–3 min)",
        body: [
          "Build rapport, set expectations, and explain you are learning—not selling.",
          "Capture role context and daily workflow before moving into pain discovery.",
          "Do not pitch your product during the opening.",
        ],
      },
      {
        heading: "2) Discovery, Current Solutions, and Value",
        body: [
          "Focus on specific past incidents (not hypotheticals) to uncover real pain.",
          "Ask how they currently solve it, which tools they use, and where frustration is highest.",
          "Quantify impact: time, money, business risk, and priority level.",
          "Document exact user language and recurring patterns to guide prioritization.",
        ],
      },
    ],
  },
  "how-to-estimate-market-size": {
    title: "How to Estimate Market Size",
    subtitle: "Use a clear, defensible way to estimate TAM, SAM, and SOM.",
    sections: [
      {
        heading: "Key Takeaways",
        body: [
          "Big companies are built in big markets; investors test this early.",
          "Use bottom-up sizing: number of customers × annual revenue per customer.",
          "Show TAM plus realistic 5+ year revenue projections grounded in assumptions.",
        ],
      },
      {
        heading: "How to Estimate Market Size",
        body: [
          "Identify target customers, estimate annual value per customer, then multiply.",
          "Keep assumptions simple and explicit; complexity does not add early credibility.",
          "Use incremental market expansion logic and explain why your segment is compelling.",
          "Present both current market opportunity and future market growth where relevant.",
        ],
      },
    ],
  },
  "startup-competitive-analysis": {
    title: "Startup Competitive Analysis",
    subtitle: "Map competitors and sharpen your differentiation.",
    sections: [
      {
        heading: "Why Competitive Analysis Matters",
        body: [
          "Competitive analysis reveals strengths, weaknesses, and strategic gaps in your market.",
          "Without structured analysis, startup differentiation and go-to-market choices become weaker.",
        ],
      },
      {
        heading: "Steps to Conduct Analysis",
        body: [
          "Identify direct, indirect, and emerging competitors.",
          "Gather data from websites, reviews, social channels, and industry sources.",
          "Run SWOT and compare product, pricing, and positioning.",
          "Evaluate marketing/sales strategy and available financial signals.",
          "Convert findings into actionable positioning and strategic decisions.",
        ],
      },
    ],
  },
  "how-to-calculate-cash-runway": {
    title: "How to Calculate Cash Runway",
    subtitle: "Track burn and runway so fundraising never becomes reactive.",
    sections: [
      {
        heading: "What is Cash Runway",
        body: [
          "Cash runway is how many months a startup can operate before running out of cash.",
          "It is essential for timing fundraising and planning spending decisions.",
          "Early-stage teams usually calculate runway against current burn assumptions.",
        ],
      },
      {
        heading: "Formula, Example, and Benchmarks",
        body: [
          "Formula: runway = current cash balance ÷ monthly net burn.",
          "Gross burn = monthly expenses; net burn = monthly expenses − monthly cash sales.",
          "Example from the source: $250k cash and $70k net burn gives ~3.6 months of runway.",
          "Typical target runway is 6–12 months, with some teams aiming for 12–18 months in uncertain markets.",
          "Extend runway through cost control, hiring pauses, faster collections, and vendor renegotiation.",
        ],
      },
    ],
  },
  "feature-prioritization-framework": {
    title: "Feature Prioritization Framework",
    subtitle: "Prioritize product work based on impact, effort, and strategy.",
    sections: [
      {
        heading: "MoSCoW Method",
        body: [
          "Classify work into Must have, Should have, Could have, and Won't have.",
          "Use it to protect launch-critical scope and reduce roadmap sprawl.",
          "Define core business values and project risks before assigning categories.",
        ],
      },
      {
        heading: "Kano & RICE Extensions",
        body: [
          "Kano helps classify features as Basic, Performance, Delighters, Indifferent, or Reverse.",
          "RICE provides quantitative scoring using reach, impact, confidence, and effort.",
          "Review priorities continuously as customer expectations and product context evolve.",
        ],
      },
    ],
  },
  "startup-data-room": {
    title: "Startup Data Room",
    subtitle: "Keep your due-diligence materials investor-ready at all times.",
    sections: [
      {
        heading: "What Is a Data Room",
        body: [
          "A data room is a secure digital space where investors review diligence materials.",
          "It validates pitch claims, demonstrates discipline, speeds diligence, and builds trust.",
          "A strong data room does not just store files—it tells your company story with credibility.",
        ],
      },
      {
        heading: "Core Components Investors Expect",
        body: [
          "Pitch deck (latest version aligned with your narrative).",
          "Cap table (founders, ESOP, SAFEs/notes, options/warrants).",
          "Financials (historical P&L, burn/runway, and revenue breakdowns).",
          "Maintain clean structure, naming, and version control so reviews move quickly.",
        ],
      },
    ],
  },
  "investors-update-system": {
    title: "Investors Update System",
    subtitle: "Send concise, transparent updates that build trust and unlock investor help.",
    sections: [
      {
        heading: "Cadence and Format",
        body: [
          "Use plain text and keep each update skimmable on mobile in under a minute.",
          "Early stage startups usually send monthly; growth-stage companies often send quarterly.",
          "Use a consistent subject line and send mid-week mornings for best visibility.",
        ],
      },
      {
        heading: "Principles",
        body: [
          "Be radically transparent, avoid neutral scoring, and always close loops on prior issues.",
          "Pair lowlights with concrete fixes and clear asks so investors can help quickly.",
        ],
      },
    ],
  },
};

const ResourceGuide = () => {
  const { slug } = useParams();

  if (!slug || !guides[slug]) {
    return <Navigate to="/resources" replace />;
  }

  const guide = guides[slug];

  return (
    <>
      <Helmet>
        <title>{guide.title} | Foundterra Resources</title>
        <meta name="description" content={guide.subtitle} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-primary/5 to-background">
        <Header />
        <main className="flex-1">
          <section className="section-padding">
            <div className="container-max max-w-4xl">
              <div className="mb-8">
                <Button asChild variant="ghost" className="mb-4">
                  <Link to="/resources">← Back to Resources</Link>
                </Button>
                <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>
                <p className="text-lg text-muted-foreground">{guide.subtitle}</p>
              </div>

              <div className="space-y-8">
                {slug === "pre-seed-checklist" ? (
                  <PreSeedChecklistArticle />
                ) : slug === "how-to-cold-reach-investors" ? (
                  <ColdReachInvestorsArticle />
                ) : slug === "viral-startup-launch-checklist" ? (
                  <ViralLaunchChecklistArticle />
                ) : slug === "early-traction-metrics" ? (
                  <EarlyTractionMetricsArticle />
                ) : slug === "customer-interview-script-framework" ? (
                  <CustomerInterviewScriptArticle />
                ) : slug === "how-to-estimate-market-size" ? (
                  <MarketSizeGuideArticle />
                ) : slug === "startup-competitive-analysis" ? (
                  <StartupCompetitiveAnalysisArticle />
                ) : slug === "how-to-calculate-cash-runway" ? (
                  <CashRunwayArticle />
                ) : slug === "feature-prioritization-framework" ? (
                  <FeaturePrioritizationFrameworkArticle />
                ) : slug === "startup-data-room" ? (
                  <StartupDataRoomArticle />
                ) : slug === "investors-update-system" ? (
                  <InvestorsUpdateSystemArticle />
                ) : (
                  guide.sections.map((section) => (
                    <article key={section.heading} className="bg-card rounded-xl border p-6">
                      <h2 className="text-2xl font-semibold mb-3">{section.heading}</h2>
                      <div className="space-y-2">
                        {section.body.map((paragraph) => (
                          <p key={paragraph} className="text-foreground/90 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </article>
                  ))
                )}
              </div>

              {guide.externalUrl && (
                <div className="mt-10">
                  <Button asChild size="lg" className="w-full md:w-auto">
                    <a href={guide.externalUrl} target="_blank" rel="noopener noreferrer">
                      {guide.externalLabel ?? "Open Resource"}
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ResourceGuide;
