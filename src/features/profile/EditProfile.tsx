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
  const { register, handleSubmit, reset } = useForm<Inputs>({
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
    console.log(data);
    AuthApi.editUser(data, id)
      .then((res) => {
        console.log(res);
        // const user = mapUser(res);
        // dispatch(fetchUser(user));
        // setMessage({ text: "User edited!", isSuccess: true });
        // reset();
      })
      .catch((err) => {
        console.log(err);
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

        <Input
          variant="auth"
          type="text"
          placeholder="Avatar"
          {...register("avatar")}
        />

        <Input
          variant="auth"
          type="text"
          placeholder="Description"
          {...register("description")}
        />
        <ButtonWrapper>
          <Button variant="auth">Update</Button>
        </ButtonWrapper>
      </Form>

      <Message variant={message.isSuccess ? "regular" : "error"}>
        {message.text}
      </Message>
    </StyledEditProfile>
  );
}
