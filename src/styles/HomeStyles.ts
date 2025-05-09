// src/styles/HomeStyles.ts

import styled from "styled-components";

// Container for the entire page layout
export const Container = styled.div`
  font-family: 'Segoe UI', sans-serif;
  background-color: #f4f4f4;
  color: #222;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

// Header section fixed at the top
export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #003366;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

// Company name or logo text
export const CompanyName = styled.h1`
  font-size: 1.8rem;
  color: #ffffff;
  font-weight: bold;
`;

// Navigation container
export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

// Single navigation item
export const NavItem = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.3rem 0.6rem;

  &:hover {
    color: #ffa500;
  }

  &:focus {
    outline: 2px dashed #ffa500;
    outline-offset: 3px;
  }
`;

// Login button
export const Button = styled.button`
  background-color: #ffa500;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cc8400;
  }

  &:focus {
    outline: 2px dashed white;
    outline-offset: 3px;
  }
`;

// Hero section with intro content
export const HeroSection = styled.section`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(to bottom right, #003366, #336699);
  color: #ffffff;
  scroll-margin-top: 100px;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.3rem;
    max-width: 700px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

// Generic section (Om Oss, Kontakt)
export const Section = styled.section`
  padding: 4rem 2rem;
  scroll-margin-top: 120px;

  h2 {
    font-size: 2rem;
    color: #003366;
    margin-bottom: 1rem;
    text-align: center;
  }

  p {
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.7;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

// Footer section
export const Footer = styled.footer`
  background-color: #003366;
  color: #ffffff;
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.9rem;

  p {
    margin: 0.3rem 0;
  }
`;
