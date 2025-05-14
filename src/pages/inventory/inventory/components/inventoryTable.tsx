// src/pages/inventory/components/inventoryTable.tsx

import React from "react";
import {
  InventoryTable,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  ActionButtons,
  EditButton,
  DeleteButton,
  ViewButton,
} from "@/styles/InventoryStyles";
import { InventoryItem } from "../types";
import { Pencil, Trash2, Eye } from "lucide-react";

interface InventoryTableProps {
  inventory: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
  onView: (item: InventoryItem) => void;
}

const InventoryTableComponent: React.FC<InventoryTableProps> = ({
  inventory,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <InventoryTable>
      <thead>
        <TableHead>
          <TableHeader>Company</TableHeader>
          <TableHeader>Arrival</TableHeader>
          <TableHeader>Departure</TableHeader>
          <TableHeader>Sender</TableHeader>
          <TableHeader>Goods</TableHeader>
          <TableHeader>Type</TableHeader>
          <TableHeader>Quantity</TableHeader>
          <TableHeader>Weight (kg)</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableHead>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <TableRow key={item._id ?? `${item.goods}-${item.arrivalDate}`}>
            <TableCell>{item.customerName || "—"}</TableCell>
            <TableCell>
              {item.arrivalDate
                ? new Date(item.arrivalDate).toLocaleDateString("nb-NO")
                : "—"}
            </TableCell>
            <TableCell>
              {item.departureDate
                ? new Date(item.departureDate).toLocaleDateString("nb-NO")
                : "—"}
            </TableCell>
            <TableCell>{item.senderName || "—"}</TableCell>
            <TableCell>{item.goods}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.weight}</TableCell>
            <TableCell>
              <ActionButtons>
                <ViewButton title="View" onClick={() => onView(item)}>
                  <Eye size={16} />
                </ViewButton>
                <EditButton title="Edit" onClick={() => onEdit(item)}>
                  <Pencil size={16} />
                </EditButton>
                <DeleteButton
                  title="Delete"
                  onClick={() => item._id && onDelete(item._id)}
                >
                  <Trash2 size={16} />
                </DeleteButton>
              </ActionButtons>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </InventoryTable>
  );
};

export default InventoryTableComponent;
