import request from 'supertest';
import app from '../app'; 
import * as orderService from '../services/orderService';
import { PaymentStatus } from '@prisma/client';

jest.mock('../services/orderService');

describe('Order Controller', () => {

  describe('POST /orders', () => {
    it('should create a new order', async () => {
      const mockOrder = { id: 1, userId: 1, paymentMethod: 'CREDIT_CARD', paymentStatus: 'PENDING', orderItems: [] };
      (orderService.createOrder as jest.Mock).mockResolvedValue(mockOrder);

      const response = await request(app)
        .post('/orders')
        .send({ userId: 1, paymentMethod: 'CREDIT_CARD', paymentStatus: 'PENDING', orderItems: [] });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockOrder);
    });

    it('should return 400 if userId or orderItems are missing', async () => {
      const response = await request(app)
        .post('/orders')
        .send({ paymentMethod: 'CREDIT_CARD', paymentStatus: 'PENDING' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'User ID and order items are required' });
    });

    it('should return 500 if service fails', async () => {
      (orderService.createOrder as jest.Mock).mockRejectedValue(new Error('Error creating order'));

      const response = await request(app)
        .post('/orders')
        .send({ userId: 1, paymentMethod: 'CREDIT_CARD', paymentStatus: 'PENDING', orderItems: [] });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Error creating order' });
    });
  });

  describe('POST /orders/:orderId/payment', () => {
    it('should finish payment and return the updated order', async () => {
      const mockOrder = { id: 1, paymentStatus: 'PAID' };
      (orderService.finalizePayment as jest.Mock).mockResolvedValue(mockOrder);

      const response = await request(app)
        .post('/orders/1/payment')
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrder);
    });

    it('should return 500 if service fails', async () => {
      (orderService.finalizePayment as jest.Mock).mockRejectedValue(new Error('Error finalizing order'));

      const response = await request(app)
        .post('/orders/1/payment')
        .send();

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Error finalizing order' });
    });
  });

  describe('GET /orders', () => {
    it('should get all orders', async () => {
      const mockOrders = [{ id: 1, userId: 1 }];
      (orderService.getAllOrders as jest.Mock).mockResolvedValue(mockOrders);

      const response = await request(app)
        .get('/orders')
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrders);
    });

    it('should return 500 if fetching orders fails', async () => {
      (orderService.getAllOrders as jest.Mock).mockRejectedValue(new Error('Failed to fetch orders'));

      const response = await request(app)
        .get('/orders')
        .send();

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch orders' });
    });
  });

  describe('GET /orders/:id', () => {
    it('should get an order by id', async () => {
      const mockOrder = { id: 1, userId: 1 };
      (orderService.getOrderById as jest.Mock).mockResolvedValue(mockOrder);

      const response = await request(app)
        .get('/orders/1')
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrder);
    });

    it('should return 404 if order not found', async () => {
      (orderService.getOrderById as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .get('/orders/1')
        .send();

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Order not found' });
    });

    it('should return 500 if fetching order by id fails', async () => {
      (orderService.getOrderById as jest.Mock).mockRejectedValue(new Error('Failed to fetch order'));

      const response = await request(app)
        .get('/orders/1')
        .send();

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch order' });
    });
  });

  describe('DELETE /orders', () => {
    it('should delete an order', async () => {
      (orderService.deleteOrder as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .delete('/orders')
        .send({ orderId: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Order deleted successfully' });
    });

    it('should return 500 if service fails', async () => {
      (orderService.deleteOrder as jest.Mock).mockRejectedValue(new Error('Error deleting order'));

      const response = await request(app)
        .delete('/orders')
        .send({ orderId: 1 });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Error deleting order' });
    });
  });

});
