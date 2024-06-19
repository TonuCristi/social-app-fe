import { useContext } from "react";
import styled from "styled-components";

import Button from "../../ui/Button";

import { HiMiniChatBubbleOvalLeft, HiMiniHeart } from "react-icons/hi2";
import { formatNumber } from "../../utils/formatNumber";
import { PostContext } from "./PostContext";

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
  onLikePost: () => void;
  onUnlikePost: () => void;
};

export default function PostInteractions({ onLikePost, onUnlikePost }: Props) {
  const { likes, isLiked, comments, setIsCommentsOpen, setIsLikesOpen } =
    useContext(PostContext);

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
          <p>{formatNumber(likes.length)}</p>
        </Button>

        <Button variant="postComments" onClick={() => setIsCommentsOpen(true)}>
          <IconWrapper>
            <CommentIcon />
          </IconWrapper>
          <p>{formatNumber(comments.length)}</p>
        </Button>

        <Button variant="postStats" onClick={() => setIsLikesOpen(true)}>
          <IconWrapper>
            <LikesIcon />
          </IconWrapper>
          Likes
        </Button>
      </StyledPostInteractions>
    </>
  );
}
