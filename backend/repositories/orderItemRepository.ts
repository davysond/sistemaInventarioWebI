import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addOrderItemToExistingOrder = async (orderId: number, item: {
    productId: number;
    quantity: number;
  }) => {
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
  
    const totalAmount = order.orderItems.reduce(
      (sum, orderItem) => sum + (orderItem.price * orderItem.quantity),
      newOrderItem.price * newOrderItem.quantity
    );
  
    await prisma.order.update({
      where: { id: orderId },
      data: { totalAmount },
    });
  
    return newOrderItem;
  };

  const calculatePrice = async (productId: number) => {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new Error('Product not found');
    }
    return product.price; // Preço do produto
  };
  
  export const deleteOrderItem = async (orderItemId: number) => {
    return await prisma.orderItem.delete({
      where: { id: orderItemId },
    });
  };
  