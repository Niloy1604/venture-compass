import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useLists } from '@/hooks/use-lists';
import { useAuth } from '@/contexts/AuthContext';
import { getCompanyById } from '@/data/companies';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Trash2, Download, List, ExternalLink, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ListsPage() {
  const { user } = useAuth();
  const { lists, createList, removeFromList, deleteList } = useLists();
  const [newListName, setNewListName] = useState('');
  const navigate = useNavigate();

  if (!user) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <List className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="text-2xl font-display font-bold mb-2">Sign in to manage lists</h1>
          <p className="text-muted-foreground mb-6">Create and organize your deal pipeline with saved lists.</p>
          <Link to="/auth">
            <Button><LogIn className="h-4 w-4 mr-2" /> Sign In</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      await createList(newListName.trim());
      setNewListName('');
      toast.success('List created');
    }
  };

  const handleExport = (listId: string, format: 'csv' | 'json') => {
    const list = lists.find(l => l.id === listId);
    if (!list) return;
    const companiesData = list.companyIds.map(id => getCompanyById(id)).filter(Boolean);

    let content: string;
    let mime: string;
    let ext: string;

    if (format === 'csv') {
      const header = 'Name,Website,Industry,Stage,Location,Score\n';
      const rows = companiesData.map(c => `"${c!.name}","${c!.website}","${c!.industry.join('; ')}","${c!.stage}","${c!.location}",${c!.score.totalScore}`).join('\n');
      content = header + rows;
      mime = 'text/csv';
      ext = 'csv';
    } else {
      content = JSON.stringify(companiesData, null, 2);
      mime = 'application/json';
      ext = 'json';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${list.name}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported as ${ext.toUpperCase()}`);
  };

  return (
    <Layout>
      <div className="container py-8 space-y-6">
        <div className="flex items-center gap-3">
          <List className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-display font-bold">Lists</h1>
            <p className="text-sm text-muted-foreground">Organize and export your sourced companies</p>
          </div>
        </div>

        <form onSubmit={handleCreate} className="flex gap-2 max-w-md">
          <Input
            value={newListName}
            onChange={e => setNewListName(e.target.value)}
            placeholder="New list name..."
            className="bg-secondary border-border/50"
          />
          <Button type="submit" disabled={!newListName.trim()}>
            <Plus className="h-4 w-4 mr-1" /> Create
          </Button>
        </form>

        {lists.length === 0 ? (
          <div className="text-center py-16">
            <List className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No lists yet. Create one to start saving companies.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {lists.map((list, idx) => (
              <motion.div
                key={list.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-5 rounded-lg bg-card border border-border/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold">{list.name}</h3>
                    <p className="text-xs text-muted-foreground">{list.companyIds.length} companies · Created {new Date(list.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => handleExport(list.id, 'csv')} disabled={!list.companyIds.length}>
                      <Download className="h-3.5 w-3.5 mr-1" /> CSV
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleExport(list.id, 'json')} disabled={!list.companyIds.length}>
                      <Download className="h-3.5 w-3.5 mr-1" /> JSON
                    </Button>
                    <Button size="sm" variant="ghost" onClick={async () => { await deleteList(list.id); toast.success('List deleted'); }}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                </div>

                {list.companyIds.length > 0 && (
                  <div className="space-y-2">
                    {list.companyIds.map(cId => {
                      const c = getCompanyById(cId);
                      if (!c) return null;
                      return (
                        <div key={cId} className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
                          <button
                            onClick={() => navigate(`/companies/${c.id}`)}
                            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                          >
                            {c.name}
                            <ExternalLink className="h-3 w-3" />
                          </button>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">{c.stage}</Badge>
                            <button
                              onClick={async () => { await removeFromList(list.id, cId); toast.success('Removed'); }}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
