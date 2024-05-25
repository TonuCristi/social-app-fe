import styled, { css } from "styled-components";

import Post from "./Post";
import Loader from "../../ui/Loader";

import { useAppSelector } from "../../redux/hooks";
import { selectPosts } from "../../redux/postsSlice";

type Variant = "feed" | "profile";

const variants = {
  feed: css`
    width: 55%;

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
  `,
  profile: css`
    width: 100%;
  `,
};

const StyledPosts = styled.div<{ $variant: Variant }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  margin: 0 auto;
  padding: 2.4rem;

  ${(props) => variants[props.$variant]}
`;

const LoaderWrapper = styled.div`
  margin-top: 2.4rem;
`;

type Props = {
  variant: Variant;
};

export default function Posts({ variant }: Props) {
  const { isLoading, error, posts } = useAppSelector(selectPosts);

  if (isLoading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  if (error) return <div>Something went wrong!</div>;

  return (
    <StyledPosts $variant={variant}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </StyledPosts>
  );
}
