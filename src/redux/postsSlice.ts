import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../lib/types";
import { RootState } from "./store";

type PostsState = {
  isLoading: boolean;
  error: string;
  posts: Post[];
};

const initialState: PostsState = {
  isLoading: true,
  error: "",
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    loadPosts(state, action: PayloadAction<Post[]>) {
      state.isLoading = false;
      state.error = "";
      state.posts = action.payload;
    },
    loadError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { loadPosts, loadError } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
