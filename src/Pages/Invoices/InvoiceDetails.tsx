// src/pages/Invoices/InvoiceDetails.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { InvoiceContainer } from "@/styles/invoiceStyles";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import InvoiceView from "./invoiceView";

interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

interface Customer {
  name: string;
  email: string;
  address: string;
  postCode: string;
  city: string;
  phone: string;
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
    email: string;
    phone: string;
    company: string;
  };
}

interface Invoice {
  id: number;
  invoiceNumber: string;
  company: string;
  customer: Customer;
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

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`/api/invoices/${id}`);
        const data = response.data;
        if (user?.role === "customer" && data.customer?.name !== user.name) {
          setError("Du har ikke tilgang til denne fakturaen.");
        } else {
          setInvoice(data);
        }
      } catch (err) {
        console.error("Error fetching invoice:", err);
        setError("Kunne ikke hente fakturadetaljer.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id, user]);

  const handleDownloadPDF = () => {
    if (!invoice) return;

    const doc = new jsPDF() as jsPDFWithAutoTable;

    doc.setFontSize(18);
    doc.text("Faktura", 14, 20);

    doc.setFontSize(12);
    doc.text(`Selskap: ${invoice.company}`, 14, 30);
    doc.text(`Fakturanr: ${invoice.invoiceNumber}`, 14, 38);
    doc.text(`Dato: ${new Date(invoice.date).toLocaleDateString("no-NO")}`, 14, 46);
    if (invoice.dueDate) {
      doc.text(`Forfallsdato: ${new Date(invoice.dueDate).toLocaleDateString("no-NO")}`, 14, 54);
    }
    doc.text(`Kunde: ${invoice.customer.name}`, 14, 62);
    doc.text(`Adresse: ${invoice.customer.address}, ${invoice.customer.postCode} ${invoice.customer.city}`, 14, 70);
    doc.text(`Telefon: ${invoice.customer.phone}`, 14, 78);
    doc.text(`E-post: ${invoice.customer.email}`, 14, 86);

    autoTable(doc, {
      startY: 96,
      head: [["Produkt", "Antall", "Enhet", "Pris/stk", "Total"]],
      body: [[
        invoice.products,
        invoice.quantity.toString(),
        invoice.unit,
        `${invoice.unitPrice.toFixed(2)} kr`,
        `${invoice.total.toFixed(2)} kr`
      ]]
    });

    let y = doc.lastAutoTable?.finalY ?? 100;
    doc.text(`MVA (${invoice.tax}%): ${((invoice.total * invoice.tax) / 100).toFixed(2)} kr`, 14, y + 10);
    doc.text(`Totalt inkl. MVA: ${invoice.grandTotal.toFixed(2)} kr`, 14, y + 18);

    if (y + 60 > 270) {
      doc.addPage();
      y = 20;
    } else {
      y += 30;
    }

    doc.setFontSize(14);
    doc.text("Vedlagt godsliste", 14, y);

    autoTable(doc, {
      startY: y + 8,
      head: [["Ankomst", "Kunde", "Vare", "Type", "Antall", "Vekt", "Avgang", "Sender Navn", "Firma", "E-post", "Telefon"]],
      body: invoice.inventoryItems.map((item) => [
        item.arrivalDate,
        item.customer,
        item.goods,
        item.type,
        item.quantity.toString(),
        item.weight.toFixed(2),
        item.departureDate,
        item.sender?.name || "-",
        item.sender?.company || "-",
        item.sender?.email || "-",
        item.sender?.phone || "-"
      ])
    });

    let y2 = doc.lastAutoTable?.finalY ?? y + 60;
    if (y2 + 30 > 270) {
      doc.addPage();
      y2 = 20;
    }

    doc.setFontSize(14);
    doc.text("BETALINGSINFORMASJON", 14, y2 + 10);

    doc.setFontSize(12);
    doc.text(`Konto: ${invoice.bankInfo.accountNumber}`, 14, y2 + 18);
    doc.text(`KID: ${invoice.bankInfo.kidNumber}`, 14, y2 + 26);

    doc.save(`Faktura_${invoice.invoiceNumber}.pdf`);
  };

  if (!user) {
    return (
      <InvoiceContainer>
        <p style={{ color: "red", textAlign: "center" }}>
          Du har ikke tilgang til denne siden.
        </p>
      </InvoiceContainer>
    );
  }

  if (loading) {
    return (
      <InvoiceContainer>
        <p style={{ textAlign: "center", padding: "24px" }}>
          Laster fakturadetaljer...
        </p>
      </InvoiceContainer>
    );
  }

  if (error) {
    return (
      <InvoiceContainer>
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Button onClick={() => navigate("/invoices")}>← Tilbake</Button>
        </div>
      </InvoiceContainer>
    );
  }

  if (!invoice) {
    return (
      <InvoiceContainer>
        <p style={{ textAlign: "center" }}>Ingen fakturadata funnet.</p>
      </InvoiceContainer>
    );
  }

  return (
    <InvoiceView invoice={invoice} onDownload={handleDownloadPDF} onBack={() => navigate("/invoices")} />
  );
};

export default InvoiceDetails;
