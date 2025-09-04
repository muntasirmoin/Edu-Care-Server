import { Types } from "mongoose";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Role } from "../user/user.interface";
import { courseSearchableFields } from "./course.constant";
import { ICourse } from "./course.interface";
import { Course } from "./course.model";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

//  Create a new course
const createCourse = async (
  payload: Partial<ICourse>,
  decodedToken: JwtPayload
) => {
  if (decodedToken.role !== Role.ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to create courses"
    );
  }

  const course = await Course.create(payload);
  return course;
};

//  Get all courses (with filters, search, sort, fields, paginate)
const getAllCourses = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(
    Course.find({ isDeleted: false }),
    query
  ); // exclude soft-deleted
  const coursesData = queryBuilder
    .filter()
    .search(courseSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    coursesData.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

//  Update a course
const updateCourse = async (
  courseId: string,
  payload: Partial<ICourse>,
  decodedToken: JwtPayload
) => {
  if (decodedToken.role !== Role.ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update courses"
    );
  }

  const existingCourse = await Course.findById(courseId);
  if (!existingCourse || existingCourse.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }
  if (!existingCourse) {
    throw new AppError(httpStatus.NOT_FOUND, "Course Deleted!");
  }

  const updatedCourse = await Course.findByIdAndUpdate(courseId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedCourse;
};

//  delete a course
const deleteCourse = async (courseId: string, decodedToken: JwtPayload) => {
  if (decodedToken.role !== Role.ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to delete courses"
    );
  }

  const existingCourse = await Course.findById(courseId);
  if (!existingCourse || existingCourse.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  const deletedCourse = await Course.findByIdAndUpdate(
    courseId,
    { isDeleted: true },
    { new: true }
  );

  return deletedCourse;
};

const getCourseById = async (courseId: string) => {
  // Validate ObjectId
  if (!Types.ObjectId.isValid(courseId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Course ID");
  }

  // Find course, ensure it is not deleted
  const course = await Course.findOne({ _id: courseId, isDeleted: false });

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  return course;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  getCourseById,
};
