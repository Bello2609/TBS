// backend/controllers/invoiceController.ts

import { Request, Response } from "express";
import mongoose from "mongoose";
import Invoice from "../models/invoice.model.js";
import Inventory from "../models/inventory.model.js";

// ✅ GET /api/invoices - Get all invoices (optionally filter by customerId)
export const getAllInvoices = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId } = req.query;

    const filter = customerId
      ? { customerId: new mongoose.Types.ObjectId(customerId as string) }
      : {};

    const invoices = await Invoice.find(filter).sort({ date: -1 });

    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Failed to get invoices." });
  }
};

// ✅ GET /api/invoices/:id - Get single invoice by ID
export const getInvoiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      res.status(404).json({ message: "Invoice not found." });
      return;
    }

    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ message: "Failed to fetch invoice." });
  }
};

// ✅ POST /api/invoices - Create new invoice
export const createInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      customerId,
      invoiceNumber,
      date,
      dueDate,
      status,
      items,
      tax,
      grandTotal,
      inventoryIds,
      bankInfo,
    } = req.body;

    if (!Array.isArray(inventoryIds) || inventoryIds.length === 0) {
      res.status(400).json({ message: "At least one inventory ID is required." });
      return;
    }

    // ✅ Fetch inventory and populate senderId
    const inventories = await Inventory.find({
      _id: { $in: inventoryIds.map((id: string) => new mongoose.Types.ObjectId(id)) },
    }).populate("senderId");

    if (inventories.length === 0) {
      res.status(404).json({ message: "No matching inventory items found." });
      return;
    }

    // ✅ Build inventory snapshot for invoice
    const inventorySnapshots = inventories.map((inv) => ({
      arrivalDate: inv.arrivalDate.toISOString().split("T")[0],
      departureDate: inv.departureDate?.toISOString().split("T")[0] || "-",
      customer: inv.customerId?.toString() || "-",
      goods: inv.goods,
      type: inv.type,
      quantity: inv.quantity,
      weight: inv.weight,
      sender: {
        name:
          typeof inv.senderId === "object" && "name" in inv.senderId
            ? inv.senderId.name
            : "-",
      },
    }));

    // ✅ Save invoice
    const invoice = new Invoice({
      customerId,
      invoiceNumber,
      date,
      dueDate,
      status,
      items,
      tax,
      grandTotal,
      inventoryItems: inventorySnapshots,
      bankInfo,
    });

    const saved = await invoice.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: "Failed to create invoice." });
  }
};

// ✅ PUT /api/invoices/:id - Update invoice
export const updateInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      res.status(404).json({ message: "Invoice not found." });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ message: "Failed to update invoice." });
  }
};

// ✅ DELETE /api/invoices/:id - Delete invoice
export const deleteInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Invoice.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ message: "Invoice not found." });
      return;
    }

    res.status(200).json({ message: "Invoice deleted successfully." });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({ message: "Failed to delete invoice." });
  }
};
