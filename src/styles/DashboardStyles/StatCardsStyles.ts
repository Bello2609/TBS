// 📁 src/styles/DashboardStyles/StatCardsStyles.ts

import styled from "styled-components";

// Cards container in grid
export const StatCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

// Outer card style
export const StyledCard = styled.div<{ $color: string }>`
  width: 100%; /* ✅ Fill the parent width */
  height: 100%; /* ✅ Fill the parent height */
  border: 2px solid ${({ $color }) => $color};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  min-height: 120px; /* Ensure consistent height */

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;


// ✅ Inner wrapper for icon + text (new)
export const CardInnerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

// Circular icon holder
export const IconWrapper = styled.div<{ $color: string }>`
  background-color: ${({ $color }) => `${$color}20`}; /* light background tint */
  color: ${({ $color }) => $color};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;

// Content holder for title & value
export const StatDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;

  h4 {
    margin: 0;
    font-size: 15px;
    font-weight: 500;
    color: inherit;
  }

  p {
    margin: 4px 0 0;
    font-size: 18px;
    font-weight: bold;
    color: inherit;
  }

  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
  }
`;
