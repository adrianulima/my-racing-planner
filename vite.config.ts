import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  base: "",
  plugins: [react(), tsconfigPaths()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    CHANGELOG: JSON.stringify(
      readFileSync(path.join(dirname, "./CHANGELOG.md"), "utf8"),
    ),
  },
});
