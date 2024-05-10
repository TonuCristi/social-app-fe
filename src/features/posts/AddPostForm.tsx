import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Avatar from "../../ui/Avatar";

import { selectCurrentUser } from "../../redux/currentUserSlice";
import { PostRequestFile } from "../../lib/types";
import { selectPosts } from "../../redux/postsSlice";
import { HiMiniPhoto } from "react-icons/hi2";

const StyledAddPostForm = styled.form`
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  width: 50%;
  padding: 1.6rem;
  display: flex;
  gap: 1.6rem;
  border-radius: 1.1rem;

  @media (width >= 1535px) {
    & {
      max-width: 80rem;
    }
  }

  @media (width <= 1279px) {
    & {
      padding: 1.4rem;
      width: 60%;
    }
  }

  @media (width <= 1023px) {
    & {
      padding: 1.2rem;
      gap: 1.2rem;
      width: 70%;
    }
  }

  @media (width <= 767px) {
    & {
      padding: 1rem;
      width: 80%;
    }
  }

  @media (width <= 639px) {
    & {
      width: 90%;
    }
  }

  @media (width <= 425) {
    & {
      width: 100%;
    }
  }
`;

const ProfileLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  description: string;
  image: FileList;
};

type Props = {
  onCreatePost: (post: PostRequestFile) => void;
};

export default function AddPostForm({ onCreatePost }: Props) {
  const { user } = useSelector(selectCurrentUser);
  const { isLoading } = useSelector(selectPosts);
  const { register, watch, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      description: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    onCreatePost({ ...data, image: data.image[0], user_id: user.id });

  return (
    <StyledAddPostForm onSubmit={handleSubmit(onSubmit)}>
      <ProfileLink to="/profile">
        <Avatar src={user.avatar} name={user.name} variant="postForm" />
      </ProfileLink>
      <Input
        type="text"
        variant="post"
        placeholder={`What's happening, ${user.name.split(" ")[0]}?`}
        {...register("description")}
      />

      <Container>
        <FileInputLabel htmlFor="file">
          <PhotoIcon />
        </FileInputLabel>
        <FileInput
          type="file"
          id="file"
          accept="image/png, image/jpeg"
          {...register("image")}
        />
      </Container>

      <PostBtnWrapper>
        <Button
          variant="post"
          disabled={
            watch("description").length > 0 || watch("image")?.length
              ? false
              : true
          }
        >
          Post
        </Button>
      </PostBtnWrapper>
    </StyledAddPostForm>
  );
}
