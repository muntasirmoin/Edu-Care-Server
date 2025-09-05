import { z } from "zod";
import { Types } from "mongoose";

// Add to Cart Validation
export const addToCartZodSchema = z.object({
  userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid User ID",
  }),

  courseId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid Course ID",
  }),

  priceSnapshot: z
    .number({ message: "Price must be a number" })
    .nonnegative({ message: "Price cannot be negative" })
    .optional(),
});
