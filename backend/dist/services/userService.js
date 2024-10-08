"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.promoteUserToAdmin = exports.createUser = void 0;
const userRepository = __importStar(require("../repositories/userRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authConfig_1 = require("../configs/authConfig");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = async (data) => {
    const { name, email, password, products } = data;
    // Criptografa a senha
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    // Cria o novo usuário e seus produtos associados
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            products: {
                create: products?.map(product => ({
                    name: product.name,
                    description: product.description,
                    price: product.price
                })) || [],
            },
        },
        include: {
            products: true,
        },
    });
    // Gera um token JWT para o novo usuário
    const token = jsonwebtoken_1.default.sign({ id: newUser.id, isAdmin: newUser.isAdmin }, authConfig_1.authConfig.secret, {
        expiresIn: authConfig_1.authConfig.expiresIn,
    });
    return { user: newUser, token };
};
exports.createUser = createUser;
const promoteUserToAdmin = async (userId) => {
    try {
        return await userRepository.promoteUserToAdmin(userId);
    }
    catch (error) {
        throw new Error(`Failed to promote user to admin:`);
    }
};
exports.promoteUserToAdmin = promoteUserToAdmin;
const deleteUser = async (adminUserId, userId) => {
    // Verifique se o usuário existe e se é um administrador
    const adminUser = await prisma.user.findUnique({
        where: { id: adminUserId },
    });
    if (!adminUser || !adminUser.isAdmin) {
        throw new Error('Unauthorized: Only administrators can delete users');
    }
    // Verifique se o usuário a ser deletado existe
    const userToDelete = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!userToDelete) {
        throw new Error('User not found');
    }
    return await userRepository.deleteUser(userId);
};
exports.deleteUser = deleteUser;
const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    return await userRepository.getUserById(id);
};
exports.getUserById = getUserById;
