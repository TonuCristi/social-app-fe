import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostT } from "../lib/types";
import { RootState } from "./store";

type UserPostsState = {
  isLoadingUserPosts: boolean;
  errorUserPosts: string;
  userPosts: PostT[];
};

const initialState: UserPostsState = {
  isLoadingUserPosts: true,
  errorUserPosts: "",
  userPosts: [],
};

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    loadUserPosts(state, action: PayloadAction<PostT[]>) {
      state.isLoadingUserPosts = false;
      state.errorUserPosts = "";
      state.userPosts = action.payload;
    },
    loadMoreUserPosts(state, action: PayloadAction<PostT[]>) {
      state.isLoadingUserPosts = false;
      state.errorUserPosts = "";
      state.userPosts = [...state.userPosts, ...action.payload];
    },
    startUserPostsLoad(state) {
      state.isLoadingUserPosts = true;
      state.errorUserPosts = "";
    },
    addUserPost(state, action: PayloadAction<PostT>) {
      state.isLoadingUserPosts = false;
      state.userPosts = [action.payload, ...state.userPosts];
      state.errorUserPosts = "";
    },
    loadUserPostsError(state, action: PayloadAction<string>) {
      state.isLoadingUserPosts = false;
      state.errorUserPosts = action.payload;
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
