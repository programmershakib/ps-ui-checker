import react from "@vitejs/plugin-react";
import {fileURLToPath, URL} from "node:url";
import {defineConfig} from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // The demos are copied verbatim from heroui.com/docs, so they keep importing
      // "@heroui/react" and "@gravity-ui/icons" — both resolve to the local clone.
      "@heroui/react": fileURLToPath(new URL("./src/heroui.tsx", import.meta.url)),
      "@gravity-ui/icons": fileURLToPath(new URL("./src/components/icons.tsx", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5174,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: true,
  },
});
