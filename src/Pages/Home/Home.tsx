// src/pages/Home/Home.tsx

import React, { useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Import shared layout styles
import {
  Container,
  Header,
  CompanyName,
  Nav,
  NavItem,
  Button,
  HeroSection,
  Section,
  Footer
} from "../../styles/HomeStyles";

// Import contact form styles
import {
  ContactFormWrapper,
  ContactInput,
  ContactTextarea,
  SendButton
} from "../../styles/KontaktStyles";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Refs for scroll navigation
  const heroRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  // Scroll to a specific section smoothly
  const scrollTo = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Contact form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  // Update form values
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Your message has been sent successfully.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
        toast.error("Server error. Please try again later.");
        console.error(error); // ✅ this will mark it as used
      } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* Top navigation header */}
      <Header>
        <CompanyName>TBS</CompanyName>
        <Nav>
          <NavItem onClick={() => scrollTo(heroRef)}>Hjem</NavItem>
          <NavItem onClick={() => scrollTo(aboutRef)}>Om Oss</NavItem>
          <NavItem onClick={() => scrollTo(contactRef)}>Kontakt</NavItem>
          <Button onClick={() => navigate("/auth/login")}>Logg inn</Button>
        </Nav>
      </Header>

      {/* Hero section */}
      <HeroSection ref={heroRef}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Transport av sjømat siden 2001</h1>
          <p>
            Vi er spesialister i transport, lagring og håndtering av sjømat.
          </p>
        </motion.div>
      </HeroSection>

      {/* About us section */}
      <Section ref={aboutRef}>
        <h2>Om Oss</h2>
        <p>
          Terminal og Bud Service AS er en pålitelig partner for kjøling og
          logistikk av fersk sjømat. Vi tilbyr lagring i moderne kjølerom og
          rask distribusjon til våre kunder.
        </p>
      </Section>

      {/* Contact section with styled form */}
      <Section ref={contactRef}>
        <h2>Kontakt Oss</h2>
        <p>
          Fyll ut skjemaet for å sende en melding til oss. Du kan sende opptil 3 meldinger i timen.
        </p>

        <ContactFormWrapper as="form" onSubmit={handleSubmit}>
          <ContactInput
            type="text"
            placeholder="Navn"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
          <ContactInput
            type="email"
            placeholder="E-post"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
          <ContactInput
            type="text"
            placeholder="Emne"
            value={form.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            required
          />
          <ContactTextarea
            placeholder="Din melding..."
            rows={5}
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            required
          />
          <SendButton type="submit" disabled={loading}>
            {loading ? "Sender..." : "Send Melding"}
          </SendButton>
        </ContactFormWrapper>
      </Section>

      {/* Footer with contact info */}
      <Footer>
        <p>© 2025 TBS - All rights reserved</p>
        <p>Adresse: Oslo Fiskehallen</p>
        <p>Telefonnummer: +47 123 45 678</p>
        <p>Organisasjonsnummer: 987654321MVA</p>
      </Footer>
    </Container>
  );
};

export default Home;
