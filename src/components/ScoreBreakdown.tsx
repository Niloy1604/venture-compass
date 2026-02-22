import { ScoreBreakdown as ScoreType } from '@/types/company';
import { motion } from 'framer-motion';

interface ScoreBreakdownProps {
  score: ScoreType;
}

export default function ScoreBreakdown({ score }: ScoreBreakdownProps) {
  const scoreColor = score.totalScore >= 80 ? 'text-signal-positive' : score.totalScore >= 60 ? 'text-signal-warning' : 'text-muted-foreground';
  const barColor = (val: number) => val >= 25 ? 'bg-signal-positive' : val >= 18 ? 'bg-signal-warning' : 'bg-muted-foreground';

  const categories = [
    { label: 'Funding', value: score.funding, max: 30 },
    { label: 'Activity', value: score.activity, max: 30 },
    { label: 'Thesis Match', value: score.thesis, max: 40 },
  ];

  return (
    <div className="p-4 rounded-lg bg-card border border-border/50">
      <div className="text-center mb-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">Signal Score</p>
        <p className={`font-display text-4xl font-bold ${scoreColor}`}>{score.totalScore}</p>
      </div>
      <div className="space-y-3">
        {categories.map(cat => (
          <div key={cat.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{cat.label}</span>
              <span className="font-medium">{cat.value}/{cat.max}</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${barColor(cat.value)}`}
                initial={{ width: 0 }}
                animate={{ width: `${(cat.value / cat.max) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
