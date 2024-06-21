import styled from "styled-components";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { createPortal } from "react-dom";

import PostInteractions from "./PostInteractions";
import Avatar from "../../ui/Avatar";
import PostImage from "./PostImage";
import Button from "../../ui/Button";
import LoadingPost from "./LoadingPost";
import ProfileLink from "../../ui/ProfileLink";
import Overlay from "../../ui/Overlay";
import Likes from "../likes/Likes";
import Comments from "../comments/Comments";
import UserComment from "../comments/UserComment";
import ConfirmationModal from "../../ui/ConfirmationModal";

import {
  CommentResponse,
  Like,
  LikeResponse,
  PostT,
  User,
} from "../../lib/types";
import { getTimePassed } from "../../utils/getTimePassed";
import { HiMiniPencilSquare, HiMiniXMark } from "react-icons/hi2";
import { mapLikes } from "../../utils/mapLikes";
import { mapComments } from "../../utils/mapComments";
import { PostContext } from "./PostContext";

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
  user: User | undefined;
  post: PostT;
  setPostToEdit?: Dispatch<SetStateAction<PostT | null>>;
  setPostIdToDelete?: Dispatch<SetStateAction<string | null>>;
  onLikePost: (
    postId: string,
    likes: Like[],
    cb: (res: LikeResponse) => void
  ) => void;
  onUnlikePost: (likes: Like[], cb: (res: string) => void) => void;
  onAddComment: (
    postId: string,
    comment: string,
    commentId: string | null,
    cb: (res: CommentResponse) => void
  ) => void;
  onDeleteComment: (id: string | null, cb: () => void) => void;
  onEditComment: (
    id: string,
    comment: string,
    cb: (res: CommentResponse) => void
  ) => void;
  getFeedback: (
    postId: string,
    cb: (res: [LikeResponse[], CommentResponse[]]) => void
  ) => void;
};

export default function Post({
  user,
  post,
  setPostToEdit,
  setPostIdToDelete,
  onLikePost,
  onUnlikePost,
  onAddComment,
  onDeleteComment,
  onEditComment,
  getFeedback,
}: Props) {
  const { id, description, image, createdAt, user_id } = post;
  const {
    likes,
    comments,
    isLoading,
    isCommentsOpen,
    isLikesOpen,
    commentIdToDelete,
    setLikes,
    setIsLiked,
    setComments,
    setIsLoading,
    setCommentIdToDelete,
    likePost,
    unlikePost,
    deleteComment,
  } = useContext(PostContext);

  useEffect(() => {
    getFeedback(id, (res) => {
      const likes = mapLikes(res[0]);
      setLikes(likes);
      if (likes.find((like) => like.user_id === user?.id)) setIsLiked(true);
      const comments = mapComments(res[1])
        .reverse()
        .filter((comment) => !comment.comment_id);
      setComments(comments);
      setIsLoading(false);
    });
  }, [
    getFeedback,
    setLikes,
    setIsLiked,
    setComments,
    setIsLoading,
    id,
    user?.id,
  ]);

  if (isLoading) {
    return <LoadingPost />;
  }

  return (
    <>
      <StyledPost>
        <ProfileLink to={`/profile/${user?.id}`}>
          <Avatar src={user?.avatar} name={user?.name} variant="post" />
        </ProfileLink>

        <Container>
          <Info>
            <ProfileLink to={`/profile/${user?.id}`}>
              <Name>{user?.name}</Name>
            </ProfileLink>

            <PostTime>{getTimePassed(createdAt)}</PostTime>
          </Info>

          {user?.id === user_id && (
            <EditButtonWrapper>
              <Button
                onClick={() =>
                  setPostToEdit !== undefined && setPostToEdit(post)
                }
              >
                <EditIcon />
              </Button>
            </EditButtonWrapper>
          )}

          {user?.id === user_id && (
            <DeleteButtonWrapper>
              <Button
                onClick={() =>
                  setPostIdToDelete !== undefined && setPostIdToDelete(id)
                }
              >
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
            onLikePost={() => onLikePost(id, likes, likePost)}
            onUnlikePost={() => onUnlikePost(likes, unlikePost)}
          />
        </PostInteractionsWrapper>
      </StyledPost>

      {isLikesOpen &&
        createPortal(
          <Overlay>
            <Likes />
          </Overlay>,
          document.body
        )}

      {isCommentsOpen &&
        createPortal(
          <Overlay>
            <Comments post={post} onAddComment={onAddComment}>
              {comments.map((comment) => (
                <UserComment
                  key={comment.id}
                  comment={comment}
                  onAddComment={onAddComment}
                  onEditComment={onEditComment}
                />
              ))}
            </Comments>
          </Overlay>,
          document.body
        )}

      {commentIdToDelete &&
        createPortal(
          <Overlay>
            <ConfirmationModal
              onConfirm={() =>
                onDeleteComment(commentIdToDelete, () =>
                  deleteComment(commentIdToDelete)
                )
              }
              onClose={() => setCommentIdToDelete(null)}
              question="Are you sure about deleting this comment?"
            />
          </Overlay>,
          document.body
        )}
    </>
  );
}
