import { Company } from '@/types/company';

export const companies: Company[] = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    website: 'https://anthropic.com',
    industry: ['AI', 'AI Safety'],
    stage: 'Series D',
    location: 'San Francisco, CA',
    description: 'AI safety company building reliable, interpretable, and steerable AI systems. Creators of Claude.',
    founded: '2021',
    employees: '500–1,000',
    fundingRounds: [
      { round: 'Series D', date: '2024-03', amount: '$2.65B', leadInvestor: 'Lightspeed Venture Partners' },
      { round: 'Series C', date: '2023-05', amount: '$450M', leadInvestor: 'Spark Capital' },
      { round: 'Series B', date: '2023-02', amount: '$300M', leadInvestor: 'Google' },
    ],
    investors: ['Google', 'Spark Capital', 'Lightspeed', 'Salesforce Ventures', 'Sound Ventures'],
    signals: [
      { type: 'hiring', title: 'Engineering hiring surge', date: '2025-01', description: '60+ open roles across ML research and engineering' },
      { type: 'product', title: 'Claude 3.5 Sonnet released', date: '2024-06', description: 'New flagship model with improved reasoning capabilities' },
      { type: 'funding', title: 'Series D close', date: '2024-03', description: '$2.65B raised at $18.4B valuation' },
    ],
    logs: [
      { timestamp: '2025-01-15T10:30:00Z', provider: 'VentureLens AI', status: 'success', sources: ['anthropic.com', 'anthropic.com/careers', 'anthropic.com/research'] },
    ],
    score: { funding: 28, activity: 27, thesis: 35, totalScore: 90 },
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    website: 'https://mistral.ai',
    industry: ['AI', 'Open Source'],
    stage: 'Series B',
    location: 'Paris, France',
    description: 'European AI lab building frontier open-weight large language models.',
    founded: '2023',
    employees: '50–100',
    fundingRounds: [
      { round: 'Series B', date: '2024-06', amount: '$640M', leadInvestor: 'General Catalyst' },
      { round: 'Series A', date: '2023-12', amount: '$415M', leadInvestor: 'Andreessen Horowitz' },
    ],
    investors: ['General Catalyst', 'Andreessen Horowitz', 'Lightspeed', 'BPI France'],
    signals: [
      { type: 'product', title: 'Mistral Large 2 launch', date: '2024-11', description: 'Released flagship 123B parameter model' },
      { type: 'partnership', title: 'Microsoft Azure partnership', date: '2024-02', description: 'Mistral models available on Azure' },
    ],
    logs: [],
    score: { funding: 26, activity: 22, thesis: 30, totalScore: 78 },
  },
  {
    id: 'scale-ai',
    name: 'Scale AI',
    website: 'https://scale.com',
    industry: ['AI', 'Data Infrastructure'],
    stage: 'Series F',
    location: 'San Francisco, CA',
    description: 'Data-centric AI platform providing high-quality training data and AI infrastructure for enterprises.',
    founded: '2016',
    employees: '1,000+',
    fundingRounds: [
      { round: 'Series F', date: '2024-05', amount: '$1B', leadInvestor: 'Accel' },
      { round: 'Series E', date: '2021-06', amount: '$325M', leadInvestor: 'Tiger Global' },
    ],
    investors: ['Accel', 'Tiger Global', 'Index Ventures', 'Founders Fund', 'Y Combinator'],
    signals: [
      { type: 'hiring', title: 'Government contracts team', date: '2024-09', description: 'Expanding defense and government AI division' },
      { type: 'product', title: 'Scale GenAI Platform', date: '2024-03', description: 'Enterprise generative AI evaluation platform' },
    ],
    logs: [],
    score: { funding: 27, activity: 20, thesis: 28, totalScore: 75 },
  },
  {
    id: 'cohere',
    name: 'Cohere',
    website: 'https://cohere.com',
    industry: ['AI', 'Enterprise'],
    stage: 'Series D',
    location: 'Toronto, Canada',
    description: 'Enterprise AI platform for natural language understanding, generation, and retrieval.',
    founded: '2019',
    employees: '300–500',
    fundingRounds: [
      { round: 'Series D', date: '2024-06', amount: '$500M', leadInvestor: 'PSP Investments' },
      { round: 'Series C', date: '2023-06', amount: '$270M', leadInvestor: 'Inovia Capital' },
    ],
    investors: ['PSP Investments', 'Inovia Capital', 'NVIDIA', 'Salesforce Ventures', 'Oracle'],
    signals: [
      { type: 'product', title: 'Command R+ launch', date: '2024-04', description: 'Enterprise-grade RAG-optimized LLM' },
      { type: 'partnership', title: 'Oracle Cloud partnership', date: '2024-07', description: 'Deployed on Oracle Cloud Infrastructure' },
    ],
    logs: [],
    score: { funding: 25, activity: 21, thesis: 30, totalScore: 76 },
  },
  {
    id: 'ramp',
    name: 'Ramp',
    website: 'https://ramp.com',
    industry: ['Fintech', 'Corporate Cards'],
    stage: 'Series D',
    location: 'New York, NY',
    description: 'Corporate card and spend management platform that helps companies save money and close books faster.',
    founded: '2019',
    employees: '500–1,000',
    fundingRounds: [
      { round: 'Series D', date: '2024-03', amount: '$150M', leadInvestor: 'Khosla Ventures' },
      { round: 'Series C', date: '2022-03', amount: '$200M', leadInvestor: 'Founders Fund' },
    ],
    investors: ['Khosla Ventures', 'Founders Fund', 'Thrive Capital', 'Stripe', 'Goldman Sachs'],
    signals: [
      { type: 'hiring', title: 'Product engineering growth', date: '2024-11', description: '30+ engineering roles posted' },
      { type: 'product', title: 'Ramp Intelligence', date: '2024-05', description: 'AI-powered spend insights and anomaly detection' },
    ],
    logs: [],
    score: { funding: 24, activity: 23, thesis: 25, totalScore: 72 },
  },
  {
    id: 'mercury',
    name: 'Mercury',
    website: 'https://mercury.com',
    industry: ['Fintech', 'Banking'],
    stage: 'Series B',
    location: 'San Francisco, CA',
    description: 'Banking platform built for startups, offering business checking, savings, and treasury management.',
    founded: '2017',
    employees: '400–600',
    fundingRounds: [
      { round: 'Series B', date: '2023-05', amount: '$100M', leadInvestor: 'Sequoia Capital' },
      { round: 'Series A', date: '2020-06', amount: '$20M', leadInvestor: 'Andreessen Horowitz' },
    ],
    investors: ['Sequoia Capital', 'Andreessen Horowitz', 'CRV', 'Coatue Management'],
    signals: [
      { type: 'product', title: 'Mercury Raise launched', date: '2024-08', description: 'Investor matching and fundraising tools for startups' },
      { type: 'blog', title: 'Startup banking report', date: '2024-06', description: 'Published comprehensive State of Startups report' },
    ],
    logs: [],
    score: { funding: 20, activity: 19, thesis: 22, totalScore: 61 },
  },
  {
    id: 'climeworks',
    name: 'Climeworks',
    website: 'https://climeworks.com',
    industry: ['Climate', 'Carbon Capture'],
    stage: 'Growth',
    location: 'Zurich, Switzerland',
    description: 'Direct air capture technology company removing CO2 from the atmosphere and storing it permanently underground.',
    founded: '2009',
    employees: '300–500',
    fundingRounds: [
      { round: 'Series G', date: '2024-04', amount: '$110M', leadInvestor: 'Partners Group' },
      { round: 'Series F', date: '2022-04', amount: '$650M', leadInvestor: 'GIC' },
    ],
    investors: ['Partners Group', 'GIC', 'John Doerr', 'Microsoft Climate Innovation Fund'],
    signals: [
      { type: 'product', title: 'Mammoth plant operational', date: '2024-05', description: 'World\'s largest direct air capture plant in Iceland' },
      { type: 'partnership', title: 'Microsoft carbon removal', date: '2024-01', description: '10,000 ton carbon removal agreement with Microsoft' },
    ],
    logs: [],
    score: { funding: 23, activity: 20, thesis: 32, totalScore: 75 },
  },
  {
    id: 'form-energy',
    name: 'Form Energy',
    website: 'https://formenergy.com',
    industry: ['Climate', 'Energy Storage'],
    stage: 'Series E',
    location: 'Somerville, MA',
    description: 'Developing iron-air batteries for multi-day energy storage to enable a fully renewable electric grid.',
    founded: '2017',
    employees: '500–800',
    fundingRounds: [
      { round: 'Series E', date: '2022-10', amount: '$450M', leadInvestor: 'T. Rowe Price' },
      { round: 'Series D', date: '2021-08', amount: '$200M', leadInvestor: 'ArcelorMittal' },
    ],
    investors: ['T. Rowe Price', 'ArcelorMittal', 'Breakthrough Energy Ventures', 'MIT'],
    signals: [
      { type: 'hiring', title: 'Manufacturing expansion', date: '2024-10', description: 'Hiring for West Virginia factory production' },
      { type: 'product', title: 'Iron-air battery demos', date: '2024-03', description: 'Successful multi-day storage demonstration results' },
    ],
    logs: [],
    score: { funding: 22, activity: 18, thesis: 30, totalScore: 70 },
  },
  {
    id: 'tempus',
    name: 'Tempus AI',
    website: 'https://tempus.com',
    industry: ['HealthTech', 'Precision Medicine'],
    stage: 'Public',
    location: 'Chicago, IL',
    description: 'Technology company advancing precision medicine through AI-driven genomic sequencing and data analytics.',
    founded: '2015',
    employees: '2,000+',
    fundingRounds: [
      { round: 'IPO', date: '2024-06', amount: '$410M', leadInvestor: 'Morgan Stanley' },
      { round: 'Series G', date: '2022-04', amount: '$275M', leadInvestor: 'SoftBank' },
    ],
    investors: ['SoftBank', 'Google Ventures', 'NEA', 'Franklin Templeton'],
    signals: [
      { type: 'funding', title: 'IPO completed', date: '2024-06', description: 'Listed on Nasdaq at $6.1B valuation' },
      { type: 'product', title: 'Tempus One platform', date: '2024-09', description: 'AI-powered clinical assistant for oncologists' },
    ],
    logs: [],
    score: { funding: 26, activity: 22, thesis: 28, totalScore: 76 },
  },
  {
    id: 'wiz',
    name: 'Wiz',
    website: 'https://wiz.io',
    industry: ['Cybersecurity', 'Cloud Security'],
    stage: 'Series D',
    location: 'New York, NY',
    description: 'Cloud security platform providing full-stack visibility and risk assessment across multi-cloud environments.',
    founded: '2020',
    employees: '1,000+',
    fundingRounds: [
      { round: 'Series D', date: '2024-05', amount: '$1B', leadInvestor: 'Andreessen Horowitz' },
      { round: 'Series C', date: '2022-10', amount: '$300M', leadInvestor: 'Lightspeed' },
    ],
    investors: ['Andreessen Horowitz', 'Lightspeed', 'Greenoaks', 'Index Ventures', 'Sequoia'],
    signals: [
      { type: 'hiring', title: 'Rapid headcount growth', date: '2024-12', description: '200+ open roles globally' },
      { type: 'product', title: 'Wiz Code launch', date: '2024-06', description: 'Cloud security shifted left to code scanning' },
      { type: 'funding', title: '$1B Series D', date: '2024-05', description: 'Raised at $12B valuation' },
    ],
    logs: [
      { timestamp: '2025-01-10T09:00:00Z', provider: 'VentureLens AI', status: 'success', sources: ['wiz.io', 'wiz.io/blog', 'wiz.io/careers'] },
    ],
    score: { funding: 30, activity: 28, thesis: 34, totalScore: 92 },
  },
  {
    id: 'vercel',
    name: 'Vercel',
    website: 'https://vercel.com',
    industry: ['DevTools', 'Cloud Platform'],
    stage: 'Series D',
    location: 'San Francisco, CA',
    description: 'Frontend cloud platform enabling developers to build and deploy web applications with zero configuration.',
    founded: '2015',
    employees: '500–800',
    fundingRounds: [
      { round: 'Series D', date: '2024-05', amount: '$250M', leadInvestor: 'Accel' },
      { round: 'Series C', date: '2021-11', amount: '$150M', leadInvestor: 'GIC' },
    ],
    investors: ['Accel', 'GIC', 'Bedrock Capital', 'Tiger Global', 'Andreessen Horowitz'],
    signals: [
      { type: 'product', title: 'Next.js 15 released', date: '2024-10', description: 'Major framework update with React 19 support' },
      { type: 'blog', title: 'AI SDK 4.0', date: '2024-11', description: 'Open-source toolkit for AI-powered applications' },
    ],
    logs: [],
    score: { funding: 24, activity: 24, thesis: 26, totalScore: 74 },
  },
  {
    id: 'railway',
    name: 'Railway',
    website: 'https://railway.app',
    industry: ['DevTools', 'Infrastructure'],
    stage: 'Series B',
    location: 'San Francisco, CA',
    description: 'Infrastructure platform for deploying applications, databases, and services with instant setup and scaling.',
    founded: '2020',
    employees: '50–100',
    fundingRounds: [
      { round: 'Series B', date: '2024-01', amount: '$40M', leadInvestor: 'Redpoint Ventures' },
      { round: 'Series A', date: '2022-01', amount: '$20M', leadInvestor: 'Valar Ventures' },
    ],
    investors: ['Redpoint Ventures', 'Valar Ventures', 'Y Combinator', 'AngelPad'],
    signals: [
      { type: 'product', title: 'Railway Metal launch', date: '2024-08', description: 'Bare-metal GPU instances for AI workloads' },
      { type: 'hiring', title: 'Platform engineering roles', date: '2024-06', description: '10+ infrastructure engineering positions' },
    ],
    logs: [],
    score: { funding: 18, activity: 19, thesis: 24, totalScore: 61 },
  },
  {
    id: 'linear',
    name: 'Linear',
    website: 'https://linear.app',
    industry: ['SaaS', 'Project Management'],
    stage: 'Series B',
    location: 'San Francisco, CA',
    description: 'Modern issue tracking and project management tool built for high-performance software teams.',
    founded: '2019',
    employees: '80–120',
    fundingRounds: [
      { round: 'Series B', date: '2022-03', amount: '$35M', leadInvestor: 'Accel' },
      { round: 'Series A', date: '2021-06', amount: '$16M', leadInvestor: 'Sequoia Capital' },
    ],
    investors: ['Accel', 'Sequoia Capital', 'Y Combinator', 'Marc Benioff'],
    signals: [
      { type: 'product', title: 'Linear Asks launch', date: '2024-09', description: 'Integrated customer feedback into project management' },
      { type: 'blog', title: 'Quality principles blog', date: '2024-07', description: 'Published influential piece on software craftsmanship' },
    ],
    logs: [],
    score: { funding: 16, activity: 22, thesis: 26, totalScore: 64 },
  },
  {
    id: 'figure-ai',
    name: 'Figure AI',
    website: 'https://figure.ai',
    industry: ['Robotics', 'AI'],
    stage: 'Series B',
    location: 'Sunnyvale, CA',
    description: 'Building autonomous humanoid robots for commercial use in logistics, manufacturing, and retail.',
    founded: '2022',
    employees: '200–400',
    fundingRounds: [
      { round: 'Series B', date: '2024-02', amount: '$675M', leadInvestor: 'Microsoft' },
    ],
    investors: ['Microsoft', 'NVIDIA', 'Jeff Bezos', 'OpenAI', 'Intel Capital', 'Samsung'],
    signals: [
      { type: 'product', title: 'Figure 02 demo', date: '2024-08', description: 'Humanoid robot performing warehouse tasks autonomously' },
      { type: 'partnership', title: 'BMW partnership', date: '2024-01', description: 'Deploying robots in BMW manufacturing facility' },
      { type: 'hiring', title: 'Robotics engineers', date: '2024-10', description: '40+ roles in hardware and AI engineering' },
    ],
    logs: [],
    score: { funding: 27, activity: 25, thesis: 32, totalScore: 84 },
  },
  {
    id: 'indigo-ag',
    name: 'Indigo Agriculture',
    website: 'https://indigoag.com',
    industry: ['AgTech', 'Sustainability'],
    stage: 'Series S',
    location: 'Boston, MA',
    description: 'Agricultural technology company leveraging microbiology and carbon markets to improve farming sustainability.',
    founded: '2014',
    employees: '800–1,200',
    fundingRounds: [
      { round: 'Series S', date: '2022-08', amount: '$300M', leadInvestor: 'Flagship Pioneering' },
      { round: 'Series F', date: '2020-07', amount: '$200M', leadInvestor: 'The Investment Fund for Foundations' },
    ],
    investors: ['Flagship Pioneering', 'Baillie Gifford', 'Alaska Permanent Fund', 'FedEx'],
    signals: [
      { type: 'product', title: 'Carbon marketplace growth', date: '2024-04', description: 'Enrolled 30M+ acres in carbon credit program' },
      { type: 'blog', title: 'Sustainability report', date: '2024-06', description: 'Published annual impact and sustainability report' },
    ],
    logs: [],
    score: { funding: 19, activity: 15, thesis: 24, totalScore: 58 },
  },
];

export function getCompanyById(id: string): Company | undefined {
  return companies.find(c => c.id === id);
}

export function getAllIndustries(): string[] {
  const set = new Set<string>();
  companies.forEach(c => c.industry.forEach(i => set.add(i)));
  return Array.from(set).sort();
}

export function getAllStages(): string[] {
  const set = new Set<string>();
  companies.forEach(c => set.add(c.stage));
  return Array.from(set).sort();
}

export function getAllLocations(): string[] {
  const set = new Set<string>();
  companies.forEach(c => set.add(c.location));
  return Array.from(set).sort();
}

export const ENRICHMENT_DATA: Record<string, { summary: string; whatTheyDo: string[]; keywords: string[]; signals: string[] }> = {
  anthropic: {
    summary: 'Anthropic is an AI safety company focused on building reliable, interpretable, and steerable AI systems. Their flagship product Claude is used by millions for writing, analysis, and coding tasks.',
    whatTheyDo: ['Build large language models (Claude family)', 'Research AI alignment and safety techniques', 'Develop Constitutional AI training methods', 'Provide enterprise API access'],
    keywords: ['AI safety', 'LLM', 'Constitutional AI', 'Claude', 'RLHF', 'interpretability'],
    signals: ['Aggressive hiring in ML research', 'Rapid model iteration cadence', 'Strong enterprise adoption signals'],
  },
  wiz: {
    summary: 'Wiz provides a cloud security platform offering agentless full-stack visibility across AWS, Azure, and GCP. Fastest cybersecurity company to reach $100M ARR.',
    whatTheyDo: ['Cloud security posture management (CSPM)', 'Vulnerability scanning across cloud workloads', 'Container and Kubernetes security', 'Code-to-cloud security'],
    keywords: ['CNAPP', 'cloud security', 'CSPM', 'agentless', 'multi-cloud', 'Kubernetes'],
    signals: ['Hypergrowth revenue trajectory', 'Major enterprise contract wins', 'Acquisition interest from Google'],
  },
  'figure-ai': {
    summary: 'Figure AI is developing general-purpose humanoid robots powered by AI for commercial deployment in logistics, manufacturing, and retail environments.',
    whatTheyDo: ['Design and manufacture humanoid robots', 'Develop AI-powered autonomous navigation', 'Build manipulation and dexterity systems', 'Deploy robots in commercial settings'],
    keywords: ['humanoid robots', 'autonomous systems', 'manipulation', 'warehouse automation', 'embodied AI'],
    signals: ['BMW pilot deployment underway', 'Massive funding from top-tier tech investors', 'Rapid prototype iteration'],
  },
};
