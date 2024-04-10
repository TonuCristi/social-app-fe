import styled from "styled-components";

const StyledMessages = styled.div`
  color: white;
  height: 100vh;
  background-color: red;
  display: grid;
  grid-template-columns: 25fr 80fr;
`;

const Chats = styled.aside`
  background-color: white;
`;

export default function Messages() {
  return (
    <StyledMessages>
      <Chats>dasdas</Chats>
    </StyledMessages>
  );
}
