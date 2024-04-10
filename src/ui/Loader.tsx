import styled from "styled-components";

const StyledLoader = styled.div`
  width: 6.5rem;
  height: 6.5rem;
  border-top: 1rem solid var(--color-zinc-700);
  border-bottom: 1rem solid var(--color-zinc-700);
  border-left: 1rem solid var(--color-zinc-700);
  border-right: 1rem solid var(--color-sky-400);
  border-radius: 100%;

  animation: loading 0.6s linear infinite;

  @keyframes loading {
    0% {
      rotate: 0deg;
    }

    100% {
      rotate: 360deg;
    }
  }
`;

export default function Loader() {
  return <StyledLoader />;
}
