import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Profile from "./ProfileBadge";
import Search from "../features/search/Search";
import Button from "./Button";
import FloatingNavLinks from "./FloatingNavLinks";
import FloatingSearch from "../features/search/FloatingSearch";

import {
  HiChatBubbleOvalLeft,
  HiMiniBars3,
  HiMiniHeart,
  HiMiniHome,
  HiMiniUserGroup,
  HiMiniMagnifyingGlass,
} from "react-icons/hi2";
import { startLoad } from "../redux/postsSlice";
import { useAppDispatch } from "../redux/hooks";

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

  @media (width <= 1279px) {
    & {
      grid-template-columns: 30fr 40fr 30fr;
    }
  }

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

const SearchWrapper = styled.div`
  display: none;

  @media (width <= 1023px) {
    & {
      display: block;
    }
  }
`;

const SearchIcon = styled(HiMiniMagnifyingGlass)`
  color: var(--color-zinc-100);
  font-size: 2.8rem;
  stroke-width: 0.1rem;
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
  font-size: 2.4rem;
  stroke-width: 0.1rem;
`;

type Props = {
  getPosts: (perPage: number, offset: number) => void;
};

export default function Navbar({ getPosts }: Props) {
  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  function handleRefetch() {
    if (location.pathname === "/") {
      dispatch(startLoad());
      getPosts(4, 0);
    }
  }

  return (
    <StyledNavbar>
      <Container>
        <HomeLink to="/">
          <Logo onClick={handleRefetch} />
        </HomeLink>
        <Search />

        <FloatingSearch isOpen={isOpenSearch} setIsOpen={setIsOpenSearch} />
        <SearchWrapper>
          <Button
            onClick={() => {
              document.body.style.overflow = "hidden";
              setIsOpenSearch(true);
            }}
          >
            <SearchIcon />
          </Button>
        </SearchWrapper>
      </Container>

      <NavLinks links={links} />
      <FloatingNavLinks
        links={links}
        isOpen={isOpenNav}
        setIsOpen={setIsOpenNav}
      />

      <Wrapper>
        <Button
          onClick={() => {
            document.body.style.overflow = "hidden";
            setIsOpenNav(true);
          }}
        >
          <BurgerMenuIcon />
        </Button>
      </Wrapper>

      <Profile />
    </StyledNavbar>
  );
}
