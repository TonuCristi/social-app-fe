import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { User } from "../lib/types";

type UserState = {
  isLoadingCurrentUser: boolean;
  errorCurrentUser: string;
  currentUser: User;
};

const initialState: UserState = {
  isLoadingCurrentUser: true,
  errorCurrentUser: "",
  currentUser: {
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
      state.isLoadingCurrentUser = false;
      state.errorCurrentUser = "";
      state.currentUser = action.payload;
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.isLoadingCurrentUser = false;
      state.errorCurrentUser = action.payload;
      state.currentUser = initialState.currentUser;
    },
    removeUser: (state) => {
      state.isLoadingCurrentUser = false;
      state.errorCurrentUser = "";
      state.currentUser = {
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
