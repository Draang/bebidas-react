import { StateCreator } from "zustand";
import type { Notification } from "../types";
import { FavoritesSliceType } from "./favoritesSlice";

export type NotificationSliceType = {
  notification: Notification;
  setNotification: (payload: Pick<Notification, "text" | "error">) => void;
  closeNotification: () => void;
};
export const createNotificationSlice: StateCreator<
  NotificationSliceType & FavoritesSliceType,
  [],
  [],
  NotificationSliceType
> = (set, get) => ({
  notification: {
    text: "",
    error: false,
    show: false,
  },
  setNotification: (payload) => {
    set({
      notification: {
        ...payload,
        show: true,
      },
    });
    setTimeout(() => {
      get().closeNotification();
    }, 5000);
  },
  closeNotification: () => {
    set({
      notification: {
        text: "",
        error: false,
        show: false,
      },
    });
  },
});
