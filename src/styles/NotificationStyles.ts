// src/styles/NotificationStyles.ts
import styled from "styled-components";

// Wrapper for the notifications page
export const NotificationContainer = styled.div`
  padding: 32px;
  max-width: 900px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.pageBg || "#f9fafb"};
  min-height: 100vh;
`;

// Section title
export const NotificationTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.text || "#111827"};
`;

// List of notifications
export const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Each notification item
export const NotificationItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.cardBg || "#ffffff"};
  border: 1px solid ${({ theme }) => theme.border || "#e5e7eb"};
  padding: 16px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.hover || "#f3f4f6"};
  }
`;

// Notification message text
export const NotificationMessage = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text || "#1f2937"};
  flex: 1;
`;

// Time/date display
export const NotificationTime = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.subtleText || "#6b7280"};
  margin-left: 16px;
`;

// Button to mark notification as read
export const MarkAsReadButton = styled.button`
  background-color: ${({ theme }) => theme.primary || "#6366f1"};
  color: white;
  padding: 6px 12px;
  font-size: 13px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
  margin-left: 12px;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover || "#4f46e5"};
  }
`;

// Bell icon wrapper (used in header or navbar)
export const BellContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

// Small red badge for unread count
export const NotificationBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: ${({ theme }) => theme.danger || "#ef4444"};
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 999px;
  min-width: 20px;
  text-align: center;
  line-height: 1;
`;
