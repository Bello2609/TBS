// src/pages/invoices/InvoiceDetails.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axiosInstance from "@/services/axiosInstance";
import { useAuth } from "@/context/authContext";
import { InvoiceContainer } from "@/styles/invoiceStyles";
import { Button } from "@/components/ui/button";
import InvoiceView from "./invoiceView";

// Extend jsPDF to support autoTable
interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: { finalY: number };
}

// Define the customer structure
interface Customer {
  companyName: string;
  companyEmail: string;
  address: string;
  zipCode: string;
  city: string;
  companyPhone: string;
}

// Define inventory item
interface InventoryItem {
  arrivalDate: string;
  departureDate: string;
  customer: string;
  goods: string;
  type: string;
  quantity: number;
  weight: number;
  sender: {
    name: string;
  };
}

// Define invoice structure
interface Invoice {
  id: string;
  invoiceNumber: string;
  company: string;
  customer?: Customer; // Make customer optional for safety
  products: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  tax: number;
  grandTotal: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
  dueDate?: string;
  inventoryItems: InventoryItem[];
  bankInfo: {
    accountNumber: string;
    kidNumber: string;
  };
}

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load invoice from backend
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axiosInstance.get(`/api/invoices/${id}`);
        const data = res.data;

        // 🛡️ Restrict access for customers
        if (
          user?.role === "customer" &&
          data.customer?.companyName !== user.name // ✔️ compare against user.name
        ) {
          setError("You are not authorized to view this invoice.");
        } else {
          setInvoice({ ...data, id: data._id });
        }
      } catch {
        setError("Failed to load invoice.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id, user]);

  // 🧾 Download PDF with 3 pages
  const handleDownloadPDF = () => {
    if (!invoice || !invoice.customer) return; // Check for invoice and customer presence

    const doc = new jsPDF() as jsPDFWithAutoTable;

    // Page 1 - Invoice Info
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);
    doc.setFontSize(12);
    doc.text(`Company: ${invoice.company}`, 14, 30);
    doc.text(`Invoice #: ${invoice.invoiceNumber}`, 14, 38);
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString("no-NO")}`, 14, 46);

    if (invoice.dueDate) {
      doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString("no-NO")}`, 14, 54);
    }

    // Ensure customer data is present before accessing properties
    doc.text(`Customer: ${invoice.customer.companyName || "N/A"}`, 14, 62);
    doc.text(
      `Address: ${invoice.customer.address || "N/A"}, ${invoice.customer.zipCode || ""} ${invoice.customer.city || ""}`,
      14,
      70
    );
    doc.text(`Phone: ${invoice.customer.companyPhone || "N/A"}`, 14, 78);
    doc.text(`Email: ${invoice.customer.companyEmail || "N/A"}`, 14, 86);

    autoTable(doc, {
      startY: 96,
      head: [["Product", "Qty", "Unit", "Unit Price", "Total"]],
      body: [
        [
          invoice.products,
          invoice.quantity,
          invoice.unit,
          `${invoice.unitPrice.toFixed(2)} kr`,
          `${invoice.total.toFixed(2)} kr`,
        ],
      ],
    });

    const taxAmount = (invoice.total * invoice.tax) / 100;
    const y = doc.lastAutoTable?.finalY ?? 110;

    doc.text(`VAT (${invoice.tax}%): ${taxAmount.toFixed(2)} kr`, 14, y + 10);
    doc.text(`Grand Total: ${invoice.grandTotal.toFixed(2)} kr`, 14, y + 18);

    // Page 2 - Inventory
    doc.addPage();
    doc.setFontSize(14);
    doc.text("Attached Inventory", 14, 20);

    autoTable(doc, {
      startY: 28,
      head: [["Arrival", "Customer", "Goods", "Type", "Qty", "Weight", "Departure", "Sender"]],
      body: invoice.inventoryItems.map((item) => [
        item.arrivalDate,
        item.customer,
        item.goods,
        item.type,
        item.quantity.toString(),
        item.weight.toFixed(2),
        item.departureDate,
        item.sender?.name || "-",
      ]),
    });

    // Page 3 - Bank Info
    doc.addPage();
    doc.setFontSize(14);
    doc.text("Payment Information", 14, 20);
    doc.setFontSize(12);
    doc.text(`Account Number: ${invoice.bankInfo.accountNumber}`, 14, 30);
    doc.text(`KID: ${invoice.bankInfo.kidNumber}`, 14, 38);

    doc.save(`Invoice_${invoice.invoiceNumber}.pdf`);
  };

  // 👁️ UI states
  if (!user) {
    return (
      <InvoiceContainer>
        <p style={{ color: "red", textAlign: "center" }}>
          You are not authorized to view this page.
        </p>
      </InvoiceContainer>
    );
  }

  if (loading) {
    return (
      <InvoiceContainer>
        <p style={{ textAlign: "center" }}>Loading invoice details...</p>
      </InvoiceContainer>
    );
  }

  if (error) {
    return (
      <InvoiceContainer>
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Button onClick={() => navigate("/invoices")}>← Back</Button>
        </div>
      </InvoiceContainer>
    );
  }

  if (!invoice) {
    return (
      <InvoiceContainer>
        <p style={{ textAlign: "center" }}>No invoice data found.</p>
      </InvoiceContainer>
    );
  }

  // ✅ Render main view
  return (
    <InvoiceView
      invoice={invoice}
      onDownload={handleDownloadPDF}
      onBack={() => navigate("/invoices")}
    />
  );
};

export default InvoiceDetails;