import styled from "styled-components";

import AddPostForm from "../features/posts/AddPostForm";
import Post from "../features/posts/Post";

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
  return (
    <StyledPosts>
      <AddPostForm />

      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </StyledPosts>
  );
}
