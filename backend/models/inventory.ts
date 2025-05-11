// backend/models/inventory.ts

import mongoose, { Document, Schema } from "mongoose";

// ✅ New Sender structure — only name is required
interface SenderInfo {
  name: string;
}

// ✅ Inventory Document Interface
export interface InventoryDocument extends Document {
  customerId: mongoose.Types.ObjectId;
  goods: string;
  type: string;
  quantity: number;
  weight: number;
  arrivalDate: Date;
  departureDate: Date;
  sender: SenderInfo;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Define the Schema
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

    // ✅ Updated Sender: only `name` is stored
    sender: {
      name: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model<InventoryDocument>("Inventory", inventorySchema);
