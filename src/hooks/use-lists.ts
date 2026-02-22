import { useState, useEffect, useCallback } from 'react';
import { SavedList, Note } from '@/types/company';

const LISTS_KEY = 'venturelens-lists';
const NOTES_KEY_PREFIX = 'venturelens-notes-';

export function useLists() {
  const [lists, setLists] = useState<SavedList[]>(() => {
    try {
      const stored = localStorage.getItem(LISTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(LISTS_KEY, JSON.stringify(lists));
  }, [lists]);

  const createList = useCallback((name: string) => {
    const newList: SavedList = {
      id: crypto.randomUUID(),
      name,
      companyIds: [],
      createdAt: new Date().toISOString(),
    };
    setLists(prev => [...prev, newList]);
    return newList;
  }, []);

  const addToList = useCallback((listId: string, companyId: string) => {
    setLists(prev => prev.map(l =>
      l.id === listId && !l.companyIds.includes(companyId)
        ? { ...l, companyIds: [...l.companyIds, companyId] }
        : l
    ));
  }, []);

  const removeFromList = useCallback((listId: string, companyId: string) => {
    setLists(prev => prev.map(l =>
      l.id === listId
        ? { ...l, companyIds: l.companyIds.filter(id => id !== companyId) }
        : l
    ));
  }, []);

  const deleteList = useCallback((listId: string) => {
    setLists(prev => prev.filter(l => l.id !== listId));
  }, []);

  return { lists, createList, addToList, removeFromList, deleteList };
}

export function useNotes(companyId: string) {
  const key = NOTES_KEY_PREFIX + companyId;
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(notes));
  }, [key, notes]);

  const addNote = useCallback((text: string) => {
    const note: Note = { id: crypto.randomUUID(), text, createdAt: new Date().toISOString() };
    setNotes(prev => [note, ...prev]);
  }, []);

  const deleteNote = useCallback((noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  }, []);

  return { notes, addNote, deleteNote };
}
