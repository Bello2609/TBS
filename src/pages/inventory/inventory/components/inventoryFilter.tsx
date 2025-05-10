import React from "react";
import { SearchSelect, DateInput, FilterRow } from "@/styles/InventoryStyles";
import { OptionType } from "../types";
import Select from "react-select";

interface InventoryFilterProps {
  customers: OptionType[];
  selectedCustomer: OptionType | null;
  startDate: Date | null;
  endDate: Date | null;
  onCustomerChange: (value: OptionType | null) => void;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

const InventoryFilter: React.FC<InventoryFilterProps> = ({
  customers,
  selectedCustomer,
  startDate,
  endDate,
  onCustomerChange,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <FilterRow>
      <SearchSelect<OptionType, false>
        options={customers}
        value={selectedCustomer}
        onChange={(value) => onCustomerChange(value)}
        placeholder="Select Customer"
        isClearable
      />

      <DateInput
        selected={startDate}
        onChange={(date: Date | null) => onStartDateChange(date)}
        placeholderText="Start Date"
      />

      <DateInput
        selected={endDate}
        onChange={(date: Date | null) => onEndDateChange(date)}
        placeholderText="End Date"
      />
    </FilterRow>
  );
};

export default InventoryFilter;
