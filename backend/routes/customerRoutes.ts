// backend/routes/customerRoutes.ts

import { Router } from "express";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js"; // تأكد أن هذا الملف من نوع TypeScript أو تم تحويله لـ .js بعد البناء

const router = Router();

// ✅ Routes for customer management
router.get("/", getAllCustomers);            // Get all customers
router.get("/:id", getCustomerById);         // Get customer by ID
router.post("/", createCustomer);            // Create new customer
router.put("/:id", updateCustomer);          // Update customer
router.delete("/:id", deleteCustomer);       // Delete customer

export default router;
