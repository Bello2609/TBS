// backend/routes/dashboardRoutes.ts

import express from "express";
import { getDashboardStats, getRecentInvoices } from "../controllers/dashboardController.js";
import { protect } from "../middlewares/authMiddleware.js"; // ✅ Import token verification middleware

const router = express.Router();

// ✅ Apply token verification middleware
router.use(protect);

// GET /api/dashboard/stats
router.get("/stats", getDashboardStats);

// GET /api/dashboard/recent-invoices
router.get("/recent-invoices", getRecentInvoices);

export default router;
