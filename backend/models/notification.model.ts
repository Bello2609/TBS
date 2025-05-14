import mongoose, { Schema, Document } from "mongoose";

export interface NotificationDocument extends Document {
  userId: mongoose.Types.ObjectId;
  message: string;
  action: string;
}

const NotificationSchema = new Schema<NotificationDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  action: { type: String, required: true },
}, {
  timestamps: true
}
);

export const Notification =  mongoose.model<NotificationDocument>("Notification", NotificationSchema);