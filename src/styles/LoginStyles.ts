// src/styles/LoginStyles.ts
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

// Wrapper for the entire login area
export const LoginWrapper = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

// Title of the login form
export const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
`;

// Login form container
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Styled input fields
export const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }
`;

// Styled submit button
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

// Forgot password link (React Router Link)
export const ForgotPasswordLink = styled(RouterLink)`
  text-align: right;
  font-size: 0.9rem;
  color: #667eea;
  text-decoration: none;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  display: block;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: 2px dashed #667eea;
    outline-offset: 3px;
  }
`;
