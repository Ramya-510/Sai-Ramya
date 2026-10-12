import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Required for project site: https://ramya-510.github.io/Sai-Ramya/
  base: "/Sai-Ramya/",
  plugins: [react()],
});
