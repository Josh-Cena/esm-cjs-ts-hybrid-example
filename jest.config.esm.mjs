import { fileURLToPath } from "node:url";
import glob from "glob";
import fs from "node:fs";
import path from "node:path";

const esmPackages = glob
  .sync("packages/**/package.json")
  .filter((p) => JSON.parse(fs.readFileSync(p, "utf8")).type === "module")
  .map((p) => path.dirname(path.relative(process.cwd(), p)));

export default {
  rootDir: fileURLToPath(new URL(".", import.meta.url)),
  transform: {
    "^.+\\.[jt]sx?$": "@swc/jest",
  },
  testMatch: esmPackages.map((p) => `<rootDir>/${p}/src/**/__tests__/**`),
  extensionsToTreatAsEsm: [".ts"],
};
