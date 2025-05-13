import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axiosInstance from "@/services/axiosInstance";
import { useAuth } from "@/context/authContext";
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
} from "@/styles/invoiceStyles";

// 👇 تعريف مخصص لدعم autoTable + finalY
interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

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

    const doc = new jsPDF() as jsPDFWithAutoTable;

    // Page 1 - Invoice Summary
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Invoice #: ${invoice.invoiceNumber}`, 14, 30);
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString("no-NO")}`, 14, 38);
    if (invoice.dueDate) {
      doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString("no-NO")}`, 14, 46);
    }

    doc.text(`Customer: ${invoice.customer.companyName}`, 14, 58);
    doc.text(
      `Address: ${invoice.customer.address}, ${invoice.customer.zipCode} ${invoice.customer.city}`,
      14,
      66
    );
    doc.text(`Phone: ${invoice.customer.companyPhone}`, 14, 74);
    doc.text(`Email: ${invoice.customer.companyEmail}`, 14, 82);

    autoTable(doc, {
      startY: 92,
      head: [["Description", "Qty", "Unit Price", "Total"]],
      body: invoice.items.map((item) => [
        item.description,
        item.quantity.toString(),
        `${item.unitPrice.toFixed(2)} kr`,
        `${item.total.toFixed(2)} kr`,
      ]),
    });

    const y = (doc.lastAutoTable?.finalY ?? 110) + 10;
    const taxAmount = (invoice.total * invoice.tax) / 100;

    doc.text(`VAT (${invoice.tax}%): ${taxAmount.toFixed(2)} kr`, 14, y);
    doc.text(`Grand Total: ${invoice.grandTotal.toFixed(2)} kr`, 14, y + 10);

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
        item.sender.name,
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
        <DetailRow><strong>Company</strong><span>{invoice.customer?.companyName}</span></DetailRow>
        <DetailRow><strong>Phone</strong><span>{invoice.customer?.companyPhone}</span></DetailRow>
        <DetailRow><strong>Email</strong><span>{invoice.customer?.companyEmail}</span></DetailRow>
        <DetailRow><strong>Address</strong><span>{invoice.customer?.address}, {invoice.customer?.zipCode} {invoice.customer?.city}</span></DetailRow>
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
