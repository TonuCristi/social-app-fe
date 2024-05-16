import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import Button from "../../ui/Button";
import EditPostForm from "./EditPostForm";
import Overlay from "../../ui/Overlay";

import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { PostT } from "../../lib/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  border-radius: 1.1rem;
  padding: 2.4rem;
`;

const Icon = styled(HiMiniEllipsisHorizontal)`
  color: var(--color-zinc-100);
  font-size: 2.4rem;
  stroke-width: 0.03rem;
`;

const Title = styled.h3`
  color: var(--color-zinc-100);
  font-size: 2.4rem;
`;

type Props = {
  post: PostT;
  onUpdatePostDescription: (description: string) => void;
};

export default function EditPostButton({
  post,
  onUpdatePostDescription,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="postEdit" onClick={() => setIsOpen(true)}>
        <Icon />
      </Button>
      {isOpen &&
        createPortal(
          <Overlay>
            <Container>
              <Title>Edit post</Title>
              <EditPostForm
                post={post}
                onUpdatePostDescription={onUpdatePostDescription}
              />
            </Container>
          </Overlay>,
          document.body
        )}
    </>
  );
}
