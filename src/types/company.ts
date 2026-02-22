export interface FundingRound {
  round: string;
  date: string;
  amount: string;
  leadInvestor: string;
}

export interface Signal {
  type: 'hiring' | 'blog' | 'funding' | 'product' | 'api' | 'partnership';
  title: string;
  date: string;
  description: string;
}

export interface EnrichmentLog {
  timestamp: string;
  provider: string;
  status: 'success' | 'failed' | 'partial';
  sources: string[];
}

export interface ScoreBreakdown {
  funding: number;
  activity: number;
  thesis: number;
  totalScore: number;
}

export interface Enrichment {
  summary: string;
  whatTheyDo: string[];
  keywords: string[];
  signals: string[];
  sources: { url: string; scrapedAt: string }[];
}

export interface Company {
  id: string;
  name: string;
  website: string;
  industry: string[];
  stage: string;
  location: string;
  description: string;
  founded?: string;
  employees?: string;
  fundingRounds: FundingRound[];
  investors: string[];
  signals: Signal[];
  logs: EnrichmentLog[];
  score: ScoreBreakdown;
  enrichment?: Enrichment;
}

export interface SavedList {
  id: string;
  name: string;
  companyIds: string[];
  createdAt: string;
}

export interface Note {
  id: string;
  text: string;
  createdAt: string;
}
