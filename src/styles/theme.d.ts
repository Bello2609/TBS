// src/styles/theme.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    text: string;
    primary: string;
    primaryDark: string;
    inputBackground: string;
    cardBackground: string;
    headerBackground: string;
    hoverBackground: string;
    subText: string;
  }
}
