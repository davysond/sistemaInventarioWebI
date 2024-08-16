import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import { PrismaClient, PaymentMethod, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, paymentMethod, paymentStatus, orderItems } = req.body;
  
      // Validação básica dos dados
      if (!userId || !orderItems) {
        res.status(400).json({ error: 'User ID and order items are required' });
        return;
      }
  
      // Chama o serviço para criar o pedido
      const order = await orderService.createOrder({
        userId,
        paymentMethod,
        paymentStatus,
        orderItems,
      });
  
      // Responde com o pedido criado
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);  // Log para depuração
      res.status(500).json({ error: 'Error creating order' });
    }
  };

  export const finishPayment = async (req: Request, res: Response) => {
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
    } catch (error) {
      // Retorna um erro 500 em caso de falha
      return res.status(500).json({ error: 'Error finalizing order' });
    }
  }

export const updatePaymentStatus = async(req: Request, res: Response) => {
  const { orderId, paymentStatus } = req.body;

  if (!Object.values(PaymentStatus).includes(paymentStatus)) {
    return res.status(400).json({ error: "Invalid payment status." });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(Number(id));
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};


export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      res.status(400).json({ error: 'Order ID is required' });
      return;
    }

    await orderService.deleteOrder(orderId);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
};
