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
exports.deleteOrder = exports.getAllOrders = exports.getOrderById = exports.processPayment = exports.finalizePayment = exports.createOrder = void 0;
const orderRepository = __importStar(require("../repositories/orderRepository"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOrder = async (data) => {
    return await orderRepository.createOrder(data);
};
exports.createOrder = createOrder;
const finalizePayment = async (orderId) => {
    try {
        // Atualiza o status de pagamento do pedido para COMPLETED
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                paymentStatus: client_1.PaymentStatus.COMPLETED,
            },
        });
        return updatedOrder;
    }
    catch (error) {
        // Lança um erro com uma mensagem mais específica
        throw new Error(`Failed to finalize payment:`);
    }
};
exports.finalizePayment = finalizePayment;
const processPayment = async (orderId, status) => {
    const updatedOrder = await orderRepository.updatePaymentStatus(orderId, status);
    return updatedOrder;
};
exports.processPayment = processPayment;
const getOrderById = async (id) => {
    return await orderRepository.getOrderById(id);
};
exports.getOrderById = getOrderById;
const getAllOrders = async () => {
    return await orderRepository.getAllOrders();
};
exports.getAllOrders = getAllOrders;
const deleteOrder = async (orderId) => {
    // Verifica se o pedido existe
    const order = await prisma.order.findUnique({
        where: { id: orderId },
    });
    if (!order) {
        throw new Error('Order not found');
    }
    return await orderRepository.deleteOrder(orderId);
};
exports.deleteOrder = deleteOrder;
