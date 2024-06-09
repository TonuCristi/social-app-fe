import { useNavigate } from "react-router-dom";
import { removeToken } from "../redux/authSlice";
import { removeUser } from "../redux/currentUserSlice";
import { useAppDispatch } from "../redux/hooks";
import { loadPosts } from "../redux/postsSlice";
import { loadUserPosts } from "../redux/userPostsSlice";

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(removeToken());
    dispatch(removeUser());
    dispatch(loadPosts([]));
    dispatch(loadUserPosts([]));
    localStorage.removeItem("token");
    sessionStorage.removeItem("scroll");
    navigate("/");
  }

  return { logout };
}
