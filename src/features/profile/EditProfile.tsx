import styled from "styled-components";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

import Message from "../../ui/Message";
import ChangeField from "./ChangeField";
import ChangeDescription from "./ChangeDescription";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserResponse } from "../../lib/types";
import { fetchUser, selectCurrentUser } from "../../redux/currentUserSlice";
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
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

  const { register, watch } = useForm<Inputs>({
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

  function handleChangeEmail(
    value: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) {
    AuthApi.changeEmail(value, id)
      .then((res) => {
        const user = mapUser(res.user);
        dispatch(fetchUser(user));
        setMessage({ text: res.message, isSuccess: true });
      })
      .catch((err) => {
        setMessage({ text: err.response.data.error, isSuccess: false });
      })
      .finally(() => setIsOpen(false));
  }

  function handleChangeUsername(
    value: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) {
    AuthApi.changeUsername(value, id)
      .then((res) => {
        const user = mapUser(res.user);
        dispatch(fetchUser(user));
        setMessage({ text: res.message, isSuccess: true });
      })
      .catch((err) => {
        setMessage({ text: err.response.data.error, isSuccess: false });
      })
      .finally(() => setIsOpen(false));
  }

  function handleChangeBirthdate(
    value: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) {
    AuthApi.changeBirthdate(value, id)
      .then((res) => {
        const user = mapUser(res.user);
        dispatch(fetchUser(user));
        setMessage({ text: res.message, isSuccess: true });
      })
      .catch((err) => {
        setMessage({ text: err.response.data.error, isSuccess: false });
      })
      .finally(() => setIsOpen(false));
  }

  function handleChangeDescription(
    value: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) {
    AuthApi.changeDescription(value, id)
      .then((res) => {
        const user = mapUser(res.user);
        dispatch(fetchUser(user));
        setMessage({ text: res.message, isSuccess: true });
      })
      .catch((err) => {
        setMessage({ text: err.response.data.error, isSuccess: false });
      })
      .finally(() => setIsOpen(false));
  }

  return (
    <StyledEditProfile>
      <Title>Edit profile</Title>
      <Form onSubmit={(e) => e.preventDefault()}>
        <ChangeField
          variant="auth"
          type="text"
          placeholder="Name"
          newValue={watch("name")}
          onChangeValue={handleChangeUsername}
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
          onChangeValue={handleChangeBirthdate}
          {...register("birth_date")}
        />

        <ChangeDescription
          newValue={watch("description")}
          onChangeValue={handleChangeDescription}
          {...register("description")}
        />
      </Form>

      {message.text && (
        <Message variant={message.isSuccess ? "regular" : "error"}>
          {message.text}
        </Message>
      )}
    </StyledEditProfile>
  );
}
