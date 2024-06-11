import { Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components";

import Button from "../../ui/Button";
import UserLike from "./UserLike";

import { HiMiniXMark } from "react-icons/hi2";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Like } from "../../lib/types";

const StyledLikes = styled.div`
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  border-radius: 1.1rem;
  width: 30%;
  height: 60%;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (width >= 1535px) {
    & {
      max-width: 50rem;
    }
  }

  @media (width <= 1279px) {
    & {
      width: 40%;
    }
  }

  @media (width <= 1023px) {
    & {
      width: 50%;
    }
  }

  @media (width <= 767px) {
    & {
      width: 60%;
    }
  }

  @media (width <= 639px) {
    & {
      width: 80%;
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 2.4rem;
  color: var(--color-zinc-100);
`;

const CloseIcon = styled(HiMiniXMark)`
  font-size: 3.2rem;
  color: var(--color-zinc-100);
  background-color: var(--color-zinc-700);
  padding: 0.4rem;
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-zinc-800);
  }
`;

const LikesList = styled.ul`
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

type Props = {
  setIsLikesListOpen: Dispatch<SetStateAction<boolean>>;
  likes: Like[];
};

export default function Likes({ setIsLikesListOpen, likes }: Props) {
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setIsLikesListOpen(false));

  return (
    <StyledLikes ref={containerRef}>
      <Container>
        <Title>Likes</Title>
        <Button onClick={() => setIsLikesListOpen(false)}>
          <CloseIcon />
        </Button>
      </Container>

      <LikesList>
        {likes.map((like) => (
          <li key={like.id}>
            <UserLike id={like.user_id} />
          </li>
        ))}
      </LikesList>
    </StyledLikes>
  );
}
