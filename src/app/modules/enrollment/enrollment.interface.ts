import { Types } from "mongoose";
import { IUser } from "../user/user.interface";
import { ICourse } from "../course/course.interface";

export enum EnrollmentStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum PaymentStatus {
  UNPAID = "unpaid",
  PAID = "paid",
}

export interface IEnrollment {
  _id?: Types.ObjectId;
  userId: Types.ObjectId | IUser;
  courseId: Types.ObjectId | ICourse;
  status: EnrollmentStatus;
  paymentStatus: PaymentStatus;
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
