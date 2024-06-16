import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type AuthState = {
  isLoadingAuth: boolean;
  errorAuth: string;
  token: string | null;
};

const initialState: AuthState = {
  isLoadingAuth: false,
  errorAuth: "",
  token: localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadToken: (state) => {
      state.isLoadingAuth = true;
      state.errorAuth = "";
    },
    loadAuthError: (state, action: PayloadAction<string>) => {
      state.errorAuth = action.payload;
      state.isLoadingAuth = false;
    },
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoadingAuth = false;
    },
    removeToken: (state) => {
      state.token = "";
    },
  },
});

export const { loadToken, loadAuthError, addToken, removeToken } =
  authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
