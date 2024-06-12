import { CommentResponse } from "../lib/types";

export function mapComment(comment: CommentResponse) {
  const { _id: id, ...rest } = comment;
  return { id, ...rest };
}
