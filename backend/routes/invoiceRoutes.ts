// backend/routes/invoiceRoutes.ts

import express from "express";
import {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoiceController";

const router = express.Router();

// 📥 GET all invoices (optional ?customerId=...)
router.get("/", getAllInvoices);

// 📑 GET single invoice by ID
router.get("/:id", getInvoiceById);

// ➕ POST create invoice
router.post("/", createInvoice);

// ✏️ PUT update invoice
router.put("/:id", updateInvoice);

// 🗑 DELETE invoice
router.delete("/:id", deleteInvoice);

export default router;
