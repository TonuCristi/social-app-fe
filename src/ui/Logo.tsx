import { HiFire } from "react-icons/hi";
import styled from "styled-components";

const StyledLogo = styled.span`
  font-weight: 600;
  font-size: 2rem;
  border: 4px solid var(--color-sky-400);
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
`;

const Icon = styled(HiFire)`
  color: var(--color-sky-400);
`;

export default function Logo() {
  return (
    <StyledLogo>
      <Icon />
    </StyledLogo>
  );
}
