import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import Button from "../../ui/Button";
import UserComment from "./UserComment";
import AddCommentForm from "./AddCommentForm";

import { HiMiniXMark } from "react-icons/hi2";
import { Comment } from "../../lib/types";

const StyledComments = styled.div`
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  border-radius: 1.1rem;
  width: 40%;
  height: 80%;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (width >= 1535px) {
    & {
      max-width: 60rem;
    }
  }

  @media (width <= 1279px) {
    & {
      width: 50%;
    }
  }

  @media (width <= 1023px) {
    & {
      width: 60%;
    }
  }

  @media (width <= 767px) {
    & {
      width: 70%;
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

const CommentsList = styled.ul`
  list-style: none;
  color: var(--color-zinc-100);
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

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
  setIsCommentsOpen: Dispatch<SetStateAction<boolean>>;
  comments: Comment[];
  onAddComment: (comment: string, commentId: string | null) => void;
  onDeleteComment: (commentId: string) => void;
  onEditComment: (commentId: string, comment: string) => void;
};

export default function Comments({
  setIsCommentsOpen,
  comments,
  onAddComment,
  onDeleteComment,
  onEditComment,
}: Props) {
  return (
    <StyledComments>
      <Container>
        <Title>Comments</Title>
        <Button onClick={() => setIsCommentsOpen(false)}>
          <CloseIcon />
        </Button>
      </Container>

      <CommentsList>
        {comments.map((comment) => (
          <UserComment
            key={comment.id}
            comment={comment}
            onDeleteComment={onDeleteComment}
            onEditComment={onEditComment}
          />
        ))}
      </CommentsList>

      <AddCommentForm onAddComment={onAddComment} />
    </StyledComments>
  );
}
