// src/controllers/dashboardController.ts

import { Request, Response } from "express";

// ✅ Return dashboard statistics
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    res.json({
      totalUsers: 10,
      totalInvoices: 20,
      totalRevenue: 5000,
    });
  } catch (error) {
    console.error("Error in getDashboardStats:", error); // ✅ Log the error
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

// ✅ Return recent invoices for dashboard
export const getRecentInvoices = async (req: Request, res: Response) => {
  try {
    res.json([
      { id: 1, customer: "Customer A", amount: 200 },
      { id: 2, customer: "Customer B", amount: 350 },
    ]);
  } catch (error) {
    console.error("Error in getRecentInvoices:", error); // ✅ Log the error
    res.status(500).json({ message: "Failed to fetch recent invoices" });
  }
};
