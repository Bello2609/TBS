// src/routes/AppRoutes.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// 🌐 Public pages
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Auth/Login";
import NotFound from "@/Pages/NotFound/NotFound";
import Unauthorized from "@/pages/Unauthorized";

// 🔐 Core Protected pages
import Dashboard from "@/Pages/Dashboard/Dashboard";
import InventoryList from "@/pages/inventory/inventory/inventoryList";
import Reports from "@/Pages/Reports/Reports";
import Notifications from "@/Pages/Notifications/Notifications";

// 👥 User Management
import UserManagement from "@/Pages/Users/UserManagement";
import CreateUser from "@/Pages/Users/CreateUser";
import EditUser from "@/Pages/Users/EditUser";

// ⚙️ Settings & Security
import Settings from "@/Pages/Settings/Settings";
import SecuritySettings from "@/Pages/Settings/Security/SecuritySettings";
import Enable2FA from "@/Pages/Settings/Security/Enable2FA";
import ActivityLogs from "@/Pages/Settings/Security/ActivityLogs";
import ChangePassword from "@/Pages/Settings/Security/ChangePassword";

// 📄 Invoice Management
import InvoiceList from "@/Pages/Invoices/InvoiceList";
import CreateInvoice from "@/Pages/Invoices/CreateInvoice";
import EditInvoice from "@/Pages/Invoices/EditInvoice";
import InvoiceDetails from "@/Pages/Invoices/InvoiceDetails";
import InvoiceExport from "@/Pages/Invoices/InvoiceExport";
import InvoiceReports from "@/Pages/Invoices/InvoiceReports";
import InvoiceStats from "@/Pages/Invoices/InvoiceStats";

// 🛡️ Protected Route wrapper
import ProtectedRoute from "@/components/ui/ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 🛡️ Admin-Only Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        {/* 👥 User Management */}
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/create" element={<CreateUser mode="create" />} />
        <Route path="/users/edit/:id" element={<EditUser />} />

        {/* ⚙️ Settings */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/security" element={<SecuritySettings />} />
        <Route path="/settings/security/enable-2fa" element={<Enable2FA />} />
        <Route path="/settings/security/logs" element={<ActivityLogs />} />
        <Route path="/settings/change-password" element={<ChangePassword />} />
      </Route>

      {/* 🛡️ Admin + Employee Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "employee"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/invoices/create" element={<CreateInvoice />} />
        <Route path="/invoices/edit/:id" element={<EditInvoice />} />
        <Route path="/invoices/export" element={<InvoiceExport />} />
        <Route path="/invoices/reports" element={<InvoiceReports />} />
        <Route path="/invoices/stats" element={<InvoiceStats />} />
      </Route>

      {/* 🛡️ All Authenticated Roles */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "employee", "customer"]} />}>
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/invoices/:id" element={<InvoiceDetails />} />
      </Route>

      {/* ❌ Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
