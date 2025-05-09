// src/data/fakeUserAccounts.ts

import type { AuthUser } from "../../context/AuthContext";

interface FakeCredentials {
  [username: string]: {
    password: string;
    role: AuthUser["role"];
  };
}

export const fakeUserAccounts: FakeCredentials = {
  admin: {
    password: "admin123",
    role: "admin",
  },
  employee: {
    password: "employee123",
    role: "employee",
  },
  customer: {
    password: "customer123",
    role: "customer",
  },
};
