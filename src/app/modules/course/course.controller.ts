import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

import { CourseService } from "./course.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// Create a new course (Admin only)
const createCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const verifiedToken = req.user as JwtPayload;
    const course = await CourseService.createCourse(req.body, verifiedToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Course Created Successfully",
      data: course,
    });
  }
);

// Update an existing course (Admin only)
const updateCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    const verifiedToken = req.user as JwtPayload;

    const payload = req.body;
    const course = await CourseService.updateCourse(
      courseId,
      payload,
      verifiedToken
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Course Updated Successfully",
      data: course,
    });
  }
);

// Get all courses (public)
const getAllCourses = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await CourseService.getAllCourses(
      query as Record<string, string>
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Courses Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

// Soft delete a course (Admin only)
const deleteCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    const verifiedToken = req.user as JwtPayload;

    const course = await CourseService.deleteCourse(courseId, verifiedToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Course Deleted Successfully",
      data: course,
    });
  }
);

// single course
const getCourseById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;

    const course = await CourseService.getCourseById(courseId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Course retrieved successfully",
      data: course,
    });
  }
);

export const CourseControllers = {
  createCourse,
  updateCourse,
  getAllCourses,
  deleteCourse,
  getCourseById,
};
