// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css";

// Get the root element from the HTML file
const rootElement = document.getElementById("root");

if (rootElement) {
  // Create the React root and render the App inside StrictMode
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Log an error if the root element is not found
  console.error("Root element not found! Make sure you have <div id='root'> in index.html");
}
