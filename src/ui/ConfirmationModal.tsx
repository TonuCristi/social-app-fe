import styled from "styled-components";
import Overlay from "./Overlay";
import Button from "./Button";

const Container = styled.div`
  border: 1px solid var(--color-zinc-100);
  background-color: var(--color-zinc-900);
  padding: 2.4rem;
  border-radius: 1.1rem;
`;

const Question = styled.p`
  margin-bottom: 2.4rem;
  color: var(--color-zinc-100);
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.4rem;
`;

type Props = {
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmationModal({ onConfirm, onClose }: Props) {
  return (
    <Overlay>
      <Container>
        <Question>Are you sure about this operation?</Question>
        <Buttons>
          <Button variant="auth" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="auth" onClick={onClose}>
            Close
          </Button>
        </Buttons>
      </Container>
    </Overlay>
  );
}