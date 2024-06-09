import styled from "styled-components";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";

import Navbar from "./Navbar";
import Loader from "./Loader";
import LoaderWrapper from "./LoaderWrapper";

import { AuthApi } from "../api/AuthApi";
import { fetchUser, selectCurrentUser } from "../redux/currentUserSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { mapUser } from "../utils/mapUser";
import { loadError, loadPosts } from "../redux/postsSlice";
import { PostApi } from "../api/PostApi";
import { PostResponse } from "../lib/types";
import { mapPost } from "../utils/mapPost";

const PER_PAGE = 6;

const StyledRootLayout = styled.div``;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function RootLayout() {
  const { isLoading, error, user } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const mapPosts = (posts: PostResponse[]) =>
    posts.map((post) => mapPost(post));

  const getPosts = useCallback(
    function getPosts(perPage: number, offset: number) {
      PostApi.getPosts(user.id, perPage, offset)
        .then((res) => {
          const posts = mapPosts(res);
          dispatch(loadPosts(posts));
        })
        .catch((err) => dispatch(loadError(err.response.data.error)));
    },
    [user.id, dispatch]
  );

  function handleRefetch() {
    if (location.pathname === "/") {
      getPosts(PER_PAGE, 0);
    }
  }

  useEffect(() => {
    AuthApi.getUser()
      .then((res) => dispatch(fetchUser(mapUser(res))))
      .catch((err) => console.log(err.response.data.error));
  }, [dispatch]);

  useEffect(() => {
    if (!user.id) return;

    getPosts(PER_PAGE, 0);
  }, [user.id, getPosts]);

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
        <Navbar onRefetch={handleRefetch} />

        <main>
          <Outlet />
        </main>
      </Container>
      <ScrollRestoration />
    </StyledRootLayout>
  );
}
