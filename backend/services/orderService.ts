import * as orderRepository from '../repositories/orderRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (data: {
    userId: number;
    orderItems?: {
      productId: number;
      quantity: number;
    }[];
  }) => {
    return await orderRepository.createOrder(data);
};

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
