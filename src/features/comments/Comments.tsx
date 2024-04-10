import styled from "styled-components";

const StyledComments = styled.aside`
  background-color: var(--color-neutral-200);
  padding: 2.4rem;
  height: 100vh;
`;

export default function Comments() {
  return <StyledComments>Comments</StyledComments>;
}
