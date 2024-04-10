import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMiniChevronDown } from "react-icons/hi2";
import styled from "styled-components";

import Button from "./Button";
import Avatar from "./Avatar";

import { useLogout } from "../hooks/useLogout";
import { selectCurrentUser } from "../redux/currentUserSlice";
import { useAppSelector } from "../redux/hooks";
import { useClickOutside } from "../hooks/useClickOutside";

const StyledProfileBadge = styled.div`
  justify-self: end;
  position: relative;
`;

const Name = styled.p`
  color: var(--color-zinc-100);
`;

const Icon = styled(HiMiniChevronDown)`
  font-size: 2rem;
  stroke-width: 0.1rem;
  color: var(--color-zinc-100);
`;

const Dropdown = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  width: 100%;
  border-radius: 1.1rem;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  transition: all 0.2s;

  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};

  position: absolute;
  top: 120%;
  left: 0;
`;

const DropdownItem = styled.li`
  padding: 1.2rem;
  background-color: var(--color-zinc-700);
  border-radius: 1.1rem;
  color: var(--color-zinc-100);
  font-weight: 500;
  width: 100%;
  cursor: pointer;

  transition: all 0.2s;

  &:hover {
    background-color: var(--color-zinc-800);
  }
`;

const DropdownLink = styled(NavLink)`
  text-decoration: none;
`;

export default function ProfileBadge() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { logout } = useLogout();
  const { user } = useAppSelector(selectCurrentUser);
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <StyledProfileBadge ref={containerRef}>
      <Button variant="profile" onClick={() => setIsOpen((prev) => !prev)}>
        <Avatar src={user.avatar} variant="profileBadge" />
        <Name>{user.name}</Name>
        <Icon />
      </Button>

      <Dropdown $isOpen={isOpen}>
        <DropdownLink to="/profile" onClick={() => setIsOpen(false)}>
          <DropdownItem>Profile</DropdownItem>
        </DropdownLink>

        <DropdownItem onClick={() => logout()}>Log out</DropdownItem>
      </Dropdown>
    </StyledProfileBadge>
  );
}
