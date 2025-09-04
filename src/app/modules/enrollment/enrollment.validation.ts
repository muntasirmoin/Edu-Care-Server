import { z } from "zod";
import { EnrollmentStatus, PaymentStatus } from "./enrollment.interface";
import mongoose from "mongoose";

// Create Enrollment Validation
export const createEnrollmentZodSchema = z.object({
  userId: z
    .string()
    .min(1, { message: "User ID is required" })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid User ID",
    })
    .optional(),
  courseId: z
    .string()
    .min(1, { message: "Course ID is required" })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid Course ID",
    }),
  status: z
    .enum([
      EnrollmentStatus.ACTIVE,
      EnrollmentStatus.COMPLETED,
      EnrollmentStatus.CANCELLED,
    ])
    .default(EnrollmentStatus.ACTIVE),
  paymentStatus: z
    .enum([PaymentStatus.UNPAID, PaymentStatus.PAID])
    .default(PaymentStatus.UNPAID),
});

// Update Enrollment Validation
export const updateEnrollmentZodSchema = z.object({
  status: z
    .enum([
      EnrollmentStatus.ACTIVE,
      EnrollmentStatus.COMPLETED,
      EnrollmentStatus.CANCELLED,
    ])
    .optional(),
  paymentStatus: z.enum([PaymentStatus.UNPAID, PaymentStatus.PAID]).optional(),
});
