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

interface Invoice {
  _id: string;
  invoiceNumber: string;
  status: "Paid" | "Pending" | "Overdue";
  total?: number | null;
  grandTotal?: number | null;
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

  // Helper for displaying customer
  const renderCustomer = () => {
    if (typeof invoice.customer === "string") return invoice.customer;
    if (invoice.customer && typeof invoice.customer === "object") {
      return invoice.customer.companyName || invoice.customer.name || "N/A";
    }
    return "N/A";
  };

  // Helper for displaying company
  const renderCompanyName = () => {
    if (typeof invoice.customer === "object" && invoice.customer !== null) {
      return invoice.customer.companyName || "N/A";
    }
    return "N/A";
  };

  const formatMoney = (amount: number | null | undefined) => {
    return typeof amount === "number" ? amount.toFixed(2) : "N/A";
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>Invoice Details</ModalTitle>
        <ModalContentScrollable>
          <p><strong>Invoice #:</strong> {invoice.invoiceNumber}</p>
          <p>
            <strong>Customer:</strong> {renderCustomer()}
          </p>
          <p><strong>Status:</strong> {invoice.status}</p>
          <p>
            <strong>Total:</strong> {formatMoney(invoice.total)} kr
          </p>
          <p>
            <strong>Grand Total:</strong> {formatMoney(invoice.grandTotal)} kr
          </p>
          <p><strong>Due Date:</strong> {invoice.dueDate || "N/A"}</p>
          <p><strong>Date:</strong> {invoice.date}</p>
          <p>
            <strong>Company Name:</strong> {renderCompanyName()}
          </p>
        </ModalContentScrollable>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default InvoiceDetailsModal;