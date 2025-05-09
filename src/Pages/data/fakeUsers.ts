// src/pages/data/fakeUsers.ts

// ✅ User interface representing system users (admins, employees, customers)
export interface User {
  id: number;                // Unique user ID
  name: string;              // Full name
  email: string;             // Login email
  password: string;          // Hashed password (for now, plain text in mock)
  role: "admin" | "employee" | "customer"; // Role for permissions
  phone: string;             // Phone number
}

// ✅ Sample mock users used for login and role-based access
export const fakeUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "admin123", // In real app, use hashed password
    role: "admin",
    phone: "123-456-7890", // Add this line
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "employee123",
    role: "employee",
    phone: "987-654-3210", // Add this line
  },
  {
    id: 3,
    name: "Peter Jones",
    email: "peter.jones@example.com",
    password: "customer123",
    role: "customer", // 🔗 Linked to customer ID 1
    phone: "555-123-4567", // Add this line
  },
  {
    id: 4,
    name: "General Manager",
    email: "manager@tbs.no",
    password: "manager123",
    role: "admin",
    phone: "123-456-7890", // Add this line
  },
  {
    id: 5,
    name: "Kari Nilsen",
    email: "kari.nilsen@tromsologistikk.no",
    password: "customer123",
    role: "customer", // 🔗 Linked to customer ID 2
    phone: "987-654-3210", // Add this line
  },
  {
    id: 6,
    name: "Ola Nordmann",
    email: "ola.nordmann@gmail.com",
    password: "privat123",
    role: "customer", // 🔗 Linked to customer ID 3
    phone: "555-123-4567", // Add this line
  },
];
