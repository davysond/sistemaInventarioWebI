"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductsByUserId = exports.getAllProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllProducts = async () => {
    return await prisma.product.findMany();
};
exports.getAllProducts = getAllProducts;
const getProductsByUserId = async (userId) => {
    return await prisma.product.findMany({ where: { userId } });
};
exports.getProductsByUserId = getProductsByUserId;
const createProduct = async (data) => {
    return await prisma.product.create({ data });
};
exports.createProduct = createProduct;
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
