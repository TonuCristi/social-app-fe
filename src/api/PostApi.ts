import { AxiosResponse } from "axios";
import api from "../config/api";
import {
  CommentResponse,
  LikeResponse,
  PostRequest,
  PostResponse,
} from "../lib/types";

const BASE_URL = "/posts";

export const PostApi = {
  getPosts(userId: string, perPage: number, offset: number) {
    return api
      .get(`${BASE_URL}/${userId}?perPage=${perPage}&offset=${offset}`)
      .then(({ data }: AxiosResponse<PostResponse[]>) => data);
  },
  createPost(post: PostRequest) {
    return api
      .post(`${BASE_URL}/post/createPost`, post)
      .then(({ data }: AxiosResponse<PostResponse>) => data);
  },
  updatePostImage(id: string, image: string) {
    return api
      .put(`${BASE_URL}/post/updateImage/${id}`, { image })
      .then(({ data }: AxiosResponse<PostResponse>) => data);
  },
  updatePostDescription(id: string, description: string) {
    return api
      .put(`${BASE_URL}/post/updateDescription/${id}`, { description })
      .then(({ data }: AxiosResponse<PostResponse>) => data);
  },
  deletePost(id: string) {
    return api
      .delete(`${BASE_URL}/post/deletePost/${id}`)
      .then(({ data }: AxiosResponse<{ message: string }>) => data);
  },
  likePost(postId: string, userId: string) {
    return api
      .post(`${BASE_URL}/post/like/${postId}`, { user_id: userId })
      .then(({ data }: AxiosResponse<LikeResponse[]>) => data);
  },
  unlikePost(postId: string, likeId: string) {
    return api
      .post(`${BASE_URL}/post/unlike/${postId}`, { like_id: likeId })
      .then(({ data }: AxiosResponse<LikeResponse[]>) => data);
  },
  getLikes(postId: string) {
    return api
      .get(`${BASE_URL}/post/likes/${postId}`)
      .then(({ data }: AxiosResponse<LikeResponse[]>) => data);
  },
  addComment(
    postId: string,
    userId: string,
    commentId: string | null,
    comment: string
  ) {
    return api
      .post(`${BASE_URL}/post/comment/${postId}`, {
        comment,
        user_id: userId,
        comment_id: commentId,
      })
      .then(({ data }: AxiosResponse<CommentResponse>) => data);
  },
  getComments(postId: string) {
    return api
      .get(`${BASE_URL}/post/comments/${postId}`)
      .then(({ data }: AxiosResponse<CommentResponse[]>) => data);
  },
  deleteComment(id: string) {
    return api
      .delete(`${BASE_URL}/post/deleteComment/${id}`)
      .then(({ data }: AxiosResponse<{ message: string }>) => data);
  },
  editComment(id: string, comment: string) {
    return api
      .put(`${BASE_URL}/post/editComment/${id}`, { comment })
      .then(({ data }: AxiosResponse<CommentResponse>) => data);
  },
};
