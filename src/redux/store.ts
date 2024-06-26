import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import currentUserReducer from "./currentUserSlice";
import notificationsSlice from "./notificationsSlice";
import postsSlice from "./postsSlice";
import userPostsSlice from "./userPostsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    currentUser: currentUserReducer,
    posts: postsSlice,
    userPosts: userPostsSlice,
    notifications: notificationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
