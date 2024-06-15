import styled, { css, keyframes } from "styled-components";

type Variant = "sm" | "l";

const move = keyframes`
  from {
    left: 0;
  }

  to {
    left: 100%
  }
`;

const variants = {
  sm: css`
    height: 2rem;
  `,
  l: css`
    height: 4rem;
  `,
};

const StyledLoadingBar = styled.div<{ $variant: Variant }>`
  width: 100%;
  background-color: var(--color-zinc-700);
  grid-column: 2;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  ${(props) => variants[props.$variant]}

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

type Props = {
  variant: Variant;
};

export default function LoadingBar({ variant }: Props) {
  return <StyledLoadingBar $variant={variant} />;
}
