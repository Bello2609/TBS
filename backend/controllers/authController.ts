import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { UserDocument } from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";

// POST /api/auth/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // Validate input fields
  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required." });
    return;
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    // Type assertion after null check
    const typedUser = user as UserDocument;

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, typedUser.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    // Generate JWT token
    const token = generateToken(typedUser._id.toString(), typedUser.role);


    // Return user info and token
    res.json({
      token,
      user: {
        id: typedUser._id,
        username: typedUser.username,
        name: typedUser.name,
        email: typedUser.email,
        role: typedUser.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};
