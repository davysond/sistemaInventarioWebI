"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authConfig_1 = require("../configs/authConfig");
const prisma = new client_1.PrismaClient();
const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error('User not found');
    }
    const passwordMatch = await bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid credentials');
    }
    // Gera um token JWT
    const token = jsonwebtoken_1.default.sign({ id: user.id, isAdmin: user.isAdmin }, authConfig_1.authConfig.secret, {
        expiresIn: authConfig_1.authConfig.expiresIn,
    });
    return { token };
};
exports.loginUser = loginUser;
