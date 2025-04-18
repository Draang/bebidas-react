import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecepiesSlice } from "./recepieSlice";
import type { RecepiesSliceType } from "./recepieSlice";
import type { FavoritesSliceType } from "./favoritesSlice";
import { createFavoritesSlice } from "./favoritesSlice";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";
//Multiples store en slice
export const useAppStore = create<
  RecepiesSliceType & FavoritesSliceType & NotificationSliceType
>()(
  devtools((...a) => ({
    ...createRecepiesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
  }))
);
