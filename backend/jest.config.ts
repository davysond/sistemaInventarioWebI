import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',  
  testMatch: ['**/tests/**/*.test.ts'], 
};

export default config;
