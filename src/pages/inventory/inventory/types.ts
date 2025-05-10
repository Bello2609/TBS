// src/pages/inventory/types.ts

export interface InventoryItem {
  _id?: string;
  customerId: string;
  customerName: string;
  goods: string;
  type: string;
  weight: string;
  arrivalDate: string;
  departureDate: string;
  senderName: string;
}

export interface Customer {
  _id: string;
  companyName: string;
}

export interface Sender {
  _id: string;
  name: string;
}

export interface OptionType {
  value: string;
  label: string;
}
