import {
  HiChatBubbleOvalLeft,
  HiMiniHeart,
  HiMiniHome,
  HiMiniUserGroup,
} from "react-icons/hi2";
import styled from "styled-components";

import Navlink from "./Navlink";

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

const NavItem = styled.li<{ $isActive?: boolean }>`
  position: relative;
  padding: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    font-size: 2.4rem;
    transition: all 0.3s;
    color: ${(props) =>
      props.$isActive ? "var(--color-sky-400)" : "var(--color-zinc-500)"};
  }

  &::after {
    content: "";
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
    height: 0.8rem;
    width: 0.8rem;
    background-color: ${(props) =>
      props.$isActive ? "var(--color-sky-400)" : "transparent"};
    border-radius: 100%;
  }

  &:hover > * {
    color: var(--color-sky-400);
  }
`;

export default function NavLinks() {
  return (
    <nav>
      <StyledNavLinks>
        {links.map(({ to, icon }) => (
          <Navlink key={to} to={`/${to}`}>
            {({ isActive }) => <NavItem $isActive={isActive}>{icon}</NavItem>}
          </Navlink>
        ))}
      </StyledNavLinks>
    </nav>
  );
}
