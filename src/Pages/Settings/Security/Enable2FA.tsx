import { useState } from "react";
import axios from "axios";
import { SecurityContainer, SecurityForm, Input, SubmitButton } from "../../../styles/SecurityStyles";

const Enable2FA = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const sendOTP = async () => {
    try {
      await axios.post("/api/security/send-otp", { phoneNumber });
      setOtpSent(true);
      alert("OTP sent to your phone.");
    } catch {
      alert("Failed to send OTP.");
    }
  };

  const verifyOTP = async () => {
    try {
      await axios.post("/api/security/verify-otp", { phoneNumber, otp });
      alert("Two-Factor Authentication enabled successfully!");
    } catch {
      alert("Invalid OTP.");
    }
  };

  return (
    <SecurityContainer>
      <h1>Enable Two-Factor Authentication</h1>
      <SecurityForm>
        <label>
          Phone Number:
          <Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </label>
        {!otpSent ? (
          <SubmitButton type="button" onClick={sendOTP}>Send OTP</SubmitButton>
        ) : (
          <>
            <label>
              Enter OTP:
              <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            </label>
            <SubmitButton type="button" onClick={verifyOTP}>Verify OTP</SubmitButton>
          </>
        )}
      </SecurityForm>
    </SecurityContainer>
  );
};

export default Enable2FA;
