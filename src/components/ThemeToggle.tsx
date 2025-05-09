// src/components/ThemeToggle.tsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import styled from "styled-components";

const ThemeToggle = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    console.error("ThemeToggle must be used within a ThemeProvider.");
    return null;
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <ThemeSwitchWrapper>
      <SwitchLabel>{theme === "light" ? "Light Mode" : "Dark Mode"}</SwitchLabel>
      <ToggleSwitch onClick={toggleTheme} isDark={theme === "dark"}>
        <SwitchThumb isDark={theme === "dark"} />
      </ToggleSwitch>
    </ThemeSwitchWrapper>
  );
};

export default ThemeToggle;

// Styled components
const ThemeSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SwitchLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textPrimary || "#1f2937"};
`;

const ToggleSwitch = styled.div<{ isDark: boolean }>`
  width: 48px;
  height: 24px;
  background-color: ${({ isDark }) => (isDark ? "#4f46e5" : "#d1d5db")};
  border-radius: 999px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const SwitchThumb = styled.div<{ isDark: boolean }>`
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: ${({ isDark }) => (isDark ? "26px" : "3px")};
  transition: left 0.3s ease;
`;
