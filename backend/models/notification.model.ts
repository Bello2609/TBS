import mongoose, { Schema, Document } from "mongoose";

export interface NotificationDocument extends Document {
  userId: mongoose.Types.ObjectId;
  message: string;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<NotificationDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<NotificationDocument>("Notification", NotificationSchema);