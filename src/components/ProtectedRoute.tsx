// src/routes/ProtectedRoute.tsx

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/authContext";

// ✅ Define allowed user roles
type UserRole = "admin" | "employee" | "customer";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // ✅ 1. User is not logged in → redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // ✅ 2. User is logged in but doesn't have permission → redirect to /unauthorized
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ 3. User is authorized → render protected content
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
