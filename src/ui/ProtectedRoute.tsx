import Authentication from "../pages/Authentication";
import RootLayout from "./RootLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { selectAuth } from "../redux/authSlice";
import { useAppSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";
import { useLogout } from "../hooks/useLogout";

export default function ProtectedRoute() {
  const auth = useAppSelector(selectAuth);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useLogout();

  useEffect(() => {
    if (auth.token) {
      const { exp } = jwtDecode(auth.token);
      if (exp && Date.now() > exp) logout();
    }
  }, [auth.token, logout]);

  useEffect(() => {
    if (!auth.token && location.pathname !== "/") {
      navigate("/");
    }
  }, [location.pathname, navigate, auth.token]);

  return auth.token ? <RootLayout /> : <Authentication />;
}
