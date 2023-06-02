import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      template: "sunburst",
      filename: "analyse.html", // will be saved in project's root
    }),
  ],
});
