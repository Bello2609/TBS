// src/styles/SecurityStyles.ts

import styled from "styled-components";

// Container for the entire Security Settings page
export const SecurityContainer = styled.div`
  padding: 32px;
  background-color: ${({ theme }) => theme.pageBg || "#f9f9f9"};
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  max-width: 800px;
  margin: 0 auto;
`;

// Main form wrapper
export const SecurityForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

// Section block (for 2FA, Lock Threshold, etc.)
export const Section = styled.div`
  background-color: ${({ theme }) => theme.cardBg || "#ffffff"};
  border: 1px solid ${({ theme }) => theme.border || "#e5e7eb"};
  padding: 24px;
  border-radius: 10px;
`;

// Section title
export const SectionTitle = styled.h3`
  margin-bottom: 16px;
  font-size: 18px;
  color: ${({ theme }) => theme.text || "#111827"};
`;

// Label for fields
export const Label = styled.label`
  font-size: 15px;
  color: ${({ theme }) => theme.text || "#374151"};
  margin-bottom: 8px;
  display: block;
`;

// Input field
export const Input = styled.input`
  padding: 10px 14px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border || "#d1d5db"};
  background-color: ${({ theme }) => theme.inputBg || "#ffffff"};
  width: 100%;
  margin-top: 6px;

  &:focus {
    border-color: ${({ theme }) => theme.primary || "#6366f1"};
    outline: none;
  }
`;

// Toggle switch container
export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Native toggle switch styled
export const ToggleSwitch = styled.input`
  width: 46px;
  height: 24px;
  appearance: none;
  background: #ccc;
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  outline: none;
  transition: background 0.3s;

  &:checked {
    background: ${({ theme }) => theme.primary || "#6366f1"};
  }

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    transition: transform 0.3s;
  }

  &:checked::before {
    transform: translateX(22px);
  }
`;

// Group for buttons
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// Main submit button
export const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.primary || "#6366f1"};
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover || "#4f46e5"};
  }
`;

// Message box for feedback (success or error)
export const MessageBox = styled.div<{ success?: boolean; error?: boolean }>`
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 14px;
  background-color: ${({ success, error }) =>
    success ? "#dcfce7" : error ? "#fee2e2" : "#f3f4f6"};
  color: ${({ success, error }) =>
    success ? "#166534" : error ? "#b91c1c" : "#374151"};
  border: 1px solid
    ${({ success, error }) =>
      success ? "#bbf7d0" : error ? "#fecaca" : "#d1d5db"};
  margin-top: -20px;
`;

/* -----------------------------------------------------
   🔒 Additional Styles for Login Sessions section
----------------------------------------------------- */

export const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
`;

export const SessionListTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text || "#1f2937"};
  margin-bottom: 8px;
`;

export const SessionCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.cardBg || "#ffffff"};
  border: 1px solid ${({ theme }) => theme.border || "#e5e7eb"};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
`;

export const SessionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DeviceInfo = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.text || "#111827"};
`;

export const IP = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.subtleText || "#6b7280"};
`;

export const Location = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.subtleText || "#6b7280"};
`;

export const Timestamp = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.subtleText || "#9ca3af"};
`;

export const LogoutButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.danger || "#ef4444"};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  align-self: center;
  transition: background 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.dangerHover || "#dc2626"};
  }
`;

export const ActiveBadge = styled.span`
  background-color: ${({ theme }) => theme.successBg || "#d1fae5"};
  color: ${({ theme }) => theme.successText || "#065f46"};
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
  margin-top: 6px;
  width: fit-content;
`;

export const LogsContainer = styled.div`
  margin-top: 32px;
`;

export const LogTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text || "#1f2937"};
`;

export const LogTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.cardBg || "#ffffff"};
  border: 1px solid ${({ theme }) => theme.border || "#e5e7eb"};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.headerBg || "#f9fafb"};
  color: ${({ theme }) => theme.text || "#374151"};
  font-size: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.border || "#e5e7eb"};
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.altRow || "#f9fafb"};
  }
`;

export const TableCell = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.text || "#4b5563"};
  border-bottom: 1px solid ${({ theme }) => theme.border || "#e5e7eb"};
`;

export const LogEmpty = styled.div`
  font-size: 14px;
  padding: 16px;
  text-align: center;
  color: ${({ theme }) => theme.subtleText || "#6b7280"};
  background-color: ${({ theme }) => theme.cardBg || "#ffffff"};
  border: 1px dashed ${({ theme }) => theme.border || "#e5e7eb"};
  border-radius: 10px;
  margin-top: 12px;
`;