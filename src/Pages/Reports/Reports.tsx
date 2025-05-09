import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

// Define the expected data type
interface ReportData {
  month: string;
  revenue: number;
}

const Reports = () => {
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        console.log("Fetching data from API...");
        
        const response = await axios.get("/api/reports", {
          headers: {
            "Accept": "application/json", // Ensure API sends JSON response
          },
        });

        // ✅ Check if the response is actually JSON
        const contentType = response.headers["content-type"];
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format: Expected JSON but received HTML.");
        }

        // ✅ Log API response to debug
        console.log("API Response:", response.data);

        setReportData(response.data);
      } catch (err: any) {
        console.error("API Fetch Error:", err.message || err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div>
      <h1>Financial Reports</h1>

      {/* Show loading state */}
      {loading && <p>Loading data...</p>}

      {/* Show error message if API fails */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Render chart only if data is available */}
      {!loading && !error && reportData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#6a11cb" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        !loading && <p>No data available.</p>
      )}
    </div>
  );
};

export default Reports;
