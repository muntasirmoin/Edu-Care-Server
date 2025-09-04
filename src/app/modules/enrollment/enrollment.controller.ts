import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";

import { EnrollmentServices } from "./enrollment.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

// Create a new enrollment
const createEnrollment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const verifyUser = req.user as JwtPayload;

    const enrollment = await EnrollmentServices.createEnrollment(
      req.body,
      verifyUser
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Enrollment Created Successfully",
      data: enrollment,
    });
  }
);

// Get all enrollments
const getAllEnrollments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await EnrollmentServices.getAllEnrollments(
      query as Record<string, string>
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Enrollments Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

// Get enrollment by ID
const getEnrollmentById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const enrollmentId = req.params.id;
    const enrollment = await EnrollmentServices.getEnrollmentById(enrollmentId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Enrollment Retrieved Successfully",
      data: enrollment,
    });
  }
);

// Update enrollment
const updateEnrollment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const enrollmentId = req.params.id;
    const payload = req.body;
    const enrollment = await EnrollmentServices.updateEnrollment(
      enrollmentId,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Enrollment Updated Successfully",
      data: enrollment,
    });
  }
);

// Soft delete enrollment
const deleteEnrollment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const enrollmentId = req.params.id;
    const enrollment = await EnrollmentServices.deleteEnrollment(enrollmentId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Enrollment Deleted Successfully",
      data: enrollment,
    });
  }
);

// get my enrollment

const getMyEnrollments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query as Record<string, string>;
    const user = req.user as JwtPayload;

    const result = await EnrollmentServices.getMyEnrollments(
      user,
      query as Record<string, string>
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        user.role === "USER"
          ? "Your enrollments retrieved successfully"
          : "All enrollments retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

export const EnrollmentControllers = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
  getMyEnrollments,
};
