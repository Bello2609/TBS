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
  Users,
  FileText,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  File,
} from "lucide-react";

import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ✅ Animated Logo with fish icon beside "TBS"
const AnimatedLogo: React.FC = () => {
  return (
    <motion.div
      animate={{ x: [0, 6, -6, 0] }}
      transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 32px auto",
        fontWeight: 900,
        fontSize: "22px",
        textTransform: "uppercase",
        background: "linear-gradient(90deg, #00bcd4, #6a11cb)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        gap: "10px",
      }}
    >
      <span role="img" aria-label="fish" style={{ fontSize: "22px" }}>
        🐟
      </span>
      TBS
    </motion.div>
  );
};

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  // ✅ Removed "Reports" and "Activity Logs"
  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <Home />, roles: ["admin", "employee"] },
    { to: "/invoices", label: "Invoices", icon: <File />, roles: ["admin", "employee", "customer"] },
    { to: "/inventory", label: "Inventory", icon: <FileText />, roles: ["admin", "employee"] },
    { to: "/users", label: "Users", icon: <Users />, roles: ["admin"] },
    { to: "/notifications", label: "Notifications", icon: <Bell />, roles: ["admin", "employee"] },
    { to: "/settings", label: "Settings", icon: <Settings />, roles: ["admin"] },
  ];

  const visibleLinks = navLinks.filter((link) => link.roles.includes(user.role));

  return (
    <>
      {/* Mobile Toggle Button */}
      <HamburgerButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </HamburgerButton>

      {/* Desktop Sidebar */}
      <SidebarContainer>
        <AnimatedLogo />
        <Nav>
          {visibleLinks.map((link) => (
            <NavItem key={link.to} className={location.pathname === link.to ? "active" : ""}>
              <NavLinkStyled to={link.to}>
                <IconWrapper>{link.icon}</IconWrapper>
                {link.label}
              </NavLinkStyled>
            </NavItem>
          ))}
          <NavItem>
            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#374151",
                width: "100%",
                fontSize: "1rem",
              }}
            >
              <IconWrapper><LogOut /></IconWrapper>
              Logout
            </button>
          </NavItem>
        </Nav>
        <UserInfoSection>
          <AvatarCircle>{user.name.charAt(0).toUpperCase()}</AvatarCircle>
          <UserMeta>
            <UserName>{user.name}</UserName>
            <UserRole>{user.role.toUpperCase()}</UserRole>
          </UserMeta>
        </UserInfoSection>
      </SidebarContainer>

      {/* Mobile Sidebar */}
      <MobileSidebar $isOpen={isSidebarOpen}>
        <AnimatedLogo />
        <Nav>
          {visibleLinks.map((link) => (
            <NavItem key={link.to} className={location.pathname === link.to ? "active" : ""}>
              <NavLinkStyled to={link.to} onClick={() => setIsSidebarOpen(false)}>
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
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#374151",
                width: "100%",
                fontSize: "1rem",
              }}
            >
              <IconWrapper><LogOut /></IconWrapper>
              Logout
            </button>
          </NavItem>
        </Nav>
        <UserInfoSection>
          <AvatarCircle>{user.name.charAt(0).toUpperCase()}</AvatarCircle>
          <UserMeta>
            <UserName>{user.name}</UserName>
            <UserRole>{user.role.toUpperCase()}</UserRole>
          </UserMeta>
        </UserInfoSection>
      </MobileSidebar>

      {isSidebarOpen && <MobileOverlay onClick={() => setIsSidebarOpen(false)} />}
    </>
  );
};

export default Sidebar;
