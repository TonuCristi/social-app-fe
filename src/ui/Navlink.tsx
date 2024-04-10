import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

type Variant = "";

const variants = {};

const StyledNavlink = styled(NavLink)<{ $variant: Variant | undefined }>`
  text-decoration: none;

  ${(props) => props.$variant && variants[props.$variant]}
`;

type Props = {
  to: string;
  end?: boolean;
  children: ({ isActive }: { isActive: boolean }) => ReactNode;
  variant?: Variant;
};

export default function Navlink({ to, end = false, children, variant }: Props) {
  return (
    <StyledNavlink to={to} end={end} $variant={variant}>
      {children}
    </StyledNavlink>
  );
}
