import { NavLink } from "react-router-dom";
import Avatar from "../../ui/Avatar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { User } from "../../lib/types";
import { AuthApi } from "../../api/AuthApi";
import { mapUser } from "../../utils/mapUser";

const ProfileLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.4rem;
  text-decoration: none;
  padding: 0.8rem;
  background-color: var(--color-zinc-700);
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
  const [user, setUser] = useState<User>();

  useEffect(() => {
    AuthApi.getUserById(id).then((res) => {
      const user = mapUser(res);
      setUser(user);
    });
  }, [id]);

  return (
    <ProfileLink to="/profile">
      <Avatar variant="post" src={user?.avatar} name={user?.name} />
      {user?.name}
    </ProfileLink>
  );
}
