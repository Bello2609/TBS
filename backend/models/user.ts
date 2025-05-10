import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongoose";
// Define allowed user roles
export type UserRole = "admin" | "employee" | "customer";

// Define the structure of the user document
export interface UserDocument extends Document {
  _id: ObjectId;
  username: string;
  password: string;
  role: "admin" | "employee" | "customer";
  email: string;
  name: string;
  createdAt: Date;
}

// Define the user schema
const userSchema: Schema<UserDocument> = new Schema(
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
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

// Export the User model
const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
