import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import toast from "react-hot-toast";

import { Comment, CommentResponse, Like, LikeResponse } from "../../lib/types";
import { mapComment } from "../../utils/mapComment";
import { mapLike } from "../../utils/mapLike";

type PostContext = {
  likes: Like[];
  isLiked: boolean;
  comments: Comment[];
  isLoading: boolean;
  isCommentsOpen: boolean;
  isLikesOpen: boolean;
  setLikes: Dispatch<SetStateAction<Like[]>>;
  setIsLiked: Dispatch<SetStateAction<boolean>>;
  setComments: Dispatch<SetStateAction<Comment[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsCommentsOpen: Dispatch<SetStateAction<boolean>>;
  setIsLikesOpen: Dispatch<SetStateAction<boolean>>;
  likePost: (res: LikeResponse) => void;
  unlikePost: (res: string) => void;
  addComment: (res: CommentResponse) => void;
  deleteComment: (id: string) => void;
  editComment: (id: string, res: CommentResponse) => void;
};

export const PostContext = createContext<PostContext>({
  likes: [],
  isLiked: false,
  comments: [],
  isLoading: true,
  isCommentsOpen: false,
  isLikesOpen: false,
  setLikes: () => undefined,
  setIsLiked: () => undefined,
  setComments: () => undefined,
  setIsLoading: () => undefined,
  setIsCommentsOpen: () => undefined,
  setIsLikesOpen: () => undefined,
  likePost: () => undefined,
  unlikePost: () => undefined,
  addComment: () => undefined,
  deleteComment: () => undefined,
  editComment: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function PostProvider({ children }: Props) {
  const [likes, setLikes] = useState<Like[]>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [isLikesOpen, setIsLikesOpen] = useState<boolean>(false);

  const likePost = (res: LikeResponse) => {
    const like = mapLike(res);
    setLikes([...likes, like]);
    setIsLiked(true);
  };

  const unlikePost = (res: string) => {
    const id = res;
    setLikes(likes.filter((like) => like.id !== id));
    setIsLiked(false);
  };

  const addComment = (res: CommentResponse) => {
    const comment = mapComment(res);
    if (comment.comment_id) return;
    setComments([comment, ...comments]);
    toast.success("Comment added!");
  };

  const deleteComment = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
    toast.success("Comment deleted!");
  };

  const editComment = (id: string, res: CommentResponse) => {
    const comment = mapComment(res);
    const commentInd = comments.findIndex((comm) => comm.id === comment.id);
    const filteredComments = comments.filter((comment) => comment.id !== id);

    const editedComments = [
      ...filteredComments.slice(0, commentInd),
      comment,
      ...filteredComments.slice(commentInd),
    ];

    setComments(editedComments);
  };

  return (
    <PostContext.Provider
      value={{
        likes,
        isLiked,
        comments,
        isLoading,
        isCommentsOpen,
        isLikesOpen,
        setLikes,
        setIsLiked,
        setComments,
        setIsLoading,
        setIsCommentsOpen,
        setIsLikesOpen,
        likePost,
        unlikePost,
        addComment,
        deleteComment,
        editComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
