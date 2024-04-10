import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type Notification = {
  text: string;
};

type NotificationsState = {
  ws: WebSocket | null;
  isLoading: boolean;
  error: string;
  notifications: Notification[];
};

const initialState: NotificationsState = {
  ws: null,
  isLoading: false,
  error: "",
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: "notications",
  initialState,
  reducers: {
    sendNotification: (state, action: PayloadAction<string>) => {
      state.notifications.push({ text: action.payload });
    },
    addWs: (state, action: PayloadAction<WebSocket | null>) => {
      state.ws = action.payload;
    },
  },
});

export const { sendNotification, addWs } = notificationsSlice.actions;

export const selectNotifications = (state: RootState) => state.notifications;

export default notificationsSlice.reducer;
