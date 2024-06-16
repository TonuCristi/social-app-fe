import styled from "styled-components";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { createPortal } from "react-dom";

import Message from "../../ui/Message";
import ConfirmationModal from "../../ui/ConfirmationModal";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUser, selectCurrentUser } from "../../redux/currentUserSlice";
import { AuthApi } from "../../api/AuthApi";
import { mapUser } from "../../utils/mapUser";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { capitalize } from "../../utils/capitalize";
import toast from "react-hot-toast";

const fields = [
  { identifier: "name", name: "username", type: "text" },
  { identifier: "email", name: "email", type: "email" },
  { identifier: "birth_date", name: "birth date", type: "date" },
  { identifier: "description", name: "description", type: "" },
] as const;

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

const ChangeField = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
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

const IconWrapper = styled.div`
  background-color: var(--color-zinc-800);
  color: var(--color-zinc-100);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 0.6rem;
  font-size: 1.8rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-sky-500);
    color: var(--color-zinc-800);
  }
`;

type Inputs = {
  name: string;
  email: string;
  birth_date: string;
  description: string;
};

export default function EditProfile() {
  const {
    currentUser: { id, name, email, birth_date, description },
  } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { register, watch } = useForm<Inputs>({
    defaultValues: {
      name,
      email,
      birth_date: new Date(birth_date).toLocaleDateString(),
      description,
    },
  });
  const [currentField, setCurrentField] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    value: string;
    isSuccess: boolean;
  }>({
    value: "",
    isSuccess: false,
  });

  function handleChangeField(identifier: string) {
    if (identifier === "name") {
      AuthApi.changeUsername(watch("name"), id)
        .then((res) => {
          const user = mapUser(res.user);
          dispatch(fetchUser(user));
          toast.success(res.message);
        })
        .catch((err) => {
          setMessage({ value: err.response.data.error, isSuccess: false });
        })
        .finally(() => setCurrentField(null));
    }

    if (identifier === "email") {
      AuthApi.changeEmail(watch("email"), id)
        .then((res) => {
          const user = mapUser(res.user);
          dispatch(fetchUser(user));
          toast.success(res.message);
        })
        .catch((err) => {
          setMessage({ value: err.response.data.error, isSuccess: false });
        })
        .finally(() => setCurrentField(null));
    }

    if (identifier === "birth_date") {
      AuthApi.changeBirthdate(watch("birth_date"), id)
        .then((res) => {
          const user = mapUser(res.user);
          dispatch(fetchUser(user));
          toast.success(res.message);
        })
        .catch((err) => {
          setMessage({ value: err.response.data.error, isSuccess: false });
        })
        .finally(() => setCurrentField(null));
    }

    if (identifier === "description") {
      AuthApi.changeDescription(watch("description"), id)
        .then((res) => {
          const user = mapUser(res.user);
          dispatch(fetchUser(user));
          toast.success(res.message);
        })
        .catch((err) => {
          setMessage({ value: err.response.data.error, isSuccess: false });
        })
        .finally(() => setCurrentField(null));
    }
  }

  return (
    <>
      <StyledEditProfile>
        <Title>Edit profile</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          {fields.map((field) => (
            <ChangeField key={field.identifier}>
              {field.identifier === "description" ? (
                <Textarea
                  placeholder="Description"
                  {...register("description")}
                />
              ) : (
                <Input
                  variant="auth"
                  placeholder={capitalize(field.name)}
                  {...register(field.identifier)}
                />
              )}
              <Button onClick={() => setCurrentField(field.identifier)}>
                <IconWrapper>
                  <HiMiniPencilSquare />
                </IconWrapper>
              </Button>
            </ChangeField>
          ))}
        </Form>

        {message.value && (
          <Message variant={message.isSuccess ? "regular" : "error"}>
            {message.value}
          </Message>
        )}
      </StyledEditProfile>

      {fields.map((field) => (
        <Fragment key={field.identifier}>
          {currentField === field.identifier &&
            createPortal(
              <ConfirmationModal
                onConfirm={() => handleChangeField(field.identifier)}
                onClose={() => setCurrentField(null)}
                question={`Are you sure about changing the ${field.name}?`}
              />,
              document.body
            )}
        </Fragment>
      ))}
    </>
  );
}
