import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
      console.error('Error creating order:', error);  // Log para depuração
      res.status(500).json({ error: 'Error creating order' });
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
