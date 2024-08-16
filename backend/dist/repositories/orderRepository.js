"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.getOrderById = exports.getAllOrders = exports.updatePayment = exports.updatePaymentStatus = exports.createOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOrder = async (data) => {
    const { userId, paymentMethod, paymentStatus = client_1.PaymentStatus.PENDING, orderItems } = data;
    // Cria o pedido sem totalAmount e orderItems
    const order = await prisma.order.create({
        data: {
            user: { connect: { id: userId } },
            paymentMethod,
            paymentStatus
        },
    });
    // Se orderItems são fornecidos, cria os itens e atualiza o totalAmount do pedido
    if (orderItems && orderItems.length > 0) {
        const itemsWithPrice = await Promise.all(orderItems.map(async (item) => {
            const price = await calculatePrice(item.productId);
            return { ...item, price };
        }));
        await Promise.all(itemsWithPrice.map((item) => {
            return prisma.orderItem.create({
                data: {
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                },
            });
        }));
        // Calcula o totalAmount do pedido
        const totalAmount = itemsWithPrice.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        // Atualiza o totalAmount do pedido
        await prisma.order.update({
            where: { id: order.id },
            data: { totalAmount },
        });
    }
    // Recarrega o pedido com os itens associados
    return await prisma.order.findUnique({
        where: { id: order.id },
        include: { orderItems: { include: { product: true } } },
    });
};
exports.createOrder = createOrder;
const updatePaymentStatus = async (orderId, paymentStatus) => {
    return prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus },
    });
};
exports.updatePaymentStatus = updatePaymentStatus;
const updatePayment = async (orderId) => {
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
        throw new Error(`Failed to finalize payment`);
    }
};
exports.updatePayment = updatePayment;
const calculatePrice = async (productId) => {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
        throw new Error('Product not found');
    }
    return product.price; // Preço do produto
};
const getAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            orderItems: {
                include: {
                    product: true, // Inclui os detalhes do produto em cada item do pedido
                },
            },
            user: true, // Inclui os detalhes do usuário que fez o pedido
        },
    });
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (orderId) => {
    return await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            orderItems: {
                include: {
                    product: true, // Inclui os detalhes do produto em cada item do pedido
                },
            },
            user: true, // Inclui os detalhes do usuário que fez o pedido
        },
    });
};
exports.getOrderById = getOrderById;
const deleteOrder = async (orderId) => {
    return await prisma.order.delete({
        where: { id: orderId },
    });
};
exports.deleteOrder = deleteOrder;
