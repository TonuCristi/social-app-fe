import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from "react";
import styled, { css } from "styled-components";

const variants = {
  addPost: css`
    background-color: var(--color-zinc-900);
    font-weight: 500;
    padding: 1.2rem;
    width: 100%;
    border-radius: 1.1rem;
    color: var(--color-zinc-100);

    &::placeholder {
      color: var(--color-zinc-500);
    }
  `,
  editPost: css`
    background-color: var(--color-zinc-900);
    font-weight: 500;
    padding: 1.2rem;
    width: 100%;
    border-radius: 1.1rem;
    color: var(--color-zinc-100);

    &::placeholder {
      color: var(--color-zinc-500);
    }

    &::-webkit-scrollbar {
      background-color: var(--color-zinc-700);
      border-radius: 1.1rem;
      width: 1rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-zinc-100);
      border-radius: 1.1rem;
    }
  `,
  comment: css`
    background-color: var(--color-zinc-900);
    font-weight: 500;
    padding: 1.2rem;
    width: 100%;
    border-radius: 1.1rem;
    color: var(--color-zinc-100);

    &::placeholder {
      color: var(--color-zinc-500);
    }

    &::-webkit-scrollbar {
      background-color: var(--color-zinc-700);
      border-radius: 1.1rem;
      width: 1rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-zinc-100);
      border-radius: 1.1rem;
    }
  `,
};

const StyledTextarea = styled.textarea<{ $variant: Variant }>`
  resize: none;
  outline: none;
  border: none;

  ${(props) => variants[props.$variant]}
`;

type Props = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  variant: Variant;
};

type Variant = "addPost" | "editPost" | "comment";

const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { variant, rows, cols, placeholder, ...props },
  ref
) {
  return (
    <StyledTextarea
      $variant={variant}
      rows={rows}
      cols={cols}
      placeholder={placeholder}
      ref={ref}
      {...props}
    />
  );
});

export default Textarea;
