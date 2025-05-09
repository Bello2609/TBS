import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* 🌐 Your existing global styles here... */

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
export default GlobalStyles;
