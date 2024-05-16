import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { PostT } from "../../lib/types";

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
};

export default function EditPostForm({ post, onUpdatePostDescription }: Props) {
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
  );
}
