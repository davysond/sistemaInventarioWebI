"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getAllCategories = exports.createCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCategory = async (data) => {
    return await prisma.category.create({
        data: {
            name: data.name,
            description: data.description
        },
    });
};
exports.createCategory = createCategory;
const getAllCategories = async () => {
    return await prisma.category.findMany({
        include: {
            products: true, // Inclui os produtos associados a cada categoria
        },
    });
};
exports.getAllCategories = getAllCategories;
const updateCategory = async (categoryId, data) => {
    return await prisma.category.update({
        where: { id: categoryId },
        data: {
            name: data.name,
        },
    });
};
exports.updateCategory = updateCategory;
const deleteCategory = async (categoryId) => {
    return await prisma.category.delete({
        where: { id: categoryId },
    });
};
exports.deleteCategory = deleteCategory;
