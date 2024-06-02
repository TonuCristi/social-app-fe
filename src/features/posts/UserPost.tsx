import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";

import PostInteractions from "./PostInteractions";
import Avatar from "../../ui/Avatar";
import PostImage from "./PostImage";
import Overlay from "../../ui/Overlay";
import EditPostModal from "./EditPostModal";
import Button from "../../ui/Button";
import ConfirmationModal from "../../ui/ConfirmationModal";

import { PostT } from "../../lib/types";
import { getTimePassed } from "../../utils/getTimePassed";
import { PostApi } from "../../api/PostApi";
import { HiMiniEllipsisHorizontal, HiMiniXMark } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loadPosts, selectPosts } from "../../redux/postsSlice";
import { selectCurrentUser } from "../../redux/currentUserSlice";
import { mapPost } from "../../utils/mapPost";

const StyledPost = styled.div`
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  width: 80%;
  border-radius: 1.1rem;
  padding: 1.6rem;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  column-gap: 1.6rem;
  row-gap: 2rem;

  @media (width >= 1535px) {
    & {
      max-width: 70rem;
    }
  }

  @media (width <= 1279px) {
    & {
      width: 85%;
    }
  }

  @media (width <= 1023px) {
    & {
      width: 90%;
    }
  }

  @media (width <= 767px) {
    & {
      width: 95%;
    }
  }

  @media (width <= 639px) {
    & {
      width: 100%;
    }
  }
`;

const Container = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (width <= 1279px) {
    & {
      height: 80%;
      align-self: center;
    }
  }
`;

const ProfileLink = styled(NavLink)`
  text-decoration: none;
`;

const Name = styled.h4`
  color: var(--color-zinc-100);

  @media (width <= 1279px) {
    & {
      font-size: 1.4rem;
    }
  }
`;

const PostTime = styled.span`
  font-size: 1.4rem;
  color: var(--color-zinc-100);

  @media (width <= 1279px) {
    & {
      font-size: 1.2rem;
    }
  }
`;

const Content = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Description = styled.pre`
  color: var(--color-zinc-100);

  @media (width <= 1279px) {
    & {
      font-size: 1.4rem;
    }
  }
`;

const PostInteractionsWrapper = styled.div`
  grid-column: 2;
  grid-row: 3;
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
`;

const EditIcon = styled(HiMiniEllipsisHorizontal)`
  color: var(--color-zinc-100);
  font-size: 2.4rem;
  stroke-width: 0.03rem;
  padding: 0.1rem;
  border-radius: 100%;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-sky-500);
  }
`;

const DeleteIcon = styled(HiMiniXMark)`
  color: var(--color-zinc-100);
  font-size: 2.4rem;
  stroke-width: 0.03rem;
  padding: 0.1rem;
  border-radius: 100%;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-sky-500);
  }
`;

type Props = {
  post: PostT;
};

export default function UserPost({ post }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { posts } = useAppSelector(selectPosts);
  const { user } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { id, description, image, createdAt } = post;

  function handleUpdatePostDescription(description: string) {
    PostApi.updatePostDescription(id, description).then((res) => {
      const editedPost = mapPost(res);
      const foundIndex = posts.findIndex((post) => post.id === editedPost.id);
      const result = [
        ...posts.slice(0, foundIndex),
        editedPost,
        ...posts.slice(foundIndex + 1, posts.length),
      ];
      dispatch(loadPosts(result));
      setIsEditModalOpen(false);
    });
  }

  function handleDeletePost() {
    // if (user_id !== user.id) return;

    PostApi.deletePost(id).then(() => {
      const result = posts.filter((post) => post.id !== id);
      dispatch(loadPosts(result));
    });
  }

  return (
    <>
      <StyledPost>
        <ProfileLink to="/profile">
          <Avatar src={user.avatar} name={user.name} variant="post" />
        </ProfileLink>

        <Container>
          <Info>
            <ProfileLink to="/profile">
              <Name>{user.name}</Name>
            </ProfileLink>

            <PostTime>{getTimePassed(createdAt)}</PostTime>
          </Info>

          <ButtonWrapper>
            <Button variant="postEdit" onClick={() => setIsEditModalOpen(true)}>
              <EditIcon />
            </Button>
          </ButtonWrapper>

          <Button variant="postEdit" onClick={() => setIsDeleteModalOpen(true)}>
            <DeleteIcon />
          </Button>
        </Container>

        <Content>
          {description && <Description>{description}</Description>}

          {image && <PostImage image={image} />}
        </Content>

        <PostInteractionsWrapper>
          <PostInteractions />
        </PostInteractionsWrapper>
      </StyledPost>

      {isEditModalOpen &&
        createPortal(
          <Overlay>
            <EditPostModal
              post={post}
              onUpdatePostDescription={handleUpdatePostDescription}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          </Overlay>,
          document.body
        )}

      {isDeleteModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={handleDeletePost}
            onClose={() => setIsDeleteModalOpen(false)}
          />,
          document.body
        )}
    </>
  );
}
