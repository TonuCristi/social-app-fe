import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./Navbar";
import Loader from "./Loader";
import LoaderWrapper from "./LoaderWrapper";

import { AuthApi } from "../api/AuthApi";
import { UserResponse } from "../lib/types";
import { fetchUser, selectCurrentUser } from "../redux/currentUserSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const StyledRootLayout = styled.div`
  /* height: 100vh; */
`;

const Main = styled.main``;

export default function RootLayout() {
  const { isLoading, error } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const mapUser = (user: UserResponse) => {
    const { _id: id, ...rest } = user;
    return {
      id,
      ...rest,
    };
  };

  useEffect(() => {
    AuthApi.getUser()
      .then((res) => dispatch(fetchUser(mapUser(res))))
      .catch((err) => console.log(err.response.data.error));
  }, [dispatch]);

  if (isLoading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledRootLayout>
      <Navbar variant="relative" opacity="0" />
      <Navbar variant="fixed" opacity="1" />

      <Main>
        <Outlet />
      </Main>
    </StyledRootLayout>
  );
}
