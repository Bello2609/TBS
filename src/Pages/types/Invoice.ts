// src/types/invoice.ts

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  company: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postCode: string;
    orgNumber: string;
    customerType: string;
  };
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
  inventoryItems: {
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
  }[];
  bankInfo: {
    accountNumber: string;
    kidNumber: string;
  };
}
