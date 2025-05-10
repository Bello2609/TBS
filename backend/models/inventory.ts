// backend/models/inventory.ts

import mongoose, { Document, Schema } from "mongoose";

// Define the embedded Sender structure
interface SenderInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
}

// Inventory Document Interface
export interface InventoryDocument extends Document {
  customerId: mongoose.Types.ObjectId;     // Linked to User (role: customer)
  goods: string;
  type: string;
  quantity: number;
  weight: number;
  arrivalDate: Date;
  departureDate: Date;
  sender: SenderInfo;                      // Embedded sender info
  createdAt: Date;
  updatedAt: Date;
}

// Define the Schema
const inventorySchema = new Schema<InventoryDocument>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goods: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    weight: { type: Number, required: true },
    arrivalDate: { type: Date, required: true },
    departureDate: { type: Date, required: true },
    sender: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      company: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model<InventoryDocument>("Inventory", inventorySchema);
