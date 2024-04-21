import { HiMiniPhoto } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { selectCurrentUser } from "../../redux/currentUserSlice";
import Avatar from "../../ui/Avatar";

const StyledAddPostForm = styled.form`
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  width: 50%;
  margin: 0 auto;
  padding: 1.6rem;
  display: flex;
  gap: 1.6rem;
  border-radius: 1.1rem;
`;

const ProfileLink = styled(NavLink)`
  text-decoration: none;
  width: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const Avatar = styled.img`
//   max-width: 100%;
//   border-radius: 100%;
// `;

const Container = styled.div`
  align-self: center;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const PostBtnWrapper = styled.div`
  border-left: 2px solid var(--color-zinc-400);
  padding-left: 1.2rem;
  display: flex;
  align-items: center;
`;

const PhotoIcon = styled(HiMiniPhoto)`
  color: var(--color-zinc-500);
  font-size: 2.4rem;
  transition: all 0.2s;

  &:hover {
    color: var(--color-sky-500);
  }
`;

type Inputs = {
  postText: string;
  file: File;
};

export default function AddPostForm() {
  const { user } = useSelector(selectCurrentUser);
  const { register, watch, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      postText: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <StyledAddPostForm onSubmit={handleSubmit(onSubmit)}>
      <ProfileLink to="/profile">
        <Avatar src={user.avatar} name={user.name} variant="postForm" />
      </ProfileLink>
      <Input
        type="text"
        variant="post"
        placeholder={`What's happening, ${user.name.split(" ")[0]}?`}
        {...register("postText")}
      />

      <Container>
        <FileInputLabel htmlFor="file">
          <PhotoIcon />
        </FileInputLabel>
        <FileInput
          type="file"
          id="file"
          accept="image/png, image/jpeg"
          {...register("file")}
        />
      </Container>

      <PostBtnWrapper>
        <Button
          variant="post"
          disabled={watch("postText").length > 0 ? false : true}
        >
          Post
        </Button>
      </PostBtnWrapper>
    </StyledAddPostForm>
  );
}
