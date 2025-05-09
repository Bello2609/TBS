import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Sidebar container (desktop)
export const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 24px 16px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Sidebar for mobile view
export const MobileSidebar = styled.div<{ $isOpen?: boolean }>`
  width: 240px;
  height: 100vh;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  padding: 24px 16px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1100;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 769px) {
    display: none;
  }
`;

// Hamburger button (for mobile)
export const HamburgerButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1200;
  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

// Background overlay for mobile
export const MobileOverlay = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
  }
`;

// Logo wrapper (fish + text)
export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  position: relative;

  .fish {
    font-size: 26px;
    animation: swim 2.4s infinite ease-in-out;
    margin-bottom: 4px;
  }

  .text {
    font-size: 22px;
    font-weight: 900;
    text-transform: uppercase;
    background: linear-gradient(90deg, #00bcd4, #6a11cb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .bubble {
    position: absolute;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: bubbleUp 4s infinite ease-in;
  }

  .bubble:nth-child(2) {
    left: 12%;
    width: 6px;
    height: 6px;
    animation-delay: 0.8s;
  }

  .bubble:nth-child(3) {
    left: 50%;
    width: 9px;
    height: 9px;
    animation-delay: 1.6s;
  }

  .bubble:nth-child(4) {
    left: 78%;
    width: 5px;
    height: 5px;
    animation-delay: 2.2s;
  }

  @keyframes swim {
    0%, 100% {
      transform: translateX(0px) rotate(0deg);
    }
    50% {
      transform: translateX(6px) rotate(5deg);
    }
  }

  @keyframes bubbleUp {
    0% {
      bottom: 0;
      opacity: 0;
      transform: translateY(0) scale(1);
    }
    50% {
      opacity: 0.5;
    }
    100% {
      bottom: 100%;
      opacity: 0;
      transform: translateY(-12px) scale(1.2);
    }
  }
`;

// Navigation container
export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Individual nav item
export const NavItem = styled.div`
  &.active a {
    background-color: #ede9fe;
    color: #6a11cb;
    font-weight: 600;
  }
`;

// Custom NavLink
export const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #374151;
  padding: 10px 12px;
  border-radius: 8px;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    color: #6a11cb;
  }
`;

// Icon wrapper beside nav text
export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// User info section at the bottom
export const UserInfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 12px;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
  margin-top: auto;
`;

// Avatar with user initial
export const AvatarCircle = styled.div`
  width: 38px;
  height: 38px;
  background-color: #6a11cb;
  color: white;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Username and role
export const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const UserRole = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
`;
