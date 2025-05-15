import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User, { UserDocument } from "../models/user.model";
import { generateToken } from "../utils/generateToken";
import { Notify } from "../utils/Notification";

// POST /api/auth/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // ✅ Validate required fields
  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required." });
    return;
  }

  try {
    // ✅ Check if user exists by username
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    // ✅ Cast user to the correct document type
    const typedUser = user as UserDocument;

    // ✅ Compare hashed passwords
    const isMatch = await bcrypt.compare(password, typedUser.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    // ✅ Convert _id to string for JWT
    const userId: string = new mongoose.Types.ObjectId(typedUser._id).toString();

    // ✅ Generate token
    const token = generateToken(userId, typedUser.role);
    const data_for_notification = { 
      userId: userId,
      action: "User Login",
      message: "A user has login",
     }
    await Notify(data_for_notification);

    // ✅ Respond with user data and token
    res.status(200).json({
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
