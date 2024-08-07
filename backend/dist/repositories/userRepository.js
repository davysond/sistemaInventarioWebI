"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = async (data) => {
    return await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            products: {
                create: data.products?.map(product => ({
                    name: product.name,
                    description: product.description,
                    price: product.price
                })) || [], // Usa uma lista vazia se products não for fornecido
            },
        },
        include: {
            products: true, // Inclui a lista de produtos na resposta
        },
    });
};
exports.createUser = createUser;
const getAllUsers = async () => {
    return await prisma.user.findMany({
        include: {
            products: true, // Inclui a lista de produtos associados a cada usuário
        },
    });
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id },
        include: {
            products: true, // Inclui a lista de produtos associados ao usuário
        },
    });
};
exports.getUserById = getUserById;
