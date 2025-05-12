import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3010,
    open: true,
  },
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "./src"),
    },
  },
});
