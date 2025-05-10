import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // ← غيّر المنفذ إذا كان مختلفًا عندك
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
