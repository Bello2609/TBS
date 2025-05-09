import styled from 'styled-components';

// ✅ Main container for the Inventory page
export const PageContainer = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background || "#f9fafb"};
  min-height: 100vh;
`;

// ✅ Page header (title, filters, add button)
export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.text || "#111827"};
  }
`;

// ✅ Filters row (Customer select, dates, buttons)
export const FiltersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

// ✅ Button to add new inventory
export const AddButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: ${({ theme }) => theme.primary || "#6366f1"};
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover || "#4f46e5"};
  }
`;

// ✅ Inventory table
export const InventoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.card || "#fff"};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  thead {
    background-color: ${({ theme }) => theme.cardHeader || "#f3f4f6"};
    color: ${({ theme }) => theme.text || "#374151"};
  }

  th, td {
    padding: 1rem;
    text-align: left;
    font-size: 0.95rem;
    border-bottom: 1px solid ${({ theme }) => theme.border || "#e5e7eb"};
    vertical-align: middle;
    white-space: nowrap;
  }

  th {
    font-weight: 600;
    text-transform: capitalize;
  }
`;

// ✅ Table row with hover effect
export const TableRow = styled.tr`
  &:hover {
    background-color: ${({ theme }) => theme.hover || "#f9fafb"};
  }
`;

// ✅ Table cell
export const TableCell = styled.td`
  color: ${({ theme }) => theme.text || "#374151"};
`;

// ✅ Action buttons container (aligned under Actions column)
export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

// ✅ Icon-only button (view, edit, delete)
export const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.text};
  }

  &:hover {
    background-color: ${({ theme }) => theme.hover || "#f3f4f6"};
  }
`;

// ✅ Modal overlay background
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// ✅ Modal container
export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.card || "#fff"};
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

// ✅ Modal title
export const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text || "#111827"};
`;

// ✅ Modal form
export const ModalForm = styled.form`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-right: 0.25rem;
`;

// ✅ Form row container
export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
`;

// ✅ Label for inputs
export const Label = styled.label`
  margin-bottom: 0.4rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSoft || "#6b7280"};
`;

// ✅ Input field
export const Input = styled.input`
  padding: 0.6rem 1rem;
  border: 1px solid ${({ theme }) => theme.border || "#d1d5db"};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground || "#fff"};
  color: ${({ theme }) => theme.text || "#111827"};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary || "#6366f1"};
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

// ✅ Modal actions (buttons) at bottom
export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1rem;
  background-color: ${({ theme }) => theme.card || "#fff"};
`;

// ✅ Save button inside modal
export const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.primary || "#10b981"};
  color: #fff;
  padding: 0.6rem 1.3rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover || "#059669"};
  }
`;

// ✅ Cancel button inside modal
export const CancelButton = styled.button`
  background-color: ${({ theme }) => theme.danger || "#ef4444"};
  color: #fff;
  padding: 0.6rem 1.3rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.dangerHover || "#dc2626"};
  }
`;

// ✅ Pagination wrapper (bottom of the table)
export const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

// ✅ Pagination button (Previous/Next)
export const PaginationButton = styled.button`
  padding: 6px 14px;
  background-color: ${({ theme }) => theme.inputBackground || "#fff"};
  color: ${({ theme }) => theme.text || "#111827"};
  border: 1px solid ${({ theme }) => theme.border || "#d1d5db"};
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.hover || "#f3f4f6"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
