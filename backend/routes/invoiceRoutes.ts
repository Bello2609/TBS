// backend/routes/invoiceRoutes.ts

import { Router } from "express";
import {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoiceController";

const router = Router();

// @route   GET /api/invoices
// @desc    Get all invoices (optionally filtered by customerId)
// @access  Public or Protected (to be added later)
router.get("/", getAllInvoices);

// @route   GET /api/invoices/:id
// @desc    Get a specific invoice by ID
router.get("/:id", getInvoiceById);

// @route   POST /api/invoices
// @desc    Create a new invoice
router.post("/", createInvoice);

// @route   PUT /api/invoices/:id
// @desc    Update an existing invoice
router.put("/:id", updateInvoice);

// @route   DELETE /api/invoices/:id
// @desc    Delete an invoice by ID
router.delete("/:id", deleteInvoice);

export default router;
