import { useEffect, useRef } from "react";
import styled from "styled-components";

import UploadAvatar from "./UploadAvatar";
import Posts from "../posts/Posts";
import UserPost from "../posts/UserPost";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/currentUserSlice";
import { PostResponse } from "../../lib/types";
import { mapPost } from "../../utils/mapPost";
import { PostApi } from "../../api/PostApi";
import {
  loadUserPostsError,
  loadMoreUserPosts,
  loadUserPosts,
  selectUserPosts,
} from "../../redux/userPostsSlice";

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
    user: { id, name, email, description, birth_date, createdAt },
  } = useAppSelector(selectCurrentUser);

  const { isLoading, error, posts } = useAppSelector(selectUserPosts);
  const dispatch = useAppDispatch();
  const status = useRef<boolean>(false);

  const mapPosts = (posts: PostResponse[]) =>
    posts.map((post) => mapPost(post));

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
      PostApi.getPosts(id, PER_PAGE, posts.length)
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
  }, [dispatch, id, posts.length, isLoading]);

  return (
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

      <Posts variant="profile" isLoading={isLoading} error={error}>
        {posts.map((post) => (
          <UserPost key={post.id} post={post} />
        ))}
      </Posts>

      {posts.length > 0 && <div className="target" />}
    </StyledProfileInfo>
  );
}
