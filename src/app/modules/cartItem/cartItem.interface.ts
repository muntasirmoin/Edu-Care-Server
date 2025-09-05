import { Types } from "mongoose";
import { IUser } from "../user/user.interface";
import { ICourse } from "../course/course.interface";

export interface ICartItem {
  _id?: Types.ObjectId;
  userId: Types.ObjectId | IUser;
  courseId: Types.ObjectId | ICourse;
  priceSnapshot: number; // Price at the time item was added to cart
  createdAt?: Date;
  updatedAt?: Date;
}
