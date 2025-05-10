// backend/routes/inventoryRoutes.ts

import express from "express";
import {
  getAllInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryController.js"; // ✅

const router = express.Router(); // ✅ 

// ✅ GET all inventory (optionally filtered by ?customerId)
router.get("/", getAllInventory);

// ✅ GET inventory item by ID
router.get("/:id", getInventoryById);

// ✅ POST create new inventory item
router.post("/", createInventory);

// ✅ PUT update inventory item by ID
router.put("/:id", updateInventory);

// ✅ DELETE inventory item by ID
router.delete("/:id", deleteInventory);

export default router;
