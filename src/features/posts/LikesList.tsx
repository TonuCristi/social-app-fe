import { Dispatch, SetStateAction, useRef } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useClickOutside } from "../../hooks/useClickOutside";

const StyledLikesList = styled.div`
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  border-radius: 1.1rem;
  width: 30%;
  height: 60%;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 2.4rem;
  color: var(--color-zinc-100);
`;

const CloseButton = styled.button`
  border: none;
  background-color: var(--color-zinc-700);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-zinc-800);
  }

  & > * {
    font-size: 2.8rem;
    color: var(--color-zinc-100);
  }
`;

const Likes = styled.ul`
  list-style: none;
  border-radius: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  transition: all 0.2s;
  overflow-y: scroll;
  padding-right: 1.2rem;

  &::-webkit-scrollbar {
    background-color: var(--color-zinc-700);
    border-radius: 1.1rem;
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-zinc-100);
    border-radius: 1.1rem;
  }
`;

const ProfileLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.4rem;
  text-decoration: none;
  padding: 0.8rem;
  background-color: var(--color-zinc-700);
  border-radius: 1.1rem;
  color: var(--color-zinc-100);
  font-weight: 500;
  font-size: 1.4rem;
  width: 100%;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-zinc-800);
  }
`;

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
`;

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function LikesList({ setIsOpen }: Props) {
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <StyledLikesList ref={containerRef} onClick={(e) => e.stopPropagation()}>
      <Wrapper>
        <Title>Likes</Title>
        <CloseButton onClick={() => setIsOpen(false)}>
          <HiMiniXMark />
        </CloseButton>
      </Wrapper>

      <Likes>
        <li>
          <ProfileLink to="/profile">
            <Avatar
              src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={`Photo of User`}
            />
            aaaa
          </ProfileLink>
        </li>
        <li>
          <ProfileLink to="/profile">
            <Avatar
              src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={`Photo of User`}
            />
            aaaa
          </ProfileLink>
        </li>
        <li>
          <ProfileLink to="/profile">
            <Avatar
              src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={`Photo of User`}
            />
            aaaa
          </ProfileLink>
        </li>
        <li>
          <ProfileLink to="/profile">
            <Avatar
              src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={`Photo of User`}
            />
            aaaa
          </ProfileLink>
        </li>
        <li>
          <ProfileLink to="/profile">
            <Avatar
              src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={`Photo of User`}
            />
            aaaa
          </ProfileLink>
        </li>
        <li>
          <ProfileLink to="/profile">
            <Avatar
              src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={`Photo of User`}
            />
            aaaa
          </ProfileLink>
        </li>
        <li>
          <ProfileLink to="/profile">
            <Avatar
              src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={`Photo of User`}
            />
            aaaa
          </ProfileLink>
        </li>
        <li>
          <ProfileLink to="/profile">
            <Avatar
              src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={`Photo of User`}
            />
            aaaa
          </ProfileLink>
        </li>
      </Likes>
    </StyledLikesList>
  );
}
