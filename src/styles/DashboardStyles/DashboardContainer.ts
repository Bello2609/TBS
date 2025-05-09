// 📁 src/styles/DashboardStyles/DashboardContainer.ts

import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 32px;
  background-color: #f9fafb;
  min-height: 100vh;

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 24px;
  }

  input[type="date"],
  input[type="text"],
  select {
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    font-size: 15px;
    background-color: #ffffff;
    color: #111827;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
      outline: none;
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg fill='none' stroke='%239ca3af' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'></path></svg>");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 1rem;
  }
`;
