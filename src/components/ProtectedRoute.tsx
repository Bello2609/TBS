// src/routes/ProtectedRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";

// ✅ Define role type properly
type UserRole = "admin" | "employee" | "customer";

// Simulated user (replace later with AuthContext)
const currentUser: { role: UserRole; id: string } = {
  role: "admin", // or "employee", "customer"
  id: "u123",
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export { currentUser };
export default ProtectedRoute;
