import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import Overlay from "../../ui/Overlay";
import Button from "../../ui/Button";
import Message from "../../ui/Message";

import { HiMiniPlusSmall } from "react-icons/hi2";
import { selectCurrentUser } from "../../redux/currentUserSlice";
import { useAppSelector } from "../../redux/hooks";

const Modal = styled.div`
  border: 3px solid var(--color-sky-500);
  border-radius: 1.1rem;
  padding: 2.4rem;
  color: #fff;
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Uploader = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: var(--color-zinc-700);
  border-radius: 1.1rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-zinc-800);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Icon = styled(HiMiniPlusSmall)`
  font-size: 4.8rem;
  stroke-width: 0.1rem;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const Image = styled.img`
  max-width: 100%;
  align-self: center;
`;

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onUpload: (files: FileList) => void;
  message: {
    text: string;
    isSuccess: boolean;
  };
};

type Inputs = {
  avatar: FileList;
};

export default function UploadAvatarModal({
  setIsOpen,
  onUpload,
  message,
}: Props) {
  const {
    user: { avatar },
  } = useAppSelector(selectCurrentUser);
  const { register, watch } = useForm<Inputs>();

  const createBlob = (files: FileList) => {
    if (files && files[0]) {
      return URL.createObjectURL(files[0]);
    }
  };

  return (
    <Overlay>
      <Modal>
        <Uploader htmlFor="avatar">
          Upload a photo <Icon />
        </Uploader>
        <FileInput
          id="avatar"
          type="file"
          accept="image/png, image/jpeg"
          {...register("avatar")}
        />

        <Image
          src={createBlob(watch("avatar")) || avatar}
          onClick={(e) => console.log(e)}
        />

        <Buttons>
          <Button
            variant="auth"
            onClick={() => {
              onUpload(watch("avatar"));
            }}
          >
            Upload
          </Button>
          <Button variant="auth" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Buttons>

        {message.text && (
          <Message variant={message.isSuccess ? "regular" : "error"}>
            {message.text}
          </Message>
        )}
      </Modal>
    </Overlay>
  );
}
