import { StateCreator } from "zustand";
import {
  getCategories,
  getFullRecipe,
  getRecipes,
} from "../services/recipesService";
import type { Categories, Drinks, FiltersRecipes, Recipe } from "../types";
export type RecepiesSliceType = {
  categories: Categories;
  drinks: Drinks;
  recipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipies: (searchFilters: FiltersRecipes) => Promise<void>;
  selectRecipe: (id: string) => Promise<void>;
  closeModal: () => void;
};
export const createRecepiesSlice: StateCreator<RecepiesSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: { drinks: [] },
  recipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();
    set(() => ({
      categories,
    }));
  },
  searchRecipies: async (searchFilters: FiltersRecipes) => {
    const drinks = await getRecipes(searchFilters);
    set(() => ({
      drinks,
    }));
  },
  selectRecipe: async (id: string) => {
    const recipe = await getFullRecipe(id);
    set(() => ({
      recipe,
      modal: true,
    }));
  },
  closeModal: () => {
    set(() => ({
      recipe: {} as Recipe,
      modal: false,
    }));
  },
});
