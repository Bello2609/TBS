// backend/models/sender.model.ts

import mongoose, { Schema, Document, Types } from "mongoose";

export interface SenderDocument extends Document {
  name: string;
  customerId: Types.ObjectId;
  createdAt: Date;
}

const senderSchema: Schema = new Schema<SenderDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User", // هذا يفترض أن الزبائن موجودين في موديل "User"
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Sender = mongoose.model<SenderDocument>("Sender", senderSchema);

export default Sender;
