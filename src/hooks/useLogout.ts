import { useNavigate } from "react-router-dom";
import { removeToken } from "../redux/authSlice";
import { removeUser } from "../redux/currentUserSlice";
import { useAppDispatch } from "../redux/hooks";

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(removeToken());
    dispatch(removeUser());
    localStorage.removeItem("token");
    sessionStorage.removeItem("scroll");
    navigate("/");
  }

  return { logout };
}
