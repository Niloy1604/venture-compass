import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface SavedList {
  id: string;
  name: string;
  companyIds: string[];
  createdAt: string;
}

export interface Note {
  id: string;
  text: string;
  createdAt: string;
}

export function useLists() {
  const { user } = useAuth();
  const [lists, setLists] = useState<SavedList[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLists = useCallback(async () => {
    if (!user) { setLists([]); setLoading(false); return; }
    const { data: listsData } = await supabase
      .from('saved_lists')
      .select('id, name, created_at')
      .order('created_at', { ascending: false });

    if (!listsData) { setLoading(false); return; }

    const { data: companiesData } = await supabase
      .from('list_companies')
      .select('list_id, company_id');

    const mapped: SavedList[] = listsData.map(l => ({
      id: l.id,
      name: l.name,
      companyIds: (companiesData || []).filter(c => c.list_id === l.id).map(c => c.company_id),
      createdAt: l.created_at,
    }));
    setLists(mapped);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchLists(); }, [fetchLists]);

  const createList = useCallback(async (name: string) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from('saved_lists')
      .insert({ name, user_id: user.id })
      .select()
      .single();
    if (error || !data) return null;
    const newList: SavedList = { id: data.id, name: data.name, companyIds: [], createdAt: data.created_at };
    setLists(prev => [newList, ...prev]);
    return newList;
  }, [user]);

  const addToList = useCallback(async (listId: string, companyId: string) => {
    await supabase.from('list_companies').insert({ list_id: listId, company_id: companyId });
    setLists(prev => prev.map(l =>
      l.id === listId && !l.companyIds.includes(companyId)
        ? { ...l, companyIds: [...l.companyIds, companyId] }
        : l
    ));
  }, []);

  const removeFromList = useCallback(async (listId: string, companyId: string) => {
    await supabase.from('list_companies').delete().eq('list_id', listId).eq('company_id', companyId);
    setLists(prev => prev.map(l =>
      l.id === listId
        ? { ...l, companyIds: l.companyIds.filter(id => id !== companyId) }
        : l
    ));
  }, []);

  const deleteList = useCallback(async (listId: string) => {
    await supabase.from('saved_lists').delete().eq('id', listId);
    setLists(prev => prev.filter(l => l.id !== listId));
  }, []);

  return { lists, loading, createList, addToList, removeFromList, deleteList };
}

export function useNotes(companyId: string) {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    if (!user) { setNotes([]); setLoading(false); return; }
    const { data } = await supabase
      .from('notes')
      .select('id, text, created_at')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });
    setNotes((data || []).map(n => ({ id: n.id, text: n.text, createdAt: n.created_at })));
    setLoading(false);
  }, [user, companyId]);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  const addNote = useCallback(async (text: string) => {
    if (!user) return;
    const { data } = await supabase
      .from('notes')
      .insert({ user_id: user.id, company_id: companyId, text })
      .select()
      .single();
    if (data) {
      setNotes(prev => [{ id: data.id, text: data.text, createdAt: data.created_at }, ...prev]);
    }
  }, [user, companyId]);

  const deleteNote = useCallback(async (noteId: string) => {
    await supabase.from('notes').delete().eq('id', noteId);
    setNotes(prev => prev.filter(n => n.id !== noteId));
  }, []);

  return { notes, loading, addNote, deleteNote };
}
