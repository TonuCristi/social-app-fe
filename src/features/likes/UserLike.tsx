import { NavLink } from "react-router-dom";
import styled from "styled-components";

import Avatar from "../../ui/Avatar";

import { useUser } from "../../hooks/useUser";
import LoadingLike from "./LoadingLike";

const ProfileLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.4rem;
  text-decoration: none;
  padding: 0.8rem;
  background-color: var(--color-zinc-800);
  border-radius: 1.1rem;
  color: var(--color-zinc-100);
  font-weight: 500;
  font-size: 1.6rem;
  width: 100%;
  transition: all 0.2s;

  @media (width <= 1279px) {
    & {
      font-size: 1.4rem;
    }
  }

  &:hover {
    background-color: var(--color-zinc-800);
  }
`;

type Props = {
  id: string;
};

export default function UserLike({ id }: Props) {
  const { isLoading, user } = useUser(id);

  if (isLoading) return <LoadingLike />;

  return (
    <ProfileLink to="/profile">
      <Avatar variant="post" src={user?.avatar} name={user?.name} />
      {user?.name}
    </ProfileLink>
  );
}
