// src/routes/AppRoutes.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// Public pages
import Home from "../pages/home/home";
import Login from "../pages/auth/login";
import NotFound from "../pages/notFound/notFound";

// Protected pages
import Dashboard from "../pages/dashboard/dashboard";
import InvoiceList from "../pages/invoices/invoiceList";
import CreateInvoice from "../pages/invoices/createInvoice";
import InventoryList from "../pages/inventory/inventoryList";
import Reports from "../pages/reports/reports";
import Notifications from "../pages/notifications/notifications";
import UserManagement from "../pages/users/userManagement";
import CreateUser from "../pages/users/createUser";
import Settings from "../pages/settings/settings";
import SecuritySettings from "../pages/settings/security/securitySettings";
import Enable2FA from "../pages/settings/security/enable2FA";
import ActivityLogs from "../pages/settings/security/activityLogs";
import ChangePassword from "../pages/settings/security/changePassword";

// Route protection
import ProtectedRoute from "../components/ui/protectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 🌐 Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />

      {/* 🔐 Admin-only routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/security" element={<SecuritySettings />} />
        <Route path="/settings/security/enable-2fa" element={<Enable2FA />} />
        <Route path="/settings/security/logs" element={<ActivityLogs />} />
        <Route path="/settings/change-password" element={<ChangePassword />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/create" element={<CreateUser mode="create" />} />
      </Route>

      {/* 🔐 Admin and Employee routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "employee"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/invoices/create" element={<CreateInvoice />} />
      </Route>

      {/* 🔐 Admin, Employee, and Customer routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "employee", "customer"]} />}>
        <Route path="/invoices" element={<InvoiceList />} />
      </Route>

      {/* ❌ Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
