// src/components/Sidebar.tsx

import React, { useState } from "react";
import {
  SidebarContainer,
  MobileSidebar,
  HamburgerButton,
  MobileOverlay,
  Nav,
  NavItem,
  NavLinkStyled,
  IconWrapper,
  UserInfoSection,
  UserName,
  UserRole,
  AvatarCircle,
  UserMeta,
} from "../styles/SidebarStyles";

import {
  Home,
  File,
  FileText,
  Users,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AnimatedLogo: React.FC = () => (
  <motion.div
    animate={{ x: [0, 6, -6, 0] }}
    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 32px auto",
      fontWeight: 900,
      fontSize: 22,
      textTransform: "uppercase",
      background: "linear-gradient(90deg, #00bcd4, #6a11cb)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      gap: 10,
    }}
  >
    <span role="img" aria-label="fish" style={{ fontSize: 22 }}>
      🐟
    </span>
    TBS
  </motion.div>
);

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const navLinks = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <Home size={20} />,
      roles: ["admin", "employee", "customer"],
    },
    {
      to: "/invoices",
      label: "Invoices",
      icon: <File size={20} />,
      roles: ["admin", "employee", "customer"],
    },
    {
      to: "/inventory",
      label: "Inventory",
      icon: <FileText size={20} />,
      roles: ["admin", "employee"],
    },
    {
      to: "/users",
      label: "Users",
      icon: <Users size={20} />,
      roles: ["admin"],
    },
    {
      to: "/notifications",
      label: "Notifications",
      icon: <Bell size={20} />,
      roles: ["admin", "employee"],
    },
    {
      to: "/settings",
      label: "Settings",
      icon: <Settings size={20} />,
      roles: ["admin"],
    },
  ];

  const visibleLinks = navLinks.filter((link) =>
    link.roles.includes(user.role)
  );

  const logoutButtonStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    borderRadius: 8,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#374151",
    width: "100%",
    fontSize: "1rem",
  };

  return (
    <>
      {/* Mobile hamburger */}
      <HamburgerButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </HamburgerButton>

      {/* Desktop sidebar */}
      <SidebarContainer>
        <AnimatedLogo />
        <Nav>
          {visibleLinks.map((link) => (
            <NavItem
              key={link.to}
              className={location.pathname === link.to ? "active" : ""}
            >
              <NavLinkStyled to={link.to}>
                <IconWrapper>{link.icon}</IconWrapper>
                {link.label}
              </NavLinkStyled>
            </NavItem>
          ))}
          <NavItem>
            <button onClick={handleLogout} style={logoutButtonStyles}>
              <IconWrapper>
                <LogOut size={20} />
              </IconWrapper>
              Logout
            </button>
          </NavItem>
        </Nav>
        <UserInfoSection>
          <AvatarCircle>
            {user.name.charAt(0).toUpperCase()}
          </AvatarCircle>
          <UserMeta>
            <UserName>{user.name}</UserName>
            <UserRole>{user.role.toUpperCase()}</UserRole>
          </UserMeta>
        </UserInfoSection>
      </SidebarContainer>

      {/* Mobile sidebar */}
      <MobileSidebar $isOpen={isSidebarOpen}>
        <AnimatedLogo />
        <Nav>
          {visibleLinks.map((link) => (
            <NavItem
              key={link.to}
              className={location.pathname === link.to ? "active" : ""}
            >
              <NavLinkStyled
                to={link.to}
                onClick={() => setIsSidebarOpen(false)}
              >
                <IconWrapper>{link.icon}</IconWrapper>
                {link.label}
              </NavLinkStyled>
            </NavItem>
          ))}
          <NavItem>
            <button
              onClick={() => {
                handleLogout();
                setIsSidebarOpen(false);
              }}
              style={logoutButtonStyles}
            >
              <IconWrapper>
                <LogOut size={20} />
              </IconWrapper>
              Logout
            </button>
          </NavItem>
        </Nav>
        <UserInfoSection>
          <AvatarCircle>
            {user.name.charAt(0).toUpperCase()}
          </AvatarCircle>
          <UserMeta>
            <UserName>{user.name}</UserName>
            <UserRole>{user.role.toUpperCase()}</UserRole>
          </UserMeta>
        </UserInfoSection>
      </MobileSidebar>

      {/* Overlay to close mobile */}
      {isSidebarOpen && (
        <MobileOverlay onClick={() => setIsSidebarOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
