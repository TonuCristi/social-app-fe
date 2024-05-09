import { PostResponse } from "../lib/types";

export const mapPost = (post: PostResponse) => {
  const { _id: id, ...rest } = post;
  return { id, ...rest };
};
