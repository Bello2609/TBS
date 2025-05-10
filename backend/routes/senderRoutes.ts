// backend/routes/senderRoutes.ts

import express from "express";
import { getSendersByCustomer, createSender } from "../controllers/senderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Get senders for a specific customer
router.get("/", protect, getSendersByCustomer);

// ✅ Add a new sender
router.post("/", protect, createSender);

export default router;
