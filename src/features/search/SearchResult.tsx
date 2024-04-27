import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSearchResult = styled.li``;

const Link = styled(NavLink)`
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

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
`;

const Name = styled.p``;

type Props = {
  onClick?: () => void;
};

export default function SearchResult({ onClick }: Props) {
  return (
    <StyledSearchResult onClick={onClick}>
      <Link to="/profile">
        <Avatar
          src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt={`Photo of User`}
        />
        <Name>Jack Reacher</Name>
      </Link>
    </StyledSearchResult>
  );
}
