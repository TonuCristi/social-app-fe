import styled from "styled-components";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Message from "../../ui/Message";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserResponse } from "../../lib/types";
import { AuthApi } from "../../api/AuthApi";
import { fetchUser, selectCurrentUser } from "../../redux/currentUserSlice";
import { HiMiniPhoto, HiMiniPencilSquare } from "react-icons/hi2";
import { ref, uploadBytes } from "firebase/storage";
import { fb } from "../../config/firebase";

const StyledEditProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  cursor: pointer;
`;

const LabelText = styled.p`
  background-color: var(--color-zinc-800);
  padding: 1.2rem;
  border-radius: 1.1rem;
  width: 100%;
`;

const FileInputWrapper = styled.div`
  display: none;
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
`;

const TextareaContainer = styled.div`
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

type Inputs = {
  name: string;
  birth_date: string;
  avatar: FileList;
  description: string;
};

export default function EditProfile() {
  const {
    user: { id, name, birth_date, description },
  } = useAppSelector(selectCurrentUser);
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name,
      birth_date: new Date(birth_date).toLocaleDateString(),
      description,
    },
  });
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<{
    text: string;
    isSuccess: boolean;
  }>({
    text: "",
    isSuccess: false,
  });

  const mapUser = (user: UserResponse) => {
    const { _id: id, ...rest } = user;
    return { id, ...rest };
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const imgType = data.avatar[0].type.split("/")[1];

    const storageRef = ref(fb, `avatars/${id}.${imgType}`);
    uploadBytes(storageRef, data.avatar[0]).then((snapshot) => {
      AuthApi.editUser(
        {
          ...data,
          avatar: `https://firebasestorage.googleapis.com/v0/b/social-app-f30ba.appspot.com/o/avatars%2F${id}.${imgType}?alt=media`,
        },
        id
      )
        .then((res) => {
          const user = mapUser(res);
          console.log(user);
          dispatch(fetchUser(user));
          setMessage({ text: "User edited!", isSuccess: true });
        })
        .catch((err) => {
          setMessage({ text: err.response.data.error, isSuccess: false });
        });
      console.log(snapshot);
      console.log("Uploaded a blob or file!");
    });
  };

  return (
    <StyledEditProfile>
      <Title>Change Email</Title>
      <Inputs>
        <Input
          variant="auth"
          type="text"
          placeholder="Name"
          rightIcon={<HiMiniPencilSquare />}
          {...register("name")}
        />

        <Input
          variant="auth"
          type="text"
          placeholder="Birth date"
          rightIcon={<HiMiniPencilSquare />}
          {...register("birth_date")}
        />

        <FileInputLabel htmlFor="file">
          <LabelText>Upload a photo</LabelText>
          <IconWrapper>
            <HiMiniPhoto />
          </IconWrapper>
        </FileInputLabel>
        <FileInputWrapper>
          <Input
            variant="auth"
            type="file"
            id="file"
            accept="image/png, image/jpeg"
            {...register("avatar")}
          />
        </FileInputWrapper>

        <TextareaContainer>
          <Textarea placeholder="Description" {...register("description")} />
          <IconWrapper>
            <HiMiniPencilSquare />
          </IconWrapper>
        </TextareaContainer>
      </Inputs>

      {message.text && (
        <Message variant={message.isSuccess ? "regular" : "error"}>
          {message.text}
        </Message>
      )}
    </StyledEditProfile>
  );
}
