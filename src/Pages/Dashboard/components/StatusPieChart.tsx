// 📁 src/pages/Dashboard/components/StatusPieChart.tsx

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
  } from "recharts";
  import AnimatedCard from "../../../components/ui/animatedCard";
  
  interface Invoice {
    id: number;
    invoiceNumber: string;
    customer: string;
    amount: number;
    status: "Paid" | "Pending" | "Overdue";
    dateIssued: string;
  }
  
  const STATUS_COLORS: { [key in Invoice["status"]]: string } = {
    Paid: "#10b981",    // Green
    Pending: "#facc15", // Yellow
    Overdue: "#ef4444"  // Red
  };
  
  interface StatusPieChartProps {
    invoices: Invoice[];
  }
  
  const StatusPieChart: React.FC<StatusPieChartProps> = ({ invoices }) => {
    const data = ["Paid", "Pending", "Overdue"].map((status) => ({
      name: status,
      value: invoices.filter((inv) => inv.status === status).length,
    }));
  
    const hasData = data.some((d) => d.value > 0);
  
    return (
      <AnimatedCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          marginTop: "40px",
          padding: "24px"
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1f2937"
          }}
        >
          Invoice Status Distribution
        </h2>
  
        {hasData ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "14px",
              paddingTop: "40px",
              paddingBottom: "40px"
            }}
          >
            No data to display chart.
          </div>
        )}
      </AnimatedCard>
    );
  };
  
  export default StatusPieChart;
  