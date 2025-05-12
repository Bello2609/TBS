// src/pages/inventory/types.ts

/**
 * Represents a single inventory record.
 */
export interface InventoryItem {
  _id?: string;                // MongoDB document ID
  customerId: string;          // Foreign key reference to Customer
  customerName: string;        // Display name of the customer (used in table)
  senderId: string;            // Foreign key reference to Sender
  senderName: string;          // Name of the sender (used in table)
  goods: string;               // Description of the goods
  type: string;                // Category/type of the goods
  quantity: number;            // Number of units/items
  weight: number;              // Total weight in kilograms
  arrivalDate: string;         // Arrival date in ISO format
  departureDate?: string;      // Optional departure date in ISO format
}

/**
 * Represents a customer object.
 */
export interface Customer {
  _id: string;                 // Unique customer ID
  companyName: string;         // Company name (used in select dropdowns)
}

/**
 * Represents a sender object.
 */
export interface Sender {
  _id: string;                 // Unique sender ID
  name: string;                // Sender name (used in select dropdowns)
}

/**
 * Reusable option format for select inputs (e.g., react-select).
 */
export interface OptionType {
  value: string;               // Internal value (e.g., ID)
  label: string;               // Label displayed in the UI
}
