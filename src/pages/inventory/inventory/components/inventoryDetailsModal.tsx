// src/pages/inventory/inventory/components/inventoryDetailsModal.tsx

import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalContentScrollable,
  ModalTitle,
} from "@/styles/InventoryStyles";
import { InventoryItem } from "../types";

interface InventoryDetailsModalProps {
  item: InventoryItem | null;
  onClose: () => void;
}

const InventoryDetailsModal: React.FC<InventoryDetailsModalProps> = ({
  item,
  onClose,
}) => {
  if (!item) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContentScrollable>
          <ModalTitle>Inventory Details</ModalTitle>

          <section style={{ marginBottom: "1rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Customer:</strong>{" "}
              {item.customerName || item.customerId || "—"}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Sender:</strong> {item.senderName || "—"}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Goods:</strong> {item.goods}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Type:</strong> {item.type}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Quantity:</strong> {item.quantity}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Weight (kg):</strong> {item.weight}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Arrival Date:</strong>{" "}
              {item.arrivalDate
                ? new Date(item.arrivalDate).toLocaleDateString("nb-NO")
                : "—"}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Departure Date:</strong>{" "}
              {item.departureDate
                ? new Date(item.departureDate).toLocaleDateString("nb-NO")
                : "—"}
            </div>
          </section>

          <button
            style={{
              marginTop: "1.5rem",
              padding: "0.5rem 1.5rem",
              fontSize: "1rem",
              color: "#222",
              background: "#eee",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              float: "right",
            }}
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </ModalContentScrollable>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default InventoryDetailsModal;
