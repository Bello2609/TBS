// src/pages/invoices/invoiceDetailsModal.tsx

import { useEffect, useState } from "react";
import axiosInstance from "@/services/axiosInstance";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalContentScrollable,
  CloseButton,
} from "@/styles/invoiceStyles";

interface InvoiceDetailsModalProps {
  invoiceId: string;
  onClose: () => void;
}

// ✅ Inline invoice type for simplicity
interface Invoice {
  _id: string;
  invoiceNumber: string;
  status: "Paid" | "Pending" | "Overdue";
  total: number;
  grandTotal: number;
  dueDate?: string;
  date: string;
  customer: {
    companyName?: string;
    name?: string;
  } | string;
}

const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({ invoiceId, onClose }) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Fetch invoice details
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axiosInstance.get(`/api/invoices/${invoiceId}`);
        setInvoice(res.data);
      } catch {
        setError("Failed to load invoice details.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  if (loading) {
    return (
      <ModalOverlay>
        <ModalContainer>
          <ModalTitle>Loading...</ModalTitle>
        </ModalContainer>
      </ModalOverlay>
    );
  }

  if (error || !invoice) {
    return (
      <ModalOverlay>
        <ModalContainer>
          <CloseButton onClick={onClose}>×</CloseButton>
          <ModalTitle>Error</ModalTitle>
          <p style={{ color: "red" }}>{error || "Invoice not found."}</p>
        </ModalContainer>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>Invoice Details</ModalTitle>
        <ModalContentScrollable>
          <p><strong>Invoice #:</strong> {invoice.invoiceNumber}</p>
          <p>
            <strong>Customer:</strong>{" "}
            {typeof invoice.customer === "string"
              ? invoice.customer
              : invoice.customer.companyName || invoice.customer.name || "N/A"}
          </p>
          <p><strong>Status:</strong> {invoice.status}</p>
          <p><strong>Total:</strong> {invoice.total.toFixed(2)} kr</p>
          <p><strong>Grand Total:</strong> {invoice.grandTotal.toFixed(2)} kr</p>
          <p><strong>Due Date:</strong> {invoice.dueDate || "N/A"}</p>
          <p><strong>Date:</strong> {invoice.date}</p>
        </ModalContentScrollable>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default InvoiceDetailsModal;
