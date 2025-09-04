import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "../user/user.validation";
import { UserControllers } from "../user/user.controller";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);
router.post("/login", AuthControllers.credentialsLogin);
router.post("/logout", AuthControllers.logout);

export const AuthRoutes = router;
