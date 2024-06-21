import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";

import Navlink from "../ui/Navlink";

import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/currentUserSlice";

const links = [
  {
    to: "",
    end: true,
    text: "Your profile",
  },
  {
    to: "changePassword",
    text: "Change password",
  },
  {
    to: "editProfile",
    text: "Edit profile",
  },
];

const StyledProfile = styled.div<{ $isCurrentUser: boolean }>`
  color: var(--color-zinc-100);
  display: ${(props) => (props.$isCurrentUser ? "grid" : "flex")};
  grid-template-columns: 25fr 75fr;
  width: ${(props) => (props.$isCurrentUser ? "75%" : "60%")};
  margin: 0 auto;
  border: 1px solid var(--color-zinc-500);
  border-top: none;

  @media (width >= 1535px) {
    & {
      max-width: ${(props) => (props.$isCurrentUser ? "120rem" : "80rem")};
    }
  }

  @media (width <= 1279px) {
    & {
      width: ${(props) => (props.$isCurrentUser ? "85%" : "60%")};
    }
  }

  @media (width <= 1023px) {
    & {
      grid-template-columns: 1fr;
      width: ${(props) => !props.$isCurrentUser && "75%"};
    }
  }

  @media (width <= 767px) {
    & {
      width: 100%;
      border: none;
      border-bottom: 1px solid var(--color-zinc-500);
    }
  }
`;

const ProfileNav = styled.nav`
  border-right: 1px solid var(--color-zinc-500);
  padding: 2.4rem;

  @media (width <= 1023px) {
    & {
      padding: 2rem;
      border-right: none;
      border-bottom: 1px solid var(--color-zinc-500);
    }
  }
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 2.4rem;

  @media (width <= 1023px) {
    & {
      font-size: 2rem;
    }
  }

  @media (width <= 425px) {
    & {
      text-align: center;
    }
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  @media (width <= 1023px) {
    & {
      font-size: 1.4rem;
      flex-direction: row;
    }
  }

  @media (width <= 425px) {
    & {
      width: 55%;
      margin: 0 auto;
      flex-direction: column;
    }
  }

  @media (width <= 320px) {
    & {
      width: 70%;
      margin: 0 auto;
      flex-direction: column;
    }
  }
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

const Container = styled.div<{ $isCurrentUser: boolean }>`
  padding: 2.4rem;
  margin: ${(props) => (props.$isCurrentUser ? "initial" : "0 auto")};

  @media (width <= 1023px) {
    & {
      padding: 2rem;
    }
  }
`;

export default function Profile() {
  const { currentUser } = useAppSelector(selectCurrentUser);
  const params = useParams();

  return (
    <StyledProfile $isCurrentUser={currentUser.id === params.userId}>
      {currentUser.id === params.userId && (
        <ProfileNav>
          <Title>Profile</Title>
          <NavLinks>
            {links.map(({ to, end, text }) => (
              <Navlink
                key={to}
                to={`/profile/${currentUser.id}/${to}`}
                end={end}
              >
                {({ isActive }) => (
                  <NavItem $isActive={isActive}>{text}</NavItem>
                )}
              </Navlink>
            ))}
          </NavLinks>
        </ProfileNav>
      )}

      <Container $isCurrentUser={currentUser.id === params.userId}>
        <Outlet />
      </Container>
    </StyledProfile>
  );
}
