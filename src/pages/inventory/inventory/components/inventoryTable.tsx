// src/pages/inventory/components/inventorytable.tsx

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
          <TableHeader>Sender</TableHeader>
          <TableHeader>Goods</TableHeader>
          <TableHeader>Type</TableHeader>
          <TableHeader>Weight</TableHeader>
          <TableHeader>Departure</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableHead>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <TableRow key={item._id}>
            <TableCell>{item.arrivalDate}</TableCell>
            <TableCell>{item.senderName}</TableCell>
            <TableCell>{item.goods}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.weight}</TableCell>
            <TableCell>{item.departureDate}</TableCell>
            <TableCell>
              <ActionButtons>
                <EditButton onClick={() => onEdit(item)}>
                  <Pencil />
                </EditButton>
                <DeleteButton onClick={() => onDelete(item._id!)}>
                  <Trash2 />
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
