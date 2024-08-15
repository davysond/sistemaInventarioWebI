"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductsByUserId = exports.getAllProducts = exports.getProductById = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProduct = async (data) => {
    const { name, description, price, userId, categoryId } = data;
    if (!name || !price) {
        throw new Error('Name and price are required');
    }
    return await prisma.product.create({
        data: {
            name,
            description: description || null,
            price,
            userId: userId || null,
            categoryId: categoryId || null,
        },
        include: {
            category: true, // Inclui categoria se estiver presente
        },
    });
};
exports.createProduct = createProduct;
const getProductById = async (id) => {
    return await prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
        },
    });
};
exports.getProductById = getProductById;
// Adicione mais métodos conforme necessário
const getAllProducts = async () => {
    return await prisma.product.findMany();
};
exports.getAllProducts = getAllProducts;
const getProductsByUserId = async (userId) => {
    return await prisma.product.findMany({ where: { userId } });
};
exports.getProductsByUserId = getProductsByUserId;
const updateProduct = async (id, data) => {
    return await prisma.product.update({
        where: { id },
        data,
    });
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    return await prisma.product.delete({ where: { id } });
};
exports.deleteProduct = deleteProduct;
