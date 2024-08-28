"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
exports.authConfig = {
    secret: process.env.JWT_SECRET || 'your_secret_key',
    expiresIn: '1d', // Duração do token
};
