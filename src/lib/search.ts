import { Company } from '@/types/company';

interface ParsedQuery {
  industries: string[];
  stages: string[];
  locations: string[];
  keywords: string[];
}

const INDUSTRY_MAP: Record<string, string> = {
  ai: 'AI', 'artificial intelligence': 'AI', ml: 'AI', 'machine learning': 'AI',
  fintech: 'Fintech', finance: 'Fintech', banking: 'Banking',
  climate: 'Climate', cleantech: 'Climate', 'carbon capture': 'Carbon Capture', energy: 'Energy Storage',
  health: 'HealthTech', healthtech: 'HealthTech', biotech: 'Precision Medicine',
  cyber: 'Cybersecurity', cybersecurity: 'Cybersecurity', security: 'Cloud Security',
  devtools: 'DevTools', developer: 'DevTools', infrastructure: 'Infrastructure',
  saas: 'SaaS', software: 'SaaS',
  agtech: 'AgTech', agriculture: 'AgTech',
  robotics: 'Robotics', robots: 'Robotics',
  'open source': 'Open Source',
};

const STAGE_MAP: Record<string, string> = {
  seed: 'Seed', 'pre-seed': 'Pre-Seed',
  'series a': 'Series A', 'series b': 'Series B', 'series c': 'Series C',
  'series d': 'Series D', 'series e': 'Series E', 'series f': 'Series F',
  growth: 'Growth', public: 'Public', ipo: 'Public',
};

const LOCATION_KEYWORDS: Record<string, string> = {
  sf: 'San Francisco', 'san francisco': 'San Francisco',
  nyc: 'New York', 'new york': 'New York',
  london: 'London', paris: 'Paris', zurich: 'Zurich',
  boston: 'Boston', chicago: 'Chicago', toronto: 'Toronto',
  israel: 'Israel', 'tel aviv': 'Tel Aviv',
};

export function parseSearchQuery(query: string): ParsedQuery {
  const lower = query.toLowerCase().trim();
  const result: ParsedQuery = { industries: [], stages: [], locations: [], keywords: [] };

  for (const [key, val] of Object.entries(INDUSTRY_MAP)) {
    if (lower.includes(key)) result.industries.push(val);
  }
  for (const [key, val] of Object.entries(STAGE_MAP)) {
    if (lower.includes(key)) result.stages.push(val);
  }
  for (const [key, val] of Object.entries(LOCATION_KEYWORDS)) {
    if (lower.includes(key)) result.locations.push(val);
  }

  const words = lower.split(/\s+/).filter(w => w.length > 2);
  words.forEach(w => {
    if (!Object.keys(INDUSTRY_MAP).includes(w) && !Object.keys(STAGE_MAP).includes(w) && !Object.keys(LOCATION_KEYWORDS).includes(w)) {
      const common = ['companies', 'startups', 'startup', 'company', 'hiring', 'in', 'the', 'and', 'with', 'for'];
      if (!common.includes(w)) result.keywords.push(w);
    }
  });

  return result;
}

export function filterCompanies(
  allCompanies: Company[],
  query: string,
  industries: string[],
  stage: string,
  sortBy: string,
  sortOrder: 'asc' | 'desc',
): Company[] {
  let filtered = [...allCompanies];

  if (query) {
    const parsed = parseSearchQuery(query);
    if (parsed.industries.length) {
      filtered = filtered.filter(c => c.industry.some(i => parsed.industries.some(pi => i.toLowerCase().includes(pi.toLowerCase()))));
    }
    if (parsed.stages.length) {
      filtered = filtered.filter(c => parsed.stages.some(s => c.stage.toLowerCase().includes(s.toLowerCase())));
    }
    if (parsed.locations.length) {
      filtered = filtered.filter(c => parsed.locations.some(l => c.location.toLowerCase().includes(l.toLowerCase())));
    }
    if (parsed.keywords.length) {
      filtered = filtered.filter(c => {
        const text = `${c.name} ${c.description} ${c.industry.join(' ')}`.toLowerCase();
        return parsed.keywords.some(k => text.includes(k));
      });
    }
  }

  if (industries.length) {
    filtered = filtered.filter(c => c.industry.some(i => industries.includes(i)));
  }

  if (stage) {
    filtered = filtered.filter(c => c.stage === stage);
  }

  filtered.sort((a, b) => {
    let cmp = 0;
    if (sortBy === 'score') cmp = a.score.totalScore - b.score.totalScore;
    else if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
    else if (sortBy === 'funding') {
      const aTotal = a.fundingRounds.length;
      const bTotal = b.fundingRounds.length;
      cmp = aTotal - bTotal;
    }
    return sortOrder === 'desc' ? -cmp : cmp;
  });

  return filtered;
}
