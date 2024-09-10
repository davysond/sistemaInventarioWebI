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
const categoryService = __importStar(require("../services/categoryService"));
jest.mock('../services/categoryService');
describe('Category Controller', () => {
    describe('POST /category', () => {
        it('should create a new category', async () => {
            const mockCategory = { id: 1, name: 'Electronics', description: 'Category for electronic products' };
            categoryService.createCategory.mockResolvedValue(mockCategory);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/category')
                .send({ name: 'Electronics', description: 'Category for electronic products' });
            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockCategory);
        });
        it('should return 400 if name is missing', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/category')
                .send({ description: 'Category without a name' });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Name is required' });
        });
    });
    describe('GET /category', () => {
        it('should get all categories', async () => {
            const mockCategories = [{ id: 1, name: 'Electronics', description: 'Category for electronic products' }];
            categoryService.getAllCategories.mockResolvedValue(mockCategories);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/category')
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCategories);
        });
        it('should return 500 if fetching categories fails', async () => {
            categoryService.getAllCategories.mockRejectedValue(new Error('Failed to fetch categories'));
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/category')
                .send();
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch categories' });
        });
    });
    describe('DELETE /category', () => {
        it('should delete a category', async () => {
            categoryService.deleteCategory.mockResolvedValue(undefined);
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/category')
                .send({ categoryId: 1 });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Category deleted successfully' });
        });
        it('should return 400 if categoryId is missing', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/category')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Category ID is required' });
        });
        it('should return 500 if deleting category fails', async () => {
            categoryService.deleteCategory.mockRejectedValue(new Error('Error deleting category'));
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/category')
                .send({ categoryId: 1 });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error deleting category' });
        });
    });
});
