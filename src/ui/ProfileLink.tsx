import { ReactNode } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledProfileLink = styled(NavLink)`
  text-decoration: none;
`;

type Props = {
  children: ReactNode;
  to: string;
};

export default function ProfileLink({ children, to }: Props) {
  return <StyledProfileLink to={to}>{children}</StyledProfileLink>;
}
