import { useState, useEffect } from 'react';
import { NoteEntity } from '../../../domain/entities/NoteEntity';
import { NoteRepository } from '../../../data/repositories/NoteRepository';

/**
 * This ViewModel (Custom Hook) handles intermediate State and Business Logic.
 * By keeping this separate from HomeScreen, the UI file gets much cleaner!
 */
export const useNotesViewModel = () => {
  const [notes, setNotes] = useState<NoteEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Note dialog state
  const [visible, setVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const loadNotes = async () => {
    setLoading(true);
    const fetchedNotes = await NoteRepository.fetchNotes();
    setNotes(fetchedNotes);
    setLoading(false);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const openAddNoteDialog = () => {
    setEditingNoteId(null);
    setNoteTitle('');
    setNoteContent('');
    setTitleError('');
    setContentError('');
    setVisible(true);
  };

  const openEditNoteDialog = (note: NoteEntity) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setTitleError('');
    setContentError('');
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
  };

  const generateRandomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  const saveNote = async () => {
    let hasError = false;
    if (!noteTitle.trim()) {
      setTitleError('Title is required');
      hasError = true;
    } else setTitleError('');
    
    if (!noteContent.trim()) {
      setContentError('Content is required');
      hasError = true;
    } else setContentError('');

    if (hasError) return;

    if (editingNoteId) {
      await NoteRepository.updateNote({
        id: editingNoteId,
        title: noteTitle,
        content: noteContent,
        dateTime: Date.now().toString(),
      });
    } else {
      await NoteRepository.createNote({
        id: generateRandomString(11),
        title: noteTitle,
        content: noteContent,
        dateTime: Date.now().toString(),
      });
    }
    
    closeDialog();
    loadNotes();
  };

  const deleteNote = async (id: string) => {
    await NoteRepository.deleteNote(id);
    loadNotes();
  };

  return {
    notes,
    loading,
    visible,
    noteTitle,
    noteContent,
    titleError,
    contentError,
    editingNoteId,
    setNoteTitle,
    setNoteContent,
    setTitleError,
    setContentError,
    openAddNoteDialog,
    openEditNoteDialog,
    closeDialog,
    saveNote,
    deleteNote,
  };
};
