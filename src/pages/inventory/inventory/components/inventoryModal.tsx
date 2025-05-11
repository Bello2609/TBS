import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalContentScrollable,
  ModalTitle,
  ModalForm,
  FormRow,
  Label,
  Input,
  ModalActions,
  SaveButton,
  CancelButton,
  AddButton,
} from "@/styles/inventoryStyles";

import Select, { SingleValue } from "react-select";
import { OptionType } from "../types";

interface InventoryModalProps {
  isEdit: boolean;
  form: {
    customerId: string;
    goods: string;
    type: string;
    quantity: number;
    weight: number;
    arrivalDate: string;
    departureDate: string;
    senderName: string;
  };
  customerOptions: OptionType[]; // ✅ NEW: Customer select options
  senderOptions: OptionType[];
  newSenderName: string;
  onChange: (field: string, value: string | number) => void;
  onSenderChange: (selected: SingleValue<OptionType>) => void;
  onCustomerChange: (selected: SingleValue<OptionType>) => void; // ✅ NEW
  onAddSender: () => void;
  onNewSenderChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const InventoryModal: React.FC<InventoryModalProps> = ({
  isEdit,
  form,
  customerOptions,
  senderOptions,
  newSenderName,
  onChange,
  onSenderChange,
  onCustomerChange,
  onAddSender,
  onNewSenderChange,
  onClose,
  onSave,
}) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContentScrollable>
          <ModalTitle>{isEdit ? "Edit Inventory" : "Add Inventory"}</ModalTitle>
          <ModalForm>

            {/* ✅ Customer Selector */}
            <FormRow>
              <Label>Customer</Label>
              <Select<OptionType, false>
                options={customerOptions}
                value={
                  form.customerId
                    ? customerOptions.find((opt) => opt.value === form.customerId) || null
                    : null
                }
                onChange={onCustomerChange}
                isClearable
                placeholder="Select Customer"
              />
            </FormRow>

            {/* Sender Selector */}
            <FormRow>
              <Label>Sender</Label>
              <Select<OptionType, false>
                options={senderOptions}
                value={
                  form.senderName
                    ? senderOptions.find((opt) => opt.value === form.senderName) || null
                    : null
                }
                onChange={onSenderChange}
                isClearable
                placeholder="Select Sender"
              />
            </FormRow>

            {/* Add new sender */}
            <FormRow>
              <Label>Add New Sender</Label>
              <Input
                value={newSenderName}
                onChange={(e) => onNewSenderChange(e.target.value)}
                placeholder="Enter sender name"
              />
              <AddButton
                type="button"
                onClick={onAddSender}
                disabled={!newSenderName.trim()}
                aria-label="Add new sender"
              >
                + Add Sender
              </AddButton>
            </FormRow>

            {/* Goods */}
            <FormRow>
              <Label>Goods</Label>
              <Input
                value={form.goods}
                onChange={(e) => onChange("goods", e.target.value)}
              />
            </FormRow>

            {/* Type */}
            <FormRow>
              <Label>Type</Label>
              <Input
                value={form.type}
                onChange={(e) => onChange("type", e.target.value)}
              />
            </FormRow>

            {/* Quantity */}
            <FormRow>
              <Label>Quantity</Label>
              <Input
                type="number"
                min="0"
                value={form.quantity}
                onChange={(e) => onChange("quantity", Number(e.target.value))}
              />
            </FormRow>

            {/* Weight */}
            <FormRow>
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                min="0"
                value={form.weight}
                onChange={(e) => onChange("weight", Number(e.target.value))}
              />
            </FormRow>

            {/* Arrival Date */}
            <FormRow>
              <Label>Arrival Date</Label>
              <Input
                type="date"
                value={form.arrivalDate}
                onChange={(e) => onChange("arrivalDate", e.target.value)}
              />
            </FormRow>

            {/* Departure Date */}
            <FormRow>
              <Label>Departure Date</Label>
              <Input
                type="date"
                value={form.departureDate}
                onChange={(e) => onChange("departureDate", e.target.value)}
              />
            </FormRow>

            {/* Action Buttons */}
            <ModalActions>
              <CancelButton type="button" onClick={onClose}>
                Cancel
              </CancelButton>
              <SaveButton type="button" onClick={onSave}>
                {isEdit ? "Update" : "Save"}
              </SaveButton>
            </ModalActions>
          </ModalForm>
        </ModalContentScrollable>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default InventoryModal;
