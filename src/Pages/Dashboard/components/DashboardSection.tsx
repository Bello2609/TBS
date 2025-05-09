// 📁 src/pages/Dashboard/components/DashboardSection.tsx

import styled from "styled-components";
import React from "react";

// Props for optional title
interface DashboardSectionProps {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const SectionWrapper = styled.section`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px;
  margin-top: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #1f2937; /* Tailwind Gray-800 */
`;

const DashboardSection: React.FC<DashboardSectionProps> = ({ title, children, style }) => {
  return (
    <SectionWrapper style={style}>
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </SectionWrapper>
  );
};

export default DashboardSection;
