// 📁 src/pages/Dashboard/components/StatusCounters.tsx

import React from "react";
import styled from "styled-components";

interface StatusCountersProps {
  invoices: {
    status: "Paid" | "Pending" | "Overdue";
  }[];
}

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const Badge = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: ${({ $color }) => `${$color}20`};
  color: ${({ $color }) => $color};
`;

const StatusCounters: React.FC<StatusCountersProps> = ({ invoices }) => {
  const paid = invoices.filter((inv) => inv.status === "Paid").length;
  const pending = invoices.filter((inv) => inv.status === "Pending").length;
  const overdue = invoices.filter((inv) => inv.status === "Overdue").length;

  return (
    <BadgeContainer>
      <Badge $color="#10b981">Paid: {paid}</Badge>
      <Badge $color="#facc15">Pending: {pending}</Badge>
      <Badge $color="#ef4444">Overdue: {overdue}</Badge>
    </BadgeContainer>
  );
};

export default StatusCounters;
