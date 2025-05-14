import React from "react";
import { FilterRow } from "@/styles/InventoryStyles";
import { OptionType } from "../types";
import DateInput from "@/components/dateInput";
import Select, { SingleValue } from "react-select";

interface InventoryFilterProps {
  customerOptions: OptionType[];
  selectedCustomer: OptionType | null;
  startDate: Date | null;
  endDate: Date | null;
  onCustomerChange: (value: OptionType | null) => void;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

const InventoryFilter: React.FC<InventoryFilterProps> = ({
  customerOptions,
  selectedCustomer,
  startDate,
  endDate,
  onCustomerChange,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <FilterRow>
      {/* Customer Select */}
      <Select<OptionType, false>
        options={customerOptions}
        value={selectedCustomer}
        onChange={(option: SingleValue<OptionType>) => onCustomerChange(option)}
        placeholder="Select Customer"
        isClearable
        classNamePrefix="react-select"
      />

      {/* Start Date */}
      <DateInput
        selected={startDate}
        onChange={onStartDateChange}
        placeholderText="Start Date"
      />

      {/* End Date */}
      <DateInput
        selected={endDate}
        onChange={onEndDateChange}
        placeholderText="End Date"
      />
    </FilterRow>
  );
};

export default InventoryFilter;
