import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ideas as initialIdeas } from "../constants/mockData";

export type Idea = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: string;
};

type IdeasState = {
  ideas: Idea[];
  getIdeaById: (id: string) => Idea | undefined;
  addIdea: (title: string, content: string, tags: string[]) => void;
  updateIdea: (id: string, title: string, content: string, tags: string[]) => void;
  deleteIdea: (id: string) => void;
  clearIdeas: () => void;
};

const getToday = () => new Date().toLocaleDateString("es-ES");

export const useIdeasStore = create<IdeasState>()(
  persist(
    (set, get) => ({
      ideas: initialIdeas,

      getIdeaById: (id: string) => {
        return get().ideas.find((idea) => idea.id === id);
      },

      addIdea: (title: string, content: string, tags: string[]) => {
        const cleanTags = tags.map((tag) => tag.trim()).filter(Boolean);

        const newIdea: Idea = {
          id: Date.now().toString(),
          title,
          content,
          tags: cleanTags,
          updatedAt: getToday(),
        };

        set((state) => ({
          ideas: [newIdea, ...state.ideas],
        }));
      },

      updateIdea: (id: string, title: string, content: string, tags: string[]) => {
        const cleanTags = tags.map((tag) => tag.trim()).filter(Boolean);

        set((state) => ({
          ideas: state.ideas.map((idea) =>
            idea.id === id
              ? {
                  ...idea,
                  title,
                  content,
                  tags: cleanTags,
                  updatedAt: getToday(),
                }
              : idea
          ),
        }));
      },

      deleteIdea: (id: string) => {
        set((state) => ({
          ideas: state.ideas.filter((idea) => idea.id !== id),
        }));
      },

      clearIdeas: () => {
        set({
          ideas: initialIdeas,
        });
      },
    }),
    {
      name: "noteflow-ideas-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
