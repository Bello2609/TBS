// src/pages/Settings/Security/ChangePassword.tsx

import React, { useState } from "react";
import axios from "axios";
import {
  Section,
  SectionTitle,
  Label,
  Input,
  SubmitButton,
  MessageBox,
} from "../../../styles/SecurityStyles";

const generateStrongPassword = () => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const all = uppercase + lowercase + digits;
  let password = "";

  // Ensure each category is present at least once
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += digits[Math.floor(Math.random() * digits.length)];

  // Fill the rest randomly
  for (let i = 3; i < 10; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle result
  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};

const ChangePassword: React.FC = () => {
  const [targetUser, setTargetUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePassword = () => {
    const pwd = generateStrongPassword();
    setNewPassword(pwd);
    setMessage(`Generated Password: ${pwd}`);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!targetUser || !newPassword) {
      setError("All fields are required.");
      setMessage(null);
      return;
    }

    try {
      await axios.post("/api/security/change-password", {
        target: targetUser,
        password: newPassword,
      });
      setMessage("Password changed successfully!");
      setError(null);
      setNewPassword("");
    } catch {
      setError("Failed to change password.");
      setMessage(null);
    }
  };

  return (
    <Section>
      <SectionTitle>Change User Password</SectionTitle>
      <form onSubmit={handleSubmit}>
        <Label>Target Username or Email:</Label>
        <Input
          type="text"
          value={targetUser}
          onChange={(e) => setTargetUser(e.target.value)}
          placeholder="user@example.com"
        />

        <Label style={{ marginTop: "16px" }}>New Password:</Label>
        <Input
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password or use generate"
        />

        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
          <SubmitButton type="submit">Change Password</SubmitButton>
          <SubmitButton
            type="button"
            onClick={handleGeneratePassword}
            style={{ backgroundColor: "#6b7280" }}
          >
            Generate
          </SubmitButton>
        </div>

        {message && <MessageBox success>{message}</MessageBox>}
        {error && <MessageBox error>{error}</MessageBox>}
      </form>
    </Section>
  );
};

export default ChangePassword;
