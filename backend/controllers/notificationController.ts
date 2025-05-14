import { Request, Response } from "express";
import { Notification } from "../models/notification.model.js";
import GetLoggedInUser from "../utils/GetLoggedInUser.js";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    let authHeader = req.headers.authorization;
    if (!authHeader){
      res.status(401).json({ message: 'No authorization header provided' });
      return 
    }
    let token = GetLoggedInUser(authHeader);
    const notifications = await Notification.find({ userId: token }).lean().exec();
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch notifications." });
  }
}

