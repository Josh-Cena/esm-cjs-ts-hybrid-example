import {fileURLToPath} from 'url';

export default {
  rootDir: fileURLToPath(new URL('.', import.meta.url)),
  transform: {
    '^.+\\.[jt]sx?$': '@swc/jest',
  },
  testPathIgnorePatterns: ['.*/dist/.*'],
  extensionsToTreatAsEsm: ['.ts'],
};
