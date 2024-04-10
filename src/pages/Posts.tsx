import styled from "styled-components";

import AddPostForm from "../features/posts/AddPostForm";
import Post from "../features/posts/Post";

const StyledPosts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  padding: 2.4rem;
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
