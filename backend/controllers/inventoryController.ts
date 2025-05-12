import { Request, Response } from "express";
import Inventory from "../models/inventory.js"; // Adjust the import path as necessary
import mongoose from "mongoose";

// ✅ GET /api/inventory
export const getAllInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId } = req.query;

    const filter = customerId
      ? { customerId: new mongoose.Types.ObjectId(customerId as string) }
      : {};

    const items = await Inventory.find(filter)
      .sort({ arrivalDate: -1 })
      .populate("customerId", "companyName")
      .populate("senderId", "name");

    const transformed = items.map((item) => {
      const customer = item.customerId as unknown as { _id: string; companyName: string };
      const sender = item.senderId as unknown as { _id: string; name: string };

      return {
        _id: item._id,
        customerId: customer._id,
        customerName: customer.companyName,
        senderId: sender._id,
        senderName: sender.name,
        goods: item.goods,
        type: item.type,
        quantity: item.quantity,
        weight: item.weight,
        arrivalDate: item.arrivalDate,
        departureDate: item.departureDate,
      };
    });

    res.status(200).json(transformed);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Failed to get inventory." });
  }
};

// ✅ GET /api/inventory/:id
export const getInventoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Inventory.findById(req.params.id)
      .populate("customerId", "companyName")
      .populate("senderId", "name");

    if (!item) {
      res.status(404).json({ message: "Inventory item not found." });
      return;
    }

    const customer = item.customerId as unknown as { _id: string; companyName: string };
    const sender = item.senderId as unknown as { _id: string; name: string };

    res.status(200).json({
      _id: item._id,
      customerId: customer._id,
      customerName: customer.companyName,
      senderId: sender._id,
      senderName: sender.name,
      goods: item.goods,
      type: item.type,
      quantity: item.quantity,
      weight: item.weight,
      arrivalDate: item.arrivalDate,
      departureDate: item.departureDate,
    });
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
      senderId,
      goods,
      type,
      quantity,
      weight,
      arrivalDate,
      departureDate,
    } = req.body;

    if (!senderId || !customerId) {
      res.status(400).json({ message: "Customer ID and Sender ID are required." });
      return;
    }

    const newItem = new Inventory({
      customerId,
      senderId,
      goods,
      type,
      quantity,
      weight,
      arrivalDate,
      departureDate,
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
      senderId,
      goods,
      type,
      quantity,
      weight,
      arrivalDate,
      departureDate,
    } = req.body;

    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        customerId,
        senderId,
        goods,
        type,
        quantity,
        weight,
        arrivalDate,
        departureDate,
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
