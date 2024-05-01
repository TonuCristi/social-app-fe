import styled from "styled-components";

import AddPostForm from "../features/posts/AddPostForm";
import Post from "../features/posts/Post";
import { useEffect } from "react";
import { PostApi } from "../api/PostApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/currentUserSlice";
import { PostResponse } from "../lib/types";
import { loadPosts, selectPosts } from "../redux/postsSlice";
import { loadError } from "../redux/authSlice";

const StyledPosts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  width: 55%;
  margin: 0 auto;
  padding: 2.4rem;

  @media (width <= 1279px) {
    & {
      width: 60%;
    }
  }

  @media (width <= 1023px) {
    & {
      width: 70%;
    }
  }

  @media (width <= 767px) {
    & {
      width: 80%;
    }
  }

  @media (width <= 639px) {
    & {
      width: 100%;
    }
  }
`;

export default function Posts() {
  const { user } = useAppSelector(selectCurrentUser);
  const { isLoading, posts } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  const mapPosts = (posts: PostResponse[]) =>
    posts.map((post) => {
      const { _id: id, ...rest } = post;
      return { id, ...rest };
    });

  useEffect(() => {
    PostApi.getPosts(user.id)
      .then((res) => {
        const posts = mapPosts(res);
        dispatch(loadPosts(posts));
      })
      .catch((err) => dispatch(loadError(err.response.data.error)));
  }, [user.id, dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <StyledPosts>
      <AddPostForm />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        posts.map((post) => <Post key={post.id} post={post} />)
      )}
    </StyledPosts>
  );
}
