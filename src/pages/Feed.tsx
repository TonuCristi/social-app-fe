import { useEffect } from "react";
import styled from "styled-components";

import Posts from "./Posts";
import AddPostForm from "../features/posts/AddPostForm";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/currentUserSlice";
import { addingPost, addPost, loadPosts } from "../redux/postsSlice";
import { PostRequest, PostRequestFile, PostResponse } from "../lib/types";
import { PostApi } from "../api/PostApi";
import { loadError } from "../redux/authSlice";
import { mapPost } from "../utils/mapPost";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { fb } from "../config/firebase";

const StyledFeed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 2.4rem;
`;

export default function Feed() {
  const { user } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const mapPosts = (posts: PostResponse[]) =>
    posts.map((post) => mapPost(post));

  function handleCreatePost(post: PostRequestFile) {
    // dispatch(addingPost());

    PostApi.createPost({ ...post, image: "" }).then((res) => {
      const postType = post.image.type.split("/")[1];

      const storageRef = ref(fb, `${user.id}/${res._id}.${postType}`);

      // const uploadTask = uploadBytesResumable(storageRef, post.image);

      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     const progress =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log("Upload is " + progress + "% done");
      //     switch (snapshot.state) {
      //       case "paused":
      //         console.log("Upload is paused");
      //         break;
      //       case "running":
      //         console.log("Upload is running");
      //         break;
      //     }
      //   },
      //   (error) => {
      //     console.log(error);
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      //       console.log("File available at", url);
      //       PostApi.updatePostImage(res._id, url).then((res) =>
      //         console.log(res)
      //       );
      //     });
      //   }
      // );
    });
    // dispatch(addPost(mapPost(res)))
  }

  useEffect(() => {
    PostApi.getPosts(user.id)
      .then((res) => {
        const posts = mapPosts(res);
        dispatch(loadPosts(posts));
      })
      .catch((err) => dispatch(loadError(err.response.data.error)));
  }, [user.id, dispatch]);

  return (
    <StyledFeed>
      <AddPostForm onCreatePost={handleCreatePost} />
      <Posts />
    </StyledFeed>
  );
}
