import { HiMiniChatBubbleOvalLeft, HiMiniHeart } from "react-icons/hi2";
import styled from "styled-components";

import LikesListButton from "./LikesListButton";

const StyledPostInteractions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
`;

const Button = styled.button<{ $variant: string }>`
  position: relative;
  z-index: 0;
  border: none;
  background: none;
  color: var(--color-zinc-100);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: all 0.2s;

  & div::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    background-color: transparent;
    transition: all 0.2s;
  }

  &:hover div::before {
    background-color: ${(props) =>
      props.$variant === "red"
        ? "var(--color-red-blur-400)"
        : "var(--color-sky-blur-500)"};
    backdrop-filter: blur(10px);
  }

  &:hover {
    color: ${(props) =>
      props.$variant === "red"
        ? "var(--color-red-400)"
        : "var(--color-sky-500)"};
  }
`;

const LikeIcon = styled(HiMiniHeart)`
  font-size: 2rem;

  @media (width <= 1023px) {
    & {
      font-size: 1.6rem;
    }
  }
`;

const CommentIcon = styled(HiMiniChatBubbleOvalLeft)`
  font-size: 2rem;

  @media (width <= 1023px) {
    & {
      font-size: 1.6rem;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export default function PostInteractions() {
  return (
    <StyledPostInteractions>
      <Button $variant="red">
        <IconWrapper>
          <LikeIcon />
        </IconWrapper>
        <p>10.2K</p>
      </Button>

      <Button $variant="blue">
        <IconWrapper>
          <CommentIcon />
        </IconWrapper>
        <p>5.7K</p>
      </Button>

      <LikesListButton />
    </StyledPostInteractions>
  );
}
