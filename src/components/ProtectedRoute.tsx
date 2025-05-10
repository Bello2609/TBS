// src/routes/ProtectedRoute.tsx

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/authContext";

// Define accepted roles
type UserRole = "admin" | "employee" | "customer";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // 1. Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // 2. Logged in but not authorized → redirect to /unauthorized
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Authorized
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
