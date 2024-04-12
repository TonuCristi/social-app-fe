import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Navlink from "../ui/Navlink";

const links = [
  {
    to: "profile",
    end: true,
    text: "Profile",
  },
  {
    to: "profile/changePassword",
    text: "Change password",
  },
  {
    to: "profile/changeEmail",
    text: "Change email",
  },
  {
    to: "profile/editProfile",
    text: "Edit profile",
  },
];

const StyledProfile = styled.div`
  color: white;
  display: grid;
  grid-template-columns: 25fr 75fr;
  width: 70%;
  margin: 0 auto;
  border: 1px solid var(--color-zinc-500);
  border-top: 1px solid transparent;
`;

const ProfileNav = styled.nav`
  border-right: 1px solid var(--color-zinc-500);
  padding: 2.4rem;
  /* height: max(100vh, 100%); */
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 2.4rem;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const NavItem = styled.li<{ $isActive: boolean }>`
  padding: 1.2rem;
  background-color: ${(props) =>
    props.$isActive ? "var(--color-zinc-800)" : "var(--color-zinc-700)"};
  border-radius: 1.1rem;
  color: var(--color-zinc-100);
  font-weight: 500;
  width: 100%;

  transition: all 0.2s;

  &:hover {
    background-color: var(--color-zinc-800);
  }
`;

const Container = styled.div`
  padding: 2.4rem;
`;

export default function Profile() {
  return (
    <StyledProfile>
      <ProfileNav>
        <Title>Profile</Title>
        <NavLinks>
          {links.map(({ to, end, text }) => (
            <Navlink key={to} to={`/${to}`} end={end}>
              {({ isActive }) => <NavItem $isActive={isActive}>{text}</NavItem>}
            </Navlink>
          ))}
        </NavLinks>
      </ProfileNav>

      <Container>
        <Outlet />
      </Container>
    </StyledProfile>
  );
}
