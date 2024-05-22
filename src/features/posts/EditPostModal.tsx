import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { PostT } from "../../lib/types";

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

const Title = styled.h3`
  color: var(--color-zinc-100);
  font-size: 2.4rem;
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
  onUpdatePostDescription: (
    description: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => void;
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
    onUpdatePostDescription(data.description, setIsOpen);
  };

  return (
    <StyledEditPostModal>
      <Title>Edit post</Title>
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
