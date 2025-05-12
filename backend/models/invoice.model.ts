// backend/models/invoice.model.ts

import mongoose, { Document, Schema } from "mongoose";

// ✅ Subdocument schema for bank info
const BankInfoSchema = new Schema(
  {
    accountNumber: { type: String, required: true },
    kidNumber: { type: String, required: true },
  },
  { _id: false }
);

// ✅ Subdocument schema for inventory snapshot (only sender name)
const InventorySnapshotSchema = new Schema(
  {
    arrivalDate: { type: String, required: true },
    departureDate: { type: String, required: true },
    customer: { type: String, required: true },
    goods: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    weight: { type: Number, required: true },
    sender: {
      name: { type: String, required: true },
    },
  },
  { _id: false }
);

// ✅ Subdocument schema for invoice line items
const InvoiceItemSchema = new Schema(
  {
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { _id: false }
);

// ✅ Invoice document interface
export interface InvoiceDocument extends Document {
  customerId: mongoose.Types.ObjectId;
  invoiceNumber: string;
  date: Date;
  dueDate?: Date;
  status: "Paid" | "Pending" | "Overdue";
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  tax: number;
  grandTotal: number;
  inventoryItems: {
    arrivalDate: string;
    departureDate: string;
    customer: string;
    goods: string;
    type: string;
    quantity: number;
    weight: number;
    sender: {
      name: string;
    };
  }[];
  bankInfo: {
    accountNumber: string;
    kidNumber: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Main invoice schema
const invoiceSchema = new Schema<InvoiceDocument>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Overdue"],
      default: "Pending",
      required: true,
    },
    items: [InvoiceItemSchema],
    tax: {
      type: Number,
      required: true,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    inventoryItems: [InventorySnapshotSchema],
    bankInfo: BankInfoSchema,
  },
  { timestamps: true }
);

export default mongoose.model<InvoiceDocument>("Invoice", invoiceSchema);
