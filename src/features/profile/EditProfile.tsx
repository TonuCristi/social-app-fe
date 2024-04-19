import styled from "styled-components";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Message from "../../ui/Message";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserResponse } from "../../lib/types";
import { AuthApi } from "../../api/AuthApi";
import { fetchUser, selectCurrentUser } from "../../redux/currentUserSlice";
import { HiMiniPhoto } from "react-icons/hi2";

const StyledEditProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`;

const Container = styled.div`
  align-self: center;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const PhotoIcon = styled(HiMiniPhoto)`
  color: var(--color-zinc-500);
  font-size: 2.4rem;
  transition: all 0.2s;

  &:hover {
    color: var(--color-sky-500);
  }
`;

const Textarea = styled.textarea`
  border: none;
  background: none;
  outline: none;
  background-color: var(--color-zinc-800);
  padding: 1.2rem;
  border-radius: 1.1rem;
  color: var(--color-zinc-100);
`;

const ButtonWrapper = styled.div`
  margin-top: 1.2rem;
  width: 100%;
`;

type Inputs = {
  name: string;
  birth_date: string;
  avatar: FileList;
  description: string;
};

export default function EditProfile() {
  const {
    user: { id, name, birth_date, description },
  } = useAppSelector(selectCurrentUser);
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name,
      birth_date: new Date(birth_date).toLocaleDateString(),
      description,
    },
  });
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<{
    text: string;
    isSuccess: boolean;
  }>({
    text: "",
    isSuccess: false,
  });

  const mapUser = (user: UserResponse) => {
    const { _id: id, ...rest } = user;
    return { id, ...rest };
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    AuthApi.editUser(data, id)
      .then((res) => {
        const user = mapUser(res);
        console.log(user);
        dispatch(fetchUser(user));
        setMessage({ text: "User edited!", isSuccess: true });
      })
      .catch((err) => {
        setMessage({ text: err.response.data.error, isSuccess: false });
      });
  };

  return (
    <StyledEditProfile>
      <Title>Change Email</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          variant="auth"
          type="text"
          placeholder="Name"
          {...register("name")}
        />

        <Input
          variant="auth"
          type="text"
          placeholder="Birth date"
          {...register("birth_date")}
        />

        <Container>
          <FileInputLabel htmlFor="file">
            <PhotoIcon />
          </FileInputLabel>
          <FileInput
            type="file"
            id="file"
            accept="image/png, image/jpeg"
            {...register("avatar")}
          />
        </Container>

        <Textarea placeholder="Description" {...register("description")} />

        <ButtonWrapper>
          <Button variant="auth">Update</Button>
        </ButtonWrapper>
      </Form>

      {message.text && (
        <Message variant={message.isSuccess ? "regular" : "error"}>
          {message.text}
        </Message>
      )}
    </StyledEditProfile>
  );
}
