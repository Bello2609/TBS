// src/pages/Invoices/InvoiceList.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import { useAuth } from "@/context/authContext";
import { Invoice } from "../types/invoice";
import InvoiceDetailsModal from "./invoiceDetailsModal";

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

  // Fetch invoices from API
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get('/api/invoices');
        setInvoices(res.data);
      } catch {
        toast.error('Error fetching invoices.');
      }
    };
    fetchInvoices();
  }, []);

  // Delete Invoice
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await axios.delete(`/api/invoices/${id}`);
        setInvoices((prev) => prev.filter((invoice) => invoice._id !== id));
        toast.success('Invoice deleted successfully.');
      } catch {
        toast.error('Error deleting invoice.');
      }
    }
  };

  // Filtering logic
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const isVisibleToCustomer = user?.role === "customer" ? inv.customer === user.name : true;
    return matchesSearch && isVisibleToCustomer;
  }).filter((inv) => {
    if (!startDate || !endDate) return true;
    const invoiceDate = new Date(inv.date);
    return invoiceDate >= new Date(startDate) && invoiceDate <= new Date(endDate);
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export filtered invoices to PDF
  const exportFilteredToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Filtered Invoices", 14, 20);

    const tableData = filteredInvoices.map((inv) => [
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
            {paginatedInvoices.length > 0 ? paginatedInvoices.map((inv) => (
              <TableRow key={inv._id}>
                <TableData>{inv.invoiceNumber}</TableData>
                <TableData>{inv.customer}</TableData>
                <TableData>{inv.quantity}</TableData>
                <TableData>{inv.total.toFixed(2)} kr</TableData>
                <TableData>{inv.grandTotal.toFixed(2)} kr</TableData>
                <TableData>{inv.status}</TableData>
                <TableData>{inv.dueDate}</TableData>
                <TableData>{inv.date}</TableData>
                <TableData>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <Button $variant="ghost" onClick={() => setSelectedInvoice(inv)}>View</Button>
                    <Button $variant="ghost" onClick={() => handleDelete(inv._id!)}>Delete</Button>
                  </div>
                </TableData>
              </TableRow>
            )) : (
              <TableRow>
                <TableData colSpan={9}>No invoices found.</TableData>
              </TableRow>
            )}
          </TableBody>
        </InvoiceTable>
      </div>

      <PaginationContainer>
        <RowsPerPage>
          Rows per page:
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </RowsPerPage>
        <PageButtons>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)}>
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
