import styled from "styled-components";

// Main container for the Dashboard
export const DashboardContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f7fa, #ffffff);
  font-family: 'Inter', sans-serif;
`;

// Dashboard title
export const DashboardTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1f2937;
`;

// Grid layout for statistics
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

// Individual stat card
export const StatCard = styled.div`
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 2rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }

  h3 {
    font-size: 1rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 2rem;
    font-weight: 600;
    color: #111827;
  }
`;

// Section for recent invoices or tables
export const RecentInvoices = styled.div`
  margin-top: 3rem;
`;

// Styled table wrapper
export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.75rem;
`;

export const TableHead = styled.thead`
  background-color: #f1f5f9;
`;

export const TableBody = styled.tbody`
  background-color: #ffffff;
`;

export const TableRow = styled.tr`
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const TableHeader = styled.th`
  padding: 1rem 1.25rem;
  text-align: left;
  font-size: 0.85rem;
  color: #4b5563;
  font-weight: 600;
`;

export const TableData = styled.td`
  padding: 1rem 1.25rem;
  font-size: 0.95rem;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
`;

// General section block with separation
export const Section = styled.div`
  margin-top: 4rem;
`;
