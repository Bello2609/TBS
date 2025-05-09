// src/api/fetchCustomers.ts
export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  }
  
  export const fetchCustomers = async (): Promise<Customer[]> => {
   
    return [
      {
        id: 'c1',
        name: 'Ocean Fresh Co.',
        email: 'info@oceanfresh.com',
        phone: '+47 123 456 78',
        address: 'Oslo, Norway'
      },
      {
        id: 'c2',
        name: 'Arctic Seafood',
        email: 'sales@arcticseafood.no',
        phone: '+47 987 654 32',
        address: 'Tromsø, Norway'
      },
      {
        id: 'c3',
        name: 'Nordic Fish Supplies',
        email: 'contact@nordicfish.no',
        phone: '+47 555 666 77',
        address: 'Bergen, Norway'
      }
    ];
  };
  