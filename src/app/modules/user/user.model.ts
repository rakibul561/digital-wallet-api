import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, Role, Status } from "./user.interface"; 


// User Schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: ""
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    image: {
      type: String,
      default: "user profile not found",
    },
    address: {
      type: String,
      default: "dhaka bangladesh",
    },
    role: {
      type: String,
      enum: Object.values(Role), 
      default: Role.USER,
    },
    status: {
      type: String,
      enum: Object.values(Status), 
      default: Status.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);


export const User = mongoose.model<IUser>("User", userSchema);
