import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import Overlay from "../../ui/Overlay";
import LikesList from "./LikesList";
import Button from "../../ui/Button";

import { HiMiniChatBubbleOvalLeft, HiMiniHeart } from "react-icons/hi2";
import { Like } from "../../lib/types";

const StyledPostInteractions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LikeIcon = styled(HiMiniHeart)<{ $isLiked?: boolean }>`
  font-size: 2rem;
  color: ${(props) => props.$isLiked && "var(--color-red-400)"};

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

const LikesIcon = styled(HiMiniHeart)`
  font-size: 2rem;

  @media (width <= 1023px) {
    & {
      font-size: 1.6rem;
    }
  }
`;

type Props = {
  likes: Like[];
  isLiked: boolean;
  onLikePost: () => void;
  onUnlikePost: () => void;
  isLoading: boolean;
};

export default function PostInteractions({
  likes,
  isLiked,
  onLikePost,
  onUnlikePost,
  isLoading,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const likesCount = Intl.NumberFormat("en", { notation: "compact" }).format(
    likes.length
  );

  return (
    <>
      <StyledPostInteractions>
        <Button
          variant="postLike"
          onClick={isLiked ? onUnlikePost : onLikePost}
        >
          <IconWrapper>
            <LikeIcon $isLiked={isLiked} />
          </IconWrapper>
          <p>{likesCount}</p>
        </Button>

        <Button variant="postComments">
          <IconWrapper>
            <CommentIcon />
          </IconWrapper>
          <p>5.7K</p>
        </Button>

        <Button variant="postStats" onClick={() => setIsOpen(true)}>
          <IconWrapper>
            <LikesIcon />
          </IconWrapper>
          Likes
        </Button>
      </StyledPostInteractions>

      {isOpen &&
        createPortal(
          <Overlay>
            <LikesList setIsOpen={setIsOpen} />
          </Overlay>,
          document.body
        )}
    </>
  );
}
