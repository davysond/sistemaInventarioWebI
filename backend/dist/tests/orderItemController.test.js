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
const orderItemService = __importStar(require("../services/orderItemService"));
jest.mock('../services/orderItemService');
describe('Order Item Controller', () => {
    describe('POST /order-items/:orderId', () => {
        it('should add a new order item to an existing order', async () => {
            const mockOrderItem = { id: 1, orderId: 1, productId: 1, quantity: 2 };
            orderItemService.addOrderItemToExistingOrder.mockResolvedValue(mockOrderItem);
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/order-items/1')
                .send({ productId: 1, quantity: 2 });
            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockOrderItem);
        });
        it('should return 400 if orderId, productId, or quantity is missing', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/order-items/1')
                .send({ productId: 1 });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Order ID, product ID, and quantity are required' });
        });
        it('should return 500 if service fails', async () => {
            orderItemService.addOrderItemToExistingOrder.mockRejectedValue(new Error('Error adding order item'));
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/order-items/1')
                .send({ productId: 1, quantity: 2 });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error adding order item' });
        });
    });
    describe('DELETE /order-items', () => {
        it('should delete an order item', async () => {
            orderItemService.deleteOrderItem.mockResolvedValue(undefined);
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/order-items')
                .send({ orderItemId: 1 });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Order item deleted successfully' });
        });
        it('should return 400 if orderItemId is missing', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/order-items')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Order item ID is required' });
        });
        it('should return 500 if service fails', async () => {
            orderItemService.deleteOrderItem.mockRejectedValue(new Error('Error deleting order item'));
            const response = await (0, supertest_1.default)(app_1.default)
                .delete('/order-items')
                .send({ orderItemId: 1 });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error deleting order item' });
        });
    });
});
