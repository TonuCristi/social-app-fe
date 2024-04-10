import { useState } from "react";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Message from "../../ui/Message";
import Loader from "../../ui/Loader";

import { UserLoginRequest, UserSignupRequest } from "../../lib/types";
import { loadError, selectAuth } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Container = styled.div`
  border: 1px solid var(--color-zinc-500);
  border-radius: 1.1rem;
  padding: 2.4rem;
  width: 20%;
`;

const StyledAuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding-bottom: 2.4rem;
  border-bottom: 1px solid var(--color-zinc-500);
  margin-bottom: 2.4rem;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  color: var(--color-zinc-100);
  text-align: center;
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 1.2rem;
`;

const MessageWrapper = styled.div`
  margin-top: 1.2rem;
`;

type AuthInputs = {
  name: string;
  email: string;
  password: string;
  birth_date: string;
};

type Props = {
  onSignup: (user: UserSignupRequest) => void;
  onLogin: (user: UserLoginRequest) => void;
};

export default function AuthForm({ onSignup, onLogin }: Props) {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { register, handleSubmit, reset } = useForm<AuthInputs>();
  const { isLoading, error } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<AuthInputs> = (data) => {
    if (!isLogin) onSignup({ ...data, description: "", avatar: "" });
    if (isLogin) onLogin(data);
  };

  if (isLoading) return <Loader />;

  return (
    <Container>
      <Title>{isLogin ? "Login" : "Signup"}</Title>
      <StyledAuthForm onSubmit={handleSubmit(onSubmit)}>
        {!isLogin && (
          <Input
            variant="auth"
            type="text"
            placeholder="Username"
            {...register("name")}
          />
        )}
        <Input
          variant="auth"
          type="text"
          placeholder="Email"
          {...register("email")}
        />
        <Input
          variant="auth"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {!isLogin && (
          <Input variant="auth" type="date" {...register("birth_date")} />
        )}

        <ButtonWrapper>
          <Button variant="auth">{isLogin ? "Login" : "Signup"}</Button>
        </ButtonWrapper>
        {error && (
          <MessageWrapper>
            <Message variant="error">{error}</Message>
          </MessageWrapper>
        )}
      </StyledAuthForm>

      <Button
        variant="auth"
        onClick={() => {
          setIsLogin((prev) => !prev);
          dispatch(loadError(""));
          reset();
        }}
      >
        {isLogin ? "Don't have an account?" : "Have an account?"}
      </Button>
    </Container>
  );
}
