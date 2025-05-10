import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { UserDocument } from "../models/user";

// Extend Express Request to include user
export interface AuthRequest extends Request {
  user?: UserDocument;
}

// ✅ Middleware to verify JWT
export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Not authorized, token missing" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { id: string };
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Middleware to allow only admins
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: admin only" });
  }
};
