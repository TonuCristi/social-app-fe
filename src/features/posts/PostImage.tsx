import { useRef, useState } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

import Overlay from "../../ui/Overlay";

import { HiMiniXMark } from "react-icons/hi2";
import { useClickOutside } from "../../hooks/useClickOutside";

const Image = styled.img<{ $isOpen: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  cursor: ${(props) => (props.$isOpen ? "default" : "pointer")};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;

  border: none;
  background-color: var(--color-zinc-700);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-zinc-800);
  }

  & > * {
    font-size: 2.8rem;
    color: var(--color-zinc-100);
  }
`;

const ImageWrapper = styled.div`
  max-width: 40%;
`;

type Props = {
  image: string;
};

export default function PostImage({ image }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <>
      <Image
        src={image}
        alt={`Post of User`}
        $isOpen={isOpen}
        onClick={() => setIsOpen(true)}
      />
      {isOpen &&
        createPortal(
          <Overlay>
            <CloseButton
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => setIsOpen(false)}
            >
              <HiMiniXMark />
            </CloseButton>

            <ImageWrapper ref={containerRef}>
              <Image src={image} alt={`Post of User`} $isOpen={isOpen} />
            </ImageWrapper>
          </Overlay>,
          document.body
        )}
    </>
  );
}
