import {
    FilterContainer,
    FilterInput,
    ApplyFilterButton
  } from "../../styles/reportStyles";
  import { useState } from "react";
  
  interface ReportFiltersProps {
    setFilters: (filters: { date: string; customer: string; status: string }) => void;
  }
  
  const ReportFilters = ({ setFilters }: ReportFiltersProps) => {
    const [localFilters, setLocalFilters] = useState({ date: "", customer: "", status: "" });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalFilters({ ...localFilters, [e.target.name]: e.target.value });
    };
  
    const applyFilters = () => {
      setFilters(localFilters);
    };
  
    return (
      <FilterContainer>
        <FilterInput type="date" name="date" onChange={handleChange} placeholder="Filter by Date" />
        <FilterInput type="text" name="customer" onChange={handleChange} placeholder="Filter by Customer" />
        <FilterInput type="text" name="status" onChange={handleChange} placeholder="Filter by Status" />
        <ApplyFilterButton onClick={applyFilters}>Apply Filters</ApplyFilterButton>
      </FilterContainer>
    );
  };
  
  export default ReportFilters;
  