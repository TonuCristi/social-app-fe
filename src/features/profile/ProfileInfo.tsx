import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import styled from "styled-components";

import UploadAvatar from "./UploadAvatar";
import Posts from "../posts/Posts";
import Overlay from "../../ui/Overlay";
import EditPostModal from "../posts/EditPostModal";
import ConfirmationModal from "../../ui/ConfirmationModal";
import Post from "../posts/Post";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/currentUserSlice";
import { PostResponse, PostT } from "../../lib/types";
import { mapPost } from "../../utils/mapPost";
import { PostApi } from "../../api/PostApi";
import {
  loadUserPostsError,
  loadMoreUserPosts,
  loadUserPosts,
  selectUserPosts,
} from "../../redux/userPostsSlice";
import { loadPosts, selectPosts } from "../../redux/postsSlice";

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
  const {
    currentUser: { id, name, email, description, birth_date, createdAt },
  } = useAppSelector(selectCurrentUser);
  const { isLoadingUserPosts, errorUserPosts, userPosts } =
    useAppSelector(selectUserPosts);
  const { posts } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();
  const status = useRef<boolean>(false);
  const [postToEdit, setPostToEdit] = useState<PostT | null>(null);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

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

  useEffect(() => {
    PostApi.getPosts(id, PER_PAGE, 0)
      .then((res) => {
        const posts = mapPosts(res);
        dispatch(loadUserPosts(posts));
      })
      .catch((err) => dispatch(loadUserPostsError(err.response.data.error)));

    return () => {
      dispatch(loadUserPosts([]));
    };
  }, [id, dispatch]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    function fetchData() {
      if (status.current) return;

      status.current = true;
      PostApi.getPosts(id, PER_PAGE, userPosts.length)
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
  }, [dispatch, id, userPosts.length, isLoadingUserPosts]);

  return (
    <>
      <StyledProfileInfo>
        <Container>
          <UploadAvatar />

          <Info>
            <Name>{name}</Name>
            {birth_date && (
              <Field>
                <FieldName>Birthday:</FieldName>
                {new Date(birth_date).toLocaleDateString()}
              </Field>
            )}
            <Field>
              <FieldName>Email:</FieldName> {email}
            </Field>
            <Field>
              <FieldName>Joined:</FieldName>
              {new Date(createdAt).toLocaleDateString()}
            </Field>
          </Info>
        </Container>

        {description && (
          <Description>
            <FieldName>Description:</FieldName>
            {description}
          </Description>
        )}

        <Posts
          variant="profile"
          isLoading={isLoadingUserPosts}
          error={errorUserPosts}
        >
          {userPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              setPostToEdit={setPostToEdit}
              setPostIdToDelete={setPostIdToDelete}
            />
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
