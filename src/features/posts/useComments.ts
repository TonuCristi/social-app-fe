import { useEffect, useState } from "react";
import { PostApi } from "../../api/PostApi";
import { Comment, CommentResponse } from "../../lib/types";
import { mapComment } from "../../utils/mapComment";

export default function useComments(postId: string, userId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(true);

  const mapComments = (comments: CommentResponse[]) =>
    comments.map((comment) => mapComment(comment));

  function handleAddComment(comment: string, commentId: string | null) {
    PostApi.addComment(postId, userId, commentId, comment).then((res) => {
      const comments = mapComments(res).reverse();
      setComments(comments);
    });
  }

  useEffect(() => {
    PostApi.getComments(postId).then((res) => {
      const comments = mapComments(res).reverse();
      setComments(comments);
      setIsCommentsLoading(false);
    });
  }, [postId]);

  return { handleAddComment, comments, isCommentsLoading };
}
