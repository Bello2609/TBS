// src/pages/Users/UserDetailsModal.tsx

import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalContentScrollable,
  DetailRow,
} from "@/styles/userStyles";
import { Button } from "@/components/ui/button";
import type { User } from "../types/user";

interface Props {
  user: Partial<User> & {
    companyName?: string;
    companyEmail?: string;
    orgNumber?: string;
    zipCode?: string;
    city?: string;
    address?: string;
    contactPerson?: string;
    companyPhone?: string;
    customerType?: string;
  };
  onClose: () => void;
}

const UserDetailsModal: React.FC<Props> = ({ user, onClose }) => {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <ModalContentScrollable style={{ maxWidth: "600px", margin: "auto" }}>
          <h2 style={{ marginBottom: "24px", textAlign: "center" }}>
            User Details
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {user._id && (
              <DetailRow>
                <strong>ID:</strong>
                <span>{user._id}</span>
              </DetailRow>
            )}
            <DetailRow>
              <strong>Name:</strong>
              <span>{user.name || "N/A"}</span>
            </DetailRow>
            <DetailRow>
              <strong>Email:</strong>
              <span>{user.email || "N/A"}</span>
            </DetailRow>
            <DetailRow>
              <strong>Phone:</strong>
              <span>{user.phone || "N/A"}</span>
            </DetailRow>
            <DetailRow>
              <strong>Role:</strong>
              <span>{user.role || "N/A"}</span>
            </DetailRow>

            {/* Extra fields for customers */}
            {user.role === "customer" && (
              <>
                {user.companyName && (
                  <DetailRow>
                    <strong>Company Name:</strong>
                    <span>{user.companyName}</span>
                  </DetailRow>
                )}
                {user.companyEmail && (
                  <DetailRow>
                    <strong>Company Email:</strong>
                    <span>{user.companyEmail}</span>
                  </DetailRow>
                )}
                {user.orgNumber && (
                  <DetailRow>
                    <strong>Org Number:</strong>
                    <span>{user.orgNumber}</span>
                  </DetailRow>
                )}
                {user.zipCode && (
                  <DetailRow>
                    <strong>Zip Code:</strong>
                    <span>{user.zipCode}</span>
                  </DetailRow>
                )}
                {user.city && (
                  <DetailRow>
                    <strong>City:</strong>
                    <span>{user.city}</span>
                  </DetailRow>
                )}
                {user.address && (
                  <DetailRow>
                    <strong>Address:</strong>
                    <span>{user.address}</span>
                  </DetailRow>
                )}
                {user.contactPerson && (
                  <DetailRow>
                    <strong>Contact Person:</strong>
                    <span>{user.contactPerson}</span>
                  </DetailRow>
                )}
                {user.companyPhone && (
                  <DetailRow>
                    <strong>Company Phone:</strong>
                    <span>{user.companyPhone}</span>
                  </DetailRow>
                )}
                {user.customerType && (
                  <DetailRow>
                    <strong>Customer Type:</strong>
                    <span>{user.customerType}</span>
                  </DetailRow>
                )}
              </>
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

export default UserDetailsModal;
