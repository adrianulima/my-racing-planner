import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  base: "",
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (
            id.includes("@chakra-ui") ||
            id.includes("@emotion") ||
            id.includes("@ark-ui") ||
            id.includes("@zag-js")
          ) {
            return "ui";
          }

          if (
            id.includes("react") ||
            id.includes("scheduler") ||
            id.includes("wouter")
          ) {
            return "react-vendor";
          }

          if (id.includes("i18next")) {
            return "i18n";
          }

          if (id.includes("@fortawesome") || id.includes("react-icons")) {
            return "icons";
          }

          if (id.includes("@dnd-kit")) {
            return "dnd";
          }

          return "vendor";
        },
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    CHANGELOG: JSON.stringify(
      readFileSync(path.join(dirname, "./CHANGELOG.md"), "utf8"),
    ),
  },
});
