import { Request, Response } from 'express';
import * as orderItemService from '../services/orderItemService';

export const addOrderItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderId = Number(req.params.orderId);
      const { productId, quantity } = req.body;
  
      if (!orderId || !productId || !quantity) {
        res.status(400).json({ error: 'Order ID, product ID, and quantity are required' });
        return;
      }
  
      const orderItem = await orderItemService.addOrderItemToExistingOrder(orderId, {
        productId,
        quantity,
      });
  
      res.status(201).json(orderItem);
    } catch (error) {
      console.error('Error adding order item:', error);
      res.status(500).json({ error: 'Error adding order item' });
    }
  };;

export const deleteOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderItemId } = req.body;

    if (!orderItemId) {
      res.status(400).json({ error: 'Order item ID is required' });
      return;
    }

    await orderItemService.deleteOrderItem(orderItemId);
    res.status(200).json({ message: 'Order item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order item' });
  }
};
