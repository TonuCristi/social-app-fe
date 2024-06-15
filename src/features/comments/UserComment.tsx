import { useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import LoadingComment from "./LoadingComment";

import { Comment } from "../../lib/types";
import { useUser } from "../../hooks/useUser";
import { getTimePassed } from "../../utils/getTimePassed";
import { NavLink } from "react-router-dom";
import { HiMiniPencilSquare, HiMiniXMark } from "react-icons/hi2";

const StyledUserComment = styled.li`
  margin-right: 1.2rem;
  padding: 0.8rem;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1.4rem;
  row-gap: 0.4rem;
`;

const Container = styled.div<{ $isEditing: boolean }>`
  background-color: var(--color-zinc-800);
  border-radius: 1.1rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: auto min-content min-content ${(props) =>
      props.$isEditing ? "min-content min-content" : ""};
  align-items: center;
  gap: 1rem;
`;

const ProfileLink = styled(NavLink)`
  text-decoration: none;
`;

const Name = styled.h4`
  color: var(--color-zinc-100);

  @media (width <= 1279px) {
    & {
      font-size: 1.4rem;
    }
  }
`;

const CommentContent = styled.pre<{ $isEditing: boolean }>`
  color: var(--color-zinc-300);
  grid-row: 2;
  grid-column: 1 / ${(props) => (props.$isEditing ? "6" : "3")};
  white-space: pre-wrap;
  word-break: break-all;
`;

const TextareaWrapper = styled.div<{ $isEditing: boolean }>`
  grid-row: 2;
  grid-column: 1 / ${(props) => (props.$isEditing ? "6" : "3")};
`;

const CommentInteractions = styled.div`
  grid-row: 2;
  grid-column: 2;
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const EditIcon = styled(HiMiniPencilSquare)`
  color: var(--color-zinc-100);
  font-size: 2.4rem;
  padding: 0.1rem;
  border-radius: 100%;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-sky-500);
  }
`;

const DeleteIcon = styled(HiMiniXMark)`
  color: var(--color-zinc-100);
  font-size: 2.4rem;
  padding: 0.1rem;
  border-radius: 100%;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-sky-500);
  }
`;

const PostTime = styled.span`
  font-size: 1.4rem;
  color: var(--color-zinc-300);
`;

const FormWrapper = styled.div`
  grid-row: 3;
  grid-column: 2;
  margin-top: 0.8rem;
`;

type Props = {
  comment: Comment;
  onDeleteComment: (commentId: string) => void;
  onEditComment: (commentId: string, comment: string) => void;
};

export default function UserComment({
  comment,
  onDeleteComment,
  onEditComment,
}: Props) {
  const [isResponseFormOpen, setIsResponseFormOpen] = useState<boolean>(false);
  const { id, comment: commentContent, user_id, createdAt } = comment;
  const { isLoading, user } = useUser(user_id);
  const { register, watch } = useForm({
    defaultValues: {
      comment: commentContent,
    },
  });
  const commentRef = useRef<HTMLPreElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [rowsCount, setRowsCount] = useState<number>(0);

  function handleEdit() {
    setIsEditing(true);

    if (!commentRef.current) return;
    const rows = commentRef.current.textContent?.split("\n").length
      ? commentRef.current.textContent?.split("\n").length
      : 0;
    setRowsCount(rows);
  }

  function handleSave() {
    onEditComment(id, watch("comment"));
    setIsEditing(false);
  }

  if (isLoading) return <LoadingComment />;

  return (
    <StyledUserComment>
      <Avatar variant="post" name={user?.name} src={user?.avatar} />

      <Container $isEditing={isEditing}>
        <ProfileLink to="/profile">
          <Name>{user?.name}</Name>
        </ProfileLink>

        {isEditing && (
          <Button
            variant="discardCommentEdit"
            onClick={() => setIsEditing(false)}
          >
            Discard
          </Button>
        )}
        {isEditing && (
          <Button
            variant="saveCommentEdit"
            disabled={watch("comment") === commentContent}
            onClick={handleSave}
          >
            Save
          </Button>
        )}

        <Button onClick={handleEdit}>
          <EditIcon />
        </Button>

        <Button onClick={() => onDeleteComment(id)}>
          <DeleteIcon />
        </Button>

        {isEditing ? (
          <TextareaWrapper $isEditing={isEditing}>
            <Textarea
              variant="comment"
              rows={rowsCount}
              {...register("comment")}
            />
          </TextareaWrapper>
        ) : (
          <CommentContent ref={commentRef} $isEditing={isEditing}>
            {commentContent}
          </CommentContent>
        )}
      </Container>

      <CommentInteractions>
        <PostTime>{getTimePassed(createdAt)}</PostTime>
        <Button variant="comment" onClick={() => setIsResponseFormOpen(true)}>
          Respond
        </Button>
      </CommentInteractions>
      {isResponseFormOpen && (
        <FormWrapper>{/* <AddCommentForm /> */}</FormWrapper>
      )}
    </StyledUserComment>
  );
}
