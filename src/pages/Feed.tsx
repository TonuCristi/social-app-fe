import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";

import Posts from "../features/posts/Posts";
import AddPostForm from "../features/posts/AddPostForm";
import Post from "../features/posts/Post";
import Overlay from "../ui/Overlay";
import EditPostModal from "../features/posts/EditPostModal";
import ConfirmationModal from "../ui/ConfirmationModal";
import PostProvider from "../features/posts/PostContext";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/currentUserSlice";
import {
  addPost,
  loadMorePosts,
  selectPosts,
  loadError,
  loadPosts,
} from "../redux/postsSlice";
import {
  CommentResponse,
  Like,
  LikeResponse,
  PostRequestFile,
  PostT,
} from "../lib/types";
import { PostApi } from "../api/PostApi";
import { mapPost } from "../utils/mapPost";
import { loadUserPosts, selectUserPosts } from "../redux/userPostsSlice";
import { mapPosts } from "../utils/mapPosts";

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
  const { currentUser } = useAppSelector(selectCurrentUser);
  const { isLoadingPosts, errorPosts, posts } = useAppSelector(selectPosts);
  const { userPosts } = useAppSelector(selectUserPosts);
  const dispatch = useAppDispatch();
  const status = useRef<boolean>(false);
  const [postToEdit, setPostToEdit] = useState<PostT | null>(null);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

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
      const resultPosts = posts.filter((post) => post.id !== postIdToDelete);
      dispatch(loadPosts(resultPosts));
      const resultUserPosts = userPosts.filter(
        (post) => post.id !== postIdToDelete
      );
      dispatch(loadUserPosts(resultUserPosts));
      setPostIdToDelete(null);
      toast.success("Post deleted!");
    });
  }

  function handleLikePost(
    postId: string,
    likes: Like[],
    cb: (res: LikeResponse) => void
  ) {
    if (likes.find((like) => like.user_id === currentUser.id)) return;

    PostApi.likePost(postId, currentUser.id).then((res) => cb(res));
  }

  function handleUnlikePost(likes: Like[], cb: (res: string) => void) {
    const like = likes.find((like) => like.user_id === currentUser.id);

    if (!like) return;

    PostApi.unlikePost(like.id).then((res) => cb(res));
  }

  function handleAddComment(
    postId: string,
    comment: string,
    commentId: string | null,
    cb: (res: CommentResponse) => void
  ) {
    PostApi.addComment(postId, currentUser.id, commentId, comment).then((res) =>
      cb(res)
    );
  }

  function handleDeleteComment(id: string, cb: () => void) {
    PostApi.deleteComment(id).then(cb);
  }

  function handleEditComment(
    id: string,
    comment: string,
    cb: (res: CommentResponse) => void
  ) {
    PostApi.editComment(id, comment).then((res) => cb(res));
  }

  function getFeedback(
    postId: string,
    cb: (res: [LikeResponse[], CommentResponse[]]) => void
  ) {
    Promise.all([PostApi.getLikes(postId), PostApi.getComments(postId)]).then(
      (res) => cb(res)
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
      PostApi.getUserPosts(currentUser.id, PER_PAGE, posts.length)
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
  }, [dispatch, currentUser.id, posts.length, isLoadingPosts]);

  return (
    <>
      <StyledFeed>
        <AddPostForm onCreatePost={handleCreatePost} />

        <Posts variant="feed" isLoading={isLoadingPosts} error={errorPosts}>
          {posts.map((post) => (
            <PostProvider key={post.id}>
              <Post
                user={currentUser}
                post={post}
                setPostToEdit={setPostToEdit}
                setPostIdToDelete={setPostIdToDelete}
                onLikePost={handleLikePost}
                onUnlikePost={handleUnlikePost}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
                onEditComment={handleEditComment}
                getFeedback={getFeedback}
              />
            </PostProvider>
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
