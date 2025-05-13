// backend/models/inventory.ts

import mongoose, { Schema, Document, Types } from "mongoose";

// Inventory document type
export interface InventoryDocument extends Document {
  customerId: Types.ObjectId;  // Linked to Customer model
  senderId: Types.ObjectId;    // Linked to Sender model
  goods: string;
  type: string;
  quantity: number;
  weight: number;
  arrivalDate: Date;
  departureDate?: Date;
  invoiced?: boolean;          // ✅ Added: flag to indicate if invoiced
}

// Inventory schema definition
const inventorySchema = new Schema<InventoryDocument>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer", // Use "User" if customers are stored in User model
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "Sender",
      required: true,
    },
    goods: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    departureDate: {
      type: Date,
    },
    invoiced: {
      type: Boolean,
      default: false, // ✅ Default to false (not invoiced yet)
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<InventoryDocument>("Inventory", inventorySchema);
