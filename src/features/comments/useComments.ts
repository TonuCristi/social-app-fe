import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { PostApi } from "../../api/PostApi";
import { Comment, CommentResponse } from "../../lib/types";
import { mapComment } from "../../utils/mapComment";

export function useComments(postId: string, userId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(true);

  const mapComments = (comments: CommentResponse[]) =>
    comments.map((comment) => mapComment(comment));

  function handleAddComment(comment: string, commentId: string | null) {
    PostApi.addComment(postId, userId, commentId, comment).then((res) => {
      const comment = mapComment(res);
      setComments([comment, ...comments]);
      toast.success("Comment added!");
    });
  }

  function handleDeleteComment(commentId: string) {
    PostApi.deleteComment(commentId).then(() => {
      const filteredComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(filteredComments);
      toast.success("Comment deleted!");
    });
  }

  function handleEditComment(commentId: string, comment: string) {
    PostApi.editComment(commentId, comment).then((res) => {
      const comment = mapComment(res);
      const editedComments = [
        comment,
        ...comments.filter((comment) => comment.id !== commentId),
      ];
      setComments(editedComments);
    });
  }

  useEffect(() => {
    PostApi.getComments(postId).then((res) => {
      const comments = mapComments(res).reverse();
      setComments(comments);
      setIsCommentsLoading(false);
    });
  }, [postId]);

  return {
    handleAddComment,
    handleDeleteComment,
    handleEditComment,
    comments,
    isCommentsLoading,
  };
}
