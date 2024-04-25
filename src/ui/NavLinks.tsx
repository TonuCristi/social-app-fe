import { ReactNode } from "react";
import styled from "styled-components";

import Navlink from "./Navlink";
import NavItem from "./NavItem";

const Nav = styled.nav`
  @media (width <= 639px) {
    & {
      display: none;
    }
  }
`;

const StyledNavLinks = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 2.4rem;

  @media (width <= 1023px) {
    & {
      gap: 1.6rem;
    }
  }

  @media (width <= 767px) {
    & {
      gap: 1.2rem;
    }
  }
`;

type Props = {
  links: { to: string; icon: ReactNode }[];
};

export default function NavLinks({ links }: Props) {
  return (
    <Nav>
      <StyledNavLinks>
        {links.map(({ to, icon }) => (
          <Navlink key={to} to={`/${to}`}>
            {({ isActive }) => <NavItem isActive={isActive}>{icon}</NavItem>}
          </Navlink>
        ))}
      </StyledNavLinks>
    </Nav>
  );
}
