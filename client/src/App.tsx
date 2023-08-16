import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../src/features/Home";
import Layout from "../src/components/Layout";
// import WritePage from "./pages/admin/Write";
// import LoginPage from "./pages/Login";
import TopicList from "../src/features/topics/TopicList";
import PostForm from "./features/post/PostForm";
import Login from "./features/auth/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      { path: "admin/post/new", element: <PostForm /> },
      {
        path: "admin/topic",
        element: <TopicList />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
