// src/pages/invoices/invoiceExport.tsx

import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Invoice } from "../types/invoice";

const InvoiceExport = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get("/api/invoices");
        setInvoices(res.data);
      } catch {
        console.error("Failed to fetch invoices.");
      }
    };
    fetchInvoices();
  }, []);

  const exportAllToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("All Invoices", 14, 20);

    const tableData = invoices.map((inv) => [
      inv.invoiceNumber,
      typeof inv.customer === "string" ? inv.customer : inv.customer.name,
      inv.date,
      `${inv.total.toFixed(2)} kr`,
      inv.status,
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["Invoice #", "Customer", "Date", "Total", "Status"]],
      body: tableData,
    });

    doc.save("all_invoices.pdf");
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Export Invoices</h1>
      <p>Total invoices: {invoices.length}</p>
      <Button $variant="primary" onClick={exportAllToPDF}>
        Export All to PDF
      </Button>
    </div>
  );
};

export default InvoiceExport;
