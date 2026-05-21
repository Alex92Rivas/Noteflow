export interface BaseNote {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note extends BaseNote {
  content: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ChecklistNote extends BaseNote {
  items: ChecklistItem[];
}

export interface IdeaNote extends BaseNote {
  tags: string[];
  color: string;
}

export type AnyNote = Note | ChecklistNote | IdeaNote;

export function isNote(note: AnyNote): note is Note {
  return 'content' in note;
}

export function isChecklistNote(note: AnyNote): note is ChecklistNote {
  return 'items' in note;
}

export function isIdeaNote(note: AnyNote): note is IdeaNote {
  return 'tags' in note;
}