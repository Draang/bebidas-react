import { StateCreator } from "zustand";
import { generateRecipe } from "../services/AIServices";
export type AISlice = {
  recipe: string;
  loading: boolean;
  isGenerating: boolean;
  getAIRecipe: (prompt: string) => Promise<void>;
};
export const createAISlice: StateCreator<AISlice, [], [], AISlice> = (set) => ({
  recipe: "",
  loading: false,
  isGenerating: false,
  getAIRecipe: async (prompt) => {
    set({
      loading: true,
      recipe: "",
      isGenerating: true,
    });
    const data = await generateRecipe(prompt);
    set({
      loading: false,
    });
    for await (const textPart of data) {
      set((state) => ({
        recipe: state.recipe + textPart,
      }));
    }
    set({
      isGenerating: false,
    });
  },
});
