// src/styles/inventoryStyles.ts

import styled from "styled-components";
import DatePicker from "react-datepicker";
import Select from "react-select";

/* ==== MAIN CONTAINER ==== */
export const InventoryContainer = styled.div`
  padding: 24px;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

/* ==== HEADER BAR ==== */
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

/* ==== FILTERS ==== */
export const FilterRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
`;

export const SearchSelect = styled(Select)`
  min-width: 200px;
  max-width: 260px;
  font-size: 14px;

  .react-select__control {
    background-color: ${({ theme }) => theme.inputBackground};
    border-color: ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.text};
  }
`;

export const DateInput = styled(DatePicker)`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  min-width: 160px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

/* ==== ADD BUTTON ==== */
export const AddButton = styled.button`
  padding: 10px 18px;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary || "#3b82f6"};
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark || "#2563eb"};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

/* ==== TABLE ==== */
export const InventoryTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  margin-top: 20px;
`;

export const TableHead = styled.tr``;

export const TableRow = styled.tr`
  border-radius: 12px;
`;

export const TableCell = styled.td`
  padding: 16px 18px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
`;

export const TableHeader = styled.th`
  padding: 14px 18px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

/* ==== ACTION BUTTONS ==== */
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
`;

export const IconButton = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const EditButton = styled(IconButton)`
  background-color: #fef9c3;
  color: #92400e;

  &:hover {
    background-color: #fde68a;
  }
`;

export const DeleteButton = styled(IconButton)`
  background-color: #fee2e2;
  color: #991b1b;

  &:hover {
    background-color: #fecaca;
  }
`;

/* ==== MODAL STYLES ==== */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: ${({ theme }) => theme.cardBackground || "#ffffff"};
  border-radius: 16px;
  max-height: 90vh;
  overflow: hidden;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
`;

export const ModalContentScrollable = styled.div`
  max-height: 85vh;
  overflow-y: auto;
  padding: 24px;
  background-color: ${({ theme }) => theme.cardBackground || "#ffffff"};
  border-radius: 16px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 8px;
  }
`;

export const ModalTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 6px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSoft};
`;

export const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

/* ==== MODAL ACTION BUTTONS ==== */
export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  flex-wrap: wrap;
`;

export const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.primary || "#3b82f6"};
  color: #fff;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover || "#2563eb"};
  }
`;

export const CancelButton = styled.button`
  background-color: ${({ theme }) => theme.danger || "#ef4444"};
  color: #fff;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.dangerHover || "#dc2626"};
  }
`;
export const ViewButton = styled(IconButton)`
  background-color: #dbeafe;
  color: #1e3a8a;

  &:hover {
    background-color: #bfdbfe;
  }
`;
export const ModalSection = styled.section`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

export const ModalField = styled.div`
  margin-bottom: 0.75rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;