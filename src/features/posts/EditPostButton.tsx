import { Dispatch, SetStateAction, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import Button from "../../ui/Button";
import Overlay from "../../ui/Overlay";
import EditPostModal from "./EditPostModal";

import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { PostT } from "../../lib/types";

const Icon = styled(HiMiniEllipsisHorizontal)`
  color: var(--color-zinc-100);
  font-size: 2.4rem;
  stroke-width: 0.03rem;
`;

type Props = {
  post: PostT;
  onUpdatePostDescription: (
    description: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => void;
};

export default function EditPostButton({
  post,
  onUpdatePostDescription,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="postEdit" onClick={() => setIsOpen(true)}>
        <Icon />
      </Button>
      {isOpen &&
        createPortal(
          <Overlay>
            <EditPostModal
              post={post}
              onUpdatePostDescription={onUpdatePostDescription}
              setIsOpen={setIsOpen}
            />
          </Overlay>,
          document.body
        )}
    </>
  );
}
