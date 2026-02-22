import { FundingRound } from '@/types/company';
import { DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface FundingTimelineProps {
  rounds: FundingRound[];
  investors: string[];
}

export default function FundingTimeline({ rounds, investors }: FundingTimelineProps) {
  if (!rounds.length) {
    return <p className="text-muted-foreground text-sm py-8 text-center">No funding data available.</p>;
  }

  const totalRaised = rounds.reduce((sum, r) => {
    const num = parseFloat(r.amount.replace(/[^0-9.]/g, ''));
    const mult = r.amount.includes('B') ? 1000 : 1;
    return sum + num * mult;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-border/50">
        <DollarSign className="h-5 w-5 text-signal-positive" />
        <div>
          <p className="text-sm text-muted-foreground">Total Raised</p>
          <p className="font-display text-2xl font-bold text-signal-positive">
            ${totalRaised >= 1000 ? `${(totalRaised / 1000).toFixed(1)}B` : `${totalRaised}M`}
          </p>
        </div>
      </div>

      <div className="relative pl-8">
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border" />
        {rounds.map((round, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative mb-6 last:mb-0"
          >
            <div className="absolute -left-8 top-1 h-4 w-4 rounded-full bg-primary glow-primary" />
            <div className="p-4 rounded-lg bg-card border border-border/50">
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-semibold">{round.round}</span>
                <span className="text-sm text-muted-foreground">{round.date}</span>
              </div>
              <p className="text-xl font-display font-bold text-primary">{round.amount}</p>
              <p className="text-sm text-muted-foreground mt-1">Lead: {round.leadInvestor}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <h4 className="font-display font-semibold mb-3">All Investors</h4>
        <div className="flex flex-wrap gap-2">
          {investors.map(inv => (
            <span key={inv} className="px-3 py-1 rounded-full bg-secondary text-sm text-secondary-foreground">
              {inv}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
