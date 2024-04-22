import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./Navbar";
import Loader from "./Loader";
import LoaderWrapper from "./LoaderWrapper";

import { AuthApi } from "../api/AuthApi";
import { fetchUser, selectCurrentUser } from "../redux/currentUserSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { mapUser } from "../utils/mapUser";

const StyledRootLayout = styled.div``;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  height: 100%;
`;

export default function RootLayout() {
  const { isLoading, error } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

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
      <Container>
        <Navbar />

        <Main>
          <Outlet />
        </Main>
      </Container>
    </StyledRootLayout>
  );
}
