import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";

type Variant = "search" | "auth" | "post";

const variants = {
  search: css`
    background-color: var(--color-zinc-800);
    border-radius: 2.1rem;
    padding: 1.2rem;
    color: var(--color-zinc-100);
    width: 100%;
    border: 1px solid transparent;

    &:focus {
      border: 1px solid var(--color-sky-500);
      background-color: var(--color-zinc-950);
    }
  `,
  auth: css`
    background-color: var(--color-zinc-800);
    padding: 1.2rem;
    border-radius: 1.1rem;
    color: var(--color-zinc-100);

    &[type="date"] {
      width: 100%;
    }

    &[type="date"]::-webkit-calendar-picker-indicator {
      cursor: pointer;
      background-color: var(--color-zinc-400);
      border-radius: 0.3rem;
    }
  `,
  post: css`
    background-color: var(--color-zinc-900);
    border: none;
    font-weight: 500;
    padding: 1.2rem;
    width: 100%;
    border-radius: 1.1rem;
    outline: none;
    color: var(--color-zinc-100);

    &::placeholder {
      color: var(--color-zinc-500);
    }
  `,
};

const StyledInput = styled.input<{ $variant: Variant }>`
  border: none;
  background: none;
  outline: none;

  ${(props) => variants[props.$variant]}
`;

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  variant: Variant;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { type, placeholder, variant, onClick, ...props },
  ref
) {
  return (
    <StyledInput
      ref={ref}
      type={type}
      placeholder={placeholder}
      $variant={variant}
      {...props}
      onClick={onClick}
    />
  );
});

export default Input;
