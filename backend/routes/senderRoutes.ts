import express from "express";
import { getAllSenders, createSender } from "../controllers/senderController.js"; // Ensure this path is correct
import { protect } from "../middlewares/authMiddleware.js"; // Ensure this middleware is imported correctly

const router = express.Router();

// ✅ Get all senders
router.get("/", protect, getAllSenders);

// ✅ Add a new sender
router.post("/", protect, createSender);

export default router;
