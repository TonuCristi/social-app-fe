import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import currentUserReducer from "./currentUserSlice";
import notificationsSlice from "./notificationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    currentUser: currentUserReducer,
    notifications: notificationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
