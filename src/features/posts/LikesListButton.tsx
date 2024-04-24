import { useState } from "react";
import { createPortal } from "react-dom";
import { HiMiniChartBar } from "react-icons/hi2";
import styled from "styled-components";

import Button from "../../ui/Button";
import Overlay from "../../ui/Overlay";
import LikesList from "./LikesList";

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Icon = styled(HiMiniChartBar)`
  font-size: 2rem;

  @media (width <= 1023px) {
    & {
      font-size: 1.6rem;
    }
  }
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
