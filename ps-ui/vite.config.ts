import { libInjectCss } from "vite-plugin-lib-inject-css";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    publicDir: false,
    plugins: [
        react(),
        libInjectCss(),
        dts({
            include: ["src"],
            exclude: ["src/main.tsx", "src/app"],
            tsconfigPath: "./tsconfig.app.json",
        }),
    ],

    build: {
        lib: {
            entry: resolve(import.meta.dirname, "src/index.ts"),
            formats: ["es"],
        },
        rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
                preserveModules: true,
                preserveModulesRoot: "src",
                entryFileNames: "[name].js",
            },
        },
        cssCodeSplit: true,
    },
});
