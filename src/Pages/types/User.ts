// src/pages/types/user.ts

// Define available user roles
export type UserRole = "admin" | "employee" | "customer";

// Type for individual user data (used throughout the app)
export interface User {
  id: string;                        // MongoDB ObjectId as string
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt?: string;               // ISO string (optional)
  status?: "active" | "inactive";   // Optional user status
}
