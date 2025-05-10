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

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get("/api/invoices");
        setInvoices(res.data);
      } catch {
        toast.error("Error fetching invoices.");
      }
    };
    fetchInvoices();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        await axios.delete(`/api/invoices/${id}`);
        setInvoices((prev) => prev.filter((inv) => inv._id !== id));
        toast.success("Invoice deleted successfully.");
      } catch {
        toast.error("Error deleting invoice.");
      }
    }
  };

  const filteredInvoices = invoices
    .filter((inv) => {
      const matchSearch = inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const customerName =
        typeof inv.customer === "string" ? inv.customer : inv.customer?.name;
      const isCustomerAllowed =
        user?.role === "customer" ? customerName === user.name : true;
      return matchSearch && isCustomerAllowed;
    })
    .filter((inv) => {
      if (!startDate || !endDate) return true;
      const invoiceDate = new Date(inv.date);
      return invoiceDate >= new Date(startDate) && invoiceDate <= new Date(endDate);
    });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportFilteredToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Filtered Invoices", 14, 20);

    const tableData = filteredInvoices.map((inv) => [
      inv.invoiceNumber,
      typeof inv.customer === "string" ? inv.customer : inv.customer?.name || "N/A",
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
              {user?.role !== "customer" && <TableHeader>Customer</TableHeader>}
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
                <TableRow key={inv._id}>
                  <TableData>{inv.invoiceNumber}</TableData>
                  {user?.role !== "customer" && (
                    <TableData>
                      {typeof inv.customer === "string"
                        ? inv.customer
                        : inv.customer?.name || "N/A"}
                    </TableData>
                  )}
                  <TableData>{inv.quantity}</TableData>
                  <TableData>{inv.total.toFixed(2)} kr</TableData>
                  <TableData>{inv.grandTotal.toFixed(2)} kr</TableData>
                  <TableData>{inv.status}</TableData>
                  <TableData>{inv.dueDate}</TableData>
                  <TableData>{inv.date}</TableData>
                  <TableData>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <Button $variant="ghost" onClick={() => setSelectedInvoice(inv)}>View</Button>
                      {user?.role === "admin" && (
                        <Button $variant="ghost" onClick={() => handleDelete(inv._id!)}>Delete</Button>
                      )}
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
          <label>Rows per page:</label>
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            {[5, 10, 25].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </RowsPerPage>
        <PageButtons>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
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
