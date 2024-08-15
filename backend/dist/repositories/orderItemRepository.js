"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderItem = exports.addOrderItemToExistingOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addOrderItemToExistingOrder = async (orderId, item) => {
    const price = await calculatePrice(item.productId);
    const newOrderItem = await prisma.orderItem.create({
        data: {
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            price,
        },
    });
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { orderItems: true },
    });
    if (!order) {
        throw new Error('Order not found');
    }
    const totalAmount = order.orderItems.reduce((sum, orderItem) => sum + (orderItem.price * orderItem.quantity), newOrderItem.price * newOrderItem.quantity);
    await prisma.order.update({
        where: { id: orderId },
        data: { totalAmount },
    });
    return newOrderItem;
};
exports.addOrderItemToExistingOrder = addOrderItemToExistingOrder;
const calculatePrice = async (productId) => {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
        throw new Error('Product not found');
    }
    return product.price; // Preço do produto
};
const deleteOrderItem = async (orderItemId) => {
    return await prisma.orderItem.delete({
        where: { id: orderItemId },
    });
};
exports.deleteOrderItem = deleteOrderItem;
