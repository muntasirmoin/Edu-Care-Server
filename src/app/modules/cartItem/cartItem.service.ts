import { CartItem } from "./cartItem.model";
import { ICartItem } from "./cartItem.interface";
import mongoose, { Document, Types } from "mongoose";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Course } from "../course/course.model";
import {
  EnrollmentStatus,
  IEnrollment,
  PaymentStatus,
} from "../enrollment/enrollment.interface";
import { Enrollment } from "../enrollment/enrollment.model";
import { JwtPayload } from "jsonwebtoken";
import { ICourse } from "../course/course.interface";
type CourseDoc = ICourse & Document;

const addToCart = async (payload: { userId: string; courseId: string }) => {
  const { userId, courseId } = payload;

  // Validate IDs
  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(courseId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid User or Course ID");
  }

  // Find the course
  const course = await Course.findById(courseId);
  if (!course || course.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  // Check if user is already enrolled in this course
  const alreadyEnrolled = await Enrollment.findOne({
    userId,
    courseId,
    isDeleted: false, // only active enrollments
  });
  if (alreadyEnrolled) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Already enrolled in this course"
    );
  }

  // Collect current price from course
  const priceSnapshot = course.price;

  // Prevent duplicate cart items
  const existingItem = await CartItem.findOne({ userId, courseId });
  if (existingItem) {
    throw new AppError(httpStatus.BAD_REQUEST, "Course already in cart");
  }

  // Create cart item
  const cartItem = await CartItem.create({
    userId,
    courseId,
    priceSnapshot,
  });

  return cartItem;
};

const removeFromCart = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid CartItem ID");
  }

  const removedItem = await CartItem.findByIdAndDelete(id);
  if (!removedItem) {
    throw new AppError(httpStatus.NOT_FOUND, "CartItem not found");
  }

  return removedItem;
};

const getCartByUser = async (userId: string, query: Record<string, string>) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid User ID");
  }
  const items = await CartItem.find({ userId });
  console.log("Cart items raw:", items);

  // Base query to exclude soft-deleted items (if you add isDeleted in CartItem)
  const baseQuery = CartItem.find({ userId }).populate("courseId");

  // Apply QueryBuilder for search, filter, sort, pagination
  const queryBuilder = new QueryBuilder(baseQuery, query);

  const cartQuery = queryBuilder
    .filter()
    // .search(["courseId.title", "courseId.category"])
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    cartQuery.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

// check out cart start

const checkoutCart = async (user: JwtPayload) => {
  const userId = user.userId;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch all cart items for this user
    const cartItems = await CartItem.find({ userId })
      .populate("courseId")
      .session(session);
    if (!cartItems.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Cart is empty");
    }

    const enrollmentsToCreate: Partial<IEnrollment>[] = [];

    for (const item of cartItems) {
      const course = item.courseId as CourseDoc;

      if (!course || course?.isDeleted) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Course not found: ${item.courseId}`
        );
      }

      if (course.seat <= 0) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Course "${course.title}" is fully booked`
        );
      }

      // Check if already enrolled
      const existingEnrollment = await Enrollment.findOne({
        userId,
        courseId: course._id,
        isDeleted: false,
      }).session(session);

      if (existingEnrollment) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Already enrolled in course: ${course.title}`
        );
      }

      // Decrease seat
      course.seat -= 1;
      await course.save({ session });

      // Prepare enrollment
      enrollmentsToCreate.push({
        userId,
        courseId: course?._id,
        status: EnrollmentStatus.ACTIVE,
        paymentStatus: PaymentStatus.UNPAID, // or "PAID" if payment is successful
      });
    }

    // Create all enrollments
    const createdEnrollments = await Enrollment.insertMany(
      enrollmentsToCreate,
      { session }
    );

    // Remove cart items
    await CartItem.deleteMany({ userId }).session(session);

    await session.commitTransaction();
    session.endSession();

    return createdEnrollments;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// check out cart end

export const CartItemService = {
  addToCart,
  removeFromCart,
  getCartByUser,
  checkoutCart,
};
