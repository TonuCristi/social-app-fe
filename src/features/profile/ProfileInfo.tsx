import styled from "styled-components";

import UploadAvatar from "./UploadAvatar";

import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/currentUserSlice";

const StyledProfileInfo = styled.div`
  color: var(--color-zinc-100);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  margin-bottom: 2.4rem;
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 2.4rem;
  column-gap: 3.2rem;
  align-items: center;
`;

const Name = styled.h2`
  font-size: 3.2rem;
`;

const Field = styled.p``;

const FieldName = styled.span`
  font-weight: 500;
  margin-right: 0.4rem;
`;

const Description = styled.p`
  line-height: 1.6;
`;

export default function ProfileInfo() {
  const {
    user: { name, email, description, birth_date, avatar, createdAt },
  } = useAppSelector(selectCurrentUser);

  return (
    <StyledProfileInfo>
      <Container>
        <UploadAvatar avatar={avatar} />

        <Info>
          <Name>{name}</Name>
          <Field>
            <FieldName>Birthday:</FieldName>
            {new Date(birth_date).toLocaleDateString()}
          </Field>
          <Field>
            <FieldName>Email:</FieldName> {email}
          </Field>
          <Field>
            <FieldName>Our friend since:</FieldName>
            {new Date(createdAt).toLocaleDateString()}
          </Field>
        </Info>
      </Container>

      <Description>
        <FieldName>Description:</FieldName>
        {description}
      </Description>
    </StyledProfileInfo>
  );
}
