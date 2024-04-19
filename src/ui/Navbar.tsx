import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Profile from "./ProfileBadge";
import Search from "../features/search/Search";

const StyledNavbar = styled.header`
  width: 100%;
  padding: 1.2rem 2.4rem;
  display: grid;
  grid-template-columns: 25fr 50fr 25fr;
  align-items: center;
  justify-items: center;
  border-bottom: 1px solid var(--color-zinc-500);
  background-color: rgba(9, 9, 11, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
`;

const Container = styled.div`
  justify-self: start;
  display: flex;
  align-items: center;
  gap: 1.8rem;
  width: 100%;
`;

const HomeLink = styled(NavLink)`
  text-decoration: none;
`;

export default function Navbar() {
  return (
    <StyledNavbar>
      <Container>
        <HomeLink to="/">
          <Logo />
        </HomeLink>
        <Search />
      </Container>

      <nav>
        <NavLinks />
      </nav>

      <Profile />
    </StyledNavbar>
  );
}
