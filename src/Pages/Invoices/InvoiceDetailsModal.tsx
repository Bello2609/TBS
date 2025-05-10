// src/pages/invoices/invoiceDetailsModal.tsx

import React from "react";
import { Invoice } from "../types/invoice";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalContentScrollable,
  CloseButton,
} from "@/styles/invoiceStyles"; 

interface InvoiceDetailsModalProps {
  invoice: Invoice;
  onClose: () => void;
}

const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({ invoice, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>Invoice Details</ModalTitle>
        <ModalContentScrollable>
          <p><strong>Invoice #:</strong> {invoice.invoiceNumber}</p>
          <p><strong>Customer:</strong> {typeof invoice.customer === "string" ? invoice.customer : invoice.customer.name}</p>
          <p><strong>Status:</strong> {invoice.status}</p>
          <p><strong>Total:</strong> {invoice.total.toFixed(2)} kr</p>
          <p><strong>Grand Total:</strong> {invoice.grandTotal.toFixed(2)} kr</p>
          <p><strong>Due Date:</strong> {invoice.dueDate}</p>
          <p><strong>Date:</strong> {invoice.date}</p>
        </ModalContentScrollable>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default InvoiceDetailsModal;
