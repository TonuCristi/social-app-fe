import styled from "styled-components";

import LoadingProfile from "../../ui/LoadingProfile";
import LoadingBar from "../../ui/LoadingBar";

const StyledLoadingPost = styled.div`
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  width: 80%;
  border-radius: 1.1rem;
  padding: 1.6rem;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  column-gap: 1.6rem;
  row-gap: 2rem;

  @media (width >= 1535px) {
    & {
      max-width: 70rem;
    }
  }

  @media (width <= 1279px) {
    & {
      width: 85%;
    }
  }

  @media (width <= 1023px) {
    & {
      width: 90%;
    }
  }

  @media (width <= 767px) {
    & {
      width: 95%;
    }
  }

  @media (width <= 639px) {
    & {
      width: 100%;
    }
  }
`;

export default function LoadingPost() {
  return (
    <StyledLoadingPost>
      <LoadingProfile />
      <LoadingBar variant="l" />
      <LoadingBar variant="sm" />
      <LoadingBar variant="sm" />
    </StyledLoadingPost>
  );
}
