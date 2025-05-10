import React, { createContext, useContext, useState, ReactNode } from "react";

// Define allowed user roles
export type UserRole = "admin" | "employee" | "customer";

// Define the user object structure
export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provide the context to the app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export { AuthContext };
