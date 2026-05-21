import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { notes as initialNotes } from "../constants/mockData";

export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};

type NotesState = {
  notes: Note[];
  getNoteById: (id: string) => Note | undefined;
  addNote: (title: string, content: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
  clearNotes: () => void;
};

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: initialNotes,

      getNoteById: (id: string) => {
        return get().notes.find((note) => note.id === id);
      },

      addNote: (title: string, content: string) => {
        const newNote: Note = {
          id: Date.now().toString(),
          title,
          content,
          updatedAt: new Date().toLocaleDateString("es-ES"),
        };

        set((state) => ({
          notes: [newNote, ...state.notes],
        }));
      },

      updateNote: (id: string, title: string, content: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  title,
                  content,
                  updatedAt: new Date().toLocaleDateString("es-ES"),
                }
              : note
          ),
        }));
      },

      deleteNote: (id: string) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },

      clearNotes: () => {
        set({
          notes: initialNotes,
        });
      },
    }),
    {
      name: "noteflow-notes-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
