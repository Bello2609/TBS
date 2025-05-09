// src/styles/SettingsStyles.ts
import styled from "styled-components";

// Main container for the settings page with reduced outer margins and inner padding
export const SettingsContainer = styled.div`
  max-width: 920px;
  margin: 20px auto;       /* Reduced margin to bring sidebar and page closer */
  padding: 24px;           /* Reduced overall padding */
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15),
              0 10px 10px rgba(0, 0, 0, 0.05);
  font-family: 'Roboto', sans-serif;
`;

// Section container for each settings group with reduced margin and padding
export const SettingsSection = styled.div`
  margin-bottom: 20px;     /* Reduced spacing between sections */
  padding: 20px;           /* Reduced inner padding */
  background: #fdfdfd;
  border-radius: 16px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
              rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 4px 12px 0px;
  }
`;

// Header for each section with reduced bottom padding/margin
export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.7rem;
  font-weight: 600;
  color: #333333;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 8px;    /* Reduced padding-bottom */
  margin-bottom: 16px;    /* Reduced margin-bottom */
`;

// Content container for section items with a reduced gap
export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;              /* Reduced gap between items */
`;

// Individual setting item with reduced vertical padding
export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;        /* Reduced padding */
  border-bottom: 1px solid #eeeeee;

  &:last-child {
    border-bottom: none;
  }
`;

// Label for each setting with slightly adjusted font-size
export const SettingLabel = styled.div`
  font-size: 1.2rem;       /* Slightly reduced font size */
  font-weight: 500;
  color: #555555;
`;

// Description for each setting with reduced top margin
export const SettingDescription = styled.div`
  font-size: 1rem;
  color: #777777;
  margin-top: 4px;        /* Reduced margin */
  line-height: 1.6;
`;

// Action container for buttons or toggles with a small gap
export const SettingAction = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;               /* Added gap between action elements */
`;

// Styled button for actions with reduced padding
export const StyledButton = styled.button`
  padding: 10px 20px;      /* Reduced padding */
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

// Styled toggle switch with slightly reduced dimensions
export const StyledToggle = styled.input`
  width: 48px;           /* Reduced width */
  height: 26px;          /* Reduced height */
  appearance: none;
  background: #dddddd;
  border-radius: 26px;
  position: relative;
  cursor: pointer;
  outline: none;
  transition: background 0.3s ease;

  &:checked {
    background: #667eea;
  }

  &:before {
    content: "";
    position: absolute;
    width: 22px;
    height: 22px;
    background: #ffffff;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: transform 0.3s ease;
  }

  &:checked:before {
    transform: translateX(22px);  /* Adjusted for new width */
  }
`;

// Expand button for collapsible sections remains similar
export const ExpandButton = styled.button`
  font-size: 1rem;
  color: #667eea;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #764ba2;
  }
`;

// Expandable box for collapsible content with reduced padding and margin
export const ExpandableBox = styled.div`
  margin-top: 16px;       /* Reduced margin-top */
  padding: 20px;          /* Reduced padding */
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
`;

// Wrapper for toggle switches remains unchanged
export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
