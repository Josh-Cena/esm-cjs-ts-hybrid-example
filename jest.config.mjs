import {fileURLToPath} from 'url';

export default {
  rootDir: fileURLToPath(new URL('.', import.meta.url)),
  transform: {
    '^.+\\.[jt]sx?$': '@swc/jest',
  },
  testPathIgnorePatterns: ['<rootDir>/esm', '.*/dist/.*'],
  projects: ['<rootDir>/esm', '<rootDir>'],
};
