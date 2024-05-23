import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { PostT } from "../../lib/types";
import { HiMiniXMark } from "react-icons/hi2";
import { Dispatch, SetStateAction } from "react";

const StyledEditPostModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  border-radius: 1.1rem;
  padding: 2.4rem;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  color: var(--color-zinc-100);
  font-size: 2.4rem;
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

const StyledEditPostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 1.2rem;
  width: 100%;
`;

type Inputs = {
  description: string;
};

type Props = {
  post: PostT;
  onUpdatePostDescription: (description: string) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EditPostModal({
  post,
  onUpdatePostDescription,
  setIsOpen,
}: Props) {
  const { description } = post;
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      description,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onUpdatePostDescription(data.description);
  };

  return (
    <StyledEditPostModal>
      <Container>
        <Title>Edit post</Title>
        <Button onClick={() => setIsOpen(false)}>
          <CloseIcon />
        </Button>
      </Container>

      <StyledEditPostForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          variant="auth"
          placeholder="Description"
          {...register("description")}
        />

        <ButtonWrapper>
          <Button variant="auth">Save</Button>
        </ButtonWrapper>
      </StyledEditPostForm>
    </StyledEditPostModal>
  );
}
