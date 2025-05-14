// src/pages/Notifications/NotificationBell.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bell } from "lucide-react";
import {
  BellContainer,
  NotificationBadge
} from "@/styles/NotificationStyles";

const NotificationBell: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get("/api/notifications/unread-count");
        if (typeof response.data.count === "number") {
          setUnreadCount(response.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch notification count:", error);
      }
    };

    fetchUnreadCount();
  }, []);

  return (
    <BellContainer onClick={() => navigate("/notifications")}>
      <Bell size={22} />
      {unreadCount > 0 && (
        <NotificationBadge>
          {unreadCount > 9 ? "9+" : unreadCount}
        </NotificationBadge>
      )}
    </BellContainer>
  );
};

export default NotificationBell;
