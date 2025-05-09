// backend/utils/generateToken.ts

import jwt from "jsonwebtoken";

// ✅ Use JWT_SECRET from .env, or fallback for dev
const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

// ✅ Exported function to generate JWT with user ID and role
export const generateToken = (userId: string, role: string): string => {
  return jwt.sign(
    { id: userId, role },       // payload
    JWT_SECRET,                 // secret key
    { expiresIn: "7d" }         // token expiry
  );
};
