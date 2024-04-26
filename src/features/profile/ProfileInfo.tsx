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

  @media (width <= 639px) {
    & {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 2.4rem;
  column-gap: 3.2rem;
  align-items: center;

  @media (width <= 639px) {
    & {
      column-gap: 2.4rem;
    }
  }

  @media (width <= 425px) {
    & {
      grid-template-columns: auto;
    }
  }
`;

const Name = styled.h2`
  font-size: 3.2rem;

  @media (width <= 1279px) {
    & {
      font-size: 2.8rem;
    }
  }

  @media (width <= 1023px) {
    & {
      font-size: 2.4rem;
    }
  }
`;

const Field = styled.p`
  @media (width <= 1279px) {
    & {
      font-size: 1.4rem;
    }
  }
`;

const FieldName = styled.span`
  font-weight: 500;
  margin-right: 0.4rem;
`;

const Description = styled.p`
  line-height: 1.6;

  @media (width <= 1279px) {
    & {
      font-size: 1.4rem;
    }
  }
`;

export default function ProfileInfo() {
  const {
    user: { name, email, description, birth_date, createdAt },
  } = useAppSelector(selectCurrentUser);

  return (
    <StyledProfileInfo>
      <Container>
        <UploadAvatar />

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

      {description && (
        <Description>
          <FieldName>Description:</FieldName>
          {description}
        </Description>
      )}
    </StyledProfileInfo>
  );
}
