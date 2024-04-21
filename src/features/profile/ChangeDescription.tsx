import {
  DetailedHTMLProps,
  Dispatch,
  forwardRef,
  SetStateAction,
  TextareaHTMLAttributes,
  useState,
} from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { createPortal } from "react-dom";
import ConfirmationModal from "../../ui/ConfirmationModal";

const StyledChangeDescription = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Textarea = styled.textarea`
  border: none;
  background: none;
  outline: none;
  background-color: var(--color-zinc-800);
  padding: 1.2rem;
  border-radius: 1.1rem;
  color: var(--color-zinc-100);
  width: 100%;
`;

const IconWrapper = styled.div`
  background-color: var(--color-zinc-800);
  color: var(--color-zinc-100);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 0.6rem;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-sky-500);
    color: var(--color-zinc-800);
  }
`;

type Props = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  newValue: string;
  onChangeValue: (
    value: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => void;
};

const ChangeDescription = forwardRef<HTMLTextAreaElement, Props>(
  function ChangeDescription({ newValue, onChangeValue, ...props }, ref) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <StyledChangeDescription>
        <Textarea placeholder="Description" ref={ref} {...props} />
        <Button onClick={() => setIsOpen(true)}>
          <IconWrapper>
            <HiMiniPencilSquare />
          </IconWrapper>
        </Button>
        {isOpen &&
          createPortal(
            <ConfirmationModal
              onConfirm={() => onChangeValue(newValue, setIsOpen)}
              onClose={() => setIsOpen(false)}
            />,
            document.body
          )}
      </StyledChangeDescription>
    );
  }
);

export default ChangeDescription;
