// src/pages/Users/UserDetails.tsx

import React from "react";
import { ModalOverlay, ModalContainer } from "@/styles/invoiceStyles";
import { ModalContentScrollable, DetailRow } from "@/styles/userStyles";
import { Button } from "@/components/ui/button";
import type { User } from "../types/user";

interface Props {
  user: User;
  onClose: () => void;
}

const UserDetails: React.FC<Props> = ({ user, onClose }) => {
  return (
    <>
      {/* Overlay behind modal */}
      <ModalOverlay onClick={onClose} />

      {/* Centered modal container */}
      <ModalContainer>
        <ModalContentScrollable style={{ maxWidth: "600px", margin: "auto" }}>
          <h2 style={{ marginBottom: "24px", textAlign: "center" }}>User Details</h2>

          {/* Display user information */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {user._id && (
              <DetailRow>
                <strong>ID:</strong>
                <span>{user._id}</span>
              </DetailRow>
            )}
            <DetailRow>
              <strong>Name:</strong>
              <span>{user.name}</span>
            </DetailRow>
            <DetailRow>
              <strong>Email:</strong>
              <span>{user.email}</span>
            </DetailRow>
            <DetailRow>
              <strong>Phone:</strong>
              <span>{user.phone}</span>
            </DetailRow>
            <DetailRow>
              <strong>Role:</strong>
              <span>{user.role}</span>
            </DetailRow>

            {/* Optional user status */}
            {user.status && (
              <DetailRow>
                <strong>Status:</strong>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "16px",
                    backgroundColor: user.status === "active" ? "#d1fae5" : "#fee2e2",
                    color: user.status === "active" ? "#065f46" : "#991b1b",
                    fontWeight: 500,
                  }}
                >
                  {user.status}
                </span>
              </DetailRow>
            )}

            {/* Optional creation date */}
            {user.createdAt && (
              <DetailRow>
                <strong>Created At:</strong>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </DetailRow>
            )}
          </div>

          {/* Close button */}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Button onClick={onClose}>Close</Button>
          </div>
        </ModalContentScrollable>
      </ModalContainer>
    </>
  );
};

export default UserDetails;
