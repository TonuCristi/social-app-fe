import { ReactNode } from "react";
import styled from "styled-components";

const StyledLoaderWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoaderWrapper({ children }: { children: ReactNode }) {
  return <StyledLoaderWrapper>{children}</StyledLoaderWrapper>;
}
