// src/routes/ProtectedRoute.tsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext"; // ✅ correct
import type { UserRole } from "../../pages/types/user"; // fixed import path

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]; // 👈 Use your unified type
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  // Not logged in at all
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Logged in, but role is not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // All checks passed
  return <Outlet />;
};

export default ProtectedRoute;
