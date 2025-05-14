import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";


import {
  LoginWrapper,
  LoginTitle,
  Form,
  Input,
  SubmitButton,
} from "../../styles/LoginStyles";
import axios from "axios";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password } = form;

    if (!username || !password) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password
      });

      const { token, user } = response.data;

      login({ ...user, token });

      toast.success("Login successful!");

      const target = user.role === "customer" ? "/invoices" : "/dashboard";
      navigate(target, { replace: true });

    } catch (error: unknown) {
      let message = "Login failed. Please try again.";

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginTitle>Logg inn</LoginTitle>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Logger inn..." : "Logg inn"}
        </SubmitButton>
      </Form>
    </LoginWrapper>
  );
};

export default Login;
