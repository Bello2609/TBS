// src/pages/invoices/invoiceReports.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import { Invoice } from "../types/invoice";
import { InvoiceContainer } from "@/styles/invoiceStyles";

const InvoiceReports = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get("/api/invoices");
        setInvoices(res.data);
      } catch {
        console.error("Failed to load invoices.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const statusCounts = invoices.reduce(
    (acc, invoice) => {
      acc[invoice.status] = (acc[invoice.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  if (loading) {
    return (
      <InvoiceContainer>
        <p>Laster rapport...</p>
      </InvoiceContainer>
    );
  }

  return (
    <InvoiceContainer>
      <h1>Fakturarapporter</h1>
      <ul>
        <li>✅ Betalt: {statusCounts["Paid"] || 0}</li>
        <li>⏳ Venter: {statusCounts["Pending"] || 0}</li>
        <li>❌ Forfalt: {statusCounts["Overdue"] || 0}</li>
      </ul>
      <p>Totalt antall fakturaer: {invoices.length}</p>
    </InvoiceContainer>
  );
};

export default InvoiceReports;
