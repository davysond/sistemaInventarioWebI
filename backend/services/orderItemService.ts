import * as orderItemRepository from '../repositories/orderItemRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addOrderItemToExistingOrder = async (orderId: number, item: {
    productId: number;
    quantity: number;
  }) => {
    return await orderItemRepository.addOrderItemToExistingOrder(orderId, item);
  };

export const deleteOrderItem = async (orderItemId: number) => {
  // Verifica se o item do pedido existe
  const orderItem = await prisma.orderItem.findUnique({
    where: { id: orderItemId },
  });

  if (!orderItem) {
    throw new Error('OrderItem not found');
  }

  return await orderItemRepository.deleteOrderItem(orderItemId);
};
