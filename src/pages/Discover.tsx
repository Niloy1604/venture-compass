import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import FilterBar from '@/components/FilterBar';
import CompanyTable from '@/components/CompanyTable';
import { companies } from '@/data/companies';
import { filterCompanies } from '@/lib/search';
import { Compass } from 'lucide-react';

export default function Discover() {
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedStage, setSelectedStage] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => { setCurrentPage(1); }, [queryFromUrl, selectedIndustries, selectedStage, sortBy]);

  const toggleIndustry = (ind: string) => {
    setSelectedIndustries(prev =>
      prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind]
    );
  };

  const filtered = useMemo(
    () => filterCompanies(companies, queryFromUrl, selectedIndustries, selectedStage === 'all' ? '' : selectedStage, sortBy, 'desc'),
    [queryFromUrl, selectedIndustries, selectedStage, sortBy],
  );

  return (
    <Layout>
      <div className="container py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Compass className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-display font-bold">Discover</h1>
            <p className="text-sm text-muted-foreground">
              {queryFromUrl ? `Results for "${queryFromUrl}"` : 'Explore thesis-driven venture opportunities'}
            </p>
          </div>
        </div>

        <FilterBar
          selectedIndustries={selectedIndustries}
          onToggleIndustry={toggleIndustry}
          selectedStage={selectedStage}
          onStageChange={setSelectedStage}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <CompanyTable
          companies={filtered}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </div>
    </Layout>
  );
}
