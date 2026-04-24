import { NoteEntity } from '../../domain/entities/NoteEntity';

const API_BASE_URL = 'http://11.11.10.45:3000/notes';

/**
 * NoteRepository handles all data operations.
 * It encapsulates the API calls so the UI doesn't know about them.
 * This is beginner-friendly Clean Architecture.
 */
export class NoteRepository {
  static async fetchNotes(): Promise<NoteEntity[]> {
    try {
      const result = await fetch(API_BASE_URL);
      const data = await result.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Failed to fetch notes', error);
      return [];
    }
  }

  static async createNote(note: NoteEntity): Promise<void> {
    try {
      await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
    } catch (error) {
      console.error('Failed to create note', error);
    }
  }

  static async updateNote(note: NoteEntity): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/${note.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
    } catch (error) {
      console.error('Failed to update note', error);
    }
  }

  static async deleteNote(id: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to delete note', error);
    }
  }
}
