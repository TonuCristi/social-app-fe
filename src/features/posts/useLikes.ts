import { useEffect, useState } from "react";

import { PostApi } from "../../api/PostApi";
import { Like, LikeResponse } from "../../lib/types";
import { mapLike } from "../../utils/mapLike";

export function useLikes(postId: string, userId: string) {
  const [likes, setLikes] = useState<Like[]>([]);
  const [isLikesLoading, setIsLikesLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const mapLikes = (likes: LikeResponse[]) =>
    likes.map((like) => mapLike(like));

  function handleLikePost() {
    if (likes.find((like) => like.user_id === userId)) return;

    PostApi.likePost(postId, userId).then((res) => {
      const likes = mapLikes(res);
      setLikes(likes);
      setIsLiked(true);
    });
  }

  function handleUnlikePost() {
    const like = likes.find((like) => like.user_id === userId);

    if (!like) return;

    PostApi.unlikePost(postId, like.id).then((res) => {
      const likes = mapLikes(res);
      setLikes(likes);
      setIsLiked(false);
    });
  }

  useEffect(() => {
    setIsLikesLoading(true);
    PostApi.getLikes(postId).then((res) => {
      const likes = mapLikes(res);
      setLikes(likes);
      if (likes.find((like) => like.user_id === userId)) setIsLiked(true);
      setIsLikesLoading(false);
    });
  }, [postId, userId]);

  return { handleLikePost, handleUnlikePost, likes, isLikesLoading, isLiked };
}
