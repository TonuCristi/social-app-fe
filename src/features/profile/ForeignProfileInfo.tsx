import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Posts from "../posts/Posts";
import Post from "../posts/Post";
import Avatar from "../../ui/Avatar";

import { useUser } from "../../hooks/useUser";
import { PostApi } from "../../api/PostApi";
import { PostT } from "../../lib/types";
import { mapPosts } from "../../utils/mapPosts";

const PER_PAGE = 6;

const StyledForeignProfileInfo = styled.div`
  color: var(--color-zinc-100);
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 55%;
  margin: 0 auto;
  border: 1px solid var(--color-zinc-500);
  border-top: none;
  padding: 2.4rem;

  @media (width >= 1535px) {
    & {
      max-width: 120rem;
    }
  }

  @media (width <= 1279px) {
    & {
      width: 85%;
    }
  }

  @media (width <= 1023px) {
    & {
      grid-template-columns: 1fr;
    }
  }

  @media (width <= 767px) {
    & {
      width: 100%;
      border: none;
      border-bottom: 1px solid var(--color-zinc-500);
    }
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;

  @media (width <= 639px) {
    & {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

const AvatarWrapper = styled.div`
  border: 5px solid var(--color-sky-500);
  border-radius: 100%;
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

export default function ForeignProfileInfo() {
  const params = useParams();
  const { isLoading, user } = useUser(params.userId);
  const status = useRef<boolean>(false);
  const [posts, setPosts] = useState<PostT[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(true);
  const [errorPosts, setErrorPosts] = useState<string>("");

  useEffect(() => {
    if (!user) return;

    PostApi.getUserPosts(user.id, PER_PAGE, 0)
      .then((res) => {
        const posts = mapPosts(res);
        setPosts(posts);
      })
      .catch((err) => setErrorPosts(err.response.data.error))
      .finally(() => setIsLoadingPosts(false));
  }, [user]);

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
      PostApi.getUserPosts(user.id, PER_PAGE, posts.length)
        .then((res) => {
          const posts = mapPosts(res);
          setPosts((prev) => [...prev, ...posts]);
        })
        .catch((err) => setErrorPosts(err.response.data.error))
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
  }, [user, posts.length]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <StyledForeignProfileInfo>
      <Container>
        <AvatarWrapper>
          <Avatar src={user?.avatar} variant="profile" />
        </AvatarWrapper>

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
            {user?.createdAt && new Date(user?.createdAt).toLocaleDateString()}
          </Field>
        </Info>
      </Container>

      {user?.description && (
        <Description>
          <FieldName>Description:</FieldName>
          {user?.description}
        </Description>
      )}

      <Posts variant="profile" isLoading={isLoadingPosts} error={errorPosts}>
        {posts.map((post) => (
          // <Post key={post.id} user={user} post={post} />
          <div key={post.id}>aaa</div>
        ))}
      </Posts>

      {posts.length > 0 && <div className="target" />}
    </StyledForeignProfileInfo>
  );
}
