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
exports.deleteProduct = exports.updateProduct = exports.getProductsByUserId = exports.getAllProducts = exports.getProductById = exports.createProduct = void 0;
const productRepository = __importStar(require("../repositories/productRepository"));
const createProduct = async (data) => {
    const { name, description, price, userId, categoryId } = data;
    if (!name || !price) {
        throw new Error('Name and price are required');
    }
    return await productRepository.createProduct({
        name,
        description,
        price,
        userId,
        categoryId,
    });
};
exports.createProduct = createProduct;
const getProductById = async (id) => {
    if (!id) {
        throw new Error('Product ID is required');
    }
    return await productRepository.getProductById(id);
};
exports.getProductById = getProductById;
const getAllProducts = async () => {
    return await productRepository.getAllProducts();
};
exports.getAllProducts = getAllProducts;
const getProductsByUserId = async (userId) => {
    return await productRepository.getProductsByUserId(userId);
};
exports.getProductsByUserId = getProductsByUserId;
const updateProduct = async (id, data) => {
    return await productRepository.updateProduct(id, data);
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    return await productRepository.deleteProduct(id);
};
exports.deleteProduct = deleteProduct;
