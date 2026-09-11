import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  base: "/github-user-explorer/",
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
});
