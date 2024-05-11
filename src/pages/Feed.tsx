import { useEffect, useRef } from "react";
import styled from "styled-components";

import Posts from "../features/posts/Posts";
import AddPostForm from "../features/posts/AddPostForm";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/currentUserSlice";
import {
  addingPost,
  addPost,
  loadMorePosts,
  loadPosts,
  selectPosts,
} from "../redux/postsSlice";
import { PostRequestFile, PostResponse } from "../lib/types";
import { PostApi } from "../api/PostApi";
import { loadError } from "../redux/authSlice";
import { mapPost } from "../utils/mapPost";

const PER_PAGE = 4;

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
  const { posts } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();
  const elRef = useRef<HTMLDivElement>(null);

  const mapPosts = (posts: PostResponse[]) =>
    posts.map((post) => mapPost(post));

  function handleCreatePost(post: PostRequestFile) {
    dispatch(addingPost());

    PostApi.createPost({ ...post, image: "" }).then((res) =>
      dispatch(addPost(mapPost(res)))
    );
  }

  useEffect(() => {
    PostApi.getPosts(user.id, PER_PAGE, posts.length)
      .then((res) => {
        const posts = mapPosts(res);
        dispatch(loadPosts(posts));
      })
      .catch((err) => dispatch(loadError(err.response.data.error)));
  }, [user.id, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const h = window.innerHeight;
      const elTop = elRef.current?.getBoundingClientRect().top;

      if (!elTop) return;

      // console.log(h);
      if (elTop - h < 0) {
        console.log(posts.length);
        // PostApi.getPosts(user.id, PER_PAGE, posts.length)
        //   .then((res) => {
        //     const posts = mapPosts(res);
        //     dispatch(loadMorePosts(posts));
        //   })
        //   .catch((err) => dispatch(loadError(err.response.data.error)));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.addEventListener("scroll", handleScroll);
  }, [user.id, dispatch, posts.length]);

  return (
    <StyledFeed>
      <AddPostForm onCreatePost={handleCreatePost} />
      <Posts />
      <div ref={elRef}></div>
    </StyledFeed>
  );
}
