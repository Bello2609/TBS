// src/routes/ProtectedRoute.tsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext"; // ✅ Auth context
import type { UserRole } from "../../pages/types/user"; // ✅ User role type

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]; // Optional allowed roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  // 🚫 User is not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  // 🚫 User is authenticated but role is not authorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ User is authenticated and authorized
  return <Outlet />;
};

export default ProtectedRoute;
