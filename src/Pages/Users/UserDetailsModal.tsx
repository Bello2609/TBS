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

interface ExtendedCustomerUser extends User {
  companyEmail?: string;
  orgNumber?: string;
  zipCode?: string;
  city?: string;
  address?: string;
  contactPerson?: string;
  companyPhone?: string;
  customerType?: string;
}

interface Props {
  user: User | ExtendedCustomerUser;
  onClose: () => void;
}

const UserDetailsModal: React.FC<Props> = ({ user, onClose }) => {
  const isCustomer = user.role === "customer";
  const customer = isCustomer ? (user as ExtendedCustomerUser) : null;

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

            {/* ✅ Extra fields for customers */}
            {isCustomer && customer && (
              <>
                <DetailRow>
                  <strong>Company Name:</strong>
                  <span>{customer.companyName || "N/A"}</span>
                </DetailRow>
                <DetailRow>
                  <strong>Company Email:</strong>
                  <span>{customer.companyEmail || "N/A"}</span>
                </DetailRow>
                <DetailRow>
                  <strong>Org Number:</strong>
                  <span>{customer.orgNumber || "N/A"}</span>
                </DetailRow>
                <DetailRow>
                  <strong>Zip Code:</strong>
                  <span>{customer.zipCode || "N/A"}</span>
                </DetailRow>
                <DetailRow>
                  <strong>City:</strong>
                  <span>{customer.city || "N/A"}</span>
                </DetailRow>
                <DetailRow>
                  <strong>Address:</strong>
                  <span>{customer.address || "N/A"}</span>
                </DetailRow>
                <DetailRow>
                  <strong>Contact Person:</strong>
                  <span>{customer.contactPerson || "N/A"}</span>
                </DetailRow>
                <DetailRow>
                  <strong>Company Phone:</strong>
                  <span>{customer.companyPhone || "N/A"}</span>
                </DetailRow>
                <DetailRow>
                  <strong>Customer Type:</strong>
                  <span>{customer.customerType || "N/A"}</span>
                </DetailRow>
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
