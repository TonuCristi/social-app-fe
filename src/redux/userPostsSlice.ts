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
    loadUserPosts(state, action: PayloadAction<PostT[]>) {
      state.isLoading = false;
      state.error = "";
      state.posts = action.payload;
    },
    loadMoreUserPosts(state, action: PayloadAction<PostT[]>) {
      state.isLoading = false;
      state.error = "";
      state.posts = [...state.posts, ...action.payload];
    },
    startUserPostsLoad(state) {
      state.isLoading = true;
      state.error = "";
    },
    addUserPost(state, action: PayloadAction<PostT>) {
      state.isLoading = false;
      state.posts = [action.payload, ...state.posts];
      state.error = "";
    },
    loadUserPostsError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loadUserPosts,
  loadMoreUserPosts,
  startUserPostsLoad,
  addUserPost,
  loadUserPostsError,
} = userPostsSlice.actions;

export const selectUserPosts = (state: RootState) => state.userPosts;

export default userPostsSlice.reducer;
