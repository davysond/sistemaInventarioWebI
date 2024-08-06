"use strict";
// src/repositories/userRepository.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = void 0;
const prismaClient_1 = __importDefault(require("../infraestructure/prismaClient"));
const getAllUsers = async () => {
    return await prismaClient_1.default.user.findMany();
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    return await prismaClient_1.default.user.findUnique({ where: { id } });
};
exports.getUserById = getUserById;
