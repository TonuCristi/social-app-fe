import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { User } from "../lib/types";

type UserState = {
  isLoading: boolean;
  error: string;
  user: User;
};

const initialState: UserState = {
  isLoading: true,
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    birth_date: "",
    avatar: "",
    description: "",
    createdAt: "",
  },
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    fetchUser: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = initialState.user;
    },
    removeUser: (state) => {
      state.isLoading = false;
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        password: "",
        birth_date: "",
        avatar: "",
        description: "",
        createdAt: "",
      };
    },
  },
});

export const { fetchUser, fetchError, removeUser } = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser;

export default currentUserSlice.reducer;
