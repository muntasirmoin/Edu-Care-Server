import { z } from "zod";

// Create Course Validation
export const createCourseZodSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." }),

  description: z
    .string()
    .max(500, { message: "Description cannot exceed 500 characters." })
    .optional(),

  category: z
    .string()
    .max(50, { message: "Category cannot exceed 50 characters." })
    .optional(),

  price: z
    .number({ message: "Price must be a number." })
    .min(0, { message: "Price cannot be negative." }),

  duration: z
    .number({ message: "Duration must be a number." })
    .min(0, { message: "Duration cannot be negative." })
    .optional(),

  instructor: z
    .string()
    .max(100, { message: "Instructor name cannot exceed 100 characters." })
    .optional(),

  image: z.string().url({ message: "Image must be a valid URL." }).optional(),

  status: z.enum(["draft", "published"]).default("draft"),

  isDeleted: z.boolean().default(false),
});

// Update Course Validation
export const updateCourseZodSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." })
    .optional(),

  description: z
    .string()
    .max(500, { message: "Description cannot exceed 500 characters." })
    .optional(),

  category: z
    .string()
    .max(50, { message: "Category cannot exceed 50 characters." })
    .optional(),

  price: z
    .number({ message: "Price must be a number." })
    .min(0, { message: "Price cannot be negative." })
    .optional(),

  duration: z
    .number({ message: "Duration must be a number." })
    .min(0, { message: "Duration cannot be negative." })
    .optional(),

  instructor: z
    .string()
    .max(100, { message: "Instructor name cannot exceed 100 characters." })
    .optional(),

  image: z.string().url({ message: "Image must be a valid URL." }).optional(),

  status: z.enum(["draft", "published"]).optional(),

  isDeleted: z.boolean().optional(),
});
