import styled from "styled-components";

import LoadingProfile from "../../ui/LoadingProfile";
import LoadingBar from "../../ui/LoadingBar";

const StyledLoadingComment = styled.li`
  margin-right: 1.2rem;
  padding: 0.8rem;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1.4rem;
`;

const Container = styled.div`
  background-color: var(--color-zinc-800);
  display: flex;
  flex-direction: column;
  border-radius: 1.1rem;
  padding: 1rem;
  gap: 1rem;
`;

export default function LoadingComment() {
  return (
    <StyledLoadingComment>
      <LoadingProfile />
      <Container>
        <LoadingBar variant="sm" />
        <LoadingBar variant="l" />
      </Container>
    </StyledLoadingComment>
  );
}
