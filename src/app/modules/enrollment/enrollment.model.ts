import { model, Schema, Types } from "mongoose";
import {
  IEnrollment,
  EnrollmentStatus,
  PaymentStatus,
} from "./enrollment.interface";

const enrollmentSchema = new Schema<IEnrollment>(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    courseId: { type: Types.ObjectId, ref: "Course", required: true },
    status: {
      type: String,
      enum: Object.values(EnrollmentStatus),
      default: EnrollmentStatus.ACTIVE,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.UNPAID,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Enrollment = model<IEnrollment>("Enrollment", enrollmentSchema);
