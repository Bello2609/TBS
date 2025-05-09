// src/pages/Settings/Security/SecuritySettings.tsx

import React, { useState } from "react";
import axios from "axios";
import {
  SecurityContainer,
  SecurityForm,
  Section,
  SectionTitle,
  Label,
  Input,
  ToggleSwitch,
  ButtonGroup,
  SubmitButton,
  ToggleWrapper,
  MessageBox,
} from "../../../styles/SecurityStyles";

const SecuritySettings: React.FC = () => {
  const [settings, setSettings] = useState({
    enable2FA: false,
    accountLockThreshold: 5,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle value changes (e.g., account lock threshold)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: name === "accountLockThreshold" ? parseInt(value) : value,
    }));
  };

  // Toggle 2FA on/off
  const handleToggle2FA = async () => {
    try {
      const response = await axios.post("/api/security/enable-2fa", {
        enable: !settings.enable2FA,
      });

      setSettings((prev) => ({
        ...prev,
        enable2FA: response.data.enable2FA,
      }));

      setMessage("Two-Factor Authentication updated successfully!");
      setError(null);
    } catch (err) {
      setError("Failed to update 2FA settings.");
      setMessage(null);
    }
  };

  // Submit full settings
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (settings.accountLockThreshold < 1) {
      setError("Account lock threshold must be at least 1.");
      setMessage(null);
      return;
    }

    try {
      await axios.post("/api/security/update-settings", settings);
      setMessage("Security settings saved successfully!");
      setError(null);
    } catch {
      setError("Failed to save security settings.");
      setMessage(null);
    }
  };

  return (
    <SecurityContainer>
      <h2>Security Settings</h2>

      <SecurityForm onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>Two-Factor Authentication</SectionTitle>
          <ToggleWrapper>
            <Label>Enable 2FA for stronger security:</Label>
            <ToggleSwitch
              type="checkbox"
              checked={settings.enable2FA}
              onChange={handleToggle2FA}
            />
          </ToggleWrapper>
        </Section>

        <Section>
          <SectionTitle>Account Lock</SectionTitle>
          <Label>
            Number of failed login attempts before locking the account:
          </Label>
          <Input
            type="number"
            name="accountLockThreshold"
            value={settings.accountLockThreshold}
            min={1}
            onChange={handleChange}
          />
        </Section>

        <ButtonGroup>
          <SubmitButton type="submit">Save Settings</SubmitButton>
        </ButtonGroup>

        {message && <MessageBox success>{message}</MessageBox>}
        {error && <MessageBox error>{error}</MessageBox>}
      </SecurityForm>
    </SecurityContainer>
  );
};

export default SecuritySettings;
