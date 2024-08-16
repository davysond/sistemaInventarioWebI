import * as orderRepository from '../repositories/orderRepository';
import { PrismaClient, PaymentMethod, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (data: {
    userId: number;
    paymentMethod: PaymentMethod,
    paymentStatus?: PaymentStatus
    orderItems?: {
      productId: number;
      quantity: number;
    }[];
  }) => {
    return await orderRepository.createOrder(data);
};

export const finalizePayment = async (orderId: number) => {
  try {
    // Atualiza o status de pagamento do pedido para COMPLETED
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.COMPLETED,
      },
    });

    return updatedOrder;
  } catch (error) {
    // Lança um erro com uma mensagem mais específica
    throw new Error(`Failed to finalize payment:`);
  }
};

export const processPayment = async (orderId: number, status: PaymentStatus) => {
  const updatedOrder = await orderRepository.updatePaymentStatus(orderId, status);
  return updatedOrder;
}

export const getOrderById = async (id: number) => {
  return await orderRepository.getOrderById(id);
};

export const getAllOrders = async () => {
  return await orderRepository.getAllOrders();
};

export const deleteOrder = async (orderId: number) => {
  // Verifica se o pedido existe
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error('Order not found');
  }

  return await orderRepository.deleteOrder(orderId);
};
