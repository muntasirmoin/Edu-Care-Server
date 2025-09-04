import { Types } from "mongoose";

export type CourseStatus = "draft" | "published";

export interface ICourse {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
  category?: string;
  price: number;
  duration?: number;
  instructor?: string; // could be instructor ID reference later
  image?: string;
  status: CourseStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
