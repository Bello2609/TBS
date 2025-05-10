import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js"; // 

import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, isAdmin, getUsers)
  .post(protect, isAdmin, createUser);

router.route("/:id")
  .put(protect, isAdmin, updateUser)
  .delete(protect, isAdmin, deleteUser);

export default router;
