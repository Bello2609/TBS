import { Request, Response } from "express";
import Notification from "../models/notification.model.js";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch notifications." });
  }
}

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;
    const notification = new Notification({ userId, message });
    await notification.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create notification." });
  }
  }
