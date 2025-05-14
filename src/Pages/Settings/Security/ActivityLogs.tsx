// src/pages/Settings/Security/ActivityLogs.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LogsContainer,
  LogTable,
  TableHeader,
  TableRow,
  TableCell,
  LogTitle,
  LogEmpty,
} from "../../../styles/SecurityStyles";

interface LogEntry {
  id: string;
  timestamp: string;
  event: string;
  ip: string;
  device: string;
  status: string;
}

const ActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get("/api/security/activity-logs");

        // ✅ Ensure we always store an array
        if (Array.isArray(res.data)) {
          setLogs(res.data);
        } else if (Array.isArray(res.data.logs)) {
          setLogs(res.data.logs);
        } else {
          console.error("Expected array but got:", res.data);
          setLogs([]); // fallback
          setError("Unexpected response format.");
        }

      } catch (err) {
        console.error("Failed to fetch activity logs:", err);
        setError("Failed to load activity logs.");
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <LogsContainer>
      <LogTitle>Security Activity History</LogTitle>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <LogEmpty>{error}</LogEmpty>
      ) : logs.length === 0 ? (
        <LogEmpty>No activity found.</LogEmpty>
      ) : (
        <LogTable>
          <thead>
            <TableRow>
              <TableHeader>Date</TableHeader>
              <TableHeader>Event</TableHeader>
              <TableHeader>IP Address</TableHeader>
              <TableHeader>Device</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.event}</TableCell>
                <TableCell>{log.ip}</TableCell>
                <TableCell>{log.device}</TableCell>
                <TableCell>{log.status}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </LogTable>
      )}
    </LogsContainer>
  );
};

export default ActivityLogs;
