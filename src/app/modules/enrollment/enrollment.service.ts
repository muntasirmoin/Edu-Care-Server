import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Enrollment } from "./enrollment.model";
import {
  IEnrollment,
  EnrollmentStatus,
  PaymentStatus,
} from "./enrollment.interface";
import httpStatus from "http-status-codes";
import mongoose, { Types } from "mongoose";
import { enrollmentSearchableFields } from "./enrollment.constant";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../user/user.interface";
import { Course } from "../course/course.model";
import { User } from "../user/user.model";
import { CartItem } from "../cartItem/cartItem.model";
import { ICourse } from "../course/course.interface";
import { Document } from "mongoose";

type CourseDoc = ICourse & Document;

// Create a new enrollment
const createEnrollment = async (
  payload: Partial<IEnrollment>,
  verifyUser: JwtPayload
) => {
  const { courseId } = payload;

  const userId = verifyUser.userId;
  console.log("verifyUser", verifyUser);

  // Check if user exists
  const user = await User.findById(userId);
  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, `User  not found`);
  }

  // Check if course exists
  const course = await Course.findById(courseId);
  if (!course || course.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Course with ID ${courseId} not found`
    );
  }

  if (course?.seat === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, `Course  is fully booked`);
  }

  if (!userId || !courseId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "UserId and CourseId are required"
    );
  }

  // Prevent duplicate enrollment
  const existingEnrollment = await Enrollment.findOne({
    userId,
    courseId,
    isDeleted: false,
  });
  if (existingEnrollment) {
    throw new AppError(httpStatus.BAD_REQUEST, "Enrollment already exists");
  }

  const enrollment = await Enrollment.create({
    ...payload,
    userId,
    status: payload.status || EnrollmentStatus.ACTIVE,
    paymentStatus: payload.paymentStatus || PaymentStatus.UNPAID,
  });

  return enrollment;
};

// Get all enrollments with optional query
const getAllEnrollments = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(
    Enrollment.find({ isDeleted: false }),
    query
  );
  const enrollmentsData = queryBuilder
    .filter()
    .search(enrollmentSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    enrollmentsData.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

// Get enrollment by ID
const getEnrollmentById = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Enrollment ID");
  }

  const enrollment = await Enrollment.findById(id)
    .populate("userId", "name email")
    .populate("courseId", "title category price");

  if (!enrollment || enrollment.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Enrollment not found");
  }

  return enrollment;
};

// Update enrollment
const updateEnrollment = async (id: string, payload: Partial<IEnrollment>) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Enrollment ID");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find enrollment with session
    const enrollment = await Enrollment.findById(id).session(session);

    if (!enrollment) {
      throw new AppError(httpStatus.NOT_FOUND, "Enrollment not found");
    }

    // If updating status → check conditions
    if (
      enrollment.status === EnrollmentStatus.ACTIVE &&
      payload.status === EnrollmentStatus.COMPLETED
    ) {
      // Get course
      const course = await Course.findById(enrollment.courseId).session(
        session
      );

      if (!course || course.isDeleted) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Course with ID ${enrollment.courseId} not found`
        );
      }

      // Ensure seat availability before decrement
      if (course.seat <= 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "No available seats left");
      }

      // Decrease seat
      course.seat -= 1;
      await course.save({ session });
    }

    // need to update Remove item from Cart
    // await CartItem.deleteOne({ userId, courseId }).session(session);

    // Update enrollment
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      session,
    });

    await session.commitTransaction();
    session.endSession();

    return updatedEnrollment;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Soft delete enrollment
const deleteEnrollment = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Enrollment ID");
  }

  const enrollment = await Enrollment.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!enrollment) {
    throw new AppError(httpStatus.NOT_FOUND, "Enrollment not found");
  }

  return enrollment;
};

const getMyEnrollments = async (
  user: JwtPayload,
  query: Record<string, string>
) => {
  let filter: Record<string, any> = { isDeleted: false };

  if (user.role === Role.USER) {
    filter.userId = user.userId;
  }

  const queryBuilder = new QueryBuilder(Enrollment.find(filter), query);
  const enrollmentsData = queryBuilder.filter().sort().paginate();

  const [data, meta] = await Promise.all([
    enrollmentsData.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

export const EnrollmentServices = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
  getMyEnrollments,
};
