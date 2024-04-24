import styled from "styled-components";
import { NavLink } from "react-router-dom";

import PostInteractions from "./PostInteractions";
import Avatar from "../../ui/Avatar";

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
      width: 70%;
    }
  }

  @media (width >= 1835px) {
    & {
      width: 50%;
    }
  }

  @media (width >= 2535px) {
    & {
      width: 70rem;
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

const ProfileLink = styled(NavLink)`
  text-decoration: none;
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

const Image = styled.img`
  max-width: 100%;
  border-radius: 1.5rem;
  grid-column: 2;
  grid-row: 3;
`;

const PostInteractionsWrapper = styled.div`
  grid-column: 2;
  grid-row: 4;
`;

export default function Post() {
  return (
    <StyledPost>
      <ProfileLink to="/profile">
        <Avatar
          src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          name="John"
          variant="post"
        />
      </ProfileLink>
      <Info>
        <ProfileLink to="/profile">
          <Name>Jack Reacher</Name>
        </ProfileLink>
        <PostTime>40 min ago</PostTime>
      </Info>
      <Description>Very nice in the mountains!</Description>
      <Image
        src="https://images.pexels.com/photos/568236/pexels-photo-568236.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt={`Post of User`}
      />

      <PostInteractionsWrapper>
        <PostInteractions />
      </PostInteractionsWrapper>
    </StyledPost>
  );
}
