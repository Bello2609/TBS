import { Request, Response } from "express";
import { Notification } from "../models/notification.model.js";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({}).lean().exec();
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch notifications." });
  }
}

