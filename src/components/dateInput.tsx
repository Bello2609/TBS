import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  selected,
  onChange,
  placeholderText,
}) => {
  return (
    <DatePicker
      selected={selected}
      onChange={(date: Date | null) => onChange(date)}
      placeholderText={placeholderText}
      className="custom-datepicker"
    />
  );
};

export default DateInput;
