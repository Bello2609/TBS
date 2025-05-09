// src/pages/Invoices/InvoiceList.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import {
  InvoiceContainer,
  InvoiceTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
  ActionButtons,
  PaginationContainer,
  RowsPerPage,
  PageButtons,
} from "@/styles/invoiceStyles";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { fakeInvoices } from "../data/fakeInvoices";
import { Invoice } from "../types/Invoice"; // Import the Invoice interface
import InvoiceDetailsModal from "./invoiceDetailsModal"; // Add this line

// Extend jsPDF to include lastAutoTable
interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: { finalY: number };
}

const InvoiceList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    setInvoices(fakeInvoices);
  }, []);

  // Filter invoices by search and user role
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const isVisibleToCustomer = user?.role === "customer" ? inv.customer === user.name : true;
    return matchesSearch && isVisibleToCustomer;
  });

  // Further filter invoices by date range
  const filteredByDate = filteredInvoices.filter((inv) => {
    if (!startDate || !endDate) return true;
    const invoiceDate = new Date(inv.date);
    return invoiceDate >= new Date(startDate) && invoiceDate <= new Date(endDate);
  });

  // Export filtered invoices to PDF
  const exportFilteredToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Filtered Invoices", 14, 20);

    const tableData = filteredByDate.map((inv) => [
      inv.invoiceNumber,
      inv.customer,
      format(new Date(inv.date), "yyyy-MM-dd"),
      `${inv.total.toFixed(2)} kr`,
      `${inv.grandTotal.toFixed(2)} kr`,
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["Invoice #", "Customer", "Date", "Total", "Grand Total"]],
      body: tableData,
    });

    doc.save("filtered_invoices.pdf");
    toast.success("PDF generated!");
  };

  // Export a single invoice to PDF
  const exportSingleInvoiceToPDF = (invoice: Invoice) => {
    const doc = new jsPDF() as jsPDFWithAutoTable;
    doc.setFontSize(16);
    doc.text(`Invoice: ${invoice.invoiceNumber}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Customer: ${invoice.customer}`, 14, 30);
    doc.text(`Date: ${invoice.date}`, 14, 37);
    doc.text(`Due Date: ${invoice.dueDate}`, 14, 44);
    doc.text(`Status: ${invoice.status}`, 14, 51);
    doc.text(`Bank Account: ${invoice.bankAccount}`, 14, 58);

    autoTable(doc, {
      startY: 70,
      head: [["Product", "Qty", "Unit", "Unit Price", "Total"]],
      body: [[
        invoice.products,
        invoice.quantity,
        invoice.unit,
        `${invoice.unitPrice.toFixed(2)} kr`,
        `${invoice.total.toFixed(2)} kr`
      ]],
    });

    const { finalY } = doc.lastAutoTable || { finalY: 70 }; // Fallback to 70 if undefined
    const y = finalY + 10;
    doc.text(`Grand Total: ${invoice.grandTotal.toFixed(2)} kr`, 150, y);
    doc.save(`invoice_${invoice.invoiceNumber}.pdf`);
  };

  // Print a simple invoice layout
  const printInvoice = (invoice: Invoice) => {
    const win = window.open("", "_blank");
    if (!win) return;

    win.document.write(`
      <html>
        <head><title>Invoice ${invoice.invoiceNumber}</title></head>
        <body style="font-family: Arial; padding: 24px;">
          <h2>Invoice ${invoice.invoiceNumber}</h2>
          <p><strong>Customer:</strong> ${invoice.customer}</p>
          <p><strong>Status:</strong> ${invoice.status}</p>
          <p><strong>Bank Account:</strong> ${invoice.bankAccount}</p>
          <table border="1" cellpadding="8" cellspacing="0" width="100%">
            <tr><th>Product</th><th>Qty</th><th>Unit</th><th>Unit Price</th><th>Total</th></tr>
            <tr>
              <td>${invoice.products}</td>
              <td>${invoice.quantity}</td>
              <td>${invoice.unit}</td>
              <td>${invoice.unitPrice.toFixed(2)} kr</td>
              <td>${invoice.total.toFixed(2)} kr</td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: right;"><strong>Grand Total</strong></td>
              <td><strong>${invoice.grandTotal.toFixed(2)} kr</strong></td>
            </tr>
          </table>
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
  };

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <InvoiceContainer>
      <h1>Invoices</h1>

      {user?.role !== "customer" && (
        <div style={{ marginBottom: "20px" }}>
          <Button $variant="primary" onClick={() => navigate("/invoices/create")}>
            + New Invoice
          </Button>
        </div>
      )}

      <input
        type="text"
        placeholder="Search invoices..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ActionButtons>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <Button $variant="ghost" onClick={exportFilteredToPDF}>Export by Date</Button>
      </ActionButtons>

      <div style={{ overflowX: "auto" }}>
        <InvoiceTable>
          <TableHead>
            <TableRow>
              <TableHeader>#</TableHeader>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Qty</TableHeader>
              <TableHeader>Total</TableHeader>
              <TableHeader>Grand Total</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Due</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInvoices.length > 0 ? (
              paginatedInvoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableData>{inv.invoiceNumber}</TableData>
                  <TableData>{inv.customer}</TableData>
                  <TableData>{inv.quantity}</TableData>
                  <TableData>{inv.total.toFixed(2)} kr</TableData>
                  <TableData>{inv.grandTotal.toFixed(2)} kr</TableData>
                  <TableData>{inv.status}</TableData>
                  <TableData>{inv.dueDate}</TableData>
                  <TableData>{inv.date}</TableData>
                  <TableData>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <Button $variant="ghost" onClick={() => setSelectedInvoice(inv)}>View</Button>
                      <Button $variant="ghost" onClick={() => exportSingleInvoiceToPDF(inv)}>⬇ PDF</Button>
                      <Button $variant="ghost" onClick={() => printInvoice(inv)}>🖨 Print</Button>
                    </div>
                  </TableData>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableData colSpan={9} style={{ textAlign: "center", padding: "20px" }}>
                  No invoices found.
                </TableData>
              </TableRow>
            )}
          </TableBody>
        </InvoiceTable>
      </div>

      <PaginationContainer>
        <RowsPerPage>
          <label htmlFor="rows">Rows per page:</label>
          <select id="rows" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </RowsPerPage>
        <PageButtons>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}>
              {i + 1}
            </button>
          ))}
        </PageButtons>
      </PaginationContainer>

      {selectedInvoice && (
        <InvoiceDetailsModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </InvoiceContainer>
  );
};

export default InvoiceList;
