// src/pages/inventory/components/inventorymodal.tsx

import React, { useState } from "react";
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

import Select, { GroupBase, SingleValue } from "react-select";
import { OptionType } from "../types";

interface InventoryModalProps {
  isEdit: boolean;
  form: {
    goods: string;
    type: string;
    weight: string;
    arrivalDate: string;
    departureDate: string;
    senderName: string;
  };
  senderOptions: OptionType[];
  newSenderName: string;
  onChange: (field: string, value: string) => void;
  onSenderChange: (selected: SingleValue<OptionType>) => void;
  onAddSender: () => void;
  onNewSenderChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const InventoryModal: React.FC<InventoryModalProps> = ({
  isEdit,
  form,
  senderOptions,
  newSenderName,
  onChange,
  onSenderChange,
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
            <FormRow>
              <Label>Sender</Label>
              <Select<OptionType, false, GroupBase<OptionType>>
                options={senderOptions}
                value={
                  form.senderName
                    ? { value: form.senderName, label: form.senderName }
                    : null
                }
                onChange={onSenderChange}
                isClearable
                placeholder="Select Sender"
              />
            </FormRow>
            <FormRow>
              <Label>Add New Sender</Label>
              <Input
                value={newSenderName}
                onChange={(e) => onNewSenderChange(e.target.value)}
              />
              <AddButton type="button" onClick={onAddSender}>
                + Add Sender
              </AddButton>
            </FormRow>
            <FormRow>
              <Label>Goods</Label>
              <Input
                value={form.goods}
                onChange={(e) => onChange("goods", e.target.value)}
              />
            </FormRow>
            <FormRow>
              <Label>Type</Label>
              <Input
                value={form.type}
                onChange={(e) => onChange("type", e.target.value)}
              />
            </FormRow>
            <FormRow>
              <Label>Weight</Label>
              <Input
                value={form.weight}
                onChange={(e) => onChange("weight", e.target.value)}
              />
            </FormRow>
            <FormRow>
              <Label>Arrival Date</Label>
              <Input
                type="date"
                value={form.arrivalDate}
                onChange={(e) => onChange("arrivalDate", e.target.value)}
              />
            </FormRow>
            <FormRow>
              <Label>Departure Date</Label>
              <Input
                type="date"
                value={form.departureDate}
                onChange={(e) => onChange("departureDate", e.target.value)}
              />
            </FormRow>
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
