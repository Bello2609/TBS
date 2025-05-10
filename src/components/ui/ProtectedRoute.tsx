import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

// Define the local user roles again (no import to avoid circular issues)
type UserRole = "admin" | "employee" | "customer";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

// Component to protect routes based on authentication and role
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  // Not authenticated: redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Authenticated but role not allowed: redirect to home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Authenticated and authorized: render children
  return <Outlet />;
};

export default ProtectedRoute;
