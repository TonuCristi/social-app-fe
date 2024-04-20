import styled from "styled-components";
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";

import Input, { Variant } from "../../ui/Input";
import Button from "../../ui/Button";

import { HiMiniPencilSquare } from "react-icons/hi2";

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  variant: Variant;
  newValue: string;
  onChangeValue: (value: string) => void;
};

const ChangeField = forwardRef<HTMLInputElement, Props>(function ChangeField(
  { variant, newValue, onChangeValue, ...props },
  ref
) {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onChangeValue(newValue);
      }}
    >
      <Input variant={variant} ref={ref} {...props} />
      <Button variant="icon">
        <HiMiniPencilSquare />
      </Button>
    </Form>
  );
});

export default ChangeField;
