// src/pages/inventory/components/inventoryTable.tsx

import React from "react";
import {
  InventoryTable,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  ActionButtons,
  IconButton,
} from "@/styles/inventoryStyles";
import { InventoryItem } from "../types";
import { Pencil, Trash2 } from "lucide-react";

interface InventoryTableProps {
  inventory: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
}

const InventoryTableComponent: React.FC<InventoryTableProps> = ({
  inventory,
  onEdit,
  onDelete,
}) => {
  return (
    <InventoryTable>
      <thead>
        <TableHead>
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
          <TableRow key={item._id ?? item.goods + item.arrivalDate}>
            <TableCell>
              {new Date(item.arrivalDate).toLocaleDateString("en-GB")}
            </TableCell>
            <TableCell>
              {item.departureDate
                ? new Date(item.departureDate).toLocaleDateString("en-GB")
                : "—"}
            </TableCell>
            <TableCell>{item.senderName}</TableCell>
            <TableCell>{item.goods}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.weight}</TableCell>
            <TableCell>
              <ActionButtons>
                <IconButton title="Edit" onClick={() => onEdit(item)}>
                  <Pencil size={18} />
                </IconButton>
                <IconButton
                  title="Delete"
                  onClick={() => item._id && onDelete(item._id)}
                >
                  <Trash2 size={18} />
                </IconButton>
              </ActionButtons>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </InventoryTable>
  );
};

export default InventoryTableComponent;
