import { useEffect, useRef } from "react";
import styled from "styled-components";

import Posts from "../features/posts/Posts";
import AddPostForm from "../features/posts/AddPostForm";
import Post from "../features/posts/Post";
import UserPost from "../features/posts/UserPost";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/currentUserSlice";
import {
  startLoad,
  addPost,
  loadMorePosts,
  selectPosts,
  loadError,
} from "../redux/postsSlice";
import { PostRequestFile, PostResponse } from "../lib/types";
import { PostApi } from "../api/PostApi";
import { mapPost } from "../utils/mapPost";

const PER_PAGE = 6;

const StyledFeed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 2.4rem;
`;

export default function Feed() {
  const { user } = useAppSelector(selectCurrentUser);
  const { isLoading, error, posts } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();
  const status = useRef<boolean>(false);

  const mapPosts = (posts: PostResponse[]) =>
    posts.map((post) => mapPost(post));

  function handleCreatePost(post: PostRequestFile) {
    dispatch(startLoad());

    PostApi.createPost({ ...post, image: "" }).then((res) =>
      dispatch(addPost(mapPost(res)))
    );
  }

  useEffect(() => {
    const scroll = sessionStorage.getItem("scroll");

    if (!scroll || +scroll === 0) return;

    window.scrollTo(0, +scroll);

    return () => sessionStorage.removeItem("scroll");
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    function fetchData() {
      sessionStorage.setItem("scroll", `${window.scrollY}`);

      if (status.current) return;

      status.current = true;
      // console.log(PER_PAGE, posts.length, posts.length + PER_PAGE);
      PostApi.getPosts(user.id, PER_PAGE, posts.length)
        .then((res) => {
          const posts = mapPosts(res);
          dispatch(loadMorePosts(posts));
        })
        .catch((err) => dispatch(loadError(err.response.data.error)))
        .finally(() => {
          status.current = false;
        });
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    }, options);

    const target = document.querySelector(".target");
    if (!target) return;
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [dispatch, user.id, posts.length, isLoading]);

  return (
    <StyledFeed>
      <AddPostForm onCreatePost={handleCreatePost} />

      <Posts variant="feed" isLoading={isLoading} error={error}>
        {posts.map((post) =>
          post.user_id === user.id ? (
            <UserPost key={post.id} post={post} />
          ) : (
            <Post key={post.id} post={post} />
          )
        )}
      </Posts>

      {posts.length > 0 && <div className="target" />}
    </StyledFeed>
  );
}
