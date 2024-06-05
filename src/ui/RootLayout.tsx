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
import { loadPosts, selectPosts } from "../redux/postsSlice";
import { loadError } from "../redux/authSlice";
import { PostApi } from "../api/PostApi";
import { PostResponse } from "../lib/types";
import { mapPost } from "../utils/mapPost";

const PER_PAGE = 4;

const StyledRootLayout = styled.div``;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function RootLayout() {
  const { isLoading, error, user } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector(selectPosts);

  const mapPosts = (posts: PostResponse[]) =>
    posts.map((post) => mapPost(post));

  function getPosts(perPage: number, offset: number) {
    console.log("Executed");

    PostApi.getPosts(user.id, perPage, offset)
      .then((res) => {
        const posts = mapPosts(res);
        dispatch(loadPosts(posts));
      })
      .catch((err) => dispatch(loadError(err.response.data.error)));
  }

  useEffect(() => {
    AuthApi.getUser()
      .then((res) => dispatch(fetchUser(mapUser(res))))
      .catch((err) => console.log(err.response.data.error));
  }, [dispatch]);

  useEffect(() => {
    if (!user.id) return;

    getPosts(PER_PAGE, posts.length);

    return () => {
      dispatch(loadPosts([]));
    };
  }, [user.id, dispatch]);

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
        <Navbar getPosts={getPosts} />

        <main>
          <Outlet />
        </main>
      </Container>
      <ScrollRestoration />
    </StyledRootLayout>
  );
}
