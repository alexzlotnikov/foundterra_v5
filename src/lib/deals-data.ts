export type DealCategory = 'credits' | 'partner' | 'alternative' | 'foundterra';
export type DealSource = 'appsumo' | 'founderpass' | 'nachonacho' | 'direct';

export interface Deal {
  id: string;
  company: string;
  domain: string;
  badge: string;
  description: string;
  link: string;
  category: DealCategory;
  source: DealSource;
  highlight?: boolean;
  alternativeTo?: string;
  appsumoSlug?: string;
  discountCode?: string;
  originalPrice?: number;
  salePrice?: number;
}

export const DEALS: Deal[] = [
  {
    id: 'foundterra-deck',
    company: 'Foundterra',
    domain: 'foundterra.com',
    badge: 'Free Startup Tools',
    description: 'Free Fundraising Kit with templates, investor update framework, and startup tools list for pre-seed founders.',
    link: '/get-resources',
    category: 'foundterra',
    source: 'direct',
  },
  {
    id: 'foundterra-review',
    company: 'Foundterra',
    domain: 'foundterra.com',
    badge: '$100 (was $250)',
    description: '45-min recorded video review of your deck. Honest investor-eye feedback on narrative, structure, and red flags.',
    link: '/paid-consultation',
    category: 'foundterra',
    source: 'direct',
    originalPrice: 250,
    salePrice: 100,
  },
  { id: 'google-cloud', company: 'Google Cloud', domain: 'cloud.google.com', badge: '$350,000 Credits', description: 'Massive GCP, Firebase, and AI infrastructure credits for verified startups.', link: 'https://www.founderpass.com/partners/google-cloud?via=foundterra', category: 'credits', highlight: true, source: 'founderpass' },
  { id: 'microsoft-azure', company: 'Microsoft Azure', domain: 'azure.microsoft.com', badge: '$150,000 Credits', description: 'Direct access to Azure and OpenAI API credits. Scales based on usage.', link: 'https://startups.microsoft.com', category: 'credits', highlight: true, source: 'direct' },
  { id: 'aws-activate', company: 'AWS Activate', domain: 'aws.amazon.com', badge: '$100,000 Credits', description: 'Top-tier Amazon Web Services hosting and architecture credits.', link: 'https://www.founderpass.com/partners/aws?via=foundterra', category: 'credits', highlight: true, source: 'founderpass' },
  { id: 'zendesk', company: 'Zendesk', domain: 'zendesk.com', badge: '6 Months Free ($50,000)', description: 'Entirely free access to their professional customer support suite.', link: 'https://www.founderpass.com/partners/zendesk?via=foundterra', category: 'credits', source: 'founderpass' },
  { id: 'retool', company: 'Retool', domain: 'retool.com', badge: '$60,000 Credits', description: '1 year entirely free to build custom internal tools and dashboards.', link: 'https://retool.com/startups', category: 'credits', source: 'direct' },
  { id: 'posthog', company: 'PostHog', domain: 'posthog.com', badge: '$50,000 Credits', description: 'Open-source product analytics and session replay credits.', link: 'https://posthog.com/startups', category: 'credits', source: 'direct' },
  { id: 'mixpanel', company: 'Mixpanel', domain: 'mixpanel.com', badge: '$50,000 Credits', description: '1 year entirely free on their Growth plan for deep product analytics.', link: 'https://mixpanel.com/startups', category: 'credits', source: 'direct' },
  { id: 'notion', company: 'Notion', domain: 'notion.so', badge: '6 Months Free ($12,000)', description: 'Unlimited AI features and full workspace access for the team.', link: 'https://www.founderpass.com/partners/notion?via=foundterra', category: 'credits', source: 'founderpass' },
  { id: 'mongodb', company: 'MongoDB', domain: 'mongodb.com', badge: '$500 Credits', description: 'Free credits for the Atlas cloud NoSQL database.', link: 'https://www.founderpass.com/partners/mongodb?via=foundterra', category: 'credits', source: 'founderpass' },
  { id: 'hubspot', company: 'HubSpot', domain: 'hubspot.com', badge: '90% Off 1st Year', description: 'The premier CRM, marketing, and sales automation platform.', link: 'https://www.founderpass.com/partners/hubspot?via=foundterra', category: 'partner', highlight: true, source: 'founderpass' },
  { id: 'intercom', company: 'Intercom', domain: 'intercom.com', badge: '100% Off 1st Year', description: 'Industry-leading customer messaging and AI support bot platform.', link: 'https://www.founderpass.com/partners/intercom?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'webflow', company: 'Webflow', domain: 'webflow.com', badge: '100% Off 1st Year', description: 'Build a world-class, custom marketing website visually without code.', link: 'https://www.founderpass.com/partners/webflow?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'cloudflare', company: 'Cloudflare', domain: 'cloudflare.com', badge: '1 Year Free', description: 'Enterprise-grade web performance, CDN, and security routing.', link: 'https://www.founderpass.com/partners/cloudflare?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'github', company: 'GitHub', domain: 'github.com', badge: '1 Year Free', description: "Enterprise seats to securely host your startup's codebase.", link: 'https://www.founderpass.com/partners/github?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'amplitude', company: 'Amplitude', domain: 'amplitude.com', badge: '1 Year Free', description: 'Advanced product analytics to help founders find product-market fit.', link: 'https://www.founderpass.com/partners/amplitude?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'auth0', company: 'Auth0', domain: 'auth0.com', badge: '1 Year Free', description: 'Drop-in user authentication, security, and sign-up flows made easy.', link: 'https://www.founderpass.com/partners/auth0?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'foundterra-kit-partner', company: 'Foundterra', domain: 'foundterra.com', badge: 'Free Fundraising Kit', description: 'Get our startup tools block + fundraising templates in one free bundle.', link: '/get-resources', category: 'partner', source: 'direct' },
  { id: 'apollo', company: 'Apollo.io', domain: 'apollo.io', badge: '50% Off 1st Year', description: 'The ultimate B2B sales intelligence and lead database platform.', link: 'https://nachonacho.com/product/deal-apollo?red=foundt', category: 'partner', source: 'nachonacho' },
  { id: 'docsend', company: 'DocSend', domain: 'docsend.com', badge: '90% Off 1st Year', description: 'Securely track when investors open and read your pitch decks.', link: 'https://www.founderpass.com/partners/docsend?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'xero', company: 'Xero', domain: 'xero.com', badge: '90% Off 1st Year', description: 'Beautiful accounting and financial software for scaling startups.', link: 'https://www.founderpass.com/partners/xero?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'brevo', company: 'Brevo', domain: 'brevo.com', badge: '75% Off 1st Year', description: 'Powerful, cost-effective email marketing and transactional emails.', link: 'https://www.founderpass.com/partners/brevo?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'deel', company: 'Deel', domain: 'deel.com', badge: '30% Off 1st Year', description: 'Hire and run payroll for international contractors compliantly.', link: 'https://www.founderpass.com/partners/deel?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'canva', company: 'Canva', domain: 'canva.com', badge: '6 Months Free', description: 'Premium online graphic design platform to create ad creatives.', link: 'https://www.founderpass.com/partners/canva?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'asana', company: 'Asana', domain: 'asana.com', badge: '80% Off Starter', description: 'Premium project and product roadmap management for growing teams.', link: 'https://www.founderpass.com/partners/asana?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'slack', company: 'Slack', domain: 'slack.com', badge: '25% Off Upgrades', description: 'The industry standard for internal team chat and communications.', link: 'https://www.founderpass.com/partners/slack?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'instantly', company: 'Instantly', domain: 'instantly.ai', badge: '30% Cashback Forever', description: 'Scale your cold email outreach with unlimited sending accounts.', link: 'https://nachonacho.com/product/Instantly?red=foundt', category: 'partner', source: 'nachonacho' },
  { id: 'miro', company: 'Miro', domain: 'miro.com', badge: '$1,000 Credits', description: 'Endless collaborative whiteboard space to map out user journeys.', link: 'https://www.founderpass.com/partners/miro?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'openai', company: 'OpenAI', domain: 'openai.com', badge: '$300 Free Credits', description: 'API credits to build features powered by GPT-4 and DALL-E.', link: 'https://www.founderpass.com/partners/openai?via=foundterra', category: 'partner', source: 'founderpass' },
  { id: 'reddit-ads', company: 'Reddit Ads', domain: 'ads.reddit.com', badge: '$500 Ad Credits', description: 'Reach highly engaged niche communities to acquire early startup users.', link: 'https://nachonacho.com/product/reddit-ads?red=foundt', category: 'partner', source: 'nachonacho' },
  { id: 'google-workspace', company: 'Google Workspace', domain: 'workspace.google.com', badge: '15% Instant Off', description: 'Professional Gmail, Drive storage, and Meet for daily operations.', link: 'https://nachonacho.com/product/google-workspace?red=foundt', category: 'partner', source: 'nachonacho' },
  { id: 'docusign', company: 'DocuSign', domain: 'docusign.com', badge: '10% Cashback', description: 'The enterprise standard for signing contracts and documents.', link: 'https://nachonacho.com/product/docusign?red=foundt', category: 'partner', source: 'nachonacho' },
  { id: 'google-ai-ultra', company: 'Google AI Ultra', domain: 'ai.google', badge: '$40 Off Per User/Mo', description: "Access Google's most capable AI models for complex tasks and coding.", link: 'https://nachonacho.com/product/google-ai-ultra?red=foundt', category: 'partner', source: 'nachonacho' },
  { id: 'tinycommand', company: 'Tiny Command', domain: 'tinycommand.com', badge: '$79 Lifetime Deal', description: 'Automate apps without monthly fees.', link: 'https://appsumo.8odi.net/ZVV0d0', category: 'alternative', alternativeTo: 'Zapier', source: 'appsumo', appsumoSlug: 'tinycommand' },
  { id: 'tidycal', company: 'TidyCal', domain: 'tidycal.com', badge: '$29 Lifetime Deal', description: 'Simple, fast calendar booking.', link: 'https://appsumo.8odi.net/E00QK9', category: 'alternative', alternativeTo: 'Calendly', source: 'appsumo', appsumoSlug: 'tidycal' },
  { id: 'sendfox', company: 'SendFox', domain: 'sendfox.com', badge: '$49 Lifetime Deal', description: 'Email marketing to build waitlists.', link: 'https://appsumo.8odi.net/2RRn1M', category: 'alternative', alternativeTo: 'Mailchimp', source: 'appsumo', appsumoSlug: 'sendfox' },
  { id: 'sendpilot', company: 'Sendpilot', domain: 'sendpilot.io', badge: '$69 Lifetime Deal', description: 'LinkedIn outreach automation.', link: 'https://appsumo.8odi.net/R00J52', category: 'alternative', alternativeTo: 'Lusha', source: 'appsumo', appsumoSlug: 'sendpilot' },
  { id: 'breezedoc', company: 'BreezeDoc', domain: 'breezedoc.com', badge: '$59 Lifetime Deal', description: 'Secure, legally binding e-signatures.', link: 'https://appsumo.8odi.net/4aa6PL', category: 'alternative', alternativeTo: 'DocuSign', source: 'appsumo', appsumoSlug: 'breezedoc' },
  { id: 'writecream', company: 'Writecream', domain: 'writecream.com', badge: '$59 Lifetime Deal', description: 'Your secret weapon for SEO, research & marketing.', link: 'https://appsumo.8odi.net/NGGAkP', category: 'alternative', alternativeTo: 'Semrush', source: 'appsumo', appsumoSlug: 'writecream' },
  { id: 'kingsumo', company: 'KingSumo', domain: 'kingsumo.com', badge: '$49 Lifetime Deal', description: 'Viral giveaway platform for emails.', link: 'https://appsumo.8odi.net/yZZG2B', category: 'alternative', alternativeTo: 'Gleam', source: 'appsumo', appsumoSlug: 'kingsumo' },
  { id: 'clickrank', company: 'ClickRank', domain: 'clickrank.ai', badge: '$89 Lifetime Deal', description: 'Optimize content for AI search engines: ChatGPT, Claude, Perplexity, Gemini.', link: 'https://appsumo.8odi.net/KBBkjv', category: 'alternative', alternativeTo: 'Yoast / RankMath', source: 'appsumo', appsumoSlug: 'clickrank' },
  { id: 'framer', company: 'Framer', domain: 'framer.com', badge: '1 Year Free', description: 'Lightning-fast, no-code web builder.', link: 'https://www.founderpass.com/partners/framer?via=foundterra', category: 'alternative', alternativeTo: 'Webflow', source: 'founderpass' },
  { id: 'gitlab', company: 'GitLab', domain: 'gitlab.com', badge: '1 Year Free', description: 'AI-powered DevSecOps platform.', link: 'https://www.founderpass.com/partners/gitlab?via=foundterra', category: 'alternative', alternativeTo: 'GitHub', source: 'founderpass' },
  { id: 'perplexity', company: 'Perplexity AI', domain: 'perplexity.ai', badge: '3 Months Pro Free', description: 'The ultimate AI research engine.', link: 'https://www.founderpass.com/partners/perplexity?via=foundterra', category: 'alternative', alternativeTo: 'ChatGPT Pro', source: 'founderpass' },
  { id: 'sticky-password', company: 'Sticky Password', domain: 'stickypassword.com', badge: '25% Cashback Forever', description: 'Secure team password manager.', link: 'https://nachonacho.com/product/sticky-password?red=foundt', category: 'alternative', alternativeTo: '1Password', source: 'nachonacho' },
  { id: 'dropbox', company: 'Dropbox', domain: 'dropbox.com', badge: '10% Cashback', description: 'Reliable storage for heavy media assets.', link: 'https://nachonacho.com/product/dropbox?red=foundt', category: 'alternative', alternativeTo: 'Box / Google Drive', source: 'nachonacho' },
];

export const TOTAL_DEAL_VALUE = '$600,000+';
export const DEAL_COUNT = DEALS.filter((d) => d.category !== 'foundterra').length;
export const APPSUMO_FALLBACK_LINK = 'https://appsumo.8odi.net/ennYgj';
