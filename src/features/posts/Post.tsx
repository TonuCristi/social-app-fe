import styled from "styled-components";
import { NavLink } from "react-router-dom";

import PostInteractions from "./PostInteractions";
import Avatar from "../../ui/Avatar";
import PostImage from "./PostImage";

import { PostT } from "../../lib/types";
import { getTimePassed } from "../../utils/getTimePassed";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/currentUserSlice";

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

type Props = {
  post: PostT;
};

export default function Post({ post }: Props) {
  const { user } = useAppSelector(selectCurrentUser);
  const { description, image, createdAt } = post;

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
        </Container>

        <Content>
          {description && <Description>{description}</Description>}

          {image && <PostImage image={image} />}
        </Content>

        <PostInteractionsWrapper>
          <PostInteractions />
        </PostInteractionsWrapper>
      </StyledPost>
    </>
  );
}
