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
exports.deleteProduct = exports.updateProduct = exports.getProductsByUserId = exports.getAllProducts = exports.createProduct = void 0;
const productService = __importStar(require("../services/productService"));
const utils_1 = require("../utils/utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body;
        if (!name || !price) {
            res.status(400).json({ error: 'Name and price are required' });
            return;
        }
        const product = await productService.createProduct({
            name,
            description,
            price,
            categoryId,
        });
        const filteredProduct = (0, utils_1.filterNulls)(product);
        res.status(201).json(filteredProduct);
    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Error creating product' });
    }
};
exports.createProduct = createProduct;
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};
exports.getAllProducts = getAllProducts;
const getProductsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const products = await productService.getProductsByUserId(Number(userId));
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};
exports.getProductsByUserId = getProductsByUserId;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.updateProduct(Number(id), req.body);
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(Number(id));
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
exports.deleteProduct = deleteProduct;
