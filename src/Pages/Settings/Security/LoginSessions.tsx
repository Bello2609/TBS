// src/pages/Settings/Security/LoginSessions.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  SessionContainer,
  SessionCard,
  SessionInfo,
  DeviceInfo,
  IP,
  Location,
  Timestamp,
  LogoutButton,
  SessionListTitle,
  ActiveBadge,
} from "../../../styles/SecurityStyles";

interface Session {
  id: string;
  device: string;
  ip: string;
  location: string;
  isCurrent: boolean;
  lastActive: string;
}

const LoginSessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get("/api/security/sessions");
        setSessions(res.data);
      } catch {
        alert("Failed to load sessions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleLogout = async (sessionId: string) => {
    if (confirm("Are you sure you want to log out from this session?")) {
      try {
        await axios.post("/api/security/logout-session", { sessionId });
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      } catch {
        alert("Failed to log out from session.");
      }
    }
  };

  return (
    <SessionContainer>
      <SessionListTitle>Active Login Sessions</SessionListTitle>

      {loading ? (
        <p>Loading sessions...</p>
      ) : (
        sessions.map((session) => (
          <SessionCard key={session.id}>
            <SessionInfo>
              <DeviceInfo>{session.device}</DeviceInfo>
              <IP>IP: {session.ip}</IP>
              <Location>Location: {session.location}</Location>
              <Timestamp>Last Active: {session.lastActive}</Timestamp>
              {session.isCurrent && <ActiveBadge>Current Session</ActiveBadge>}
            </SessionInfo>
            {!session.isCurrent && (
              <LogoutButton onClick={() => handleLogout(session.id)}>
                Logout
              </LogoutButton>
            )}
          </SessionCard>
        ))
      )}
    </SessionContainer>
  );
};

export default LoginSessions;
