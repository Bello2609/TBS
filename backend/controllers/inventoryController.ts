// backend/controllers/inventoryController.ts

import { Request, Response } from "express";
import mongoose from "mongoose";
import Inventory from "../models/inventory.model.js";
import type { PopulatedCustomer, PopulatedSender } from "../types/populated.js";
import { Notify } from "../utils/Notification.js";
import GetLoggedInUser from "../utils/GetLoggedInUser.js";

// ✅ Get all inventory items, optionally filtered by customerId
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
      const customer =
        item.customerId && typeof item.customerId === "object" && "companyName" in item.customerId
          ? (item.customerId as PopulatedCustomer)
          : { _id: new mongoose.Types.ObjectId(), companyName: "Unknown" };

      const sender =
        item.senderId && typeof item.senderId === "object" && "name" in item.senderId
          ? (item.senderId as PopulatedSender)
          : { _id: new mongoose.Types.ObjectId(), name: "Unknown" };

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
        invoiced: item.invoiced ?? false,
      };
    });

    res.status(200).json(transformed);
  } catch (error) {
    console.error("❌ Error fetching inventory:", error);
    res.status(500).json({ message: "Failed to get inventory." });
  }
};

// ✅ Get uninvoiced inventory items for a customer
export const getUninvoicedInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId } = req.query;

    if (!customerId) {
      res.status(400).json({ message: "Customer ID is required." });
      return;
    }

    const uninvoicedItems = await Inventory.find({
      customerId: new mongoose.Types.ObjectId(customerId as string),
      invoiced: { $ne: true },
    })
      .populate("senderId", "name")
      .sort({ arrivalDate: -1 });

    const transformed = uninvoicedItems.map((item) => {
      const sender =
        item.senderId && typeof item.senderId === "object" && "name" in item.senderId
          ? (item.senderId as PopulatedSender)
          : { _id: new mongoose.Types.ObjectId(), name: "Unknown" };

      return {
        _id: item._id,
        goods: item.goods,
        type: item.type,
        weight: item.weight,
        quantity: item.quantity,
        arrivalDate: item.arrivalDate,
        departureDate: item.departureDate,
        senderName: sender.name,
      };
    });

    res.status(200).json(transformed);
  } catch (error) {
    console.error("❌ Error fetching uninvoiced inventory:", error);
    res.status(500).json({ message: "Failed to fetch uninvoiced inventory." });
  }
};

// ✅ Get inventory by ID
export const getInventoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Inventory.findById(req.params.id)
      .populate("customerId", "companyName")
      .populate("senderId", "name");

    if (!item) {
      res.status(404).json({ message: "Inventory item not found." });
      return;
    }

    const customer =
      item.customerId && typeof item.customerId === "object" && "companyName" in item.customerId
        ? (item.customerId as PopulatedCustomer)
        : { _id: new mongoose.Types.ObjectId(), companyName: "Unknown" };

    const sender =
      item.senderId && typeof item.senderId === "object" && "name" in item.senderId
        ? (item.senderId as PopulatedSender)
        : { _id: new mongoose.Types.ObjectId(), name: "Unknown" };

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
    console.error("❌ Error fetching inventory item:", error);
    res.status(500).json({ message: "Failed to fetch inventory item." });
  }
};

// ✅ Create new inventory item
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

    if (!customerId || !senderId) {
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
      invoiced: false,
    });

    const saved = await newItem.save();
    let authHeader = req.headers.authorization;
    if (!authHeader){
      res.status(401).json({ message: 'No authorization header provided' });
      return 
    }
    let token = GetLoggedInUser(authHeader);
    const data_for_notification = { 
      userId: token,
      action: "Inventory created",
      message: "An inventory has been created",
     }
    await Notify(data_for_notification);
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error creating inventory:", error);
    res.status(500).json({ message: "Failed to create inventory item." });
  }
};

// ✅ Update inventory item
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
      invoiced,
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
        invoiced,
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Inventory item not found." });
      return;
    }
    let authHeader = req.headers.authorization;
    if (!authHeader){
      res.status(401).json({ message: 'No authorization header provided' });
      return 
    }
    let token = GetLoggedInUser(authHeader);
    const data_for_notification = { 
      userId: token,
      action: "Inventory Updated",
      message: "An Inventory was updated",
     }
    await Notify(data_for_notification);
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Error updating inventory:", error);
    res.status(500).json({ message: "Failed to update inventory item." });
  }
};

// ✅ Delete inventory item
export const deleteInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Inventory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ message: "Inventory item not found." });
      return;
    }
    let authHeader = req.headers.authorization;
    if (!authHeader){
      res.status(401).json({ message: 'No authorization header provided' });
      return 
    }
    let token = GetLoggedInUser(authHeader);
    const data_for_notification = { 
      userId: token,
      action: "Customer Updated",
      message: "A customer was updated",
     }
    await Notify(data_for_notification);
    res.status(200).json({ message: "Inventory item deleted." });
  } catch (error) {
    console.error("❌ Error deleting inventory:", error);
    res.status(500).json({ message: "Failed to delete inventory item." });
  }
};
