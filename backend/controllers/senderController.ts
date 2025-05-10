// backend/controllers/senderController.ts

import { Request, Response } from "express";
import Sender from "../models/sender.model.js";

// ✅ Get all senders for a specific customer
export const getSendersByCustomer = async (req: Request, res: Response): Promise<void> => {
  const { customerId } = req.query;

  if (!customerId) {
    res.status(400).json({ message: "customerId is required." });
    return;
  }

  try {
    const senders = await Sender.find({ customerId });
    res.status(200).json(senders);
  } catch {
    res.status(500).json({ message: "Failed to fetch senders." });
  }
};

// ✅ Create a new sender
export const createSender = async (req: Request, res: Response): Promise<void> => {
  const { name, customerId } = req.body;

  if (!name || !customerId) {
    res.status(400).json({ message: "Name and customerId are required." });
    return;
  }

  try {
    const existing = await Sender.findOne({ name, customerId });
    if (existing) {
      res.status(409).json({ message: "Sender already exists." });
      return;
    }

    const sender = await Sender.create({ name, customerId });
    res.status(201).json(sender);
  } catch {
    res.status(500).json({ message: "Failed to create sender." });
  }
};
