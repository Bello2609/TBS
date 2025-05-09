// src/pages/data/fakeInvoices.ts
import { Invoice } from "../types/Invoice"; // Import the Invoice interface

export const fakeInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    customer: "John Doe",
    quantity: 2,
    total: 100,
    grandTotal: 110,
    status: "Paid",
    dueDate: "2024-05-10",
    date: "2024-04-10",
    bankAccount: "1234567890",
    products: "Product A",
    unit: "pcs",
    unitPrice: 50,
    tax: 10,
    inventoryId: "123",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    customer: "Jane Smith",
    quantity: 1,
    total: 50,
    grandTotal: 55,
    status: "Pending",
    dueDate: "2024-05-15",
    date: "2024-04-15",
    bankAccount: "0987654321",
    products: "Product B",
    unit: "pcs",
    unitPrice: 50,
    tax: 5,
    inventoryId: "456",
  },
];
