// src/styles/ForgotPasswordStyles.ts

import styled from "styled-components";

// Wrapper container for the forgot password page
export const ForgotWrapper = styled.div`
  max-width: 420px;
  margin: 6rem auto;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

// Title at the top of the form
export const ForgotTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
`;

// Reusable form container
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

// Styled email input
export const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.85);
  outline: none;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.25);
  }
`;

// Submit button for sending reset email
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

// Link to go back to the login page
export const BackLink = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.8rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #a3bffa;
    text-decoration: underline;
  }

  &:focus {
    outline: 2px dashed #667eea;
    outline-offset: 3px;
  }
`;
