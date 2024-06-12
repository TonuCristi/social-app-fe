import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";

const StyledCommentTextarea = styled.textarea`
  width: 100%;
  resize: none;
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
`;

type Props = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  aa: string;
};

const CommentTextarea = forwardRef<HTMLTextAreaElement, Props>(
  function CommentTextarea({ ...props }, ref) {
    // const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (!ref.current) return;
      ref.current.focus();
    }, [ref]);

    return (
      <StyledCommentTextarea
        rows={1}
        placeholder="Write a comment..."
        ref={ref}
        {...props}
      />
    );
  }
);

export default CommentTextarea;
