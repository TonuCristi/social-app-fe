import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

import PostInteractions from "./PostInteractions";
import Avatar from "../../ui/Avatar";
import PostImage from "./PostImage";
import Button from "../../ui/Button";
import LoadingPost from "./LoadingPost";

import {
  Comment,
  CommentResponse,
  Like,
  LikeResponse,
  PostT,
} from "../../lib/types";
import { getTimePassed } from "../../utils/getTimePassed";
import { PostApi } from "../../api/PostApi";
import { HiMiniPencilSquare, HiMiniXMark } from "react-icons/hi2";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/currentUserSlice";
import { mapLike } from "../../utils/mapLike";
import { mapComment } from "../../utils/mapComment";

const StyledPost = styled.div`
  border: 1px solid var(--color-zinc-500);
  background-color: var(--color-zinc-950);
  width: 80%;
  border-radius: 1.1rem;
  padding: 1.6rem;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  column-gap: 1.6rem;
  row-gap: 2rem;

  @media (width >= 1535px) {
    & {
      max-width: 70rem;
    }
  }

  @media (width <= 1279px) {
    & {
      width: 85%;
    }
  }

  @media (width <= 1023px) {
    & {
      width: 90%;
    }
  }

  @media (width <= 767px) {
    & {
      width: 95%;
    }
  }

  @media (width <= 639px) {
    & {
      width: 100%;
    }
  }
`;

const Container = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (width <= 1279px) {
    & {
      height: 80%;
      align-self: center;
    }
  }
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

const PostTime = styled.span`
  font-size: 1.4rem;
  color: var(--color-zinc-100);

  @media (width <= 1279px) {
    & {
      font-size: 1.2rem;
    }
  }
`;

const Content = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Description = styled.pre`
  color: var(--color-zinc-100);

  @media (width <= 1279px) {
    & {
      font-size: 1.4rem;
    }
  }
`;

const PostInteractionsWrapper = styled.div`
  grid-column: 2;
  grid-row: 3;
`;

const EditButtonWrapper = styled.div`
  margin-left: auto;
  align-self: flex-start;
`;

const DeleteButtonWrapper = styled.div`
  align-self: flex-start;
`;

const EditIcon = styled(HiMiniPencilSquare)`
  color: var(--color-zinc-100);
  font-size: 2.4rem;
  padding: 0.1rem;
  border-radius: 100%;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-sky-500);
  }
`;

const DeleteIcon = styled(HiMiniXMark)`
  color: var(--color-zinc-100);
  font-size: 2.4rem;
  padding: 0.1rem;
  border-radius: 100%;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-sky-500);
  }
`;

type Props = {
  post: PostT;
  setPostToEdit: Dispatch<SetStateAction<PostT | null>>;
  setPostIdToDelete: Dispatch<SetStateAction<string | null>>;
};

export default function Post({
  post,
  setPostToEdit,
  setPostIdToDelete,
}: Props) {
  const { currentUser } = useAppSelector(selectCurrentUser);
  const { id, description, image, createdAt, user_id } = post;
  const [likes, setLikes] = useState<Like[]>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const mapLikes = (likes: LikeResponse[]) =>
    likes.map((like) => mapLike(like));

  function handleLikePost() {
    if (likes.find((like) => like.user_id === currentUser.id)) return;

    PostApi.likePost(id, currentUser.id).then((res) => {
      const likes = mapLikes(res);
      setLikes(likes);
      setIsLiked(true);
    });
  }

  function handleUnlikePost() {
    const like = likes.find((like) => like.user_id === currentUser.id);

    if (!like) return;

    PostApi.unlikePost(id, like.id).then((res) => {
      const likes = mapLikes(res);
      setLikes(likes);
      setIsLiked(false);
    });
  }

  const mapComments = (comments: CommentResponse[]) =>
    comments.map((comment) => mapComment(comment));

  function handleAddComment(comment: string, commentId: string | null) {
    PostApi.addComment(id, currentUser.id, commentId, comment).then((res) => {
      const comment = mapComment(res);
      console.log(comment);
      if (comment.comment_id) return;
      setComments([comment, ...comments]);
      toast.success("Comment added!");
    });
  }

  function handleDeleteComment(id: string) {
    PostApi.deleteComment(id).then(() => {
      setComments(comments.filter((comment) => comment.id !== id));
      toast.success("Comment deleted!");
    });
  }

  function handleEditComment(id: string, comment: string) {
    PostApi.editComment(id, comment).then((res) => {
      const comment = mapComment(res);
      const commentInd = comments.findIndex((comm) => comm.id === comment.id);
      const filteredComments = comments.filter((comment) => comment.id !== id);

      const editedComments = [
        ...filteredComments.slice(0, commentInd),
        comment,
        ...filteredComments.slice(commentInd),
      ];

      setComments(editedComments);
    });
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([PostApi.getLikes(id), PostApi.getComments(id)]).then((res) => {
      const likes = mapLikes(res[0]);
      setLikes(likes);
      if (likes.find((like) => like.user_id === currentUser.id))
        setIsLiked(true);

      const comments = mapComments(res[1])
        .reverse()
        .filter((comment) => !comment.comment_id);
      setComments(comments);
      setIsLoading(false);
    });
  }, [id, currentUser.id]);

  if (isLoading) {
    return <LoadingPost />;
  }

  return (
    <>
      <StyledPost>
        <ProfileLink to="/profile">
          <Avatar
            src={currentUser.avatar}
            name={currentUser.name}
            variant="post"
          />
        </ProfileLink>

        <Container>
          <Info>
            <ProfileLink to="/profile">
              <Name>{currentUser.name}</Name>
            </ProfileLink>

            <PostTime>{getTimePassed(createdAt)}</PostTime>
          </Info>

          {currentUser.id === user_id && (
            <EditButtonWrapper>
              <Button onClick={() => setPostToEdit(post)}>
                <EditIcon />
              </Button>
            </EditButtonWrapper>
          )}

          {currentUser.id === user_id && (
            <DeleteButtonWrapper>
              <Button onClick={() => setPostIdToDelete(id)}>
                <DeleteIcon />
              </Button>
            </DeleteButtonWrapper>
          )}
        </Container>

        <Content>
          {description && <Description>{description}</Description>}

          {image && <PostImage image={image} />}
        </Content>

        <PostInteractionsWrapper>
          <PostInteractions
            likes={likes}
            isLiked={isLiked}
            onLikePost={handleLikePost}
            onUnlikePost={handleUnlikePost}
            comments={comments}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            onEditComment={handleEditComment}
          />
        </PostInteractionsWrapper>
      </StyledPost>
    </>
  );
}
