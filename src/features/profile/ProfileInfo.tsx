import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import UploadAvatar from "./UploadAvatar";
import Posts from "../posts/Posts";
import Overlay from "../../ui/Overlay";
import EditPostModal from "../posts/EditPostModal";
import ConfirmationModal from "../../ui/ConfirmationModal";
import Post from "../posts/Post";
import Loader from "../../ui/Loader";
import LoaderWrapper from "../../ui/LoaderWrapper";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  CommentResponse,
  Like,
  LikeResponse,
  PostResponse,
  PostT,
} from "../../lib/types";
import { mapPost } from "../../utils/mapPost";
import { PostApi } from "../../api/PostApi";
import {
  loadUserPostsError,
  loadMoreUserPosts,
  loadUserPosts,
  selectUserPosts,
} from "../../redux/userPostsSlice";
import { loadPosts, selectPosts } from "../../redux/postsSlice";
import PostProvider from "../posts/PostContext";
import { useUser } from "../../hooks/useUser";
import { selectCurrentUser } from "../../redux/currentUserSlice";

const PER_PAGE = 6;

const StyledProfileInfo = styled.div`
  color: var(--color-zinc-100);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  margin-bottom: 2.4rem;

  @media (width <= 639px) {
    & {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 2.4rem;
  column-gap: 3.2rem;
  align-items: center;

  @media (width <= 639px) {
    & {
      column-gap: 2.4rem;
    }
  }

  @media (width <= 425px) {
    & {
      grid-template-columns: auto;
    }
  }
`;

const Name = styled.h2`
  font-size: 3.2rem;

  @media (width <= 1279px) {
    & {
      font-size: 2.8rem;
    }
  }

  @media (width <= 1023px) {
    & {
      font-size: 2.4rem;
    }
  }
`;

const Field = styled.p`
  @media (width <= 1279px) {
    & {
      font-size: 1.4rem;
    }
  }
`;

const FieldName = styled.span`
  font-weight: 500;
  margin-right: 0.4rem;
`;

const Description = styled.p`
  line-height: 1.6;

  @media (width <= 1279px) {
    & {
      font-size: 1.4rem;
    }
  }
`;

export default function ProfileInfo() {
  const params = useParams();
  const { isLoading, user } = useUser(params.userId);
  const { isLoadingUserPosts, errorUserPosts, userPosts } =
    useAppSelector(selectUserPosts);
  const { currentUser } = useAppSelector(selectCurrentUser);
  const { posts } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();
  const [postToEdit, setPostToEdit] = useState<PostT | null>(null);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  const status = useRef<boolean>(false);

  const mapPosts = (posts: PostResponse[]) =>
    posts.map((post) => mapPost(post));

  function handleUpdatePostDescription(description: string) {
    if (postToEdit === null) return;

    PostApi.updatePostDescription(postToEdit.id, description).then((res) => {
      const editedPost = mapPost(res);
      const foundIndex = userPosts.findIndex(
        (post) => post.id === editedPost.id
      );
      const result = [
        ...userPosts.slice(0, foundIndex),
        editedPost,
        ...userPosts.slice(foundIndex + 1, userPosts.length),
      ];
      dispatch(loadUserPosts(result));
      setPostToEdit(null);
      toast.success("Post edited!");
    });
  }

  function handleDeletePost() {
    if (postIdToDelete === null) return;

    PostApi.deletePost(postIdToDelete).then(() => {
      const resultUserPosts = userPosts.filter(
        (post) => post.id !== postIdToDelete
      );
      dispatch(loadUserPosts(resultUserPosts));
      const resultPosts = posts.filter((post) => post.id !== postIdToDelete);
      dispatch(loadPosts(resultPosts));
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
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    function fetchData() {
      if (!user) return;
      if (status.current) return;

      status.current = true;
      PostApi.getUserPosts(user.id, PER_PAGE, userPosts.length)
        .then((res) => {
          const posts = mapPosts(res);
          dispatch(loadMoreUserPosts(posts));
        })
        .catch((err) => dispatch(loadUserPostsError(err.response.data.error)))
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
  }, [dispatch, user, userPosts.length, isLoadingUserPosts]);

  if (isLoading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  return (
    <>
      <StyledProfileInfo>
        <Container>
          <UploadAvatar user={user} />

          <Info>
            <Name>{user?.name}</Name>
            {user?.birth_date && (
              <Field>
                <FieldName>Birthday:</FieldName>
                {new Date(user?.birth_date).toLocaleDateString()}
              </Field>
            )}
            <Field>
              <FieldName>Email:</FieldName> {user?.email}
            </Field>
            <Field>
              <FieldName>Joined:</FieldName>
              {user?.createdAt &&
                new Date(user?.createdAt).toLocaleDateString()}
            </Field>
          </Info>
        </Container>

        {user?.description && (
          <Description>
            <FieldName>Description:</FieldName>
            {user?.description}
          </Description>
        )}

        <Posts
          variant="profile"
          isLoading={isLoadingUserPosts}
          error={errorUserPosts}
        >
          {userPosts.map((post) => (
            <PostProvider key={post.id}>
              <Post
                user={user}
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

        {userPosts.length > 0 && <div className="target" />}
      </StyledProfileInfo>

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
