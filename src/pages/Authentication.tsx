import styled from "styled-components";

import AuthForm from "../features/authentication/AuthForm";

import { UserLoginRequest, UserSignupRequest } from "../lib/types";
import { loadToken, loadError, addToken } from "../redux/authSlice";
import { AuthApi } from "../api/AuthApi";
import { useAppDispatch } from "../redux/hooks";

const StyledAuthentication = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.4rem;
`;

const Title = styled.h1`
  color: var(--color-zinc-100);
  font-size: 2rem;
`;

export default function Authentication() {
  const dispatch = useAppDispatch();

  const handleSignup = (user: UserSignupRequest) => {
    dispatch(loadToken());
    AuthApi.signup(user)
      .then((res) => {
        localStorage.setItem("token", res);
        dispatch(addToken(res));
      })
      .catch((err) => dispatch(loadError(err.response.data.error)));
  };

  const handleLogin = (user: UserLoginRequest) => {
    dispatch(loadToken());
    AuthApi.login(user)
      .then((res) => {
        localStorage.setItem("token", res);
        dispatch(addToken(res));
      })
      .catch((err) => dispatch(loadError(err.response.data.error)));
  };

  return (
    <StyledAuthentication>
      <Title>Welcome to Bribe</Title>
      <AuthForm onSignup={handleSignup} onLogin={handleLogin} />
    </StyledAuthentication>
  );
}
