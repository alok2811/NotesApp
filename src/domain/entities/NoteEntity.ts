/**
 * NoteEntity represents the core data model of our application for a Note.
 * In Clean Architecture, Entities are independent of any other layer.
 */
export interface NoteEntity {
  id: string;
  title: string;
  content: string;
  dateTime: string;
}
