import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import Friends from "./pages/Friends";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import ProfileInfo from "./features/profile/ProfileInfo";
import ChangePassword from "./features/profile/ChangePassword";
import EditProfile from "./features/profile/EditProfile";
import Feed from "./pages/Feed";
import ForeignProfileInfo from "./features/profile/ForeignProfileInfo";

import GlobalStyle from "./styles/GlobalStyle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "/notifications",
        element: <div>Notifications</div>,
      },
      {
        path: "/friends",
        element: <Friends />,
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "/profile",
            element: <ProfileInfo />,
          },
          {
            path: "/profile/changePassword",
            element: <ChangePassword />,
          },
          {
            path: "/profile/editProfile",
            element: <EditProfile />,
          },
        ],
      },
      {
        path: "/profile/:userId",
        element: <ForeignProfileInfo />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "var(--color-zinc-800)",
            color: "var(--color-zinc-100)",
            border: "1px solid var(--color-zinc-500)",
          },
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          loading: {
            duration: 3000,
          },
        }}
      />
      <GlobalStyle />
    </Provider>
  );
}
