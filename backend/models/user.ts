// backend/models/user.ts

import mongoose, { Schema, Document } from "mongoose";

// ✅ Define allowed roles
export type UserRole = "admin" | "employee" | "customer";

// ✅ Interface for TypeScript typing
export interface UserDocument extends Document {
  username: string;
  password: string;
  role: UserRole;
  email: string;
  name: string;
  createdAt: Date;
}

const userSchema: Schema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "employee", "customer"],
      default: "customer",
      required: true,
    },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
