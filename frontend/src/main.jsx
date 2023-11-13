import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import Login from "./pages/login";
import Register from "./pages/register";

import Home from "./pages/home";
import Error from "./pages/Error";
import Pricing from "./pages/Pricing";

import Courses from "./pages/Courses/Courses";
import CoursesAll from "./pages/Courses/CoursesAll";

import Blog from "./pages/Blogs/Blogs";
import BlogAll from "./pages/Blogs/BlogsAll";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./pages/User/Dashboard";
import CourseUser from "./pages/User/CourseUser";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/course/:courseName",
    element: <Courses />,
    errorElement: <Error />,
  },
  {
    path: "/pricing/course/:courseName",
    element: <Pricing />,
    errorElement: <Error />,
  },
  {
    path: "/course/all",
    element: <CoursesAll />,
    errorElement: <Error />,
  },
  {
    path: "/blogs/all",
    element: <BlogAll />,
    errorElement: <Error />,
  },
  {
    path: "/blogs/:blogId",
    element: <Blog />,
    errorElement: <Error />,
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/course/my",
    element: (
      <ProtectedRoute>
        <CourseUser />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>
);
