import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { protect, isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

// Protect all user routes (admin only)
router.use(protect, isAdmin);

router.get("/", getUsers);               // GET all users
router.get("/:id", getUserById);         // ✅ GET user by ID (New)
router.post("/", createUser);            // POST create user
router.put("/:id", updateUser);          // PUT update user
router.delete("/:id", deleteUser);       // DELETE user

export default router;
