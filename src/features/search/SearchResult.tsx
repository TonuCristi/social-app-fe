import { NavLink } from "react-router-dom";
import styled from "styled-components";

import Avatar from "../../ui/Avatar";

import { User } from "../../lib/types";

const StyledSearchResult = styled(NavLink)`
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  background-color: var(--color-zinc-700);
  border-radius: 1.1rem;
  color: var(--color-zinc-100);
  font-weight: 500;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;

  transition: all 0.2s;

  &:hover {
    background-color: var(--color-zinc-800);
  }
`;

const Name = styled.p``;

type Props = {
  onCloseSearchResults: () => void;
  user: User;
};

export default function SearchResult({ onCloseSearchResults, user }: Props) {
  return (
    <StyledSearchResult to="/profile" onClick={onCloseSearchResults}>
      <Avatar variant="profileBadge" src={user.avatar} name={user.name} />
      <Name>{user.name}</Name>
    </StyledSearchResult>
  );
}
