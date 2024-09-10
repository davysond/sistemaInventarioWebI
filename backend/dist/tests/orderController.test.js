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
const orderService = __importStar(require("../services/orderService"));
jest.mock('../services/orderService');
describe('Order Controller', () => {
    describe('POST /orders', () => {
        it('should create a new order', async () => {
            const mockOrder = { id: 1, userId: 1, paymentMethod: 'CREDIT_CARD', paymentStatus: 'PENDING', orderItems: [] };
            orderService.createOrder.mockResolvedValue(mockOrder);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/orders')
                .send({ userId: 1, paymentMethod: 'CREDIT_CARD', paymentStatus: 'PENDING', orderItems: [] });
            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockOrder);
        });
        it('should return 400 if userId or orderItems are missing', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/orders')
                .send({ paymentMethod: 'CREDIT_CARD', paymentStatus: 'PENDING' });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'User ID and order items are required' });
        });
        it('should return 500 if service fails', async () => {
            orderService.createOrder.mockRejectedValue(new Error('Error creating order'));
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/orders')
                .send({ userId: 1, paymentMethod: 'CREDIT_CARD', paymentStatus: 'PENDING', orderItems: [] });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error creating order' });
        });
    });
    describe('POST /orders/:orderId/payment', () => {
        it('should finish payment and return the updated order', async () => {
            const mockOrder = { id: 1, paymentStatus: 'PAID' };
            orderService.finalizePayment.mockResolvedValue(mockOrder);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/orders/1/payment')
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockOrder);
        });
        it('should return 500 if service fails', async () => {
            orderService.finalizePayment.mockRejectedValue(new Error('Error finalizing order'));
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/orders/1/payment')
                .send();
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error finalizing order' });
        });
    });
    describe('GET /orders', () => {
        it('should get all orders', async () => {
            const mockOrders = [{ id: 1, userId: 1 }];
            orderService.getAllOrders.mockResolvedValue(mockOrders);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/orders')
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockOrders);
        });
        it('should return 500 if fetching orders fails', async () => {
            orderService.getAllOrders.mockRejectedValue(new Error('Failed to fetch orders'));
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/orders')
                .send();
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch orders' });
        });
    });
    describe('GET /orders/:id', () => {
        it('should get an order by id', async () => {
            const mockOrder = { id: 1, userId: 1 };
            orderService.getOrderById.mockResolvedValue(mockOrder);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/orders/1')
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockOrder);
        });
        it('should return 404 if order not found', async () => {
            orderService.getOrderById.mockResolvedValue(null);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/orders/1')
                .send();
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Order not found' });
        });
        it('should return 500 if fetching order by id fails', async () => {
            orderService.getOrderById.mockRejectedValue(new Error('Failed to fetch order'));
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/orders/1')
                .send();
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch order' });
        });
    });
    describe('DELETE /orders', () => {
        it('should delete an order', async () => {
            orderService.deleteOrder.mockResolvedValue(undefined);
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/orders')
                .send({ orderId: 1 });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Order deleted successfully' });
        });
        it('should return 500 if service fails', async () => {
            orderService.deleteOrder.mockRejectedValue(new Error('Error deleting order'));
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/orders')
                .send({ orderId: 1 });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error deleting order' });
        });
    });
});
