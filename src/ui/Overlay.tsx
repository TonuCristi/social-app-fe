import { ReactNode } from "react";
import styled from "styled-components";

import { useOverflow } from "../hooks/useOverflow";

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  background-color: var(--color-zinc-blur-950);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  children: ReactNode;
};

export default function Overlay({ children }: Props) {
  useOverflow();

  return <StyledOverlay>{children}</StyledOverlay>;
}
