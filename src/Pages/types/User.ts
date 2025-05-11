// src/pages/types/user.ts

// ✅ Define allowed user roles
export type UserRole = "admin" | "employee" | "customer";

// ✅ Define user model shape used across the frontend
export interface User {
  _id?: string;                       // Optional: MongoDB _id (used in API responses)
  id?: string;                        // Optional: frontend-mapped ID
  username?: string;                 // Optional: username (may exist in some views)
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  companyName?: string;
  status?: "active" | "inactive";     // Optional user status
  createdAt?: string;                 // Optional: ISO date string
  token?: string;                     // Optional: used for authentication/session
}
