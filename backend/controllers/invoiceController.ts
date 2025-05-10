// backend/controllers/invoiceController.ts

import { Request, Response } from "express";
import Invoice from "../models/invoice";
import Inventory from "../models/inventory";
import mongoose from "mongoose";

// ✅ GET /api/invoices
export const getAllInvoices = async (req: Request, res: Response) => {
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

// ✅ GET /api/invoices/:id
export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found." });
    }

    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ message: "Failed to fetch invoice." });
  }
};

// ✅ POST /api/invoices
export const createInvoice = async (req: Request, res: Response) => {
  try {
    const {
      customerId,
      inventoryId,
      invoiceNumber,
      date,
      dueDate,
      status,
      products,
      quantity,
      unit,
      unitPrice,
      total,
      tax,
      grandTotal,
      bankInfo,
      items,
    } = req.body;

    // Fetch the inventory item and embed snapshot
    const inventory = await Inventory.findById(inventoryId);

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found." });
    }

    const invoice = new Invoice({
      customerId,
      invoiceNumber,
      date,
      dueDate,
      status,
      products,
      quantity,
      unit,
      unitPrice,
      total,
      tax,
      grandTotal,
      bankInfo,
      inventoryItems: [inventory.toObject()], // embed snapshot
    });

    const saved = await invoice.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: "Failed to create invoice." });
  }
};

// ✅ PUT /api/invoices/:id
export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Invoice not found." });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ message: "Failed to update invoice." });
  }
};

// ✅ DELETE /api/invoices/:id
export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const deleted = await Invoice.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Invoice not found." });
    }

    res.status(200).json({ message: "Invoice deleted successfully." });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({ message: "Failed to delete invoice." });
  }
};
