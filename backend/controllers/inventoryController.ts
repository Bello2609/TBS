// backend/controllers/inventoryController.ts

import { Request, Response } from "express";
import Inventory from "../models/inventory";
import mongoose from "mongoose";

// ✅ GET /api/inventory - Get all inventory (admin or filtered by customerId)
export const getAllInventory = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.query;

    const query = customerId
      ? { customerId: new mongoose.Types.ObjectId(customerId as string) }
      : {};

    const items = await Inventory.find(query).sort({ arrivalDate: -1 });

    res.status(200).json(items);
  } catch (error) {
    console.error("Error getting inventory:", error);
    res.status(500).json({ message: "Failed to get inventory." });
  }
};

// ✅ GET /api/inventory/:id - Get a single inventory item
export const getInventoryById = async (req: Request, res: Response) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Inventory item not found." });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Failed to fetch inventory item." });
  }
};

// ✅ POST /api/inventory - Create a new inventory item
export const createInventory = async (req: Request, res: Response) => {
  try {
    const newItem = new Inventory(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating inventory:", error);
    res.status(500).json({ message: "Failed to create inventory item." });
  }
};

// ✅ PUT /api/inventory/:id - Update an inventory item
export const updateInventory = async (req: Request, res: Response) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Inventory item not found." });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating inventory:", error);
    res.status(500).json({ message: "Failed to update inventory." });
  }
};

// ✅ DELETE /api/inventory/:id - Delete an inventory item
export const deleteInventory = async (req: Request, res: Response) => {
  try {
    const deleted = await Inventory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Inventory item not found." });
    }

    res.status(200).json({ message: "Inventory item deleted successfully." });
  } catch (error) {
    console.error("Error deleting inventory:", error);
    res.status(500).json({ message: "Failed to delete inventory." });
  }
};
