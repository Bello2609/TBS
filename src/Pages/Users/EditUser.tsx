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
import type { User } from "../types/user";
import axiosInstance from "@/services/axiosInstance";

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch user by ID
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

  // ✅ Handle changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // ✅ Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData || !id) {
      toast.error("Missing user data or ID.");
      return;
    }

    setSaving(true);
    try {
      await axiosInstance.put(`/api/users/${id}`, formData);
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
