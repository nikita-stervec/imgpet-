import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Layout } from "./Layout/Layout";
import { Error } from "./pages/Error/Error";
import { Main } from "./pages/Main/Main";
import { User } from "./pages/User/User";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import "./firebase";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
