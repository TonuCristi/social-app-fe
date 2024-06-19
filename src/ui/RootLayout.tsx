import styled from "styled-components";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./Navbar";
import Loader from "./Loader";
import LoaderWrapper from "./LoaderWrapper";

import { AuthApi } from "../api/AuthApi";
import { fetchUser, selectCurrentUser } from "../redux/currentUserSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { mapUser } from "../utils/mapUser";
import { loadError, loadPosts } from "../redux/postsSlice";
import { PostApi } from "../api/PostApi";
import { mapPosts } from "../utils/mapPosts";

const PER_PAGE = 6;

const StyledRootLayout = styled.div``;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function RootLayout() {
  const { isLoadingCurrentUser, errorCurrentUser, currentUser } =
    useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    AuthApi.getUser()
      .then((res) => dispatch(fetchUser(mapUser(res))))
      .catch((err) => console.log(err.response.data.error));
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser.id) return;

    function getPosts(perPage: number, offset: number) {
      PostApi.getUserPosts(currentUser.id, perPage, offset)
        .then((res) => {
          const posts = mapPosts(res);
          dispatch(loadPosts(posts));
        })
        .catch((err) => dispatch(loadError(err.response.data.error)));
    }

    getPosts(PER_PAGE, 0);
  }, [currentUser.id, dispatch]);

  if (isLoadingCurrentUser)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  if (errorCurrentUser) return <div>Something went wrong...</div>;

  return (
    <StyledRootLayout>
      <Container>
        <Navbar />

        <main>
          <Outlet />
        </main>
      </Container>
      <ScrollRestoration />
    </StyledRootLayout>
  );
}
