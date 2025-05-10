// backend/models/invoice.ts

import mongoose, { Document, Schema } from "mongoose";

// Bank account info
interface BankInfo {
  accountNumber: string;
  kidNumber: string;
}

// Inventory item snapshot (copied from Inventory at time of invoice)
interface InventorySnapshot {
  arrivalDate: string;
  departureDate: string;
  customer: string;
  goods: string;
  type: string;
  quantity: number;
  weight: number;
  sender: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
}

// Invoice Document
export interface InvoiceDocument extends Document {
  customerId: mongoose.Types.ObjectId;
  invoiceNumber: string;
  date: Date;
  dueDate?: Date;
  status: "Paid" | "Pending" | "Overdue";

  products: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  tax: number;
  grandTotal: number;

  inventoryItems: InventorySnapshot[]; // Embedded from Inventory
  bankInfo: BankInfo;

  createdAt: Date;
  updatedAt: Date;
}

// Schema
const invoiceSchema = new Schema<InvoiceDocument>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invoiceNumber: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Overdue"],
      default: "Pending",
    },
    products: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    total: { type: Number, required: true },
    tax: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    inventoryItems: [
      {
        arrivalDate: { type: String },
        departureDate: { type: String },
        customer: { type: String },
        goods: { type: String },
        type: { type: String },
        quantity: { type: Number },
        weight: { type: Number },
        sender: {
          name: { type: String },
          email: { type: String },
          phone: { type: String },
          company: { type: String },
        },
      },
    ],
    bankInfo: {
      accountNumber: { type: String, required: true },
      kidNumber: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model<InvoiceDocument>("Invoice", invoiceSchema);
