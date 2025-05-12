import { lazy } from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
const Login = lazy(() => import("src/views/login"));
const NotFound = lazy(() => import("src/views/not-found"));
const router: RouteObject[] = [
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "*",
    Component: NotFound,
  },
];

export default createBrowserRouter(router);
