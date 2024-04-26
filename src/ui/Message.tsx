import styled, { css } from "styled-components";

type Variant = "error" | "regular";

const variants = {
  error: css`
    color: var(--color-red-500);
    text-align: center;
  `,
  regular: css`
    color: var(--color-sky-400);
    text-align: center;
  `,
};

const StyledMessage = styled.p<{ $variant: Variant }>`
  ${(props) => variants[props.$variant]}

  @media (width <= 1279px) {
    & {
      font-size: 1.4rem;
    }
  }
`;

type Props = {
  children: string;
  variant: Variant;
};

export default function Message({ children, variant }: Props) {
  return <StyledMessage $variant={variant}>{children}</StyledMessage>;
}
