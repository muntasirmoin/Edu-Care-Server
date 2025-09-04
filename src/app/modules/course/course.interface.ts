import { Types } from "mongoose";

export type CourseStatus = "draft" | "published";
export enum CourseCategory {
  PROGRAMMING = "programming",
  DESIGN = "design",
  MARKETING = "marketing",
  BUSINESS = "business",
  MUSIC = "music",
  MATH = "Math",
  SCIENCE = "Science",
  HISTORY = "History",
  ENGLISH = "English",
}

export interface ICourse {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
  category?: CourseCategory;
  price: number;
  seat: number;
  duration?: number;
  instructor?: string; // could be instructor ID reference later
  image?: string;
  status: CourseStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
