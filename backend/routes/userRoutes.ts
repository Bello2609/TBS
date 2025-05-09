// backend/routes/userRoutes.ts

import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

import { protect, isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

// ✅ GET all users (admin only)
router.get("/", protect, isAdmin, getUsers);

// ✅ Create new user (admin only)
router.post("/", protect, isAdmin, createUser);

// ✅ Update user by ID (admin only)
router.put("/:id", protect, isAdmin, updateUser);

// ✅ Delete user by ID (admin only)
router.delete("/:id", protect, isAdmin, deleteUser);

export default router;
