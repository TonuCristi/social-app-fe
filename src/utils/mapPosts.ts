import { PostResponse } from "../lib/types";
import { mapPost } from "./mapPost";

export const mapPosts = (posts: PostResponse[]) =>
  posts.map((post) => mapPost(post));
