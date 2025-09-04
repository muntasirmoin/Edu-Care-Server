import { Router } from "express";

import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CourseRoutes } from "../modules/course/course.route";
import { EnrollmentRoutes } from "../modules/enrollment/enrollment.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/course",
    route: CourseRoutes,
  },
  {
    path: "/enrollment",
    route: EnrollmentRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
