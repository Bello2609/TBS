// src/types/Invoice.ts

// 👤 Customer attached to invoice
export interface Customer {
  _id?: string;
  name: string;
  email: string;
  address: string;
  postCode: string;
  city: string;
  phone: string;
  companyName?: string; // optional for when customer is selected from dropdown
}

// 📦 Inventory record linked to invoice
export interface InventoryItem {
  _id?: string;
  arrivalDate: string;
  departureDate: string;
  customer: string;
  goods: string;
  type: string;
  quantity: number;
  weight: number;
  sender: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
}

// 🏦 Bank info
export interface BankInfo {
  accountNumber: string;
  kidNumber: string;
}

// 📑 Main invoice type
export interface Invoice {
  _id?: string;         // MongoDB-style ID
  invoiceNumber: string;
  company: string;
  customer: Customer | string; // string for simpler lists, object for details
  products: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  tax: number;
  grandTotal: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
  dueDate?: string;
  inventoryItems: InventoryItem[];
  bankInfo: BankInfo;
}
