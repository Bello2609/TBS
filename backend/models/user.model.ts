import mongoose, { Document, Schema, Types } from "mongoose";

// ✅ Define allowed user roles
export type UserRole = "admin" | "employee" | "customer";

// ✅ Define the User document interface
export interface UserDocument extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  role: UserRole;
  email: string;
  name: string;
  phone: string;
  companyName?: string;
  createdAt: Date;
}

// ✅ Define the User schema
const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "employee", "customer"],
      default: "customer",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    // ✅ Optional here; validation is handled in controller
    companyName: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // includes createdAt and updatedAt
  }
);

// ✅ Export the User model
const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
