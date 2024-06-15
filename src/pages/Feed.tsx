import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

import Posts from "../features/posts/Posts";
import AddPostForm from "../features/posts/AddPostForm";
import Post from "../features/posts/Post";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/currentUserSlice";
import {
  addPost,
  loadMorePosts,
  selectPosts,
  loadError,
  loadPosts,
} from "../redux/postsSlice";
import { PostRequestFile, PostResponse, PostT } from "../lib/types";
import { PostApi } from "../api/PostApi";
import { mapPost } from "../utils/mapPost";
import { createPortal } from "react-dom";
import Overlay from "../ui/Overlay";
import EditPostModal from "../features/posts/EditPostModal";
import ConfirmationModal from "../ui/ConfirmationModal";

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
  const [postToEdit, setPostToEdit] = useState<PostT | null>(null);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

  const mapPosts = (posts: PostResponse[]) =>
    posts.map((post) => mapPost(post));

  function handleCreatePost(post: PostRequestFile) {
    PostApi.createPost({ ...post, image: "" }).then((res) => {
      const post = mapPost(res);
      dispatch(addPost(post));
      toast.success("Post added!");
    });
  }

  function handleUpdatePostDescription(description: string) {
    if (postToEdit === null) return;

    PostApi.updatePostDescription(postToEdit.id, description).then((res) => {
      const editedPost = mapPost(res);
      const foundIndex = posts.findIndex((post) => post.id === editedPost.id);
      const result = [
        ...posts.slice(0, foundIndex),
        editedPost,
        ...posts.slice(foundIndex + 1, posts.length),
      ];
      dispatch(loadPosts(result));
      setPostToEdit(null);
      toast.success("Post edited!");
    });
  }

  function handleDeletePost() {
    if (postIdToDelete === null) return;

    PostApi.deletePost(postIdToDelete).then(() => {
      const result = posts.filter((post) => post.id !== postIdToDelete);
      dispatch(loadPosts(result));
      setPostIdToDelete(null);
      toast.success("Post deleted!");
    });
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
    <>
      <StyledFeed>
        <AddPostForm onCreatePost={handleCreatePost} />

        <Posts variant="feed" isLoading={isLoading} error={error}>
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              setPostToEdit={setPostToEdit}
              setPostIdToDelete={setPostIdToDelete}
            />
          ))}
        </Posts>

        {posts.length > 0 && <div className="target" />}
      </StyledFeed>

      {postToEdit !== null &&
        createPortal(
          <Overlay>
            <EditPostModal
              post={postToEdit}
              onUpdatePostDescription={handleUpdatePostDescription}
              setPostToEdit={setPostToEdit}
            />
          </Overlay>,
          document.body
        )}

      {postIdToDelete !== null &&
        createPortal(
          <ConfirmationModal
            onConfirm={handleDeletePost}
            onClose={() => setPostIdToDelete(null)}
            question="Are you sure about deleting this post?"
          />,
          document.body
        )}
    </>
  );
}
