import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";

import { HiMiniXMark, HiMiniPaperAirplane } from "react-icons/hi2";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/currentUserSlice";
import UserComment from "./UserComment";
import { SubmitHandler, useForm } from "react-hook-form";

const StyledComments = styled.div`
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  border-radius: 1.1rem;
  width: 40%;
  height: 60%;
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
`;

const AddCommentForm = styled.form`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: auto;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  resize: none;
  background-color: var(--color-zinc-900);
  border: none;
  font-weight: 500;
  padding: 1.2rem;
  width: 100%;
  border-radius: 1.1rem;
  outline: none;
  color: var(--color-zinc-100);

  &::placeholder {
    color: var(--color-zinc-500);
  }
`;

const AddCommentIcon = styled(HiMiniPaperAirplane)<{ $isActive: boolean }>`
  color: ${(props) =>
    props.$isActive ? "var(--color-sky-500)" : "var(--color-zinc-500)"};
  font-size: 2rem;
  transition: all 0.2s;

  &:hover {
    color: var(--color-sky-500);
  }
`;

type Props = {
  setIsCommentsOpen: Dispatch<SetStateAction<boolean>>;
};

type Inputs = {
  comment: string;
};

export default function Comments({ setIsCommentsOpen }: Props) {
  const { user } = useAppSelector(selectCurrentUser);
  const { register, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <StyledComments>
      <Container>
        <Title>Comments</Title>
        <Button onClick={() => setIsCommentsOpen(false)}>
          <CloseIcon />
        </Button>
      </Container>

      <CommentsList>
        <li>
          <UserComment />
        </li>
        <li>
          <UserComment />
        </li>
        <li>
          <UserComment />
        </li>
        <li>
          <UserComment />
        </li>
        <li>
          <UserComment />
        </li>
        <li>
          <UserComment />
        </li>
        <li>
          <UserComment />
        </li>
      </CommentsList>

      <AddCommentForm onSubmit={handleSubmit(onSubmit)}>
        <Avatar variant="post" name={user.name} src={user.avatar} />
        <CommentTextarea
          rows={1}
          placeholder="Write a comment..."
          {...register("comment")}
        />

        <Button disabled={!(watch("comment").length > 0)}>
          <AddCommentIcon $isActive={watch("comment").length > 0} />
        </Button>
      </AddCommentForm>
    </StyledComments>
  );
}
