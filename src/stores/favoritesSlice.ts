import { StateCreator } from "zustand";
import type { Recipe } from "../types";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";
export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExist: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};
export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExist(recipe.idDrink)) {
      //elimina
      set((state) => ({
        favorites: state.favorites.filter((f) => f.idDrink !== recipe.idDrink),
      }));
      createNotificationSlice(set, get, api).setNotification({
        error: false,
        text: "Se elimino de favoritos",
      });
    } else {
      //agrega
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
      createNotificationSlice(set, get, api).setNotification({
        error: false,
        text: "Se agrego a favoritos",
      });
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
