import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  server: {
    host: "127.0.0.1",
    port: 5173,
    open: false,
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
    open: false,
  },
});
