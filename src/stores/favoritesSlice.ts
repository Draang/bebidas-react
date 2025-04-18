import { StateCreator } from "zustand";
import type { Recipe } from "../types";
export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExist: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};
export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (
  set,
  get
) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExist(recipe.idDrink)) {
      //elimina
      set((state) => ({
        favorites: state.favorites.filter((f) => f.idDrink !== recipe.idDrink),
      }));
    } else {
      //agrega
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExist: (id) => {
    return get().favorites.some((f) => f.idDrink === id);
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set(() => ({
        favorites: JSON.parse(storedFavorites),
      }));
    }
  },
});
