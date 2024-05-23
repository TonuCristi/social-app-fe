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

import { PostT } from "../../lib/types";
import { getTimePassed } from "../../utils/getTimePassed";
import { PostApi } from "../../api/PostApi";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loadPosts, selectPosts } from "../../redux/postsSlice";
import { mapPost } from "../../utils/mapPost";

const StyledPost = styled.div`
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  width: 80%;
  border-radius: 1.1rem;
  padding: 1.6rem;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto 1fr auto;
  column-gap: 1.6rem;

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
  justify-content: space-between;
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

const Description = styled.pre`
  color: var(--color-zinc-100);
  margin: 1.6rem 0 1.2rem;
  grid-column: 2;
  grid-row: 2;

  @media (width <= 1279px) {
    & {
      font-size: 1.4rem;
    }
  }
`;

const ImageWrapper = styled.div`
  grid-column: 2;
  grid-row: 3;
`;

const PostInteractionsWrapper = styled.div`
  grid-column: 2;
  grid-row: 4;
`;

const Icon = styled(HiMiniEllipsisHorizontal)`
  color: var(--color-zinc-100);
  font-size: 2.4rem;
  stroke-width: 0.03rem;
`;

type Props = {
  post: PostT;
};

export default function Post({ post }: Props) {
  const { id, description, image, createdAt } = post;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { posts } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

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
      setIsOpen(false);
    });
  }

  return (
    <>
      <StyledPost>
        <ProfileLink to="/profile">
          <Avatar
            src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            name="John"
            variant="post"
          />
        </ProfileLink>

        <Container>
          <Info>
            <ProfileLink to="/profile">
              <Name>Jack Reacher</Name>
            </ProfileLink>

            <PostTime>{getTimePassed(createdAt)}</PostTime>
          </Info>

          <Button variant="postEdit" onClick={() => setIsOpen(true)}>
            <Icon />
          </Button>
        </Container>

        <Description>{description}</Description>

        {image && (
          <ImageWrapper>
            <PostImage image={image} />
          </ImageWrapper>
        )}

        <PostInteractionsWrapper>
          <PostInteractions />
        </PostInteractionsWrapper>
      </StyledPost>
      {isOpen &&
        createPortal(
          <Overlay>
            <EditPostModal
              post={post}
              onUpdatePostDescription={handleUpdatePostDescription}
              setIsOpen={setIsOpen}
            />
          </Overlay>,
          document.body
        )}
    </>
  );
}
