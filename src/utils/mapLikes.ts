import { LikeResponse } from "../lib/types";
import { mapLike } from "./mapLike";

export const mapLikes = (likes: LikeResponse[]) =>
  likes.map((like) => mapLike(like));
