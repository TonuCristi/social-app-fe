import { useState } from "react";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Message from "../../ui/Message";

import { fetchUser, selectCurrentUser } from "../../redux/currentUserSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AuthApi } from "../../api/AuthApi";
import { UserResponse } from "../../lib/types";

const StyledChangeEmail = styled.div`
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
  gap: 2.4rem;
`;

type Inputs = {
  email: string;
};

export default function ChangeEmail() {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { user } = useAppSelector(selectCurrentUser);
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
    AuthApi.changeEmail(data.email, user.id)
      .then((res) => {
        const user = mapUser(res);
        dispatch(fetchUser(user));
        setMessage({ text: "Email changed!", isSuccess: true });
        reset();
      })
      .catch((err) => {
        console.log(err);
        setMessage({ text: err.response.data.error, isSuccess: false });
      });
  };

  return (
    <StyledChangeEmail>
      <Title>Change Email</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          variant="auth"
          type="text"
          placeholder="New email"
          {...register("email")}
        />

        <Button variant="auth">Update</Button>
      </Form>

      {message.text && (
        <Message variant={message.isSuccess ? "regular" : "error"}>
          {message.text}
        </Message>
      )}
    </StyledChangeEmail>
  );
}
