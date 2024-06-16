import { useEffect } from "react";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Avatar from "../../ui/Avatar";
import Textarea from "../../ui/Textarea";

import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/currentUserSlice";
import { HiMiniPaperAirplane } from "react-icons/hi2";

const StyledAddCommentForm = styled.form`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: auto;
  background-color: var(--color-zinc-950);
`;

const AddCommentIcon = styled(HiMiniPaperAirplane)<{ $isActive: boolean }>`
  color: ${(props) =>
    props.$isActive ? "var(--color-sky-500)" : "var(--color-zinc-500)"};
  font-size: 2.4rem;
  transition: all 0.2s;

  &:hover {
    color: var(--color-sky-500);
  }
`;

type Props = {
  commentId?: string;
  onAddComment: (comment: string, commentId: string | null) => void;
};

type Inputs = {
  comment: string;
};

export default function AddCommentForm({ commentId, onAddComment }: Props) {
  const { currentUser } = useAppSelector(selectCurrentUser);
  const { register, handleSubmit, watch, setFocus, reset } = useForm<Inputs>({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onAddComment(data.comment, commentId ? commentId : null);
    reset();
  };

  useEffect(() => {
    setFocus("comment");
  }, [setFocus]);

  return (
    <StyledAddCommentForm onSubmit={handleSubmit(onSubmit)}>
      <Avatar variant="post" name={currentUser.name} src={currentUser.avatar} />
      <Textarea
        variant="comment"
        rows={1}
        placeholder="Write a comment..."
        {...register("comment")}
      />

      <Button disabled={!(watch("comment").length > 0)}>
        <AddCommentIcon $isActive={watch("comment").length > 0} />
      </Button>
    </StyledAddCommentForm>
  );
}
