import styled from "styled-components";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Message from "../../ui/Message";

import { AuthApi } from "../../api/AuthApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/currentUserSlice";

const StyledChangePassword = styled.div`
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
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

export default function ChangePassword() {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { user } = useAppSelector(selectCurrentUser);
  const [message, setMessage] = useState<{ text: string; isSuccess: boolean }>({
    text: "",
    isSuccess: false,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    AuthApi.changePassword(data, user.id)
      .then((res) => {
        setMessage({ text: res.message, isSuccess: true });
        reset();
      })
      .catch((err) =>
        setMessage({ text: err.response.data.error, isSuccess: false })
      );
  };

  return (
    <StyledChangePassword>
      <Title>Change password</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          variant="auth"
          type="password"
          placeholder="Old password"
          {...register("oldPassword")}
        />
        <Input
          variant="auth"
          type="password"
          placeholder="New password"
          {...register("newPassword")}
        />
        <Input
          variant="auth"
          type="password"
          placeholder="Repeat new password"
          {...register("newPasswordRepeat")}
        />

        <ButtonWrapper>
          <Button variant="auth">Update</Button>
        </ButtonWrapper>
      </Form>

      {message.text && (
        <Message variant={message.isSuccess ? "regular" : "error"}>
          {message.text}
        </Message>
      )}
    </StyledChangePassword>
  );
}
