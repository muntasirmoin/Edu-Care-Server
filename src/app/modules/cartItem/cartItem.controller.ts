import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CartItemService } from "./cartItem.service";
import { JwtPayload } from "jsonwebtoken";

// Add item to cart
const addToCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const verifiedToken = req.user as JwtPayload;
    const userId = verifiedToken?.userId;
    const payload = { ...req.body, userId };

    const cartItem = await CartItemService.addToCart(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Item added to cart successfully",
      data: cartItem,
    });
  }
);

// Remove item from cart
const removeFromCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const cartItemId = req.params.id;

    const removedItem = await CartItemService.removeFromCart(cartItemId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Item removed from cart successfully",
      data: removedItem,
    });
  }
);

// Get all cart items for a user
const getCartByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const verifiedToken = req.user as JwtPayload;
    const userId = verifiedToken?.userId;

    const result = await CartItemService.getCartByUser(
      userId,
      req.query as Record<string, string>
    );
    console.log(result.data);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Cart items retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

// checkout

const checkoutCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const verifiedToken = req.user as JwtPayload;

    if (!verifiedToken?.userId) {
      return next(
        new Error("User authentication failed, no userId found in token")
      );
    }

    // Call the service
    const createdEnrollments = await CartItemService.checkoutCart(
      verifiedToken
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Checkout successful. Courses enrolled!",
      data: createdEnrollments,
    });
  }
);

export const CartItemController = {
  addToCart,
  removeFromCart,
  getCartByUser,
  checkoutCart,
};
