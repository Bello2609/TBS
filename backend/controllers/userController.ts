// backend/controllers/userController.ts

import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";

// GET /api/users - Get all users (Admin only)
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
};

// POST /api/users - Create new user (Admin only)
export const createUser = async (req: Request, res: Response) => {
  const { username, email, name, role, password } = req.body;

  if (!username || !email || !name || !role || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existing = await User.findOne({ $or: [{ username }, { email }] });

    if (existing) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      name,
      role,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error while creating user." });
  }
};

// PUT /api/users/:id - Update user (Admin only)
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, name, role } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found." });

    user.username = username || user.username;
    user.email = email || user.email;
    user.name = name || user.name;
    user.role = role || user.role;

    await user.save();

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error while updating user." });
  }
};

// DELETE /api/users/:id - Delete user (Admin only)
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found." });

    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error while deleting user." });
  }
};
