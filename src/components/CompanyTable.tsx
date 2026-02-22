import { useNavigate } from 'react-router-dom';
import { Company } from '@/types/company';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExternalLink, TrendingUp, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompanyTableProps {
  companies: Company[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function CompanyTable({ companies, currentPage, itemsPerPage, onPageChange }: CompanyTableProps) {
  const navigate = useNavigate();
  const totalPages = Math.ceil(companies.length / itemsPerPage);
  const paginated = companies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const scoreColor = (score: number) => {
    if (score >= 80) return 'text-signal-positive';
    if (score >= 60) return 'text-signal-warning';
    return 'text-muted-foreground';
  };

  return (
    <div>
      <div className="rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="font-display">Company</TableHead>
              <TableHead className="font-display">Industry</TableHead>
              <TableHead className="font-display">Stage</TableHead>
              <TableHead className="font-display">Location</TableHead>
              <TableHead className="font-display text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((company, idx) => (
              <motion.tr
                key={company.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="cursor-pointer border-border/30 hover:bg-secondary/50 transition-colors"
                onClick={() => navigate(`/companies/${company.id}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center font-display text-sm font-bold text-primary">
                      {company.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ExternalLink className="h-3 w-3" />
                        {company.website.replace('https://', '')}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {company.industry.slice(0, 2).map(i => (
                      <Badge key={i} variant="outline" className="text-xs border-border/50">
                        {i}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {company.stage}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {company.location}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className={`flex items-center justify-end gap-1 font-display font-bold text-lg ${scoreColor(company.score.totalScore)}`}>
                    <TrendingUp className="h-4 w-4" />
                    {company.score.totalScore}
                  </span>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${
                currentPage === i + 1
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <p className="text-center text-sm text-muted-foreground mt-3">
        {companies.length} companies found
      </p>
    </div>
  );
}
