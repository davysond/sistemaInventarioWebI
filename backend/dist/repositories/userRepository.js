"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.promoteUserToAdmin = exports.createNewUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const createNewUser = async (data) => {
    const { name, email, password, products } = data;
    // Criptografa a senha
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    // Cria o novo usuário e seus produtos associados
    return await prisma.user.create({
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
            products: true, // Inclui a lista de produtos na resposta
        },
    });
};
exports.createNewUser = createNewUser;
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
