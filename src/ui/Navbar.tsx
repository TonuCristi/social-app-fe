import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Profile from "./ProfileBadge";
import Search from "../features/search/Search";
import Button from "./Button";
import FloatingNavLinks from "./FloatingNavLinks";

import {
  HiChatBubbleOvalLeft,
  HiMiniBars3,
  HiMiniHeart,
  HiMiniHome,
  HiMiniUserGroup,
} from "react-icons/hi2";

const links = [
  {
    to: "",
    icon: <HiMiniHome />,
  },
  {
    to: "notifications",
    icon: <HiMiniHeart />,
  },
  {
    to: "friends",
    icon: <HiMiniUserGroup />,
  },
  {
    to: "messages",
    icon: <HiChatBubbleOvalLeft />,
  },
];

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

  @media (width <= 639px) {
    & {
      display: flex;
      gap: 2.4rem;
    }
  }
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

const Wrapper = styled.div`
  display: none;

  @media (width <= 639px) {
    & {
      display: block;
    }
  }
`;

const BurgerMenuIcon = styled(HiMiniBars3)`
  color: var(--color-zinc-100);
  font-size: 2.8rem;
  stroke-width: 0.1rem;
`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <StyledNavbar>
      <Container>
        <HomeLink to="/">
          <Logo />
        </HomeLink>
        <Search />
      </Container>

      <NavLinks links={links} />
      {isOpen && <FloatingNavLinks links={links} setIsOpen={setIsOpen} />}

      <Wrapper>
        <Button onClick={() => setIsOpen(true)}>
          <BurgerMenuIcon />
        </Button>
      </Wrapper>

      <Profile />
    </StyledNavbar>
  );
}
