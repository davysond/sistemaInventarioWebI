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
exports.deleteOrder = exports.getOrderById = exports.getAllOrders = exports.updatePaymentStatus = exports.finishPayment = exports.createOrder = void 0;
const orderService = __importStar(require("../services/orderService"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOrder = async (req, res) => {
    try {
        const { userId, paymentMethod, paymentStatus, orderItems } = req.body;
        if (!userId || !orderItems) {
            res.status(400).json({ error: 'User ID and order items are required' });
            return;
        }
        const order = await orderService.createOrder({
            userId,
            paymentMethod,
            paymentStatus,
            orderItems,
        });
        res.status(201).json(order);
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Error creating order' });
    }
};
exports.createOrder = createOrder;
const finishPayment = async (req, res) => {
    const { orderId } = req.params;
    try {
        // Converte o orderId para número
        const id = parseInt(orderId, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid order ID' });
        }
        // Chama o serviço para finalizar o pagamento
        const updatedOrder = await orderService.finalizePayment(id);
        return res.status(200).json(updatedOrder);
    }
    catch (error) {
        // Retorna um erro 500 em caso de falha
        return res.status(500).json({ error: 'Error finalizing order' });
    }
};
exports.finishPayment = finishPayment;
const updatePaymentStatus = async (req, res) => {
    const { orderId, paymentStatus } = req.body;
    if (!Object.values(client_1.PaymentStatus).includes(paymentStatus)) {
        return res.status(400).json({ error: "Invalid payment status." });
    }
};
exports.updatePaymentStatus = updatePaymentStatus;
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderService.getOrderById(Number(id));
        if (!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};
exports.getOrderById = getOrderById;
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            res.status(400).json({ error: 'Order ID is required' });
            return;
        }
        await orderService.deleteOrder(orderId);
        res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting order' });
    }
};
exports.deleteOrder = deleteOrder;
