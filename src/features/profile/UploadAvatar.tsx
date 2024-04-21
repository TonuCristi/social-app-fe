import styled from "styled-components";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

import Overlay from "../../ui/Overlay";
import Button from "../../ui/Button";
import Avatar from "../../ui/Avatar";

import { HiMiniPlusSmall } from "react-icons/hi2";
import { SubmitHandler, useForm } from "react-hook-form";

const Modal = styled.form`
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
  /* border-radius: 100%; */
  max-width: 100%;
  align-self: center;
`;

type Props = {
  avatar: string;
};

type Inputs = {
  avatar: FileList;
};

export default function UploadAvatar({ avatar }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const [url, setUrl] = useState<string>("");
  // const inputRef = useRef(null);

  useEffect(() => {}, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const url = URL.createObjectURL(data.avatar[0]);
    setUrl(url);
    console.log(url);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Avatar src={avatar} variant="profile" />
      </Button>

      {isOpen &&
        createPortal(
          <Overlay>
            <Modal onSubmit={handleSubmit(onSubmit)}>
              <Uploader htmlFor="avatar">
                Upload a photo <Icon />
              </Uploader>
              <FileInput
                id="avatar"
                type="file"
                accept="image/png, image/jpeg"
                {...register("avatar")}
              />

              <Image src={url || avatar} />

              <Buttons>
                <Button variant="auth">Upload</Button>
                <Button variant="auth" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </Buttons>
            </Modal>
          </Overlay>,
          document.body
        )}
    </>
  );
}
