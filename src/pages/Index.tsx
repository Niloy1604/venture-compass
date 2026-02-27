import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { companies } from '@/data/companies';
import { Zap, Compass, Sparkles, BarChart3, List } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index() {
  const navigate = useNavigate();
  const topCompanies = [...companies].sort((a, b) => b.score.totalScore - a.score.totalScore).slice(0, 5);

  const features = [
    { icon: Compass, title: 'Discover', desc: 'Filter by industry, stage, and thesis match' },
    { icon: Sparkles, title: 'AI Enrichment', desc: 'One-click company intelligence powered by AI' },
    { icon: BarChart3, title: 'Signal Scoring', desc: 'Rank companies by funding, activity, and thesis fit' },
    { icon: List, title: 'Lists & Export', desc: 'Save, organize, and export your deal pipeline' },
  ];

  return (
    <Layout>
      <div className="container py-16">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-3.5 w-3.5" /> Thesis-Driven Venture Sourcing
          </div>
          <h1 className="text-5xl font-display font-bold leading-tight mb-4">
            Intelligence for
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, hsl(213, 94%, 55%), hsl(230, 90%, 65%))' }}> smarter deals</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Discover, enrich, analyze, and track high-potential companies with AI-powered signal intelligence.
          </p>
          <Button size="lg" onClick={() => navigate('/discover')} className="glow-primary text-base px-8">
            <Compass className="h-5 w-5 mr-2" />
            Start Discovering
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
            >
              <f.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-display font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div>
          <h2 className="font-display text-xl font-bold mb-4 text-center">Top Scoring Companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {topCompanies.map((c, i) => (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                onClick={() => navigate(`/companies/${c.id}`)}
                className="p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 text-left transition-all hover:glow-primary"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center font-display text-sm font-bold text-primary">
                    {c.name.charAt(0)}
                  </div>
                  <span className="font-medium text-sm truncate">{c.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{c.industry[0]}</span>
                  <span className="font-display font-bold text-signal-positive">{c.score.totalScore}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
