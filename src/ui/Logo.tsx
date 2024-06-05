import styled from "styled-components";

import { HiFire } from "react-icons/hi";

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

type Props = {
  onClick: () => void;
};

export default function Logo({ onClick }: Props) {
  return (
    <StyledLogo onClick={onClick}>
      <Icon />
    </StyledLogo>
  );
}
