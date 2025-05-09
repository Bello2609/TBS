// filepath: c:/Users/Ahmed/Documents/GitHub/BachelorTBS/src/types/Invoice.ts
export interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  quantity: number;
  total: number;
  grandTotal: number;
  status: "Paid" | "Pending" | "Overdue";
  dueDate: string;
  date: string;
  bankAccount: string;
  products: string;
  unit: string;
  unitPrice: number;
  tax: number;
  inventoryId: string;
}