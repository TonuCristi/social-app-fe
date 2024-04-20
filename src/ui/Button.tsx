import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styled, { css } from "styled-components";

type Variant = "profile" | "postStats" | "auth" | "post" | "floatPost" | "icon";

const variants = {
  profile: css`
    background-color: var(--color-zinc-800);
    border-radius: 1.1rem;
    padding: 0.6rem 1.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.2rem;
  `,
  postStats: css`
    position: relative;
    z-index: 0;
    color: var(--color-zinc-100);
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
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
  `,
  floatPost: css`
    position: fixed;
    top: 90%;
    left: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-sky-500);
    color: var(--color-zinc-100);
    padding: 1.2rem 1.6rem;
    border-radius: 2.3rem;
    font-weight: 500;
    transition: all 0.2s;
    width: 10%;

    &:hover {
      background-color: var(--color-sky-600);
    }
  `,
  icon: css`
    background-color: var(--color-zinc-800);
    color: var(--color-zinc-100);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    padding: 0.6rem;
    font-size: 1.8rem;
    cursor: pointer;
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
  variant: Variant;
};

export default function Button({
  children,
  variant,
  disabled,
  onClick,
}: Props) {
  return (
    <StyledButton $variant={variant} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
