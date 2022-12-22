import { Route } from "typings/routes";
import { lazy } from "react";

const TestRoutes: Route[] = [
  {
    path: "/test",
    component: lazy(() => import("pages/Test")),
  },
];

export default TestRoutes;
