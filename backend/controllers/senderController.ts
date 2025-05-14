import { Request, Response } from "express";
import Sender from "../models/sender.model.js"; // Ensure this path is correct
import { Notify } from "../utils/Notification.js";
import GetLoggedInUser from "../utils/GetLoggedInUser.js";

// GET /api/senders - Return all senders
export const getAllSenders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const senders = await Sender.find().sort({ name: 1 });
    res.status(200).json(senders);
  } catch {
    res.status(500).json({ message: "Failed to fetch senders." });
  }
};

// POST /api/senders - Create a new sender with only a name
export const createSender = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    res.status(400).json({ message: "Sender name is required." });
    return;
  }

  try {
    const existing = await Sender.findOne({ name: name.trim() });
    if (existing) {
      res.status(409).json({ message: "Sender already exists." });
      return;
    }

    const sender = await Sender.create({ name: name.trim() });
    let authHeader = req.headers.authorization;
    if (!authHeader){
      res.status(401).json({ message: 'No authorization header provided' });
      return 
    }
    let token = GetLoggedInUser(authHeader);
    const data_for_notification = { 
      userId: token,
      action: "Sender Created",
      message: "A sender has been created",
     }
    await Notify(data_for_notification);
    res.status(201).json(sender);
  } catch {
    res.status(500).json({ message: "Failed to create sender." });
  }
};
