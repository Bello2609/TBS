import styled from "styled-components";

// Wrapper for the contact form section
export const ContactFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

// Styled input field for contact form
export const ContactInput = styled.input`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #003366;
    outline: none;
    background-color: #fff;
  }
`;

// Styled textarea for message
export const ContactTextarea = styled.textarea`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #003366;
    outline: none;
    background-color: #fff;
  }
`;

// Styled submit button
export const SendButton = styled.button`
  padding: 0.8rem 1.2rem;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: #003366;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0055aa;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
