import { Signal } from '@/types/company';
import { Users, FileText, DollarSign, Rocket, Code, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

const SIGNAL_ICONS: Record<Signal['type'], typeof Users> = {
  hiring: Users,
  blog: FileText,
  funding: DollarSign,
  product: Rocket,
  api: Code,
  partnership: Handshake,
};

const SIGNAL_COLORS: Record<Signal['type'], string> = {
  hiring: 'text-signal-positive bg-signal-positive/10',
  blog: 'text-signal-info bg-signal-info/10',
  funding: 'text-signal-warning bg-signal-warning/10',
  product: 'text-primary bg-primary/10',
  api: 'text-accent bg-accent/10',
  partnership: 'text-signal-positive bg-signal-positive/10',
};

export default function SignalsTimeline({ signals }: { signals: Signal[] }) {
  if (!signals.length) {
    return <p className="text-muted-foreground text-sm py-8 text-center">No signals detected yet.</p>;
  }

  return (
    <div className="space-y-3">
      {signals.map((signal, idx) => {
        const Icon = SIGNAL_ICONS[signal.type];
        const colorClass = SIGNAL_COLORS[signal.type];
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/50"
          >
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-medium text-sm">{signal.title}</h4>
                <span className="text-xs text-muted-foreground shrink-0">{signal.date}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{signal.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
