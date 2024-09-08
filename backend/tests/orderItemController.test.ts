import request from 'supertest';
import app from '../app'; 
import * as orderItemService from '../services/orderItemService';

jest.mock('../services/orderItemService');

describe('Order Item Controller', () => {

  describe('POST /order-items/:orderId', () => {
    it('should add a new order item to an existing order', async () => {
      const mockOrderItem = { id: 1, orderId: 1, productId: 1, quantity: 2 };
      (orderItemService.addOrderItemToExistingOrder as jest.Mock).mockResolvedValue(mockOrderItem);

      const response = await request(app)
        .post('/order-items/1')
        .send({ productId: 1, quantity: 2 });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockOrderItem);
    });

    it('should return 400 if orderId, productId, or quantity is missing', async () => {
      const response = await request(app)
        .post('/order-items/1')
        .send({ productId: 1 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Order ID, product ID, and quantity are required' });
    });

    it('should return 500 if service fails', async () => {
      (orderItemService.addOrderItemToExistingOrder as jest.Mock).mockRejectedValue(new Error('Error adding order item'));

      const response = await request(app)
        .post('/order-items/1')
        .send({ productId: 1, quantity: 2 });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Error adding order item' });
    });
  });

  describe('DELETE /order-items', () => {
    it('should delete an order item', async () => {
      (orderItemService.deleteOrderItem as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .delete('/order-items')
        .send({ orderItemId: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Order item deleted successfully' });
    });

    it('should return 400 if orderItemId is missing', async () => {
      const response = await request(app)
        .delete('/order-items')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Order item ID is required' });
    });

    it('should return 500 if service fails', async () => {
      (orderItemService.deleteOrderItem as jest.Mock).mockRejectedValue(new Error('Error deleting order item'));

      const response = await request(app)
        .delete('/order-items')
        .send({ orderItemId: 1 });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Error deleting order item' });
    });
  });

});
