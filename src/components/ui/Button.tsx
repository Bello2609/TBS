import styled, { css } from "styled-components";

// Using transient props ($variant, $fullWidth)
interface ButtonProps {
  $variant?: "primary" | "secondary" | "danger" | "ghost";
  $fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}

  ${(props) =>
    props.$variant === "primary" &&
    css`
      background-color: #3b82f6;
      color: white;

      &:hover {
        background-color: #2563eb;
        transform: translateY(-1px);
      }
    `}

  ${(props) =>
    props.$variant === "secondary" &&
    css`
      background-color: #e0e7ff;
      color: #1e3a8a;

      &:hover {
        background-color: #c7d2fe;
      }
    `}

  ${(props) =>
    props.$variant === "danger" &&
    css`
      background-color: #ef4444;
      color: white;

      &:hover {
        background-color: #dc2626;
      }
    `}

  ${(props) =>
    props.$variant === "ghost" &&
    css`
      background-color: transparent;
      color: #374151;
      border: 1px solid #d1d5db;

      &:hover {
        background-color: #f9fafb;
      }
    `}
`;
