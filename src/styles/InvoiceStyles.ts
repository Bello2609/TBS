// src/styles/invoiceStyles.ts
import styled, { keyframes } from "styled-components";

/* ========== ANIMATIONS ========== */
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ========== BUTTONS ========== */
export const Button = styled.button<{ $variant?: "primary" | "ghost" }>`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  background-color: ${({ $variant, theme }) =>
    $variant === "ghost" ? "transparent" : theme.primary || "#3b82f6"};
  color: ${({ $variant }) => ($variant === "ghost" ? "#333" : "#fff")};

  &:hover {
    background-color: ${({ $variant, theme }) =>
      $variant === "ghost" ? "#e5e7eb" : theme.primaryHover || "#2563eb"};
  }
`;

export const AddButton = styled(Button)`
  background-color: ${({ theme }) => theme.success || "#10b981"};
  color: #fff;

  &:hover {
    background-color: ${({ theme }) => theme.successHover || "#059669"};
  }
`;

/* ========== PAGE STRUCTURE ========== */
export const InvoiceContainer = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.cardBackground || "#ffffff"};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.3s ease-in-out;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 12px;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.textStrong || "#111"};
`;

/* ========== MODAL ========== */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 24px;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.3s ease;

  @media (max-width: 600px) {
    width: 95%;
    padding: 16px;
  }
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.cardBackground || "#fff"};
  color: ${({ theme }) => theme.text || "#111"};
  padding: 32px;
  border-radius: 20px;
  max-height: 85vh;
  overflow-y: auto;
  width: 100%;
  animation: ${slideIn} 0.3s ease;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const ModalContentScrollable = styled(ModalContent)`
  max-height: 90vh;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 4px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: ${({ theme }) => theme.text || "#000"};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary || "#4f46e5"};
  }
`;

/* ========== TABLES ========== */
export const InvoiceTable = styled.table`
  width: 100%;
  margin-top: 24px;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e2e6ea;

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.tableAlt || "#f9fafb"};
  }

  &:hover {
    background-color: ${({ theme }) => theme.hover || "#f1f5f9"};
  }

  transition: background-color 0.2s ease;
`;

export const TableHeader = styled.th`
  padding: 14px 18px;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  padding: 14px 18px;
  font-size: 14px;
  border-bottom: 1px solid #e5e7eb;
  color: ${({ theme }) => theme.text || "#111"};
`;

/* ========== FORM ELEMENTS ========== */
export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  background-color: ${({ theme }) => theme.inputBg || "#f9fafb"};
  color: ${({ theme }) => theme.inputText || "#111827"};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary || "#3b82f6"};
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  background-color: ${({ theme }) => theme.inputBg || "#f9fafb"};
  color: ${({ theme }) => theme.inputText || "#111827"};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary || "#3b82f6"};
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  resize: vertical;
  background-color: ${({ theme }) => theme.inputBg || "#f9fafb"};
  color: ${({ theme }) => theme.inputText || "#111827"};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary || "#3b82f6"};
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

/* ========== UTILITIES ========== */
export const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 20px 0;
  align-items: center;
`;

export const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border || "#ccc"};
  background: ${({ $active, theme }) => ($active ? theme.primary : "#f1f1f1")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  cursor: pointer;

  &:hover {
    background: ${({ $active, theme }) => ($active ? theme.primary : "#e5e7eb")};
  }
`;

export const SearchInput = styled(Input)`
  max-width: 300px;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text || "#111"};
  font-size: 16px;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const StatusBadge = styled.span<{ $status: string }>`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background-color: ${({ $status }) =>
    $status === "Paid"
      ? "#d1fae5"
      : $status === "Overdue"
      ? "#fee2e2"
      : "#fef9c3"};
  color: ${({ $status }) =>
    $status === "Paid"
      ? "#065f46"
      : $status === "Overdue"
      ? "#991b1b"
      : "#92400e"};
`;

/* ========== PAGINATION ========== */
export const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

export const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  select {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
`;

export const PageButtons = styled.div`
  display: flex;
  gap: 8px;

  button {
    padding: 6px 12px;
    border-radius: 6px;
    border: none;
    background: #f1f1f1;
    cursor: pointer;

    &.active {
      background-color: #007bff;
      color: #fff;
    }

    &:hover {
      background-color: #e2e6ea;
    }
  }
`;

/* ========== INVOICE DETAILS ========== */
export const InvoiceInfo = styled.div`
  background-color: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 0;

  span {
    color: ${({ theme }) => theme.text || "#374151"};
    font-weight: 500;
  }

  strong {
    color: ${({ theme }) => theme.textStrong || "#111827"};
    font-weight: 600;
    min-width: 120px;
  }
`;

export const FormSection = styled.div`
  margin-bottom: 24px;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;
