// backend/controllers/authController.ts

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { generateToken } from "../utils/generateToken";

// ✅ POST /api/auth/login
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // 🔎 Validate input
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    // 🔍 Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 🔑 Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 🎫 Generate JWT
    const token = generateToken(user._id.toString(), user.role);

    // 🟢 Send response
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};
