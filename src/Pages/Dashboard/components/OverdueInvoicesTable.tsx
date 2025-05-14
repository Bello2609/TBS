// 📁 src/pages/Dashboard/components/OverdueInvoicesTable.tsx

import {
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableData,
    UserTable
  } from "../../../styles/UserStyles";
  import AnimatedCard from "../../../components/ui/AnimatedCard";
  
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
  
  const OverdueInvoicesTable: React.FC<Props> = ({ invoices }) => {
    const overdue = invoices.filter((inv) => inv.status === "Overdue");
  
    return (
      <AnimatedCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
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
          Overdue Invoices
        </h2>
  
        {overdue.length > 0 ? (
          <UserTable style={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableHeader>Invoice #</TableHeader>
                <TableHeader>Customer</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Date</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {overdue.map((inv) => (
                <TableRow key={inv.id}>
                  <TableData>{inv.invoiceNumber}</TableData>
                  <TableData>{inv.customer}</TableData>
                  <TableData>${inv.amount.toFixed(2)}</TableData>
                  <TableData>
                    {new Date(inv.dateIssued).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
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
            No overdue invoices at the moment.
          </div>
        )}
      </AnimatedCard>
    );
  };
  
  export default OverdueInvoicesTable;
  