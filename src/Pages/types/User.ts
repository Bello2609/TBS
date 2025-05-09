export type UserRole = "admin" | "employee" | "customer";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string; // Make sure this is present
  role: UserRole;
  password?: string; // Optional: used for creation only

  // ✅ Add these optional fields to avoid future errors
  createdAt?: string;
  status?: "active" | "inactive";
}

// filepath: c:/Users/Ahmed/Documents/GitHub/BachelorTBS/src/pages/data/fakeUsers.ts
import type { User } from "../types/User";

export const fakeUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "employee",
    phone: "987-654-3210",
  },
  {
    id: 3,
    name: "Peter Jones",
    email: "peter.jones@example.com",
    role: "customer",
    phone: "555-123-4567",
  },
];
