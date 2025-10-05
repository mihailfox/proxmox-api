import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
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
