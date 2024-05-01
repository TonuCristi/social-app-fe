import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styled, { css } from "styled-components";

type Variant =
  | "profile"
  | "postStats"
  | "auth"
  | "post"
  // | "floatPost"
  | "empty";

const variants = {
  profile: css`
    background-color: var(--color-zinc-800);
    border-radius: 1.1rem;
    padding: 0.6rem 1.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.2rem;

    @media (width <= 1023px) {
      & {
        padding: 0.6rem;
      }
    }
  `,
  postStats: css`
    position: relative;
    z-index: 0;
    color: var(--color-zinc-100);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    transition: all 0.2s;

    & div::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      width: 3rem;
      height: 3rem;
      border-radius: 100%;
      background-color: transparent;
      transition: all 0.2s;
    }

    &:hover div::before {
      background-color: var(--color-emerald-blur-500);
      backdrop-filter: blur(10px);
    }

    &:hover {
      color: var(--color-emerald-500);
    }
  `,
  auth: css`
    background-color: var(--color-sky-500);
    color: var(--color-zinc-100);
    padding: 1.2rem;
    border-radius: 1.1rem;
    transition: all 0.2s;
    font-weight: 500;
    width: 100%;

    &:hover {
      background-color: var(--color-sky-600);
    }

    &:disabled {
      background-color: var(--color-sky-600);
      cursor: not-allowed;
    }

    @media (width <= 1279px) {
      & {
        font-size: 1.4rem;
      }
    }
  `,
  post: css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-sky-500);
    color: var(--color-zinc-100);
    padding: 1.2rem 1.6rem;
    border-radius: 2.3rem;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
      background-color: var(--color-sky-600);
    }

    &:disabled {
      background-color: var(--color-sky-700);
      cursor: default;
    }

    @media (width <= 1279px) {
      & {
        padding: 1rem 1.4rem;
        font-size: 1.4rem;
      }
    }

    @media (width <= 767px) {
      & {
        padding: 0.8rem 1.4rem;
      }
    }
  `,
  empty: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const StyledButton = styled.button<{ $variant: Variant }>`
  border: none;
  background: none;
  cursor: pointer;

  ${(props) => variants[props.$variant]}
`;

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: Variant;
};

export default function Button({
  children,
  variant = "empty",
  disabled,
  onClick,
}: Props) {
  return (
    <StyledButton $variant={variant} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
