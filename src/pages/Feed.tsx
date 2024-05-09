import { useEffect } from "react";
import styled from "styled-components";

import Posts from "./Posts";
import AddPostForm from "../features/posts/AddPostForm";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/currentUserSlice";
import { addingPost, addPost, loadPosts } from "../redux/postsSlice";
import { PostRequest, PostResponse } from "../lib/types";
import { PostApi } from "../api/PostApi";
import { loadError } from "../redux/authSlice";
import { mapPost } from "../utils/mapPost";

const StyledFeed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 2.4rem;
`;

export default function Feed() {
  const { user } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const mapPosts = (posts: PostResponse[]) =>
    posts.map((post) => mapPost(post));

  function handleCreatePost(post: PostRequest) {
    dispatch(addingPost());
    PostApi.createPost(post).then((res) => dispatch(addPost(mapPost(res))));
  }

  useEffect(() => {
    PostApi.getPosts(user.id)
      .then((res) => {
        const posts = mapPosts(res);
        dispatch(loadPosts(posts));
      })
      .catch((err) => dispatch(loadError(err.response.data.error)));
  }, [user.id, dispatch]);

  return (
    <StyledFeed>
      <AddPostForm onCreatePost={handleCreatePost} />
      <Posts />
    </StyledFeed>
  );
}
