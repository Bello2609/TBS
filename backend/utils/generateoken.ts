// backend/utils/generateToken.ts

import jwt from "jsonwebtoken";

// ✅ Secret key from .env (to be configured in server.ts)
const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

// ✅ Generate JWT token with user ID and role
export const generateToken = (userId: string, role: string): string => {
  return jwt.sign(
    { id: userId, role }, // payload
    JWT_SECRET,           // secret key
    { expiresIn: "7d" }   // token validity
  );
};
