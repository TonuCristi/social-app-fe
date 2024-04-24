import styled from "styled-components";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import Overlay from "../../ui/Overlay";
import Button from "../../ui/Button";
import Message from "../../ui/Message";

import { HiMiniPlusSmall } from "react-icons/hi2";
import Cropper from "react-easy-crop";

const Modal = styled.div`
  border: 3px solid var(--color-sky-500);
  border-radius: 1.1rem;
  padding: 2.4rem;
  color: #fff;
  width: 35%;
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

const Wrapper = styled.div`
  position: relative;
  height: 25rem;
`;

const ButtonWrapper = styled.div`
  width: 30%;
  align-self: center;
`;

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onUpload: (file: Blob | null, image: string | undefined) => void;
  message: {
    text: string;
    isSuccess: boolean;
  };
  setMessage: Dispatch<
    SetStateAction<{
      text: string;
      isSuccess: boolean;
    }>
  >;
  isLoading: boolean;
};

type Crop = {
  x: number;
  y: number;
};

type CropSizes = Crop & {
  width: number;
  height: number;
};

export default function UploadAvatarModal({
  setIsOpen,
  onUpload,
  message,
  setMessage,
  isLoading,
}: Props) {
  const [image, setImage] = useState<string | undefined>();

  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [cropSizes, setCropSizes] = useState<CropSizes>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const isCropped = useRef<boolean>(false);

  const createBlob = (files: FileList | null) => {
    if (files && files[0]) {
      return URL.createObjectURL(files[0]);
    }
  };

  const onCropComplete = (croppedArea: Crop, croppedAreaPixels: CropSizes) => {
    setCropSizes(croppedAreaPixels);
  };

  function cropImage() {
    const canvas = document.createElement("canvas");
    const ctx = canvas?.getContext("2d");
    const croppedImage = new Image(cropSizes.width, cropSizes.height);

    canvas.width = cropSizes.width;
    canvas.height = cropSizes.height;

    if (!image || !ctx) return;

    croppedImage.src = image;

    croppedImage.onload = () => {
      ctx.drawImage(
        croppedImage,
        cropSizes.x,
        cropSizes.y,
        cropSizes.width,
        cropSizes.height,
        0,
        0,
        cropSizes.width,
        cropSizes.height
      );
      canvas.toBlob((blob) => {
        setBlob(blob);
        isCropped.current = true;
        setMessage({ text: "Image cropped!", isSuccess: true });
      });
    };
  }

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
          onChange={(e) => setImage(createBlob(e.target.files))}
        />

        {image && (
          <Wrapper>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Wrapper>
        )}

        <ButtonWrapper>
          <Button variant="auth" onClick={cropImage}>
            Crop
          </Button>
        </ButtonWrapper>

        <Buttons>
          <Button
            variant="auth"
            disabled={isLoading}
            onClick={() => {
              onUpload(blob, image);
            }}
          >
            Upload
          </Button>
          <Button
            variant="auth"
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
          >
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
