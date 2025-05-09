// src/pages/Users/UserDetails.tsx

import React from "react";
import { ModalOverlay, ModalContainer } from "@/styles/InvoiceStyles";
import { ModalContentScrollable, DetailRow } from "@/styles/UserStyles";
import { Button } from "@/components/ui/Button";
import type { User } from "../types/User";

interface Props {
  user: User;
  onClose: () => void;
}

const UserDetails: React.FC<Props> = ({ user, onClose }) => {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <ModalContentScrollable style={{ maxWidth: "600px", margin: "auto" }}>
          <h2 style={{ marginBottom: "24px", textAlign: "center" }}>User Details</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <DetailRow>
              <strong>ID:</strong>
              <span>{user.id}</span>
            </DetailRow>
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

            {user.createdAt && (
              <DetailRow>
                <strong>Created At:</strong>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </DetailRow>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Button onClick={onClose}>Close</Button>
          </div>
        </ModalContentScrollable>
      </ModalContainer>
    </>
  );
};

export default UserDetails;
