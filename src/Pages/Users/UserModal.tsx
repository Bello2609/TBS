// src/pages/Users/UserModal.tsx

import React from "react";
import styled from "styled-components";
import { ModalOverlay } from "@/styles/invoiceStyles";
import { ModalContentScrollable } from "@/styles/userStyles";
import CreateUser from "./createUser";
import { useAuth } from "@/context/authContext";
import type { User } from "../types/user";

interface UserModalProps {
  mode: "create" | "edit";
  userToEdit?: User;
  onClose: () => void;
  onUserSaved: (newUser: User) => void;
}

// Wrapper to center modal content
const ModalWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal for both creating and editing users
const UserModal: React.FC<UserModalProps> = ({
  mode,
  userToEdit,
  onClose,
  onUserSaved,
}) => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") return null;

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
