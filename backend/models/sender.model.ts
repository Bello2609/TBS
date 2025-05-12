import mongoose, { Schema, Document } from "mongoose";

export interface SenderDocument extends Document {
  name: string;
  createdAt: Date;
}

// Sender schema without customerId since senders are not permanently linked to customers
const senderSchema: Schema = new Schema<SenderDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Sender = mongoose.model<SenderDocument>("Sender", senderSchema);
export default Sender;
