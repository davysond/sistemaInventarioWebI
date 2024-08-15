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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getAllCategories = exports.createCategory = void 0;
const categoryRepository = __importStar(require("../repositories/categoryRepository"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCategory = async (data) => {
    // Valida o nome da categoria
    if (!data.name) {
        throw new Error('Category name is required');
    }
    return await categoryRepository.createCategory(data);
};
exports.createCategory = createCategory;
const getAllCategories = async () => {
    return await categoryRepository.getAllCategories();
};
exports.getAllCategories = getAllCategories;
const updateCategory = async (categoryId, data) => {
    // Verifica se a categoria existe
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });
    if (!category) {
        throw new Error('Category not found');
    }
    return await categoryRepository.updateCategory(categoryId, data);
};
exports.updateCategory = updateCategory;
const deleteCategory = async (categoryId) => {
    // Verifica se a categoria existe
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });
    if (!category) {
        throw new Error('Category not found');
    }
    return await categoryRepository.deleteCategory(categoryId);
};
exports.deleteCategory = deleteCategory;
