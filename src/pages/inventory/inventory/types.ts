// src/pages/inventory/types.ts

/**
 * Represents a single inventory record.
 */
export interface InventoryItem {
  _id?: string;               // MongoDB document ID
  customerId: string;         // Foreign key reference to Customer
  customerName: string;       // Display name of the customer
  senderName: string;         // Name of the sender (string, not senderId)
  goods: string;              // Description of goods
  type: string;               // Type/category of goods
  quantity: number;           // Quantity of items
  weight: number;             // Total weight in kg
  arrivalDate: string;        // ISO format date string
  departureDate?: string;     // Optional ISO format date string
}

/**
 * Represents a customer object.
 */
export interface Customer {
  _id: string;                // Unique identifier
  companyName: string;        // Display name for UI (used in Select)
}

/**
 * Represents a sender object.
 */
export interface Sender {
  _id: string;                // Unique identifier
  name: string;               // Sender's name (used in Select and inventory)
}

/**
 * Used for dropdown/select inputs (e.g., react-select).
 */
export interface OptionType {
  value: string;              // Actual value (e.g., _id or name)
  label: string;              // Display label
}
