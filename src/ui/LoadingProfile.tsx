import styled from "styled-components";

const StyledLoadingProfile = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: var(--color-zinc-700);
  border-radius: 100%;
  flex-shrink: 0;
`;

export default function LoadingProfile() {
  return <StyledLoadingProfile />;
}
