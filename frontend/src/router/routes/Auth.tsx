import { Route } from "typings/routes";
import { lazy } from "react";

const AuthRoutes: Route[] = [
  {
    path: "/login",
    component: lazy(() => import("pages/Login")),
    isAuth: true,
  },
  {
    path: "/register",
    component: lazy(() => import("pages/Register")),
    isAuth: true,
  },
];

export default AuthRoutes;
