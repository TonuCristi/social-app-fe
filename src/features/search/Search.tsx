import styled from "styled-components";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import SearchResult from "./SearchResult";

import { useClickOutside } from "../../hooks/useClickOutside";

const StyledSearch = styled.div`
  position: relative;
  width: 100%;
`;

const SearchResults = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  width: 100%;
  max-height: 30rem;
  overflow-y: scroll;
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
`;

type SearchInputs = {
  searchValue: string;
};

export default function Search() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { register } = useForm<SearchInputs>();
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <StyledSearch ref={containerRef}>
      <Input
        type="text"
        placeholder="Search..."
        variant="search"
        {...register("searchValue")}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      />

      <SearchResults $isOpen={isOpen}>
        <SearchResult />
        <SearchResult />
        <SearchResult />
        <SearchResult />
        <SearchResult />
        <SearchResult />
      </SearchResults>
    </StyledSearch>
  );
}
