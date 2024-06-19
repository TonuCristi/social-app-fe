import { CommentResponse } from "../lib/types";
import { mapComment } from "./mapComment";

export const mapComments = (comments: CommentResponse[]) =>
  comments.map((comment) => mapComment(comment));
