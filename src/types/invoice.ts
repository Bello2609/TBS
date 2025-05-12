// src/types/invoice.ts

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  city: string;
  zipCode: string;
  orgNumber: string;
  customerType: string;
}

export interface InventoryItem {
  arrivalDate: string;
  departureDate: string;
  customer: string;
  goods: string;
  type: string;
  quantity: number;
  weight: number;
  sender: {
    name: string;
  };
}

export interface BankInfo {
  accountNumber: string;
  kidNumber: string;
}

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  company: string;
  customer: CustomerInfo;
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
