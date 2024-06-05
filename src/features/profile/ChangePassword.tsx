import styled from "styled-components";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Message from "../../ui/Message";

import { AuthApi } from "../../api/AuthApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/currentUserSlice";

const fields = [
  { name: "oldPassword", placeholder: "Old password" },
  { name: "newPassword", placeholder: "New password" },
  { name: "newPasswordRepeat", placeholder: "Repeat new password" },
] as const;

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
  const [message, setMessage] = useState<{ value: string; isSuccess: boolean }>(
    {
      value: "",
      isSuccess: false,
    }
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    AuthApi.changePassword(data, user.id)
      .then((res) => {
        setMessage({ value: res.message, isSuccess: true });
        reset();
      })
      .catch((err) =>
        setMessage({ value: err.response.data.error, isSuccess: false })
      );
  };

  return (
    <StyledChangePassword>
      <Title>Change password</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <Input
            key={field.name}
            variant="auth"
            type="password"
            placeholder={field.placeholder}
            {...register(field.name)}
          />
        ))}

        <ButtonWrapper>
          <Button variant="auth">Update</Button>
        </ButtonWrapper>
      </Form>

      {message.value && (
        <Message variant={message.isSuccess ? "regular" : "error"}>
          {message.value}
        </Message>
      )}
    </StyledChangePassword>
  );
}
