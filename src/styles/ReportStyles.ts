import styled from "styled-components";

// Reports Container
export const ReportsContainer = styled.div`
  padding: 20px;
`;

// Report Table
export const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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
  padding: 10px;
  text-align: left;
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

// Filters Container
export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const FilterInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const ApplyFilterButton = styled.button`
  background: #6a11cb;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
`;
// Export Buttons
export const ExportButton = styled.button`
  background: #6a11cb;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;
