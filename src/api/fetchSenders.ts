// src/api/fetchSenders.ts
export interface Sender {
    id: string;
    name: string;
  }
  
  export const fetchSenders = async (): Promise<Sender[]> => {
    // Mock data for now
    return [
      { id: '1', name: 'Sender A' },
      { id: '2', name: 'Sender B' },
      { id: '3', name: 'Sender C' },
    ];
  };
  