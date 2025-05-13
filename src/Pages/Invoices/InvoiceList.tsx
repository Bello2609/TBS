// src/pages/invoices/InvoiceList.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import axiosInstance from "@/services/axiosInstance";
import { useAuth } from "@/context/authContext";
import {
  InvoiceContainer,
  TopBar,
  PageTitle,
  AddButton,
  FilterButtons,
  FilterButton,
  SearchInput,
  InvoiceTable,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
  StatusBadge,
  ActionButtons,
  IconButton,
  PaginationContainer,
  RowsPerPage,
  PageButtons,
} from "@/styles/invoiceStyles";
import { Eye, Trash2, Download } from "lucide-react";
import { toast } from "react-toastify";
import InvoiceDetailsModal from "./invoiceDetailsModal";

type StatusType = "All" | "Paid" | "Pending" | "Overdue";

interface Invoice {
  _id: string;
  invoiceNumber: string;
  quantity: number;
  grandTotal: number;
  status: "Paid" | "Pending" | "Overdue";
  dueDate?: string;
  date: string;
  customer: {
    companyName?: string;
    name?: string;
    email?: string;
    phone?: string;
  } | string;
}

const InvoiceList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<StatusType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axiosInstance.get("/api/invoices");
        setInvoices(res.data || []);
      } catch {
        toast.error("Failed to fetch invoices.");
      }
    };
    fetchInvoices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;
    try {
      await axiosInstance.delete(`/api/invoices/${id}`);
      setInvoices((prev) => prev.filter((inv) => inv._id !== id));
      toast.success("Invoice deleted.");
    } catch {
      toast.error("Failed to delete invoice.");
    }
  };

  const handleDownloadPDF = (inv: Invoice) => {
    const doc = new jsPDF();
    doc.text("Invoice", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Invoice #", "Customer", "Status", "Total", "Date"]],
      body: [[
        inv.invoiceNumber,
        typeof inv.customer === "string"
          ? inv.customer
          : inv.customer?.companyName || inv.customer?.name || "N/A",
        inv.status,
        `${inv.grandTotal.toFixed(2)} kr`,
        inv.date ? format(new Date(inv.date), "dd/MM/yyyy") : "N/A",
      ]],
    });
    doc.save(`Invoice_${inv.invoiceNumber}.pdf`);
  };

  const filteredInvoices = invoices
    .filter((inv) => {
      const matchStatus = filteredStatus === "All" || inv.status === filteredStatus;
      const matchSearch = inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchUser =
        user?.role === "customer"
          ? typeof inv.customer === "string"
            ? inv.customer === user.id
            : inv.customer?.email === user.email
          : true;
      return matchStatus && matchSearch && matchUser;
    })
    .sort((a, b) => {
      const statusOrder = { Overdue: 1, Pending: 2, Paid: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginated = filteredInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <InvoiceContainer>
      <TopBar>
        <PageTitle>Invoices</PageTitle>
        {user?.role !== "customer" && (
          <AddButton onClick={() => navigate("/invoices/create")}>+ New Invoice</AddButton>
        )}
      </TopBar>

      <FilterButtons>
        {["All", "Paid", "Pending", "Overdue"].map((status) => (
          <FilterButton
            key={status}
            $active={filteredStatus === status}
            onClick={() => setFilteredStatus(status as StatusType)}
          >
            {status}
          </FilterButton>
        ))}
      </FilterButtons>

      <SearchInput
        type="text"
        placeholder="Search invoice number..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <InvoiceTable>
        <thead>
          <TableRow>
            <TableHeader>#</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Qty</TableHeader>
            <TableHeader>Total</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Due</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <TableBody>
          {paginated.length > 0 ? (
            paginated.map((inv) => (
              <TableRow key={inv._id}>
                <TableData>{inv.invoiceNumber}</TableData>
                <TableData>
                  {typeof inv.customer === "string"
                    ? inv.customer
                    : inv.customer?.companyName || inv.customer?.name || "N/A"}
                </TableData>
                <TableData>{inv.quantity}</TableData>
                <TableData>{inv.grandTotal.toFixed(2)} kr</TableData>
                <TableData>
                  <StatusBadge $status={inv.status}>{inv.status}</StatusBadge>
                </TableData>
                <TableData>
                  {inv.dueDate ? format(new Date(inv.dueDate), "dd/MM/yyyy") : "N/A"}
                </TableData>
                <TableData>
                  {inv.date ? format(new Date(inv.date), "dd/MM/yyyy") : "N/A"}
                </TableData>
                <TableData>
                  <ActionButtons>
                    <IconButton onClick={() => setSelectedInvoiceId(inv._id)}>
                      <Eye size={16} />
                    </IconButton>
                    <IconButton onClick={() => handleDownloadPDF(inv)}>
                      <Download size={16} />
                    </IconButton>
                    {user?.role === "admin" && (
                      <IconButton onClick={() => handleDelete(inv._id)}>
                        <Trash2 size={16} />
                      </IconButton>
                    )}
                  </ActionButtons>
                </TableData>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableData colSpan={8} style={{ textAlign: "center", padding: "20px" }}>
                No invoices found.
              </TableData>
            </TableRow>
          )}
        </TableBody>
      </InvoiceTable>

      <PaginationContainer>
        <RowsPerPage>
          <label>Rows per page:</label>
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            {[5, 10, 25].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </RowsPerPage>
        <PageButtons>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={i + 1 === currentPage ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </PageButtons>
      </PaginationContainer>

      {selectedInvoiceId && (
        <InvoiceDetailsModal
          invoiceId={selectedInvoiceId}
          onClose={() => setSelectedInvoiceId(null)}
        />
      )}
    </InvoiceContainer>
  );
};

export default InvoiceList;
