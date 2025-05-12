export interface InventoryItem {
  _id: string;
  customer: string;
  goods: string;
  type: string;
  quantity: number;
  weight: number;
  arrivalDate: string;
  departureDate?: string;
  sender: {
    name: string;
  };
}
