// src/App.tsx

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

// ✅ Layout wrapper: handles sidebar visibility + padding
const LayoutWrapper: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ These are considered "public" routes with no sidebar
  const isPublicRoute = [
    "/",
    "/auth/login",
    "/auth/forgot-password",
    "/auth/reset-password",
  ].includes(location.pathname);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* ✅ Sidebar appears only when authenticated & not on public routes */}
      {isAuthenticated && !isPublicRoute && <Sidebar />}

      <div
        style={{
          flex: 1,
          padding: "20px",
          marginLeft:
            isAuthenticated && !isPublicRoute && isDesktop ? "250px" : "0px",
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* ✅ Main route rendering here */}
        <AppRoutes />
      </div>
    </div>
  );
};

// ✅ Main App with Auth + Routing
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <LayoutWrapper />
        <ToastContainer position="top-center" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
};

export default App;
