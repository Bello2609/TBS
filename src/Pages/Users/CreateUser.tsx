// src/pages/Users/CreateUser.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DetailRow } from "@/styles/UserStyles";
import { Input, Select } from "@/styles/InvoiceStyles";
import { Button } from "@/components/ui/Button";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/services/axiosInstance";
import type { User, UserRole } from "../types/User";

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
  companyName?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  orgNumber?: string;
  customerType?: string;
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

const CreateUser: React.FC<CreateUserProps> = ({
  mode,
  initialUser,
  onCancel,
  onSuccess,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: (user?.role === "admin" ? "employee" : "customer") as UserRole,
    companyName: "",
    address: "",
    city: "",
    zipCode: "",
    orgNumber: "",
    customerType: "Company",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialUser) {
      setFormData({
        name: initialUser.name,
        email: initialUser.email,
        phoneNumber: initialUser.phone,
        role: initialUser.role,
        companyName: initialUser.companyName ?? "",
        address: initialUser.address ?? "",
        city: initialUser.city ?? "",
        zipCode: initialUser.zipCode ?? "",
        orgNumber: initialUser.orgNumber ?? "",
        customerType: initialUser.customerType ?? "Company",
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
      const payload = {
        email: formData.email,
        name: formData.name,
        phone: formData.phoneNumber,
        role: formData.role,
        username: formData.email.split("@")[0],
        password: formData.password,
        companyName: formData.role === "customer" ? formData.companyName?.trim() : undefined,
        address: formData.address?.trim(),
        city: formData.city?.trim(),
        zipCode: formData.zipCode?.trim(),
        orgNumber: formData.orgNumber?.trim(),
        customerType: formData.customerType,
      };

      const response = await axiosInstance.post("/api/users", payload);
      const createdUser = response.data;

      const userId = createdUser._id || createdUser.id;
      if (!userId) {
        toast.error("Failed to get user ID after creation");
        setLoading(false);
        return;
      }

      if (formData.role === "customer" && formData.companyName?.trim()) {
        const customerData = {
          userId,
          companyName: formData.companyName.trim(),
          companyEmail: formData.email.trim(),
          orgNumber: formData.orgNumber || "N/A",
          address: formData.address || "N/A",
          city: formData.city || "N/A",
          zipCode: formData.zipCode || "N/A",
          contactPerson: formData.name,
          companyPhone: formData.phoneNumber,
          customerType: formData.customerType as "Company" | "Private",
        };

        try {
          await axiosInstance.post("/api/customers", customerData);
          toast.success("Customer profile created successfully");
        } catch (error: unknown) {
          const apiError = error as { response?: { data?: { message?: string } } };
          toast.error(apiError?.response?.data?.message || "Failed to create customer profile");
        }
      }

      toast.success("User created successfully");
      onSuccess?.(createdUser);
      navigate("/users");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || "Error processing request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", width: "100%" }}>
      <h2 style={{ marginBottom: "24px" }}>
        {mode === "edit" ? "Edit User" : "Create New User"}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
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

        {formData.role === "customer" && (
          <>
            <DetailRow>
              <strong>Company Name:</strong>
              <Input name="companyName" value={formData.companyName ?? ""} onChange={handleChange} required />
            </DetailRow>
            <DetailRow>
              <strong>Address:</strong>
              <Input name="address" value={formData.address ?? ""} onChange={handleChange} required />
            </DetailRow>
            <DetailRow>
              <strong>City:</strong>
              <Input name="city" value={formData.city ?? ""} onChange={handleChange} required />
            </DetailRow>
            <DetailRow>
              <strong>ZIP Code:</strong>
              <Input name="zipCode" value={formData.zipCode ?? ""} onChange={handleChange} required />
            </DetailRow>
            <DetailRow>
              <strong>Organization Number:</strong>
              <Input name="orgNumber" value={formData.orgNumber ?? ""} onChange={handleChange} required />
            </DetailRow>
            <DetailRow>
              <strong>Customer Type:</strong>
              <Select name="customerType" value={formData.customerType} onChange={handleChange} required>
                <option value="Company">Company</option>
                <option value="Private">Private</option>
              </Select>
            </DetailRow>
          </>
        )}

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
