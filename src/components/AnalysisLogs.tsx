import { EnrichmentLog } from '@/types/company';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const STATUS_CONFIG = {
  success: { icon: CheckCircle, class: 'text-signal-positive' },
  failed: { icon: XCircle, class: 'text-destructive' },
  partial: { icon: AlertCircle, class: 'text-signal-warning' },
};

export default function AnalysisLogs({ logs }: { logs: EnrichmentLog[] }) {
  if (!logs.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm">No enrichment events yet.</p>
        <p className="text-muted-foreground text-xs mt-1">Click "Enrich" to trigger AI analysis.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log, idx) => {
        const config = STATUS_CONFIG[log.status];
        const Icon = config.icon;
        return (
          <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/50">
            <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${config.class}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{log.provider}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {new Date(log.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {log.sources.map(src => (
                  <span key={src} className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground">
                    {src}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
