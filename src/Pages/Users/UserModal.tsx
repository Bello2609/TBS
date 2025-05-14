// src/pages/Users/UserModal.tsx

import React from "react";
import styled from "styled-components";
import { ModalOverlay } from "@/styles/InvoiceStyles";
import { ModalContentScrollable } from "@/styles/UserStyles";
import CreateUser from "./CreateUser";
import { useAuth } from "@/context/AuthContext";
import type { User } from "../types/User";

interface UserModalProps {
  mode: "create" | "edit";
  userToEdit?: User;
  onClose: () => void;
  onUserSaved: (user: User) => void;
}

// Wrapper to center modal content
const ModalWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal for creating or editing users
const UserModal: React.FC<UserModalProps> = ({
  mode,
  userToEdit,
  onClose,
  onUserSaved,
}) => {
  const { user } = useAuth();

  // ✅ Show modal only if user is authorized (admin or employee)
  if (!user || (user.role !== "admin" && user.role !== "employee")) return null;

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContentScrollable>
          <CreateUser
            mode={mode}
            initialUser={userToEdit}
            onCancel={onClose}
            onSuccess={onUserSaved}
          />
        </ModalContentScrollable>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default UserModal;
