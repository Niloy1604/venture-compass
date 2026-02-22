import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import FundingTimeline from '@/components/FundingTimeline';
import SignalsTimeline from '@/components/SignalsTimeline';
import AnalysisLogs from '@/components/AnalysisLogs';
import CompanyNotes from '@/components/CompanyNotes';
import { getCompanyById, ENRICHMENT_DATA } from '@/data/companies';
import { useLists } from '@/hooks/use-lists';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, ExternalLink, MapPin, Calendar, Users, Sparkles, Bookmark, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Enrichment, EnrichmentLog } from '@/types/company';

export default function CompanyProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const company = getCompanyById(id || '');
  const { lists, addToList, createList } = useLists();
  const [enriching, setEnriching] = useState(false);
  const [enrichment, setEnrichment] = useState<Enrichment | undefined>(company?.enrichment);
  const [extraLogs, setExtraLogs] = useState<EnrichmentLog[]>([]);

  if (!company) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-display font-bold mb-2">Company Not Found</h1>
          <Button variant="outline" onClick={() => navigate('/discover')}>Back to Discover</Button>
        </div>
      </Layout>
    );
  }

  const handleEnrich = async () => {
    setEnriching(true);
    toast.info('Enriching company data...');
    await new Promise(r => setTimeout(r, 2000));

    const data = ENRICHMENT_DATA[company.id];
    if (data) {
      setEnrichment({
        ...data,
        sources: [
          { url: company.website, scrapedAt: new Date().toISOString() },
          { url: `${company.website}/about`, scrapedAt: new Date().toISOString() },
        ],
      });
      setExtraLogs(prev => [{
        timestamp: new Date().toISOString(),
        provider: 'VentureLens AI',
        status: 'success' as const,
        sources: [company.website, `${company.website}/about`, `${company.website}/careers`],
      }, ...prev]);
      toast.success('Enrichment complete!');
    } else {
      setExtraLogs(prev => [{
        timestamp: new Date().toISOString(),
        provider: 'VentureLens AI',
        status: 'partial' as const,
        sources: [company.website],
      }, ...prev]);
      toast.warning('Partial enrichment — limited data available for this company.');
    }
    setEnriching(false);
  };

  const handleSaveToList = (listId: string) => {
    if (listId === '__new__') {
      const name = prompt('New list name:');
      if (name) {
        const list = createList(name);
        addToList(list.id, company.id);
        toast.success(`Saved to "${name}"`);
      }
    } else {
      addToList(listId, company.id);
      toast.success('Saved to list');
    }
  };

  const allLogs = [...extraLogs, ...company.logs];

  return (
    <Layout>
      <div className="container py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-xl bg-secondary flex items-center justify-center font-display text-2xl font-bold text-primary shrink-0">
                  {company.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-display font-bold">{company.name}</h1>
                  <p className="text-muted-foreground mt-1">{company.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Globe className="h-3.5 w-3.5" /> {company.website.replace('https://', '')}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {company.location}</span>
                    {company.founded && <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Founded {company.founded}</span>}
                    {company.employees && <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {company.employees}</span>}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {company.industry.map(i => (
                      <Badge key={i} variant="outline" className="border-primary/30 text-primary">{i}</Badge>
                    ))}
                    <Badge variant="secondary">{company.stage}</Badge>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex gap-2">
              <Button onClick={handleEnrich} disabled={enriching} className="glow-primary">
                <Sparkles className="h-4 w-4 mr-1" />
                {enriching ? 'Enriching...' : 'Enrich'}
              </Button>
              <Select onValueChange={handleSaveToList}>
                <SelectTrigger className="w-[180px] bg-secondary">
                  <Bookmark className="h-4 w-4 mr-1" />
                  <SelectValue placeholder="Save to List" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__new__">+ New List</SelectItem>
                  {lists.map(l => (
                    <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-secondary border border-border/50 w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="funding">Funding</TabsTrigger>
                <TabsTrigger value="signals">Signals</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4 space-y-4">
                {enrichment ? (
                  <>
                    <div className="p-4 rounded-lg bg-card border border-border/50">
                      <h3 className="font-display font-semibold mb-2">AI Summary</h3>
                      <p className="text-sm text-muted-foreground">{enrichment.summary}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card border border-border/50">
                      <h3 className="font-display font-semibold mb-2">What They Do</h3>
                      <ul className="space-y-1">
                        {enrichment.whatTheyDo.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-card border border-border/50">
                      <h3 className="font-display font-semibold mb-2">Keywords</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {enrichment.keywords.map(kw => (
                          <Badge key={kw} variant="secondary" className="text-xs">{kw}</Badge>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 rounded-lg bg-card border border-border/50">
                    <Sparkles className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">Click <strong>Enrich</strong> to generate AI-powered company intelligence.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="funding" className="mt-4">
                <FundingTimeline rounds={company.fundingRounds} investors={company.investors} />
              </TabsContent>

              <TabsContent value="signals" className="mt-4">
                <SignalsTimeline signals={company.signals} />
              </TabsContent>

              <TabsContent value="analysis" className="mt-4">
                <AnalysisLogs logs={allLogs} />
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <CompanyNotes companyId={company.id} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <ScoreBreakdown score={company.score} />
            <div className="p-4 rounded-lg bg-card border border-border/50">
              <h3 className="font-display font-semibold mb-3 text-sm">Key Investors</h3>
              <div className="space-y-2">
                {company.investors.slice(0, 6).map(inv => (
                  <div key={inv} className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-md bg-secondary flex items-center justify-center text-xs font-bold text-primary">
                      {inv.charAt(0)}
                    </div>
                    <span className="text-sm">{inv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
