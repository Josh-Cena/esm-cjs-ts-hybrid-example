import { fileURLToPath } from "node:url";

export default {
  rootDir: fileURLToPath(new URL(".", import.meta.url)),
  projects: ["<rootDir>/jest.config.cjs.mjs", "<rootDir>/jest.config.esm.mjs"],
};
