// 📁 src/styles/DashboardStyles/DashboardSection.tsx

import styled from "styled-components";

const DashboardSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-top: 40px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #111827;
  }

  p {
    font-size: 16px;
    color: #4b5563;
  }
`;

export default DashboardSection;
