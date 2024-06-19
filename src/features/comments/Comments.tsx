import { useContext } from "react";
import styled from "styled-components";

import Button from "../../ui/Button";
import AddCommentForm from "./AddCommentForm";
import UserComment from "./UserComment";

import { HiMiniXMark } from "react-icons/hi2";
import { CommentResponse, PostT } from "../../lib/types";
import { PostContext } from "../posts/PostContext";

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

type Props = {
  post: PostT;
  onAddComment: (
    postId: string,
    comment: string,
    commentId: string | null,
    cb: (res: CommentResponse) => void
  ) => void;
  onDeleteComment: (id: string, cb: () => void) => void;
  onEditComment: (
    id: string,
    comment: string,
    cb: (res: CommentResponse) => void
  ) => void;
};

export default function Comments({
  post,
  onAddComment,
  onDeleteComment,
  onEditComment,
}: Props) {
  const { comments, setIsCommentsOpen } = useContext(PostContext);

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
            onAddComment={onAddComment}
            onDeleteComment={onDeleteComment}
            onEditComment={onEditComment}
          />
        ))}
      </CommentsList>

      <AddCommentForm post={post} onAddComment={onAddComment} />
    </StyledComments>
  );
}
