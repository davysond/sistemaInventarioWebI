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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const productService = __importStar(require("../services/productService"));
jest.mock('../services/productService');
jest.mock('@prisma/client', () => {
    const PrismaClientMock = {
        $disconnect: jest.fn(),
    };
    return { PrismaClient: jest.fn(() => PrismaClientMock) };
});
describe('Product Controller', () => {
    describe('POST /products', () => {
        it('should create a new product', async () => {
            const mockProduct = { id: 1, name: 'Product 1', description: 'A great product', price: 10.99, categoryId: 1 };
            productService.createProduct.mockResolvedValue(mockProduct);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/products')
                .send({ name: 'Product 1', description: 'A great product', price: 10.99, categoryId: 1 });
            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockProduct);
        });
        it('should return 400 if name or price is missing', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/products')
                .send({ description: 'A product without a name and price' });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Name and price are required' });
        });
    });
    describe('GET /products', () => {
        it('should get all products', async () => {
            const mockProducts = [{ id: 1, name: 'Product 1', price: 10.99 }];
            productService.getAllProducts.mockResolvedValue(mockProducts);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/products')
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProducts);
        });
        it('should return 500 if fetching products fails', async () => {
            productService.getAllProducts.mockRejectedValue(new Error('Failed to fetch products'));
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/products')
                .send();
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch products' });
        });
    });
    describe('GET /products/user/:userId', () => {
        it('should get products by userId', async () => {
            const mockProducts = [{ id: 1, name: 'Product 1', price: 10.99 }];
            productService.getProductsByUserId.mockResolvedValue(mockProducts);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/products/user/1')
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProducts);
        });
        it('should return 500 if fetching products by userId fails', async () => {
            productService.getProductsByUserId.mockRejectedValue(new Error('Failed to fetch products'));
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/products/user/1')
                .send();
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch products' });
        });
    });
    describe('PUT /products/:id', () => {
        it('should update a product', async () => {
            const mockProduct = { id: 1, name: 'Updated Product', price: 15.99 };
            productService.updateProduct.mockResolvedValue(mockProduct);
            const response = await (0, supertest_1.default)(app_1.default)
                .put('/products/1')
                .send({ name: 'Updated Product', price: 15.99 });
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProduct);
        });
        it('should return 500 if updating product fails', async () => {
            productService.updateProduct.mockRejectedValue(new Error('Failed to update product'));
            const response = await (0, supertest_1.default)(app_1.default)
                .put('/products/1')
                .send({ name: 'Updated Product', price: 15.99 });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to update product' });
        });
    });
    describe('DELETE /products/:id', () => {
        it('should delete a product', async () => {
            productService.deleteProduct.mockResolvedValue(undefined);
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/products/1')
                .send();
            expect(response.status).toBe(204);
        });
        it('should return 500 if deleting product fails', async () => {
            productService.deleteProduct.mockRejectedValue(new Error('Failed to delete product'));
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/products/1')
                .send();
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to delete product' });
        });
    });
});
