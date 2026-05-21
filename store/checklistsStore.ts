import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { checklists as initialChecklists } from "../constants/mockData";

export type ChecklistItem = {
  id: string;
  text: string;
  completed: boolean;
};

export type Checklist = {
  id: string;
  title: string;
  updatedAt: string;
  items: ChecklistItem[];
};

type ChecklistsState = {
  checklists: Checklist[];
  getChecklistById: (id: string) => Checklist | undefined;
  addChecklist: (title: string, itemsText: string[]) => void;
  updateChecklist: (id: string, title: string, itemsText: string[]) => void;
  deleteChecklist: (id: string) => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
  clearChecklists: () => void;
};

const getToday = () => new Date().toLocaleDateString("es-ES");

export const useChecklistsStore = create<ChecklistsState>()(
  persist(
    (set, get) => ({
      checklists: initialChecklists,

      getChecklistById: (id: string) => {
        return get().checklists.find((checklist) => checklist.id === id);
      },

      addChecklist: (title: string, itemsText: string[]) => {
        const cleanItems = itemsText
          .map((item) => item.trim())
          .filter(Boolean)
          .map((text, index) => ({
            id: `${Date.now()}-${index}`,
            text,
            completed: false,
          }));

        const newChecklist: Checklist = {
          id: Date.now().toString(),
          title,
          updatedAt: getToday(),
          items: cleanItems,
        };

        set((state) => ({
          checklists: [newChecklist, ...state.checklists],
        }));
      },

      updateChecklist: (id: string, title: string, itemsText: string[]) => {
        const cleanItems = itemsText
          .map((item) => item.trim())
          .filter(Boolean)
          .map((text, index) => ({
            id: `${Date.now()}-${index}`,
            text,
            completed: false,
          }));

        set((state) => ({
          checklists: state.checklists.map((checklist) =>
            checklist.id === id
              ? {
                  ...checklist,
                  title,
                  updatedAt: getToday(),
                  items: cleanItems,
                }
              : checklist
          ),
        }));
      },

      deleteChecklist: (id: string) => {
        set((state) => ({
          checklists: state.checklists.filter((checklist) => checklist.id !== id),
        }));
      },

      toggleChecklistItem: (checklistId: string, itemId: string) => {
        set((state) => ({
          checklists: state.checklists.map((checklist) =>
            checklist.id === checklistId
              ? {
                  ...checklist,
                  updatedAt: getToday(),
                  items: checklist.items.map((item) =>
                    item.id === itemId
                      ? {
                          ...item,
                          completed: !item.completed,
                        }
                      : item
                  ),
                }
              : checklist
          ),
        }));
      },

      clearChecklists: () => {
        set({
          checklists: initialChecklists,
        });
      },
    }),
    {
      name: "noteflow-checklists-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
