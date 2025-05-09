import styled from "styled-components";

// Main container for customer pages
export const CustomerContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

// Top bar with title and action button
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// Add new customer button
export const AddButton = styled.button`
  background-color: #6a11cb;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #5311a8;
  }
`;

// Search input
export const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px 14px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

// Customer Table
export const CustomerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHead = styled.thead`
  background: #6a11cb;
  color: white;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f9f9f9;
  }
`;

export const TableHeader = styled.th`
  padding: 12px 16px;
  text-align: left;
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
`;

// Action buttons wrapper
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

// Individual buttons
export const ViewButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

export const EditButton = styled.button`
  background: #10b981;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #059669;
  }
`;

export const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;

// Info text under the table
export const InfoText = styled.p`
  margin-top: 10px;
  color: #6b7280;
  font-size: 14px;
`;

// Form Container
export const CustomerFormContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
`;

export const SubmitButton = styled.button`
  background: #6a11cb;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #5311a8;
  }
`;
