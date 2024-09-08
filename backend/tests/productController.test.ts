import request from 'supertest';
import app from '../app';
import * as productService from '../services/productService';
import { PrismaClient } from '@prisma/client';

jest.mock('../services/productService');
jest.mock('@prisma/client', () => {
  const PrismaClientMock = {
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => PrismaClientMock) };
});

describe('Product Controller', () => {
  
  describe('POST /products/createProduct', () => {
    it('should create a new product', async () => {
      const mockProduct = { id: 1, name: 'Product 1', description: 'A great product', price: 10.99, categoryId: 1 };
      (productService.createProduct as jest.Mock).mockResolvedValue(mockProduct);

      const response = await request(app)
        .post('/products/createProduct')
        .send({ name: 'Product 1', description: 'A great product', price: 10.99, categoryId: 1 });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockProduct);
    });

    it('should return 400 if name or price is missing', async () => {
      const response = await request(app)
        .post('/products/createProduct')
        .send({ description: 'A product without a name and price' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name and price are required' });
    });
  });

  describe('GET /products', () => {
    it('should get all products', async () => {
      const mockProducts = [{ id: 1, name: 'Product 1', price: 10.99 }];
      (productService.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);

      const response = await request(app)
        .get('/products')
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProducts);
    });

    it('should return 500 if fetching products fails', async () => {
      (productService.getAllProducts as jest.Mock).mockRejectedValue(new Error('Failed to fetch products'));

      const response = await request(app)
        .get('/products')
        .send();

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch products' });
    });
  });

  describe('PUT /products/:id', () => {
    it('should update a product', async () => {
      const mockProduct = { id: 1, name: 'Updated Product', price: 15.99 };
      (productService.updateProduct as jest.Mock).mockResolvedValue(mockProduct);

      const response = await request(app)
        .put('/products/1')
        .send({ name: 'Updated Product', price: 15.99 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProduct);
    });

    it('should return 500 if updating product fails', async () => {
      (productService.updateProduct as jest.Mock).mockRejectedValue(new Error('Failed to update product'));

      const response = await request(app)
        .put('/products/1')
        .send({ name: 'Updated Product', price: 15.99 });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to update product' });
    });
  });

  describe('DELETE /products/:id', () => {
    it('should delete a product', async () => {
      (productService.deleteProduct as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .delete('/products/1')
        .send();

      expect(response.status).toBe(204);
    });

    it('should return 500 if deleting product fails', async () => {
      (productService.deleteProduct as jest.Mock).mockRejectedValue(new Error('Failed to delete product'));

      const response = await request(app)
        .delete('/products/1')
        .send();

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to delete product' });
    });
  });

});
