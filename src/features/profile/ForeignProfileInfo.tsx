import styled from "styled-components";
import Posts from "../posts/Posts";
import Post from "../posts/Post";
import UploadAvatar from "./UploadAvatar";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

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

  if (isLoading) return <div>loading</div>;

  return (
    <StyledForeignProfileInfo>
      <Container>
        <UploadAvatar />

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

      {/* <Posts
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

      {userPosts.length > 0 && <div className="target" />} */}
    </StyledForeignProfileInfo>
  );
}
