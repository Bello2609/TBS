// src/pages/data/fakeInventory.ts

export interface InventoryItem {
    id: number;
    customerId: number; // 🔗 ربط مباشر بالزبون من fakeCustomers
    arrivalDate: string;
    departureDate: string;
    goods: string;
    type: string;
    quantity: number;
    weight: number;
  }
  
  // ✅ بيانات تجريبية للإنفنتري
  export const fakeInventory: InventoryItem[] = [
    {
      id: 1,
      customerId: 1, // Fiskecentralen AS
      arrivalDate: "2024-03-01",
      departureDate: "2024-03-15",
      goods: "Fiskekasser",
      type: "Plast",
      quantity: 100,
      weight: 750,
    },
    {
      id: 2,
      customerId: 1,
      arrivalDate: "2024-03-10",
      departureDate: "2024-03-20",
      goods: "Kjølecontainere",
      type: "Stål",
      quantity: 50,
      weight: 1200,
    },
    {
      id: 3,
      customerId: 2, // Tromsø Logistikk AS
      arrivalDate: "2024-04-01",
      departureDate: "2024-04-10",
      goods: "Paller",
      type: "Treverk",
      quantity: 60,
      weight: 900,
    },
    {
      id: 4,
      customerId: 3, // Ola Nordmann
      arrivalDate: "2024-02-25",
      departureDate: "2024-03-05",
      goods: "Privateiendom",
      type: "Diverse",
      quantity: 2,
      weight: 350,
    },
    {
      id: 5,
      customerId: 3,
      arrivalDate: "2024-03-20",
      departureDate: "2024-03-30",
      goods: "Flytteesker",
      type: "Papp",
      quantity: 8,
      weight: 120,
    },
  ];
  