// src/routes/AppRoutes.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// 🌐 Public pages
import Home from "../pages/home/home";
import Login from "../pages/auth/login";
import NotFound from "../pages/notFound/notFound";

// 🔐 Core Protected pages
import Dashboard from "../pages/dashboard/dashboard";
import InventoryList from "../pages/inventory/inventoryList";
import Reports from "../pages/reports/reports";
import Notifications from "../pages/notifications/notifications";

// 👥 User Management
import UserManagement from "../pages/users/userManagement";
import CreateUser from "../pages/users/createUser";

// ⚙️ Settings & Security
import Settings from "../pages/settings/settings";
import SecuritySettings from "../pages/settings/security/securitySettings";
import Enable2FA from "../pages/settings/security/enable2FA";
import ActivityLogs from "../pages/settings/security/activityLogs";
import ChangePassword from "../pages/settings/security/changePassword";

// 📄 Invoices
import InvoiceList from "../pages/invoices/invoiceList";
import CreateInvoice from "../pages/invoices/createInvoice";
import EditInvoice from "../pages/invoices/editInvoice";
import InvoiceDetails from "../pages/invoices/invoiceDetails";
import InvoiceExport from "../pages/invoices/invoiceExport";
import InvoiceReports from "../pages/invoices/invoiceReports";
import InvoiceStats from "../pages/invoices/invoiceStats";

// 🔐 Protected route wrapper
import ProtectedRoute from "../components/ui/protectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 🌐 Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />

      {/* 🔐 Admin-only routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        {/* Settings & Security */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/security" element={<SecuritySettings />} />
        <Route path="/settings/security/enable-2fa" element={<Enable2FA />} />
        <Route path="/settings/security/logs" element={<ActivityLogs />} />
        <Route path="/settings/change-password" element={<ChangePassword />} />

        {/* User Management */}
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/create" element={<CreateUser mode="create" />} />
      </Route>

      {/* 🔐 Admin & Employee routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "employee"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Invoice Management */}
        <Route path="/invoices/create" element={<CreateInvoice />} />
        <Route path="/invoices/edit/:id" element={<EditInvoice />} />
        <Route path="/invoices/export" element={<InvoiceExport />} />
        <Route path="/invoices/reports" element={<InvoiceReports />} />
        <Route path="/invoices/stats" element={<InvoiceStats />} />
      </Route>

      {/* 🔐 Admin, Employee, and Customer routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "employee", "customer"]} />}>
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/invoices/:id" element={<InvoiceDetails />} />
      </Route>

      {/* ❌ 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
