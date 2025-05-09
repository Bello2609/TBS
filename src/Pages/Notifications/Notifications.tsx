// src/pages/Notifications/Notifications.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import {
  NotificationContainer,
  NotificationTitle,
  NotificationList,
  NotificationItem,
  NotificationMessage,
  NotificationTime,
  MarkAsReadButton,
} from "@/styles/NotificationStyles";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

// Type for notifications
interface Notification {
  id: number;
  message: string;
  createdAt?: string;
  type?: string;
}

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/api/notifications");
        if (Array.isArray(res.data)) {
          setNotifications(res.data);
        } else {
          throw new Error("Expected an array of notifications.");
        }
      } catch (err) {
        console.error("Failed to load notifications", err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await axios.post(`/api/notifications/mark-as-read/${id}`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch {
      setError("Failed to mark as read.");
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.post("/api/notifications/mark-all-read");
      setNotifications([]);
    } catch {
      setError("Failed to mark all as read.");
    }
  };

  const deleteAll = async () => {
    if (!confirm("Are you sure you want to delete all notifications?")) return;
    try {
      await axios.delete("/api/notifications");
      setNotifications([]);
    } catch {
      setError("Failed to delete notifications.");
    }
  };

  return (
    <NotificationContainer>
      <NotificationTitle>Notifications</NotificationTitle>

      {/* Error / Loading / Empty */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <>
          {/* Top action buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <Button $variant="secondary" onClick={markAllAsRead}>
              ✓ Mark All as Read
            </Button>
            {user?.role === "admin" && (
              <Button $variant="danger" onClick={deleteAll}>
                🗑 Delete All
              </Button>
            )}
          </div>

          {/* Notification List */}
          <NotificationList>
            {notifications.map((n) => (
              <NotificationItem key={n.id}>
                <NotificationMessage>
                  <p>{n.message}</p>
                  {n.createdAt && (
                    <NotificationTime>
                      {new Date(n.createdAt).toLocaleString()}
                    </NotificationTime>
                  )}
                </NotificationMessage>
                <MarkAsReadButton onClick={() => markAsRead(n.id)}>
                  Mark as Read
                </MarkAsReadButton>
              </NotificationItem>
            ))}
          </NotificationList>
        </>
      )}
    </NotificationContainer>
  );
};

export default Notifications;
