import { AxiosResponse } from "axios";
import api from "../config/api";
import { PostRequest, PostResponse } from "../lib/types";

const BASE_URL = "/posts";

export const PostApi = {
  getPosts(userId: string) {
    return api
      .get(`${BASE_URL}/${userId}`)
      .then(({ data }: AxiosResponse<PostResponse[]>) => data);
  },
  createPost(post: PostRequest) {
    return api
      .post(`${BASE_URL}/createPost`, post)
      .then(({ data }: AxiosResponse<PostResponse>) => data);
  },
  updatePostImage(id: string, image: string) {
    return api
      .put(`${BASE_URL}/updateImage/${id}`, { image })
      .then(({ data }: AxiosResponse<PostResponse>) => data);
  },
};
