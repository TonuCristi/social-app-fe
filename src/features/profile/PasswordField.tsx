import styled from "styled-components";
import Input from "../../ui/Input";
import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";
import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";

const ShowIcon = styled(HiMiniEye)`
  font-size: 2rem;
  color: var(--color-zinc-100);
`;

const HideIcon = styled(HiMiniEyeSlash)`
  font-size: 2rem;
  color: var(--color-zinc-100);
`;

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const PasswordField = forwardRef<HTMLInputElement, Props>(
  function PasswordField({ ...props }, ref) {
    const [isHidden, setIsHidden] = useState<boolean>(true);

    return (
      <Input
        ref={ref}
        variant="auth"
        type={isHidden ? "password" : "text"}
        {...props}
        rightIcon={isHidden ? <ShowIcon /> : <HideIcon />}
        onRightBtnClick={() => setIsHidden((prev) => !prev)}
      />
    );
  }
);

export default PasswordField;
