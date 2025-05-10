import mongoose, { Schema, Document, Types } from "mongoose";

// Define the customer document interface
export interface CustomerDocument extends Document {
  userId: Types.ObjectId;              // Reference to the User
  companyName: string;
  orgNumber: string;                   // Organization number
  zipCode: string;
  city: string;
  address: string;
  contactPerson: string;
  companyPhone: string;
  customerType: string;                // e.g. "Private", "Company"
}

// Define the schema
const customerSchema = new Schema<CustomerDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One-to-one relationship
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    orgNumber: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    companyPhone: {
      type: String,
      required: true,
    },
    customerType: {
      type: String,
      required: true, // e.g. "Company" or "Private"
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model<CustomerDocument>("Customer", customerSchema);
export default Customer;
