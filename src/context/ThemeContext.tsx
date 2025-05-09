import React, { createContext, useState, ReactNode } from "react";

// Define Context Type
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create Context with Initial Value as `null`
export const ThemeContext = createContext<ThemeContextType | null>(null);

// Theme Provider Component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");

  // Toggle Theme Function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
