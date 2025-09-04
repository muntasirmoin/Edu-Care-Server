import { Schema, model } from "mongoose";
import { CourseCategory, ICourse } from "./course.interface";

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    category: { type: String, enum: Object.values(CourseCategory) },
    price: { type: Number, required: true, default: 0 }, // 0 = free
    seat: { type: Number, required: true, default: 0 },
    duration: { type: Number },
    instructor: { type: String }, //  later  ObjectId ref to User
    image: { type: String },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Course = model<ICourse>("Course", courseSchema);
