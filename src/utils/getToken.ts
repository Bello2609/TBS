// src/utils/getToken.ts
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

// ✅ Use this in interceptors
export const useAuthToken = (): string | null => {
  try {
    const auth = useContext(AuthContext);
    return auth?.user?.token || null;
  } catch {
    return null;
  }
};
