// 📁 src/pages/Dashboard/components/TopCustomersTable.tsx

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
  UserTable
} from "../../../styles/userStyles";
import AnimatedCard from "../../../components/ui/animatedCard";

interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  dateIssued: string;
}

interface Props {
  invoices: Invoice[];
}

const TopCustomersTable: React.FC<Props> = ({ invoices }) => {
  // Group total revenue by customer
  const totals = invoices.reduce((acc, inv) => {
    acc[inv.customer] = (acc[inv.customer] || 0) + inv.amount;
    return acc;
  }, {} as Record<string, number>);

  // Sort customers by highest revenue and get top 5
  const sorted = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <AnimatedCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
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
        Top Customers by Revenue
      </h2>

      {sorted.length > 0 ? (
        <UserTable style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Total Revenue</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map(([customer, total]) => (
              <TableRow key={customer}>
                <TableData>{customer}</TableData>
                <TableData>
                  ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </UserTable>
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
          No customer data available.
        </div>
      )}
    </AnimatedCard>
  );
};

export default TopCustomersTable;
