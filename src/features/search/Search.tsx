import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import SearchResult from "./SearchResult";

import { useClickOutside } from "../../hooks/useClickOutside";
import { AuthApi } from "../../api/AuthApi";
import { User, UserResponse } from "../../lib/types";
import { mapUser } from "../../utils/mapUser";

const StyledSearch = styled.div`
  position: relative;
  width: 100%;

  @media (width <= 1023px) {
    & {
      display: none;
    }
  }
`;

const SearchResults = styled.ul<{ $isOpen: boolean; $isResult: boolean }>`
  list-style: none;
  color: var(--color-zinc-100);
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  width: 100%;
  max-height: 30rem;
  overflow-y: ${(props) => (props.$isResult ? "scroll" : "hidden")};
  border-radius: 1.1rem;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  transition: all 0.2s;

  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};

  position: absolute;
  top: 120%;
  left: 0;

  &::-webkit-scrollbar {
    background-color: var(--color-zinc-700);
    border-radius: 1.1rem;
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-zinc-100);
    border-radius: 1.1rem;
  }

  @media (width <= 1279px) {
    & {
      font-size: 1.4rem;
    }
  }
`;

type SearchInputs = {
  searchValue: string;
};

export default function Search() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, watch, reset } = useForm<SearchInputs>({
    defaultValues: {
      searchValue: "",
    },
  });
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  const mapUsers = (users: UserResponse[]) =>
    users.map((user) => mapUser(user));

  function handleCloseSearchResults() {
    setIsOpen(false);
    reset();
  }

  useEffect(() => {
    const subscription = watch((value) => {
      const controller = new AbortController();
      controller.abort();
      AuthApi.searchUsers(value.searchValue).then((res) => {
        const users = mapUsers(res);
        setSearchResults(users);
      });
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <StyledSearch ref={containerRef}>
      <Input
        type="text"
        placeholder="Search..."
        variant="search"
        {...register("searchValue")}
        onClick={() => setIsOpen((prev) => !prev)}
      />

      <SearchResults $isOpen={isOpen} $isResult={searchResults.length > 0}>
        {searchResults.length > 0 ? (
          searchResults.map((user) => (
            <li key={user.id}>
              <SearchResult
                onCloseSearchResults={handleCloseSearchResults}
                user={user}
              />
            </li>
          ))
        ) : (
          <li>No results...</li>
        )}
      </SearchResults>
    </StyledSearch>
  );
}
