import { useState } from 'react';
import { useNotes } from '@/hooks/use-lists';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompanyNotes({ companyId }: { companyId: string }) {
  const { user } = useAuth();
  const { notes, addNote, deleteNote } = useNotes(companyId);
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await addNote(text.trim());
      setText('');
    }
  };

  if (!user) {
    return (
      <div className="text-center py-8 rounded-lg bg-card border border-border/50">
        <LogIn className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground mb-3">Sign in to add notes about this company.</p>
        <Link to="/auth">
          <Button variant="outline" size="sm">
            <LogIn className="h-4 w-4 mr-1" /> Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a note about this company..."
          className="bg-secondary border-border/50 resize-none"
          rows={3}
        />
        <Button type="submit" size="sm" disabled={!text.trim()}>
          <Plus className="h-4 w-4 mr-1" />
          Add Note
        </Button>
      </form>

      {notes.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">No notes yet.</p>
      ) : (
        <div className="space-y-2">
          {notes.map(note => (
            <div key={note.id} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/50">
              <p className="flex-1 text-sm">{note.text}</p>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
