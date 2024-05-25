import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostT } from "../lib/types";
import { RootState } from "./store";

type PostsState = {
  isLoading: boolean;
  error: string;
  posts: PostT[];
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
    loadPosts(state, action: PayloadAction<PostT[]>) {
      state.isLoading = false;
      state.error = "";
      state.posts = action.payload;
    },
    loadMorePosts(state, action: PayloadAction<PostT[]>) {
      state.isLoading = false;
      state.error = "";
      state.posts = [...state.posts, ...action.payload];
    },
    startLoad(state) {
      state.isLoading = true;
      state.error = "";
    },
    addPost(state, action: PayloadAction<PostT>) {
      state.isLoading = false;
      state.posts = [action.payload, ...state.posts];
      state.error = "";
    },
    loadError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { loadPosts, loadMorePosts, startLoad, addPost, loadError } =
  postsSlice.actions;

export const selectUserPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
