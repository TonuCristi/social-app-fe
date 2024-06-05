import styled from "styled-components";
import { Dispatch, SetStateAction, useState } from "react";

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
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (width <= 1279px) {
    & {
      width: 60%;
      padding: 2rem;
    }
  }

  @media (width <= 767px) {
    & {
      width: 70%;
    }
  }

  @media (width <= 639px) {
    & {
      width: 80%;
    }
  }

  @media (width <= 425px) {
    & {
      width: 85%;
    }
  }
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

  @media (width <= 1023px) {
    & {
      width: 40%;
    }
  }

  @media (width <= 767px) {
    & {
      width: 45%;
    }
  }
`;

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onUpload: (file: Blob | null, image: string | undefined) => void;
  message: {
    value: string;
    isSuccess: boolean;
  };
  setMessage: Dispatch<
    SetStateAction<{
      value: string;
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

  const createBlob = (files: FileList | null) => {
    if (files && files[0]) {
      return URL.createObjectURL(files[0]);
    }
  };

  const onCropComplete = (_: Crop, croppedAreaPixels: CropSizes) => {
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
        setMessage({ value: "Image cropped!", isSuccess: true });
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
          <Button variant="auth" disabled={isLoading} onClick={cropImage}>
            Crop
          </Button>
        </ButtonWrapper>

        <Buttons>
          <Button
            variant="auth"
            disabled={isLoading}
            onClick={() => onUpload(blob, image)}
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

        {message.value && (
          <Message variant={message.isSuccess ? "regular" : "error"}>
            {message.value}
          </Message>
        )}
      </Modal>
    </Overlay>
  );
}
