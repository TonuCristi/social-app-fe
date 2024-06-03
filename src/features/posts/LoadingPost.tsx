import styled, { keyframes } from "styled-components";

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

const Profile = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: var(--color-zinc-700);
  border-radius: 100%;
`;

type Variant = "sm" | "l";

const move = keyframes`
  from {
    left: 0;
  }

  to {
    left: 100%
  }
`;

const Bar = styled.div<{ $variant: Variant }>`
  width: 100%;
  height: ${(props) => (props.$variant === "sm" ? "2rem" : "4rem")};
  background-color: var(--color-zinc-700);
  grid-column: 2;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    width: 2rem;
    height: 100%;
    background-color: var(--color-zinc-400);
    border-radius: 100%;
    box-shadow: 0 0 3rem 3rem var(--color-zinc-400);
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    animation: ${move} 0.5s linear infinite;
  }
`;

export default function LoadingPost() {
  return (
    <StyledLoadingPost>
      <Profile />
      <Bar $variant="l" />
      <Bar $variant="sm" />
      <Bar $variant="sm" />
    </StyledLoadingPost>
  );
}
