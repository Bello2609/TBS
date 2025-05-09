
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    text: string;
    cardBackground: string;
    headerBackground: string;
    hoverBackground: string;
    inputBackground: string;
    primary: string;
    primaryDark: string;
    disabled: string; // Add the 'disabled' property here
  }
}