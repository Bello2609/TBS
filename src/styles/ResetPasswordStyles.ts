// src/styles/ResetPasswordStyles.ts

import styled from "styled-components";

// Wrapper for the reset password page
export const ResetWrapper = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
`;

// Page title
export const ResetTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.8rem;
  font-size: 1.9rem;
  font-weight: bold;
  color: #333;
`;

// Form container
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

// Styled input field
export const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }
`;

// Submit button
export const SubmitButton = styled.button`
  padding: 0.75rem;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: linear-gradient(to right, #556cd6, #5e3e91);
    transform: translateY(-1px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

// Link to return to login
export const BackLink = styled.button`
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #667eea;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;

  &:hover {
    color: #5a67d8;
  }
`;
