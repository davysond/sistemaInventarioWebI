"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.promoteUserToAdmin = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authConfig_1 = require("../configs/authConfig");
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
    return await prisma.user.update({
        where: { id: userId },
        data: { isAdmin: true },
    });
};
exports.promoteUserToAdmin = promoteUserToAdmin;
const deleteUser = async (userId) => {
    return await prisma.user.delete({
        where: { id: userId },
    });
};
exports.deleteUser = deleteUser;
const getAllUsers = async () => {
    return await prisma.user.findMany({
        include: {
            products: true,
            orders: true
        },
    });
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id },
        include: {
            products: true,
            orders: true
        },
    });
};
exports.getUserById = getUserById;
