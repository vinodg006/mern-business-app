import { Route } from "typings/routes";
import { lazy } from "react";

const UserRoutes: Route[] = [
  {
    path: "/users",
    component: lazy(() => import("pages/User")),
  },
];

export default UserRoutes;
