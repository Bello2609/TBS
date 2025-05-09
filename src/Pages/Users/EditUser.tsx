// src/pages/Users/EditUser.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  UserContainer,
  DetailRow,
} from "@/styles/UserStyles";
import { Input, Select } from "@/styles/InvoiceStyles";
import { Button } from "@/components/ui/Button";
import { toast } from "react-toastify";
import { fakeUsers } from "../data/fakeUsers";
import type { User, UserRole } from "../types/User";

// Simulated current user's role (should come from context in real apps)
const CURRENT_USER_ROLE: UserRole = "admin";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load user by ID from fakeUsers
  useEffect(() => {
    const userId = Number(id);
    const userToEdit = fakeUsers.find((u) => u.id === userId) || null;
    setFormData(userToEdit);
    setLoading(false);
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: name === "role" ? (value as UserRole) : value } : null));
  };

  // Save changes to fakeUsers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);

    const index = fakeUsers.findIndex((u) => u.id === formData.id);
    if (index !== -1) {
      fakeUsers[index] = { ...formData };
      toast.success("User updated successfully!");
      navigate("/users");
    } else {
      toast.error("User not found.");
    }

    setSaving(false);
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
          {CURRENT_USER_ROLE === "admin" ? (
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="customer">Customer</option>
              <option value="visitor">Visitor</option>
            </Select>
          ) : (
            <Input type="text" value={formData.role} readOnly />
          )}
        </DetailRow>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "20px" }}>
          <Button
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
