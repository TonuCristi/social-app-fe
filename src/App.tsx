import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import ErrorPage from "./pages/ErrorPage";
import Posts from "./pages/Posts";
import ProtectedRoute from "./ui/ProtectedRoute";
import Friends from "./pages/Friends";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import ProfileInfo from "./features/profile/ProfileInfo";
import ChangePassword from "./features/profile/ChangePassword";

import GlobalStyle from "./styles/GlobalStyle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Posts />,
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
            path: "/profile/changeEmail",
            element: <div>Change email test</div>,
          },
          {
            path: "/profile/editProfile",
            element: <div>Edit profle</div>,
          },
        ],
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
      <GlobalStyle />
    </Provider>
  );
}
