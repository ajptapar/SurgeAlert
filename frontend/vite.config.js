// frontend/vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: resolve(__dirname, "WebApp"),
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Spring Boot backend
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});