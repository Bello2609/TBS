// backend/models/invoice.ts
import mongoose, { Document, Schema } from "mongoose";

// Bank account structure
interface BankInfo {
  accountNumber: string;
  kidNumber: string;
}

// Snapshot of an inventory item at time of invoice
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

// Single invoice item
interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Invoice document interface
export interface InvoiceDocument extends Document {
  customerId: mongoose.Types.ObjectId;
  invoiceNumber: string;
  date: Date;
  dueDate?: Date;
  status: "Paid" | "Pending" | "Overdue";

  items: InvoiceItem[]; // List of billed items
  tax: number;
  grandTotal: number;

  inventoryItems: InventorySnapshot[];
  bankInfo: BankInfo;

  createdAt: Date;
  updatedAt: Date;
}

// Invoice schema
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
    items: [
      {
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
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
