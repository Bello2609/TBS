// 📁 src/pages/Dashboard/components/RevenueChart.tsx

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
  } from "recharts";
  import AnimatedCard from "../../../components/ui/AnimatedCard";
  
  interface RevenueChartProps {
    data: { month: string; revenue: number }[];
  }
  
  const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
    return (
      <AnimatedCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
          Monthly Revenue
        </h2>
  
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
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
  
  export default RevenueChart;
  