import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/services/axiosInstance";

// Dashboard components
import StatCards from "./components/statCards";
import RevenueChart from "./components/revenueChart";
import StatusPieChart from "./components/statusPieChart";
import OverdueInvoicesTable from "./components/overdueInvoicesTable";
import TopCustomersTable from "./components/topCustomersTable";
import AverageInvoiceCard from "./components/averageInvoiceCard";
import StatusCounters from "./components/statusCounters";

// Layout
import { DashboardContainer } from "@/styles/dashboardStyles/dashboardContainer";
import DashboardSection from "@/styles/dashboardStyles/dashboardSection";
import { Button } from "@/components/ui/button";

// Invoice interface
interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  dateIssued: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });

  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<{ month: string; revenue: number }[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter logic
  const filteredInvoices = recentInvoices.filter((inv) => {
    const date = new Date(inv.dateIssued);
    const inStartRange = startDate ? date >= new Date(startDate) : true;
    const inEndRange = endDate ? date <= new Date(endDate) : true;
    const matchesCustomer = customerFilter
      ? inv.customer.toLowerCase().includes(customerFilter.toLowerCase())
      : true;
    const matchesStatus = statusFilter ? inv.status === statusFilter : true;
    return inStartRange && inEndRange && matchesCustomer && matchesStatus;
  });

  // Fetch dashboard data using secure axios instance
  const fetchData = async () => {
    try {
      setIsRefreshing(true);

      const [statsRes, invoicesRes] = await Promise.all([
        axiosInstance.get("/api/dashboard/stats"),
        axiosInstance.get("/api/dashboard/recent-invoices"),
      ]);

      setStats(statsRes.data || {
        totalInvoices: 0,
        totalCustomers: 0,
        totalRevenue: 0,
      });

      const invoices = Array.isArray(invoicesRes.data) ? invoicesRes.data : [];
      setRecentInvoices(invoices);

      const monthly: { [month: string]: number } = {};
      invoices.forEach((inv: Invoice) => {
        const month = new Date(inv.dateIssued).toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        monthly[month] = (monthly[month] || 0) + inv.amount;
      });

      const chartData = Object.entries(monthly).map(([month, revenue]) => ({
        month,
        revenue,
      }));

      setMonthlyRevenue(chartData);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardContainer>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h1>Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {lastUpdated && (
            <span style={{ fontSize: "14px", color: "#6b7280" }}>
              Last updated: {lastUpdated}
            </span>
          )}
          <button
            onClick={fetchData}
            disabled={isRefreshing}
            style={{
              padding: "6px 12px",
              fontSize: "14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              backgroundColor: "#f9fafb",
              color: "#111827",
              cursor: isRefreshing ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                animation: isRefreshing ? "spin 1s linear infinite" : "none",
                fontSize: "16px",
              }}
            >
              🔄
            </span>
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <Button $variant="primary" onClick={() => navigate("/invoices/create")}>
          + New Invoice
        </Button>
        <Button $variant="secondary" onClick={() => navigate("/users/create")}>
          + Add Customer
        </Button>
      </div>

      {/* Filters */}
      <DashboardSection>
        <h2>Filters</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "12px" }}>
          <input type="date" onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" onChange={(e) => setEndDate(e.target.value)} />
          <input
            type="text"
            placeholder="Filter by customer"
            onChange={(e) => setCustomerFilter(e.target.value)}
          />
          <select onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        <StatusCounters invoices={recentInvoices} />
      </DashboardSection>

      {/* Stats Cards */}
      <StatCards
        totalInvoices={stats.totalInvoices}
        totalCustomers={stats.totalCustomers}
        totalRevenue={
          typeof stats.totalRevenue === "number" && !isNaN(stats.totalRevenue)
            ? stats.totalRevenue
            : 0
        }
      />

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "40px" }}>
        <RevenueChart data={monthlyRevenue} />
        <StatusPieChart invoices={recentInvoices} />
      </div>

      {/* Tables */}
      <OverdueInvoicesTable invoices={filteredInvoices} />
      <TopCustomersTable invoices={filteredInvoices} />
      <AverageInvoiceCard invoices={filteredInvoices} />
    </DashboardContainer>
  );
};

export default Dashboard;
