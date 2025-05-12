// backend/models/inventory.ts

import mongoose, { Schema, Document, Types } from "mongoose";

export interface InventoryDocument extends Document {
  customerId: Types.ObjectId;
  senderId: Types.ObjectId;
  goods: string;
  type: string;
  quantity: number;
  weight: number;
  arrivalDate: Date;
  departureDate?: Date;
}

const inventorySchema = new Schema<InventoryDocument>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<InventoryDocument>("Inventory", inventorySchema);
