import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',  // Configura a raiz para a pasta onde está o código
  testMatch: ['**/tests/**/*.test.ts'], // Ajuste para a localização dos testes
};

export default config;
