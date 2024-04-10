import styled from "styled-components";

const StyledErrorPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-zinc-100);
  background-color: var(--color-zinc-950);
  font-weight: 500;
`;

export default function ErrorPage() {
  return <StyledErrorPage>Something went wrong...</StyledErrorPage>;
}
