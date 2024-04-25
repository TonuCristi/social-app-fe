import { ReactNode } from "react";
import styled from "styled-components";

const StyledNavItem = styled.li<{ $isActive?: boolean }>`
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

type Props = {
  isActive: boolean;
  children: ReactNode;
};

export default function NavItem({ isActive, children }: Props) {
  return <StyledNavItem $isActive={isActive}>{children}</StyledNavItem>;
}
