import mongoose, { Schema, Document, Types } from "mongoose";

// ✅ Interface for a customer document
export interface CustomerDocument extends Document {
  userId: Types.ObjectId;                 // Reference to user
  companyName: string;
  orgNumber: string;
  zipCode: string;
  city: string;
  address: string;
  contactPerson: string;
  companyPhone: string;
  customerType: "Company" | "Private";
  createdAt?: Date;
  updatedAt?: Date;
}

// ✅ Schema definition
const customerSchema = new Schema<CustomerDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One customer per user
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    orgNumber: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },
    companyPhone: {
      type: String,
      required: true,
      trim: true,
    },
    customerType: {
      type: String,
      enum: ["Company", "Private"],
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// ✅ Export model
const Customer = mongoose.model<CustomerDocument>("Customer", customerSchema);
export default Customer;
