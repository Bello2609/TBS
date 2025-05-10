// src/controllers/userController.ts

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

// ✅ GET /api/users - Fetch all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
};

// ✅ GET /api/users/:id - Fetch single user
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server error while fetching user." });
  }
};

// ✅ POST /api/users - Create user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, name, role, password, phone } = req.body;

  if (!username || !email || !name || !role || !password || !phone) {
    res.status(400).json({ message: "All fields are required." });
    return;
  }

  try {
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      res.status(409).json({ message: "User already exists." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      name,
      role,
      phone,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error while creating user." });
  }
};

// ✅ PUT /api/users/:id - Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { username, email, name, role, phone } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.name = name || user.name;
    user.role = role || user.role;
    user.phone = phone || user.phone;

    await user.save();

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error while updating user." });
  }
};

// ✅ DELETE /api/users/:id - Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error while deleting user." });
  }
};
