import styled from "styled-components";
import { ReactNode } from "react";

const StyledChangeField = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
`;

type Props = {
  children: ReactNode;
};

export default function ChangeField({ children }: Props) {
  return <StyledChangeField>{children}</StyledChangeField>;
}
