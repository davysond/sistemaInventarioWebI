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
const userService = __importStar(require("../services/userService"));
const authService = __importStar(require("../services/authService"));
jest.mock('../services/userService');
jest.mock('../services/authService');
describe('User Controller', () => {
    describe('POST /users', () => {
        it('should create a new user', async () => {
            const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'hashedpassword', products: [] };
            userService.createUser.mockResolvedValue(mockUser);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/users')
                .send({ name: 'John Doe', email: 'john@example.com', password: '123456', products: [] });
            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockUser);
        });
        it('should return 400 if required fields are missing', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/users')
                .send({ email: 'john@example.com', password: '123456' });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Name, email, and password are required' });
        });
    });
    describe('POST /login', () => {
        it('should login a user', async () => {
            const mockResult = { token: 'fakeToken' };
            authService.loginUser.mockResolvedValue(mockResult);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/login')
                .send({ email: 'john@example.com', password: '123456' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResult);
        });
        it('should return 400 on login error', async () => {
            authService.loginUser.mockRejectedValue(new Error('Login failed'));
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/login')
                .send({ email: 'john@example.com', password: '123456' });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Error login.' });
        });
    });
    describe('PUT /users/:userId/promote', () => {
        it('should promote a user to admin', async () => {
            const mockUpdatedUser = { id: 1, name: 'John Doe', email: 'john@example.com', isAdmin: true };
            userService.promoteUserToAdmin.mockResolvedValue(mockUpdatedUser);
            const response = await (0, supertest_1.default)(app_1.default)
                .put('/users/1/promote')
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUpdatedUser);
        });
        it('should return 500 if promotion fails', async () => {
            userService.promoteUserToAdmin.mockRejectedValue(new Error('Failed to promote user to admin'));
            const response = await (0, supertest_1.default)(app_1.default)
                .put('/users/1/promote')
                .send();
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to promote user to admin' });
        });
    });
    describe('DELETE /users', () => {
        it('should delete a user', async () => {
            userService.deleteUser.mockResolvedValue(undefined);
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/users')
                .send({ adminUserId: 1, userId: 2 });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'User deleted successfully' });
        });
        it('should return 400 if required fields are missing', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/users')
                .send({ adminUserId: 1 });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Both adminUserId and userId are required' });
        });
    });
    describe('GET /users', () => {
        it('should get all users', async () => {
            const mockUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
            userService.getAllUsers.mockResolvedValue(mockUsers);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/users')
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers);
        });
        it('should return 500 if fetching users fails', async () => {
            userService.getAllUsers.mockRejectedValue(new Error('Failed to fetch users'));
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/users')
                .send();
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch users' });
        });
    });
    describe('GET /users/:id', () => {
        it('should get a user by id', async () => {
            const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
            userService.getUserById.mockResolvedValue(mockUser);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/users/1')
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
        });
        it('should return 500 if fetching user by id fails', async () => {
            userService.getUserById.mockRejectedValue(new Error('Failed to fetch user'));
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/users/1')
                .send();
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch user' });
        });
    });
});
