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
  address?: string;
  city?: string;
  zipCode?: string;
  orgNumber?: string;
  customerType?: "Company" | "Private";
  createdAt: Date;
  updatedAt: Date;
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

    // ✅ Optional fields for customer role
    companyName: { type: String, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    orgNumber: { type: String, trim: true },
    customerType: { type: String, enum: ["Company", "Private"] },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// ✅ Export the model
const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
