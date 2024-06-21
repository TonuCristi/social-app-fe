import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import LoadingComment from "./LoadingComment";
import ProfileLink from "../../ui/ProfileLink";

import { Comment, CommentResponse } from "../../lib/types";
import { useUser } from "../../hooks/useUser";
import { getTimePassed } from "../../utils/getTimePassed";
import { HiMiniPencilSquare, HiMiniXMark } from "react-icons/hi2";
import { PostContext } from "../posts/PostContext";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/currentUserSlice";

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

const ProfileLinkWrapper = styled.div`
  justify-self: start;
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
  grid-row: 2;
  grid-column: 2;
  font-size: 1.4rem;
  color: var(--color-zinc-300);
`;

type Props = {
  comment: Comment;
  onAddComment: (
    postId: string,
    comment: string,
    commentId: string | null,
    cb: (res: CommentResponse) => void
  ) => void;
  onEditComment: (
    id: string,
    comment: string,
    cb: (res: CommentResponse) => void
  ) => void;
};

export default function UserComment({ comment, onEditComment }: Props) {
  const { id, comment: commentContent, user_id, createdAt } = comment;
  const { isLoading, user } = useUser(user_id);
  const { currentUser } = useAppSelector(selectCurrentUser);
  const { register, watch } = useForm({
    defaultValues: {
      comment: commentContent,
    },
  });
  const commentRef = useRef<HTMLPreElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { editComment, setCommentIdToDelete } = useContext(PostContext);

  const handleSave = () =>
    onEditComment(id, watch("comment"), (res) => {
      editComment(id, res);
      setIsEditing(false);
    });

  if (isLoading) return <LoadingComment />;

  return (
    <StyledUserComment>
      <ProfileLink to={`/profile/${user?.id}`}>
        <Avatar variant="post" name={user?.name} src={user?.avatar} />
      </ProfileLink>

      <Container $isEditing={isEditing}>
        <ProfileLinkWrapper>
          <ProfileLink to={`/profile/${user?.id}`}>
            <Name>{user?.name}</Name>
          </ProfileLink>
        </ProfileLinkWrapper>

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

        {currentUser.id === user_id && (
          <Button onClick={() => setIsEditing(true)}>
            <EditIcon />
          </Button>
        )}

        {currentUser.id === user_id && (
          <Button onClick={() => setCommentIdToDelete(id)}>
            <DeleteIcon />
          </Button>
        )}

        {isEditing ? (
          <TextareaWrapper $isEditing={isEditing}>
            <Textarea
              variant="comment"
              rows={
                watch("comment").split("\n").length <= 4
                  ? watch("comment").split("\n").length
                  : 4
              }
              {...register("comment")}
            />
          </TextareaWrapper>
        ) : (
          <CommentContent ref={commentRef} $isEditing={isEditing}>
            {commentContent}
          </CommentContent>
        )}
      </Container>

      <PostTime>{getTimePassed(createdAt)}</PostTime>
    </StyledUserComment>
  );
}
