import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const GH_PAGES_BASE = "/Interactive-Line-Chart/";

export default defineConfig(({ mode }) => {
  const isGhPages = mode === "gh-pages";

  return {
    plugins: [react()],
    base: isGhPages ? GH_PAGES_BASE : "/",
    build: {
      outDir: "dist",
    },
  };
});
