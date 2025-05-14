import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axiosInstance from "@/services/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import {
  InvoiceContainer,
  PageTitle,
  InvoiceInfo,
  DetailRow,
  TableData,
  InvoiceTable,
  TableRow,
  TableHeader,
  Button,
} from "@/styles/InvoiceStyles";

interface Customer {
  companyName: string;
  companyEmail: string;
  address: string;
  zipCode: string;
  city: string;
  companyPhone: string;
}

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

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer?: Customer;
  products: string;
  unit: string;
  unitPrice: number;
  totalQuantity: number;
  total: number;
  tax: number;
  grandTotal: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
  dueDate?: string;
  inventoryItems: InventoryItem[];
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  bankInfo: {
    accountNumber: string;
    kidNumber: string;
  };
}

// Add this interface for jsPDF with autoTable
interface PDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axiosInstance.get(`/api/invoices/${id}`);
        const data = res.data;
        console.log("Invoice data:", data); // أضف هذا السطر

        if (
          user?.role === "customer" &&
          data.customer?.companyName !== user.name
        ) {
          setError("You are not authorized to view this invoice.");
        } else {
          setInvoice({ ...data, id: data._id });
        }
      } catch {
        setError("Failed to load invoice.");
      }
    };
    fetchInvoice();
  }, [id, user]);

  const handleDownloadPDF = () => {
    if (!invoice || !invoice.customer) return;

    try {
      // Create PDF document in portrait mode
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      }) as PDFWithAutoTable;

      // Company header
      doc.setFontSize(18);
      doc.text("TBS Norway AS", 14, 20);
      
      // Invoice details
      doc.setFontSize(12);
      doc.text("INVOICE", 14, 30);
      doc.text(`Invoice #: ${invoice.invoiceNumber}`, 14, 38);
      doc.text(`Date: ${new Date(invoice.date).toLocaleDateString("no-NO")}`, 14, 46);
      if (invoice.dueDate) {
        doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString("no-NO")}`, 14, 54);
      }

      // Customer details
      doc.text("Bill To:", 14, 66);
      doc.text(invoice.customer.companyName, 14, 74);
      doc.text(invoice.customer.address, 14, 82);
      doc.text(`${invoice.customer.zipCode} ${invoice.customer.city}`, 14, 90);
      doc.text(`Phone: ${invoice.customer.companyPhone}`, 14, 98);
      doc.text(`Email: ${invoice.customer.companyEmail}`, 14, 106);

      // Products table
      autoTable(doc, {
        startY: 116,
        head: [["Description", "Quantity", "Unit Price (NOK)", "Total (NOK)"]],
        body: invoice.items.map((item) => [
          item.description,
          item.quantity?.toString() ?? "0",
          typeof item.unitPrice === "number" ? `${item.unitPrice.toFixed(2)} kr` : "0.00 kr",
          typeof item.total === "number" ? `${item.total.toFixed(2)} kr` : "0.00 kr",
        ]),
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] }
      });

      // Get the final Y position after the table
      const finalY = doc.lastAutoTable?.finalY ?? 110;

      // Calculate totals
      const taxAmount = typeof invoice.tax === "number" && typeof invoice.total === "number"
        ? (invoice.total * invoice.tax) / 100
        : 0;
      doc.text(
        `VAT (${invoice.tax ?? 0}%): ${taxAmount.toFixed(2)} kr`,
        14,
        finalY + 10
      );
      doc.text(
        `Grand Total: ${typeof invoice.grandTotal === "number" ? invoice.grandTotal.toFixed(2) : "0.00"} kr`,
        14,
        finalY + 18
      );

      // Payment details
      doc.addPage();
      doc.setFontSize(14);
      doc.text("Payment Information", 14, 20);
      doc.setFontSize(12);
      doc.text("Bank Details:", 14, 30);
      doc.text(`Account Number: ${invoice.bankInfo.accountNumber}`, 14, 38);
      doc.text(`KID Number: ${invoice.bankInfo.kidNumber}`, 14, 46);

      // Inventory details
      doc.text("Inventory Details", 14, 60);
      autoTable(doc, {
        startY: 70,
        head: [["Arrival", "Goods", "Type", "Weight (kg)", "Sender"]],
        body: invoice.inventoryItems.map((item) => [
          new Date(item.arrivalDate).toLocaleDateString("no-NO"),
          item.goods,
          item.type,
          item.weight.toFixed(2),
          item.sender.name
        ]),
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] }
      });

      // Save the PDF
      doc.save(`TBS_Invoice_${invoice.invoiceNumber}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

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
        <p style={{ textAlign: "center" }}>Loading...</p>
      </InvoiceContainer>
    );
  }

  return (
    <InvoiceContainer>
      <PageTitle>Invoice Details</PageTitle>

      <InvoiceInfo>
        <DetailRow><strong>Invoice #</strong><span>{invoice.invoiceNumber}</span></DetailRow>
        <DetailRow><strong>Status</strong><span>{invoice.status}</span></DetailRow>
        <DetailRow><strong>Date</strong><span>{new Date(invoice.date).toLocaleDateString("no-NO")}</span></DetailRow>
        <DetailRow><strong>Due Date</strong><span>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString("no-NO") : "-"}</span></DetailRow>
      </InvoiceInfo>

      <InvoiceInfo>
        <PageTitle>Customer</PageTitle>
        <DetailRow><strong>Company</strong><span>{invoice.customer?.companyName || "-"}</span></DetailRow>
        <DetailRow><strong>Phone</strong><span>{invoice.customer?.companyPhone || "-"}</span></DetailRow>
        <DetailRow><strong>Email</strong><span>{invoice.customer?.companyEmail || "-"}</span></DetailRow>
        <DetailRow><strong>Address</strong><span>{invoice.customer?.address || "-"}, {invoice.customer?.zipCode || "-"} {invoice.customer?.city || "-"}</span></DetailRow>
      </InvoiceInfo>

      <InvoiceInfo>
        <PageTitle>Products</PageTitle>
        <InvoiceTable>
          <thead>
            <TableRow>
              <TableHeader>Description</TableHeader>
              <TableHeader>Qty</TableHeader>
              <TableHeader>Unit Price</TableHeader>
              <TableHeader>Total</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {invoice.items.map((item, idx) => (
              <TableRow key={idx}>
                <TableData>{item.description}</TableData>
                <TableData>{item.quantity}</TableData>
                <TableData>{item.unitPrice.toFixed(2)} kr</TableData>
                <TableData>{item.total.toFixed(2)} kr</TableData>
              </TableRow>
            ))}
          </tbody>
        </InvoiceTable>
      </InvoiceInfo>

      <InvoiceInfo>
        <PageTitle>Inventory Items</PageTitle>
        <InvoiceTable>
          <thead>
            <TableRow>
              <TableHeader>Arrival</TableHeader>
              <TableHeader>Goods</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Qty</TableHeader>
              <TableHeader>Weight</TableHeader>
              <TableHeader>Departure</TableHeader>
              <TableHeader>Sender</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {invoice.inventoryItems.map((item, idx) => (
              <TableRow key={idx}>
                <TableData>{item.arrivalDate}</TableData>
                <TableData>{item.goods}</TableData>
                <TableData>{item.type}</TableData>
                <TableData>{item.quantity}</TableData>
                <TableData>{item.weight.toFixed(2)} kg</TableData>
                <TableData>{item.departureDate}</TableData>
                <TableData>{item.sender.name}</TableData>
              </TableRow>
            ))}
          </tbody>
        </InvoiceTable>
      </InvoiceInfo>

      <InvoiceInfo>
        <PageTitle>Bank Info</PageTitle>
        <DetailRow><strong>Account Number</strong><span>{invoice.bankInfo.accountNumber}</span></DetailRow>
        <DetailRow><strong>KID</strong><span>{invoice.bankInfo.kidNumber}</span></DetailRow>
      </InvoiceInfo>

      <div style={{ marginTop: "24px", display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => navigate("/invoices")}>← Back</Button>
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
      </div>
    </InvoiceContainer>
  );
};

export default InvoiceDetails;
