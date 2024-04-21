import styled from "styled-components";
import {
  DetailedHTMLProps,
  Dispatch,
  forwardRef,
  InputHTMLAttributes,
  SetStateAction,
  useState,
} from "react";

import Input, { Variant } from "../../ui/Input";
import Button from "../../ui/Button";

import { HiMiniPencilSquare } from "react-icons/hi2";
import { createPortal } from "react-dom";
import ConfirmationModal from "../../ui/ConfirmationModal";

const StyledChangeField = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
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
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-sky-500);
    color: var(--color-zinc-800);
  }
`;

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  variant: Variant;
  newValue: string;
  onChangeValue: (
    value: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => void;
};

const ChangeField = forwardRef<HTMLInputElement, Props>(function ChangeField(
  { variant, newValue, onChangeValue, ...props },
  ref
) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <StyledChangeField>
      <Input variant={variant} ref={ref} {...props} />
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
    </StyledChangeField>
  );
});

export default ChangeField;
