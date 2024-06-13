import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import Overlay from "../../ui/Overlay";
import Button from "../../ui/Button";
import Likes from "../likes/Likes";

import { HiMiniChatBubbleOvalLeft, HiMiniHeart } from "react-icons/hi2";
import { Comment, Like } from "../../lib/types";
import Comments from "../comments/Comments";

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
  comments: Comment[];
  onAddComment: (comment: string, commentId: string | null) => void;
  onDeleteComment: (commentId: string) => void;
  onEditComment: (commentId: string, comment: string) => void;
};

export default function PostInteractions({
  likes,
  isLiked,
  onLikePost,
  onUnlikePost,
  comments,
  onAddComment,
  onDeleteComment,
  onEditComment,
}: Props) {
  const [isLikesListOpen, setIsLikesListOpen] = useState<boolean>(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
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

        <Button variant="postComments" onClick={() => setIsCommentsOpen(true)}>
          <IconWrapper>
            <CommentIcon />
          </IconWrapper>
          <p>5.7K</p>
        </Button>

        <Button variant="postStats" onClick={() => setIsLikesListOpen(true)}>
          <IconWrapper>
            <LikesIcon />
          </IconWrapper>
          Likes
        </Button>
      </StyledPostInteractions>

      {isLikesListOpen &&
        createPortal(
          <Overlay>
            <Likes setIsLikesListOpen={setIsLikesListOpen} likes={likes} />
          </Overlay>,
          document.body
        )}

      {isCommentsOpen &&
        createPortal(
          <Overlay>
            <Comments
              setIsCommentsOpen={setIsCommentsOpen}
              comments={comments}
              onAddComment={onAddComment}
              onDeleteComment={onDeleteComment}
              onEditComment={onEditComment}
            />
          </Overlay>,
          document.body
        )}
    </>
  );
}
