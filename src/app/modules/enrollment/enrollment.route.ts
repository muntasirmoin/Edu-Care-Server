import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { EnrollmentControllers } from "./enrollment.controller";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createEnrollmentZodSchema,
  updateEnrollmentZodSchema,
} from "./enrollment.validation";

const router = Router();

// get enrollment by self
router.get(
  "/my-enrollments",
  checkAuth(Role.USER, Role.ADMIN),
  EnrollmentControllers.getMyEnrollments
);

// Get all enrollments (admin only)
router.get("/", checkAuth(Role.ADMIN), EnrollmentControllers.getAllEnrollments);

// Get a single enrollment by ID
router.get(
  "/:id",
  checkAuth(Role.ADMIN),
  EnrollmentControllers.getEnrollmentById
);

// Create a new enrollment (admin or user)
router.post(
  "/",
  validateRequest(createEnrollmentZodSchema),
  checkAuth(...Object.values(Role)),
  EnrollmentControllers.createEnrollment
);

// Update an enrollment (admin or user)
router.patch(
  "/:id",
  validateRequest(updateEnrollmentZodSchema),
  checkAuth(...Object.values(Role)),
  EnrollmentControllers.updateEnrollment
);

// Soft delete an enrollment (admin only)
router.delete(
  "/:id",
  checkAuth(Role.ADMIN),
  EnrollmentControllers.deleteEnrollment
);

export const EnrollmentRoutes = router;
