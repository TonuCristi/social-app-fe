import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";

import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";

import { PostT } from "../../lib/types";
import { HiMiniXMark } from "react-icons/hi2";

const StyledEditPostModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  border-radius: 1.1rem;
  padding: 2.4rem;
  width: 30%;

  @media (width >= 1535px) {
    & {
      max-width: 50rem;
    }
  }

  @media (width <= 1279px) {
    & {
      width: 40%;
    }
  }

  @media (width <= 1023px) {
    & {
      width: 60%;
    }
  }

  @media (width <= 767px) {
    & {
      width: 80%;
    }
  }

  @media (width <= 639px) {
    & {
      width: 90%;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledEditPostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
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

const ButtonWrapper = styled.div`
  margin-top: 1.2rem;
  width: 50%;
`;

type Inputs = {
  description: string;
};

type Props = {
  post: PostT;
  onUpdatePostDescription: (description: string) => void;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EditPostModal({
  post,
  onUpdatePostDescription,
  setIsEditModalOpen,
}: Props) {
  const { description } = post;
  const { register, handleSubmit, setFocus } = useForm<Inputs>({
    defaultValues: {
      description,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onUpdatePostDescription(data.description);
  };

  useEffect(() => {
    setFocus("description");
  }, [setFocus]);

  return (
    <StyledEditPostModal>
      <Container>
        <Title>Edit post</Title>
        <Button onClick={() => setIsEditModalOpen(false)}>
          <CloseIcon />
        </Button>
      </Container>

      <StyledEditPostForm onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          variant="editPost"
          rows={4}
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
