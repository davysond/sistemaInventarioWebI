"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: '.',
    testMatch: ['**/tests/**/*.test.ts'], // Ajuste para a localização dos testes
};
exports.default = config;
