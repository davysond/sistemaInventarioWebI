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
exports.deleteOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const orderService = __importStar(require("../services/orderService"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOrder = async (req, res) => {
    try {
        const { userId, orderItems } = req.body;
        // Validação básica dos dados
        if (!userId || !orderItems) {
            res.status(400).json({ error: 'User ID and order items are required' });
            return;
        }
        // Chama o serviço para criar o pedido
        const order = await orderService.createOrder({
            userId,
            orderItems,
        });
        // Responde com o pedido criado
        res.status(201).json(order);
    }
    catch (error) {
        console.error('Error creating order:', error); // Log para depuração
        res.status(500).json({ error: 'Error creating order' });
    }
};
exports.createOrder = createOrder;
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
