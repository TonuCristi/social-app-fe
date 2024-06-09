import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type AuthState = {
  isLoading: boolean;
  error: string;
  token: string | null;
};

const initialState: AuthState = {
  isLoading: false,
  error: "",
  token: localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadToken: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    loadAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoading = false;
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
