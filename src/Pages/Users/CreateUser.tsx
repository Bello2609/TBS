// src/pages/Users/CreateUser.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DetailRow } from "@/styles/userStyles";
import { Input, Select } from "@/styles/invoiceStyles";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";
import axiosInstance from "@/services/axiosInstance";
import type { User, UserRole } from "../types/user";

interface CreateUserProps {
  mode: "create" | "edit";
  initialUser?: User;
  onCancel?: () => void;
  onSuccess?: (user: User) => void;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: UserRole;
}

const generateStrongPassword = (): string => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const all = upper + lower + digits;
  let pass = upper[0] + lower[0] + digits[0];
  for (let i = 3; i < 10; i++) {
    pass += all[Math.floor(Math.random() * all.length)];
  }
  return pass.split("").sort(() => 0.5 - Math.random()).join("");
};

const CreateUser: React.FC<CreateUserProps> = ({ mode, initialUser, onCancel, onSuccess }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: (user?.role === "admin" ? "employee" : "customer") as UserRole,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialUser) {
      setFormData({
        name: initialUser.name,
        email: initialUser.email,
        phoneNumber: initialUser.phone,
        role: initialUser.role,
        password: "",
      });
    }
  }, [mode, initialUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "role" ? (value as UserRole) : value,
    }));
  };

  const handleGeneratePassword = () => {
    const generated = generateStrongPassword();
    setFormData((prev) => ({ ...prev, password: generated }));
    toast.info(`Generated password: ${generated}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (mode === "create" && !passwordPattern.test(formData.password)) {
      toast.error("Password must include uppercase, lowercase, and numbers (min 8 chars).");
      setLoading(false);
      return;
    }

    try {
      let savedUser: User;

      if (mode === "create") {
        const response = await axiosInstance.post("/api/users", {
          username: formData.email.split("@")[0],
          email: formData.email,
          name: formData.name,
          phone: formData.phoneNumber,
          role: formData.role,
          password: formData.password,
        });
        savedUser = response.data;
        toast.success("User created successfully");
      } else if (mode === "edit" && initialUser) {
        const response = await axiosInstance.put(`/api/users/${initialUser._id}`, {
          email: formData.email,
          name: formData.name,
          phone: formData.phoneNumber,
          role: formData.role,
        });
        savedUser = response.data;
        toast.success("User updated successfully");
      } else {
        throw new Error("Invalid operation");
      }

      if (onSuccess) onSuccess(savedUser);
      else navigate("/users");

    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const message = error?.response?.data?.message || "Error processing request.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", width: "100%" }}>
      <h2 style={{ marginBottom: "24px" }}>
        {mode === "edit" ? "Edit User" : "Create New User"}
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <DetailRow>
          <strong>Role:</strong>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={user?.role === "employee"}
            required
          >
            {user?.role === "admin" && (
              <>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </>
            )}
            <option value="customer">Customer</option>
          </Select>
        </DetailRow>

        <DetailRow>
          <strong>Name:</strong>
          <Input name="name" value={formData.name} onChange={handleChange} required />
        </DetailRow>

        <DetailRow>
          <strong>Email:</strong>
          <Input name="email" value={formData.email} onChange={handleChange} required />
        </DetailRow>

        <DetailRow>
          <strong>Phone:</strong>
          <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </DetailRow>

        {mode === "create" && (
          <DetailRow style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <strong>Password:</strong>
            <div style={{ display: "flex", width: "100%", gap: "12px", alignItems: "center" }}>
              <Input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ flex: 1, minWidth: 0 }}
              />
              <div style={{ flexShrink: 0 }}>
                <Button
                  type="button"
                  $variant="secondary"
                  style={{ minWidth: "100px", padding: "10px 16px" }}
                  onClick={handleGeneratePassword}
                >
                  Generate
                </Button>
              </div>
            </div>
          </DetailRow>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <Button
            type="button"
            style={{ backgroundColor: "#ccc", color: "#333" }}
            onClick={onCancel ? onCancel : () => navigate("/users")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : mode === "edit" ? "Save Changes" : "Create User"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
