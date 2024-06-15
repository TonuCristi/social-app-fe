import styled from "styled-components";

import LoadingProfile from "../../ui/LoadingProfile";
import LoadingBar from "../../ui/LoadingBar";

const StyledLoadingLike = styled.div`
  display: flex;
  align-items: center;

  gap: 1.4rem;
  padding: 0.8rem;
  background-color: var(--color-zinc-800);
  border-radius: 1.1rem;
`;

export default function LoadingLike() {
  return (
    <StyledLoadingLike>
      <LoadingProfile />
      <LoadingBar variant="sm" />
    </StyledLoadingLike>
  );
}
