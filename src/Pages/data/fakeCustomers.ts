// src/pages/data/fakeCustomers.ts

// ✅ Customer interface for full customer profile data
export interface Customer {
  id: number;                 // Unique customer ID
  userId: number;             // Foreign key linking to User table
  companyName: string;        // Company name or customer full name
  companyEmail: string;       // Contact email for invoices or communication
  orgNumber: string;          // Norwegian organization number (Org.nr)
  zipCode: string;            // Post code / ZIP
  city: string;               // City name
  address: string;            // Street address
  contactPerson: string;      // Contact person for communication
  companyPhone: string;       // Contact phone number
  customerType: string;       // Type of customer: Company, Private, etc.
}

// ✅ Sample customer data for development and linking with users
export const fakeCustomers: Customer[] = [
  {
    id: 1,
    userId: 3, // Matches user ID from fakeUsers.ts (customer role)
    companyName: "Fiskecentralen AS",
    companyEmail: "post@fiskecentralen.no",
    orgNumber: "923456789",
    zipCode: "0150",
    city: "Oslo",
    address: "Akershusstranda 23",
    contactPerson: "Henrik Jensen",
    companyPhone: "+47 912 345 67",
    customerType: "Company",
  },
  {
    id: 2,
    userId: 5,
    companyName: "Tromsø Frakt og Logistikk",
    companyEmail: "kontakt@tromsologistikk.no",
    orgNumber: "984321876",
    zipCode: "9008",
    city: "Tromsø",
    address: "Strandvegen 89",
    contactPerson: "Kari Nilsen",
    companyPhone: "+47 988 654 32",
    customerType: "Company",
  },
  {
    id: 3,
    userId: 6,
    companyName: "Privatkunde Ola Nordmann",
    companyEmail: "ola.nordmann@gmail.com",
    orgNumber: "N/A",
    zipCode: "7043",
    city: "Trondheim",
    address: "Kongens gate 12",
    contactPerson: "Ola Nordmann",
    companyPhone: "+47 400 123 45",
    customerType: "Individual",
  },
];
