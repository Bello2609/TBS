import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  ForgotWrapper,
  ForgotTitle,
  Form,
  Input,
  SubmitButton,
  BackLink,
} from "../../styles/ForgotPasswordStyles";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);

    // Simulate sending reset email
    setTimeout(() => {
      toast.success("A reset link has been sent to your email.");
      setEmail("");
      setLoading(false);
    }, 1500);
  };

  return (
    <ForgotWrapper>
      <Form onSubmit={handleSubmit}>
        <ForgotTitle>Forgot Password</ForgotTitle>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </SubmitButton>
        <BackLink onClick={() => navigate("/auth/login")}>
          Back to Login
        </BackLink>
      </Form>
    </ForgotWrapper>
  );
};

export default ForgotPassword;
