import glob from 'glob';
import fs from 'node:fs';
import path from 'node:path';

const { cjsPackages, esmPackages } = glob
  .sync("packages/**/package.json")
  .reduce(
    (acc, p) => {
      const packageType = JSON.parse(fs.readFileSync(p, "utf8")).type;

      const dirname = path.dirname(path.relative(process.cwd(), p));

      if (packageType === "module") {
        acc.esmPackages.push(dirname);
      } else {
        acc.cjsPackages.push(dirname);
      }

      return acc;
    },
    { cjsPackages: [], esmPackages: [] }
  );

export default {
  projects: [
    {
      displayName: {
        name: "CJS",
        color: "yellow",
      },
      testMatch: [`<rootDir>/(${(cjsPackages.join("|"))})/src/**/__tests__/**`],
      transform: {
        "^.+\\.[jt]sx?$": "@swc/jest",
      },
    },
    {
      displayName: {
        name: "ESM",
        color: "blue",
      },
      testMatch: [`<rootDir>/(${(esmPackages.join("|"))})/src/**/__tests__/**`],
      transform: {
        "^.+\\.[jt]sx?$": "@swc/jest",
      },
      moduleNameMapper: {
        '(.*)\\.js$': ['$1.ts', '$1.js'],
      },
      extensionsToTreatAsEsm: [".ts"],
    },
  ],
};
