import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostT } from "../lib/types";
import { RootState } from "./store";

type UserPostsState = {
  isLoading: boolean;
  error: string;
  userPosts: PostT[];
};

const initialState: UserPostsState = {
  isLoading: true,
  error: "",
  userPosts: [],
};

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    loadPosts(state, action: PayloadAction<PostT[]>) {
      state.isLoading = false;
      state.error = "";
      state.userPosts = action.payload;
    },
    loadMorePosts(state, action: PayloadAction<PostT[]>) {
      state.isLoading = false;
      state.error = "";
      state.userPosts = [...state.userPosts, ...action.payload];
    },
    startLoad(state) {
      state.isLoading = true;
      state.error = "";
    },
    addPost(state, action: PayloadAction<PostT>) {
      state.isLoading = false;
      state.userPosts = [action.payload, ...state.userPosts];
      state.error = "";
    },
    loadError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { loadPosts, loadMorePosts, startLoad, addPost, loadError } =
  userPostsSlice.actions;

export const selectUserPosts = (state: RootState) => state.userPosts;

export default userPostsSlice.reducer;
