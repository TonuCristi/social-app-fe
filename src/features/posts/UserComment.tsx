import { useState } from "react";
import styled from "styled-components";

import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";

import { Comment } from "../../lib/types";
import { useUser } from "../../hooks/useUser";
import { getTimePassed } from "../../utils/getTimePassed";
import { NavLink } from "react-router-dom";

const StyledUserComment = styled.li`
  margin-right: 1.2rem;
  padding: 0.8rem;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1.4rem;
  row-gap: 0.4rem;
`;

const Container = styled.div`
  background-color: var(--color-zinc-800);
  border-radius: 1.1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileLink = styled(NavLink)`
  text-decoration: none;
`;

const Name = styled.h4`
  color: var(--color-zinc-100);

  @media (width <= 1279px) {
    & {
      font-size: 1.4rem;
    }
  }
`;

const CommentContent = styled.p`
  color: var(--color-zinc-300);
`;

const CommentInteractions = styled.div`
  grid-row: 2;
  grid-column: 2;
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const PostTime = styled.span`
  font-size: 1.4rem;
  color: var(--color-zinc-300);
`;

const FormWrapper = styled.div`
  grid-row: 3;
  grid-column: 2;
  margin-top: 0.8rem;
`;

type Props = {
  comment: Comment;
};

export default function UserComment({ comment }: Props) {
  const [isResponseFormOpen, setIsResponseFormOpen] = useState<boolean>(false);
  const { comment: commentContent, user_id, createdAt } = comment;
  const user = useUser(user_id);

  return (
    <StyledUserComment>
      <Avatar variant="post" name={user?.name} src={user?.avatar} />

      <Container>
        <ProfileLink to="/profile">
          <Name>{user?.name}</Name>
        </ProfileLink>
        <CommentContent>{commentContent}</CommentContent>
      </Container>

      <CommentInteractions>
        <PostTime>{getTimePassed(createdAt)}</PostTime>
        <Button variant="comment" onClick={() => setIsResponseFormOpen(true)}>
          Respond
        </Button>
      </CommentInteractions>
      {isResponseFormOpen && (
        <FormWrapper>{/* <AddCommentForm /> */}</FormWrapper>
      )}
    </StyledUserComment>
  );
}
