import { Dispatch, ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import NavItem from "./NavItem";
import Navlink from "./Navlink";
import Button from "./Button";

import { HiMiniXMark } from "react-icons/hi2";

const Nav = styled.nav<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4.8rem;
  position: absolute;
  z-index: 1000;
  top: 0;
  right: ${(props) => (props.$isOpen ? "0%" : "-100%")};
  height: 100vh;
  width: 100%;
  background-color: rgba(9, 9, 11);
  padding: 4.8rem;
  transition: all 0.5s;

  @media (width <= 639px) {
    & {
      display: flex;
    }
  }

  @media (width <= 425px) {
    & {
      display: flex;
    }
  }
`;

const StyledFloatingNavLinks = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 2.4rem;

  @media (width <= 639px) {
    & {
      flex-direction: column;
    }
  }
`;

const CloseBurgerMenuIcon = styled(HiMiniXMark)`
  color: var(--color-zinc-100);
  font-size: 2.8rem;
  stroke-width: 0.1rem;
`;

type Props = {
  links: { to: string; icon: ReactNode }[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function FloatingNavLinks({ links, isOpen, setIsOpen }: Props) {
  function handleClick() {
    document.body.style.overflowY = "auto";
    setIsOpen(false);
  }

  return createPortal(
    <Nav $isOpen={isOpen}>
      <Button onClick={handleClick}>
        <CloseBurgerMenuIcon />
      </Button>

      <StyledFloatingNavLinks>
        {links.map(({ to, icon }) => (
          <Navlink key={to} to={`/${to}`} onClick={handleClick}>
            {({ isActive }) => <NavItem isActive={isActive}>{icon}</NavItem>}
          </Navlink>
        ))}
      </StyledFloatingNavLinks>
    </Nav>,
    document.body
  );
}
