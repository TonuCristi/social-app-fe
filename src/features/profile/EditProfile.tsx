import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Message from "../../ui/Message";
import ChangeField from "./ChangeField";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserResponse } from "../../lib/types";
import { fetchUser, selectCurrentUser } from "../../redux/currentUserSlice";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { AuthApi } from "../../api/AuthApi";

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
  email: string;
  birth_date: string;
  description: string;
};

export default function EditProfile() {
  const {
    user: { id, name, email, birth_date, description },
  } = useAppSelector(selectCurrentUser);

  const { register, reset, watch } = useForm<Inputs>({
    defaultValues: {
      name,
      email,
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

  function handleChangeEmail(email: string) {
    AuthApi.changeEmail(email, id)
      .then((res) => {
        const user = mapUser(res);
        dispatch(fetchUser(user));
        setMessage({ text: "Email changed!", isSuccess: true });
      })
      .catch((err) => {
        console.log(err);
        setMessage({ text: err.response.data.error, isSuccess: false });
      });
  }

  return (
    <StyledEditProfile>
      <Title>Edit profile</Title>
      <Inputs>
        <ChangeField
          variant="auth"
          type="text"
          placeholder="Name"
          newValue={watch("name")}
          onChangeValue={handleChangeEmail}
          {...register("name")}
        />

        <ChangeField
          variant="auth"
          type="text"
          placeholder="Email"
          newValue={watch("email")}
          onChangeValue={handleChangeEmail}
          {...register("email")}
        />

        <ChangeField
          variant="auth"
          type="text"
          placeholder="Birth date"
          newValue={watch("birth_date")}
          onChangeValue={handleChangeEmail}
          {...register("birth_date")}
        />

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
