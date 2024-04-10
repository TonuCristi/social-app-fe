import { useState } from "react";
import { createPortal } from "react-dom";
import { HiMiniChartBar } from "react-icons/hi2";

import Button from "../../ui/Button";
import Overlay from "../../ui/Overlay";
import LikesList from "./LikesList";
import styled from "styled-components";

const Icon = styled(HiMiniChartBar)`
  font-size: 2rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export default function LikesListButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="postStats" onClick={() => setIsOpen(true)}>
        <IconWrapper>
          <Icon />
        </IconWrapper>
        Likes
      </Button>
      {isOpen &&
        createPortal(
          <Overlay>
            <LikesList setIsOpen={setIsOpen} />
          </Overlay>,
          document.body
        )}
    </>
  );
}
