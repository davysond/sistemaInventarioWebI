import { PrismaClient, PaymentMethod, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (data: {
    userId: number;
    paymentMethod: PaymentMethod;
    paymentStatus?: PaymentStatus;
    orderItems?: {
      productId: number;
      quantity: number;
    }[];
  }) => {
    const { userId, paymentMethod, paymentStatus = PaymentStatus.PENDING, orderItems } = data;
  
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
      const itemsWithPrice = await Promise.all(
        orderItems.map(async (item) => {
          const price = await calculatePrice(item.productId);
          return { ...item, price };
        })
      );
  
      await Promise.all(
        itemsWithPrice.map((item) => {
          return prisma.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            },
          });
        })
      );
  
      // Calcula o totalAmount do pedido
      const totalAmount = itemsWithPrice.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );
  
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

  export const updatePaymentStatus = async (orderId: number, paymentStatus: PaymentStatus) => {
    return prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus },
    });
  }

  export const updatePayment = async (orderId: number) => {
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
      throw new Error(`Failed to finalize payment`);
    }
  };
  
  const calculatePrice = async (productId: number) => {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new Error('Product not found');
    }
    return product.price; // Preço do produto
  };

export const getAllOrders = async () => {
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

export const getOrderById = async (orderId: number) => {
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

export const deleteOrder = async (orderId: number) => {
  return await prisma.order.delete({
    where: { id: orderId },
  });
};
