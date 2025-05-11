// backend/controllers/inventoryController.ts

import { Request, Response } from "express";
import Inventory from "../models/inventory.js";
import mongoose from "mongoose";

// ✅ GET /api/inventory
export const getAllInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId } = req.query;

    const filter = customerId
      ? { customerId: new mongoose.Types.ObjectId(customerId as string) }
      : {};

    const items = await Inventory.find(filter).sort({ arrivalDate: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Failed to get inventory." });
  }
};

// ✅ GET /api/inventory/:id
export const getInventoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Inventory item not found." });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Failed to fetch inventory item." });
  }
};

// ✅ POST /api/inventory
export const createInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      customerId,
      goods,
      type,
      quantity,
      weight,
      arrivalDate,
      departureDate,
      senderName,
    } = req.body;

    if (!senderName) {
      res.status(400).json({ message: "Sender name is required." });
      return;
    }

    const newItem = new Inventory({
      customerId,
      goods,
      type,
      quantity,
      weight,
      arrivalDate,
      departureDate,
      sender: { name: senderName }, // ✅ Only name is used
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating inventory:", error);
    res.status(500).json({ message: "Failed to create inventory item." });
  }
};

// ✅ PUT /api/inventory/:id
export const updateInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      customerId,
      goods,
      type,
      quantity,
      weight,
      arrivalDate,
      departureDate,
      senderName,
    } = req.body;

    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        customerId,
        goods,
        type,
        quantity,
        weight,
        arrivalDate,
        departureDate,
        sender: { name: senderName }, // ✅ Only name is used
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Inventory item not found." });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating inventory:", error);
    res.status(500).json({ message: "Failed to update inventory item." });
  }
};

// ✅ DELETE /api/inventory/:id
export const deleteInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Inventory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Inventory item not found." });
      return;
    }

    res.status(200).json({ message: "Inventory item deleted." });
  } catch (error) {
    console.error("Error deleting inventory:", error);
    res.status(500).json({ message: "Failed to delete inventory item." });
  }
};
