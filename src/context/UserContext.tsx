import React, { createContext, useState, ReactNode } from "react";

// ✅ Define allowed roles
export type UserRole = "admin" | "employee" | "customer";

// ✅ Extended User interface to include role
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, updatedUser: User) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => setUsers((prev) => [...prev, user]);

  const updateUser = (id: string, updatedUser: User) =>
    setUsers((prev) => prev.map((user) => (user.id === id ? updatedUser : user)));

  const deleteUser = (id: string) =>
    setUsers((prev) => prev.filter((user) => user.id !== id));

  const getUserById = (id: string) => users.find((user) => user.id === id);

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, getUserById }}>
      {children}
    </UserContext.Provider>
  );
};
