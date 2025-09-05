import { Schema, model, Types } from "mongoose";
import { ICartItem } from "./cartItem.interface";

const cartItemSchema = new Schema<ICartItem>(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    courseId: { type: Types.ObjectId, ref: "Course", required: true },
    priceSnapshot: { type: Number, required: true },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
    versionKey: false,
  }
);

export const CartItem = model<ICartItem>("CartItem", cartItemSchema);
