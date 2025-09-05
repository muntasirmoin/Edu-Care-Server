import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";

import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { CartItemController } from "./cartItem.controller";
import { addToCartZodSchema } from "./cartItem.validation";

const router = Router();

// Add a course to cart
router.post(
  "/",
  checkAuth(Role.USER), // only users can add to cart
  validateRequest(addToCartZodSchema),
  CartItemController.addToCart
);

// check out
router.post("/checkout", checkAuth(Role.USER), CartItemController.checkoutCart);

// Get all cart items for logged-in user
router.get("/", checkAuth(Role.USER), CartItemController.getCartByUser);

// Remove an item from cart
router.delete("/:id", checkAuth(Role.USER), CartItemController.removeFromCart);

export const CartRoutes = router;
