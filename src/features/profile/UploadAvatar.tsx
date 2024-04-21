import styled from "styled-components";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import Avatar from "../../ui/Avatar";
import UploadAvatarModal from "./UploadAvatarModal";

import { selectCurrentUser } from "../../redux/currentUserSlice";
import { useAppSelector } from "../../redux/hooks";
import { HiMiniArrowPath } from "react-icons/hi2";

const Button = styled.button`
  border: 5px solid var(--color-sky-500);
  background: none;
  cursor: pointer;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-zinc-300);
    border-radius: 100%;
    opacity: 0;
    transition: all 0.2s;
  }

  &:hover::before {
    opacity: 0.5;
  }

  &:hover svg {
    opacity: 1;
  }
`;

const Icon = styled(HiMiniArrowPath)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3.2rem;
  color: var(--color-zinc-950);
  opacity: 0;
  transition: all 0.2s;
`;

export default function UploadAvatar() {
  const {
    user: { avatar },
  } = useAppSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {}, []);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Avatar src={avatar} variant="profile" />
        <Icon />
      </Button>

      {isOpen &&
        createPortal(
          <UploadAvatarModal setIsOpen={setIsOpen} />,
          document.body
        )}
    </>
  );
}
