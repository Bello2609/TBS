// src/pages/Users/EditUser.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  UserContainer,
  DetailRow,
} from "@/styles/userStyles";
import { Input, Select } from "@/styles/invoiceStyles";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import type { User, UserRole } from "../types/user";
import axiosInstance from "@/services/axiosInstance";

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) {
      toast.error("Invalid user ID.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/api/users/${id}`);
        setFormData(res.data);
      } catch (err) {
        toast.error("Failed to load user data.");
        console.error("User fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData || !id) {
      toast.error("Missing user data or ID.");
      return;
    }

    if (formData.role === "customer" && !formData.companyName?.trim()) {
      toast.error("Company name is required for customers.");
      return;
    }

    setSaving(true);
    try {
      const payload: {
        name: string;
        email: string;
        phone: string;
        role: UserRole;
        companyName?: string;
      } = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
      };

      if (formData.role === "customer") {
        payload.companyName = formData.companyName?.trim() || "";
      }

      await axiosInstance.put(`/api/users/${id}`, payload);
      toast.success("User updated successfully!");
      navigate("/users");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update user.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <UserContainer>
        <p style={{ textAlign: "center" }}>Loading user data...</p>
      </UserContainer>
    );
  }

  if (!formData) {
    return (
      <UserContainer>
        <p style={{ color: "red", textAlign: "center" }}>User not found.</p>
      </UserContainer>
    );
  }

  return (
    <UserContainer style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Edit User</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "24px" }}
      >
        <DetailRow>
          <strong>Name:</strong>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </DetailRow>

        <DetailRow>
          <strong>Email:</strong>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </DetailRow>

        <DetailRow>
          <strong>Role:</strong>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="customer">Customer</option>
          </Select>
        </DetailRow>

        {formData.role === "customer" && (
          <DetailRow>
            <strong>Company Name:</strong>
            <Input
              type="text"
              name="companyName"
              value={formData.companyName || ""}
              onChange={handleChange}
              required
            />
          </DetailRow>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "20px" }}>
          <Button
            type="button"
            style={{ backgroundColor: "#ccc", color: "#333" }}
            onClick={() => navigate("/users")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </UserContainer>
  );
};

export default EditUser;
