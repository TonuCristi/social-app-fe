import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostT } from "../lib/types";
import { RootState } from "./store";

type UserPostsState = {
  isLoading: boolean;
  error: string;
  posts: PostT[];
};

const initialState: UserPostsState = {
  isLoading: true,
  error: "",
  posts: [],
};

const userPostsSlice = createSlice({
  name: "userPosts",
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
  userPostsSlice.actions;

export const selectUserPosts = (state: RootState) => state.userPosts;

export default userPostsSlice.reducer;
