import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  ResetWrapper,
  ResetTitle,
  Form,
  Input,
  SubmitButton,
} from "../../styles/ResetPasswordStyles";

const ResetPassword: React.FC = () => {
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.newPassword || !form.confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Simulate backend response
    setTimeout(() => {
      toast.success("Password has been successfully updated.");
      setForm({ newPassword: "", confirmPassword: "" });
      setLoading(false);
    }, 1500);
  };

  return (
    <ResetWrapper>
      <Form onSubmit={handleSubmit}>
        <ResetTitle>Reset Password</ResetTitle>
        <Input
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) => handleChange("newPassword", e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          required
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </SubmitButton>
      </Form>
    </ResetWrapper>
  );
};

export default ResetPassword;
