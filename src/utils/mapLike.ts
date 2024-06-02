import { LikeResponse } from "../lib/types";

export const mapLike = (like: LikeResponse) => {
  const { _id: id, ...rest } = like;
  return { id, ...rest };
};
