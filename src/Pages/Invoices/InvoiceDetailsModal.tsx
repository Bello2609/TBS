import React from "react";
import { Invoice } from "../types/Invoice";

interface InvoiceDetailsModalProps {
  invoice: Invoice;
  onClose: () => void;
}

const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({ invoice, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <h2>Invoice Details</h2>
      <p><strong>Invoice #:</strong> {invoice.invoiceNumber}</p>
      <p><strong>Customer:</strong> {invoice.customer}</p>
      <p><strong>Status:</strong> {invoice.status}</p>
      <p><strong>Total:</strong> {invoice.total.toFixed(2)} kr</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default InvoiceDetailsModal;