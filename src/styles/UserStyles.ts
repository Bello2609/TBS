import styled from "styled-components";

/* ==== MAIN CONTAINER ==== */
export const UserContainer = styled.div`
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

/* ==== SEARCH AND FILTER FIELDS ==== */
export const SearchInput = styled.input`
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  flex: 1;
  min-width: 280px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
`;

export const FilterSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
`;

/* ==== TABLE STRUCTURE ==== */
export const UserTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  margin-top: 20px;
`;

export const TableHead = styled.thead``;

export const TableRow = styled.tr`
  border-radius: 12px;
`;

export const TableHeader = styled.th`
  padding: 14px 18px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  padding: 16px 18px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
`;

/* ==== ACTION BUTTON WRAPPER ==== */
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
`;

/* ==== ADD USER BUTTON ==== */
export const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;

  /* ✅ Use theme.primary with fallback to safe blue */
  background-color: ${({ theme }) => theme.primary || "#3b82f6"};
  color: #fff;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark || "#2563eb"};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

/* ==== INDIVIDUAL ACTION BUTTONS ==== */
export const ViewButton = styled.button`
  background-color: #dbeafe;
  color: #1e40af;
  padding: 6px 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #bfdbfe;
  }
`;

export const EditButton = styled.button`
  background-color: #fef9c3;
  color: #92400e;
  padding: 6px 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fde68a;
  }
`;

export const DeleteButton = styled.button`
  background-color: #fee2e2;
  color: #991b1b;
  padding: 6px 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fecaca;
  }
`;

/* ==== PAGINATION SECTION ==== */
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const RowsPerPage = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

export const PageButtons = styled.div`
  display: flex;
  gap: 10px;

  button {
    padding: 8px 14px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background-color: #f3f4f6;
    color: #111827;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      background-color: #e5e7eb;
    }

    &:disabled {
      background-color: #e5e7eb;
      color: #9ca3af;
      cursor: not-allowed;
    }
  }
`;

/* ==== DETAIL ROW FOR MODAL VIEW ==== */
export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #d1d5db;
  padding-bottom: 8px;
  font-size: 15px;
  gap: 8px;

  span {
    color: #374151;
    font-weight: 500;
  }

  strong {
    color: #111827;
    font-weight: 600;
    min-width: 140px;
  }
`;

/* ==== MODAL CONTAINER ==== */
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

/* ==== SCROLLABLE MODAL CONTENT ==== */
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

/* ==== MODAL BACKDROP OVERLAY ==== */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
