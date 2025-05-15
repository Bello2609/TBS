import { Request, Response } from "express";
import Invoice from "../models/invoice.model";


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
    // جلب أحدث 10 فواتير مع بيانات العميل
    const invoices = await Invoice.find({})
      .sort({ date: -1 })
      .limit(10)
      .populate("customerId", "companyName"); // تأكد من اسم الحقل في الموديل

    const formattedInvoices = invoices.map((invoice) => ({
      id: String(invoice._id),
      invoiceNumber: invoice.invoiceNumber,
      customer:
        invoice.customerId &&
        typeof invoice.customerId === "object" &&
        "companyName" in invoice.customerId
          ? (invoice.customerId as { companyName: string }).companyName
          : "",
      amount: invoice.grandTotal,
      status: invoice.status,
      dateIssued: invoice.date,
    }));

    res.json(formattedInvoices);
  } catch (error) {
    console.error("Error in getRecentInvoices:", error);
    res.status(500).json({ message: "Failed to fetch recent invoices" });
  }
};
