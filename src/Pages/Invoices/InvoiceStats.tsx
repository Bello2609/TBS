// src/pages/invoices/invoiceStats.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import { Invoice } from "../types/Invoice";
import { InventoryContainer } from "@/styles/InventoryStyles";

const InvoiceStats = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get("/api/invoices");
        setInvoices(res.data);
      } catch {
        console.error("Error loading stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
  const average = invoices.length ? totalRevenue / invoices.length : 0;
  const uniqueCustomers = new Set(invoices.map((inv) =>
    typeof inv.customer === "string" ? inv.customer : inv.customer.name
  ));

  if (loading) {
    return (
      <InventoryContainer>
        <p>Laster statistikk...</p>
      </InventoryContainer>
    );
  }

  return (
    <InventoryContainer>
      <h1>Fakturastatistikk</h1>
      <p><strong>Total omsetning:</strong> {totalRevenue.toFixed(2)} kr</p>
      <p><strong>Gjennomsnitt per faktura:</strong> {average.toFixed(2)} kr</p>
      <p><strong>Antall fakturaer:</strong> {invoices.length}</p>
      <p><strong>Unike kunder:</strong> {uniqueCustomers.size}</p>
    </InventoryContainer>
  );
};

export default InvoiceStats;
