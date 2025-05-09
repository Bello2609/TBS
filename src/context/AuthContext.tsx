// src/context/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// ✅ Define user type with allowed roles
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "employee" | "customer"; // Support 3 roles
}

// ✅ Context shape
interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

// ✅ Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Provider that wraps the app and shares auth state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // ✅ Load session from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        const parsedUser: AuthUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  // ✅ Login function saves to context and localStorage
  const login = (userData: AuthUser) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  // ✅ Logout function clears everything
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to consume auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
