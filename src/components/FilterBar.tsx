import { getAllIndustries, getAllStages } from '@/data/companies';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface FilterBarProps {
  selectedIndustries: string[];
  onToggleIndustry: (industry: string) => void;
  selectedStage: string;
  onStageChange: (stage: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterBar({
  selectedIndustries, onToggleIndustry,
  selectedStage, onStageChange,
  sortBy, onSortChange,
}: FilterBarProps) {
  const industries = getAllIndustries();
  const stages = getAllStages();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {industries.map(ind => {
          const active = selectedIndustries.includes(ind);
          return (
            <Badge
              key={ind}
              variant={active ? 'default' : 'outline'}
              className={`cursor-pointer transition-all ${
                active ? 'bg-primary text-primary-foreground glow-primary' : 'hover:bg-secondary'
              }`}
              onClick={() => onToggleIndustry(ind)}
            >
              {ind}
              {active && <X className="ml-1 h-3 w-3" />}
            </Badge>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Select value={selectedStage} onValueChange={onStageChange}>
          <SelectTrigger className="w-[180px] bg-secondary border-border/50">
            <SelectValue placeholder="All Stages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {stages.map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px] bg-secondary border-border/50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="score">Score (High → Low)</SelectItem>
            <SelectItem value="name">Name (A → Z)</SelectItem>
            <SelectItem value="funding">Funding Rounds</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
