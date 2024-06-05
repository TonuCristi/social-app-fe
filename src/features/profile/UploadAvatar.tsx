import styled from "styled-components";
import { createPortal } from "react-dom";
import { useState } from "react";

import Avatar from "../../ui/Avatar";
import UploadAvatarModal from "./UploadAvatarModal";

import { fetchUser, selectCurrentUser } from "../../redux/currentUserSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { HiMiniArrowPath } from "react-icons/hi2";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { fb } from "../../config/firebase";
import { AuthApi } from "../../api/AuthApi";
import { mapUser } from "../../utils/mapUser";

const Button = styled.button`
  border: 5px solid var(--color-sky-500);
  background: none;
  cursor: pointer;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-zinc-300);
    border-radius: 100%;
    opacity: 0;
    transition: all 0.2s;
  }

  &:hover::before {
    opacity: 0.5;
  }

  &:hover svg {
    opacity: 1;
  }
`;

const Icon = styled(HiMiniArrowPath)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3.2rem;
  color: var(--color-zinc-950);
  opacity: 0;
  transition: all 0.2s;
`;

export default function UploadAvatar() {
  const {
    user: { id, avatar },
  } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    value: string;
    isSuccess: boolean;
  }>({
    value: "",
    isSuccess: false,
  });

  async function handleUpload(file: Blob | null, image: string | undefined) {
    if (!image) {
      return setMessage({
        value: "You should upload a photo!",
        isSuccess: false,
      });
    }

    if (!file) {
      return setMessage({
        value: "You should crop the photo!",
        isSuccess: false,
      });
    }

    setIsLoading(true);

    // Delete the current avatar
    if (avatar) {
      const deleteImgType = new URL(avatar).pathname.split(".").reverse()[0];
      const avatarRef = ref(fb, `avatars/${id}.${deleteImgType}`);

      await deleteObject(avatarRef).catch(() => {
        setMessage({ value: "Something went wrong!", isSuccess: false });
        setIsLoading(false);
      });
    }

    // Upload new avatar
    const imgType = file.type.split("/")[1];
    const storageRef = ref(fb, `avatars/${id}.${imgType}`);
    const uploadAvatar = uploadBytesResumable(storageRef, file, {
      contentType: `image/${imgType}`,
    });

    uploadAvatar.on(
      "state_changed",
      () => {},
      () => {
        setMessage({ value: "Something went wrong!", isSuccess: false });
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadAvatar.snapshot.ref).then((downloadURL) => {
          AuthApi.changeAvatar(downloadURL, id)
            .then((res) => {
              const user = mapUser(res.user);
              dispatch(fetchUser(user));
            })
            .catch((err) => {
              setMessage({ value: err.response.data.error, isSuccess: false });
            })
            .finally(() => {
              setIsOpen(false);
              setIsLoading(false);
            });
        });
      }
    );
  }

  return (
    <>
      <Button
        onClick={() => {
          setMessage({ value: "", isSuccess: false });
          setIsOpen(true);
        }}
      >
        <Avatar src={avatar} variant="profile" />
        <Icon />
      </Button>

      {isOpen &&
        createPortal(
          <UploadAvatarModal
            setIsOpen={setIsOpen}
            onUpload={handleUpload}
            message={message}
            setMessage={setMessage}
            isLoading={isLoading}
          />,
          document.body
        )}
    </>
  );
}
