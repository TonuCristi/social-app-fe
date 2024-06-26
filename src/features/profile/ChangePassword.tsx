import styled from "styled-components";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../../ui/Button";
import Message from "../../ui/Message";
import PasswordField from "./PasswordField";

import { AuthApi } from "../../api/AuthApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/currentUserSlice";

const fields = [
  { identifier: "oldPassword", placeholder: "Old password" },
  { identifier: "newPassword", placeholder: "New password" },
  { identifier: "newPasswordRepeat", placeholder: "Repeat new password" },
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
  const { currentUser } = useAppSelector(selectCurrentUser);
  const [message, setMessage] = useState<{ value: string; isSuccess: boolean }>(
    {
      value: "",
      isSuccess: false,
    }
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    AuthApi.changePassword(data, currentUser.id)
      .then((res) => {
        toast.success(res.message);
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
          <PasswordField
            key={field.identifier}
            placeholder={field.placeholder}
            {...register(field.identifier)}
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
