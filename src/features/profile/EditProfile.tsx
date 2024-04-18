import styled from "styled-components";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";

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
  avatar: string;
  description: string;
};

export default function EditProfile() {
  const {
    user: { id, name, avatar, birth_date, description },
  } = useAppSelector(selectCurrentUser);
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name,
      avatar,
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
    console.log(data.avatar[0]);
    const supabase = createClient(
      "https://bgkxchokxutqxvteescl.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJna3hjaG9reHV0cXh2dGVlc2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0NjUzMTgsImV4cCI6MjAyOTA0MTMxOH0.kTUwTjBo06TYKUAAn4LpSJCmXqnFOVeApGCLihbUwKA"
    );

    async function uploadFile(file) {
      const { data, error } = await supabase.storage
        .from("imgs")
        .upload(`${id}`, file);
      if (error) {
        setMessage({
          text: "Something went wrong with uploading the avatar",
          isSuccess: false,
        });
      } else {
        return `https://bgkxchokxutqxvteescl.supabase.co/storage/v1/object/public/imgs/${data.path}`;
      }
    }

    let photo: string = "";
    uploadFile(data.avatar[0]).then((res) => {
      if (res) photo = res;
      else photo = "";
    });

    AuthApi.editUser(data, id)
      .then((res) => {
        const user = mapUser(res);
        dispatch(fetchUser({ ...user, avatar: photo }));
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

        {/* <Input
          variant="auth"
          type="text"
          placeholder="Avatar"
          {...register("avatar")}
        /> */}

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
