// src/context/authContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";
import { attachToken } from "@/services/axiosInstance"; // 🔗 Inject token into axios

//  Define allowed user roles
export type UserRole = "admin" | "employee" | "customer";

//  Define user object structure
export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

//  Define the structure of the context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

//  Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provide the context to the app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Login: store user and attach token
  const login = (userData: User) => {
    setUser(userData);
    attachToken(userData.token); // 🔐 Inject token for secure requests
  };

  //  Logout: clear user and detach token
  const logout = () => {
    setUser(null);
    attachToken(null); // Remove token from headers
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//  Hook to access the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext };
