import styled from "styled-components";

import Post from "./Post";
import Loader from "../../ui/Loader";

import { useAppSelector } from "../../redux/hooks";
import { selectPosts } from "../../redux/postsSlice";

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

const LoaderWrapper = styled.div`
  margin-top: 2.4rem;
`;

export default function Posts() {
  const { isLoading, posts } = useAppSelector(selectPosts);

  if (isLoading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  return (
    <StyledPosts>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </StyledPosts>
  );
}
