"use strict";
// src/repositories/productRepository.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductsByUserId = exports.getAllProducts = void 0;
const prismaClient_1 = __importDefault(require("../infraestructure/prismaClient"));
const getAllProducts = async () => {
    return await prismaClient_1.default.product.findMany();
};
exports.getAllProducts = getAllProducts;
const getProductsByUserId = async (userId) => {
    return await prismaClient_1.default.product.findMany({ where: { userId } });
};
exports.getProductsByUserId = getProductsByUserId;
const createProduct = async (data) => {
    return await prismaClient_1.default.product.create({ data });
};
exports.createProduct = createProduct;
const updateProduct = async (id, data) => {
    return await prismaClient_1.default.product.update({
        where: { id },
        data,
    });
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    return await prismaClient_1.default.product.delete({ where: { id } });
};
exports.deleteProduct = deleteProduct;
