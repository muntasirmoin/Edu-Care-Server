import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { CourseControllers } from "./course.controller";
import { Role } from "../user/user.interface"; // assuming Role enum is shared
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createCourseZodSchema,
  updateCourseZodSchema,
} from "./course.validation";

const router = Router();

// Public route: get all courses
router.get("/", CourseControllers.getAllCourses);
router.get("/:id", CourseControllers.getCourseById);

// create course
router.post(
  "/",
  validateRequest(createCourseZodSchema),
  checkAuth(Role.ADMIN),
  CourseControllers.createCourse
);

router.patch(
  "/:id",
  validateRequest(updateCourseZodSchema),
  checkAuth(Role.ADMIN),
  CourseControllers.updateCourse
);

// Soft delete a course (Admin only)
router.delete("/:id", checkAuth(Role.ADMIN), CourseControllers.deleteCourse);

export const CourseRoutes = router;
