import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostT } from "../lib/types";
import { RootState } from "./store";

type PostsState = {
  isLoadingPosts: boolean;
  errorPosts: string;
  posts: PostT[];
};

const initialState: PostsState = {
  isLoadingPosts: true,
  errorPosts: "",
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    loadPosts(state, action: PayloadAction<PostT[]>) {
      state.isLoadingPosts = false;
      state.errorPosts = "";
      state.posts = action.payload;
    },
    loadMorePosts(state, action: PayloadAction<PostT[]>) {
      state.isLoadingPosts = false;
      state.errorPosts = "";
      state.posts = [...state.posts, ...action.payload];
    },
    startLoad(state) {
      state.isLoadingPosts = true;
      state.errorPosts = "";
    },
    addPost(state, action: PayloadAction<PostT>) {
      state.isLoadingPosts = false;
      state.posts = [action.payload, ...state.posts];
      state.errorPosts = "";
    },
    loadError(state, action: PayloadAction<string>) {
      state.isLoadingPosts = false;
      state.errorPosts = action.payload;
    },
  },
});

export const { loadPosts, loadMorePosts, startLoad, addPost, loadError } =
  postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
