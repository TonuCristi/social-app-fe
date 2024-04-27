import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";

import Button from "../../ui/Button";
import SearchResult from "./SearchResult";
import Input from "../../ui/Input";

import { HiMiniXMark } from "react-icons/hi2";
import { useForm } from "react-hook-form";

const StyledFloatingSearch = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 0;
  left: ${(props) => (props.$isOpen ? "0%" : "-100%")};
  z-index: 1000;
  width: 100%;
  height: 100vh;
  padding: 2.4rem;
  color: #fff;
  background-color: rgba(9, 9, 11);
  padding: 3.2rem;
  transition: all 0.5s;

  @media (width <= 1023px) {
    & {
      display: block;
    }
  }
`;

const Containter = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2.4rem;
  margin: 0 auto;
  height: 100%;
  width: 55%;

  @media (width <= 767px) {
    & {
      width: 70%;
    }
  }

  @media (width <= 639px) {
    & {
      width: 85%;
    }
  }

  @media (width <= 425px) {
    & {
      width: 100%;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CloseIcon = styled(HiMiniXMark)`
  color: var(--color-zinc-100);
  font-size: 2.8rem;
  stroke-width: 0.1rem;
`;

const SearchResults = styled.ul`
  list-style: none;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding-right: 1.2rem;
  gap: 1.2rem;

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

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type SearchInputs = {
  searchValue: string;
};

export default function FloatingSearch({ isOpen, setIsOpen }: Props) {
  const { register } = useForm<SearchInputs>();

  function handleClick() {
    document.body.style.overflowY = "auto";
    setIsOpen(false);
  }

  return createPortal(
    <StyledFloatingSearch $isOpen={isOpen}>
      <Containter>
        <Wrapper>
          <Button onClick={handleClick}>
            <CloseIcon />
          </Button>
        </Wrapper>

        <Input
          type="text"
          placeholder="Search..."
          variant="search"
          {...register("searchValue")}
        />

        <SearchResults>
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
          <SearchResult onClick={handleClick} />
        </SearchResults>
      </Containter>
    </StyledFloatingSearch>,
    document.body
  );
}
