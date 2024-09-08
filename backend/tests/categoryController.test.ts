import request from 'supertest';
import app from '../app';
import * as categoryService from '../services/categoryService';

jest.mock('../services/categoryService');

describe('Category Controller', () => {

  describe('POST /category', () => {
    it('should create a new category', async () => {
      const mockCategory = { id: 1, name: 'Electronics', description: 'Category for electronic products' };
      (categoryService.createCategory as jest.Mock).mockResolvedValue(mockCategory);

      const response = await request(app)
        .post('/category')
        .send({ name: 'Electronics', description: 'Category for electronic products' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCategory);
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/category')
        .send({ description: 'Category without a name' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name is required' });
    });
  });

  describe('GET /category', () => {
    it('should get all categories', async () => {
      const mockCategories = [{ id: 1, name: 'Electronics', description: 'Category for electronic products' }];
      (categoryService.getAllCategories as jest.Mock).mockResolvedValue(mockCategories);

      const response = await request(app)
        .get('/category')
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCategories);
    });

    it('should return 500 if fetching categories fails', async () => {
      (categoryService.getAllCategories as jest.Mock).mockRejectedValue(new Error('Failed to fetch categories'));

      const response = await request(app)
        .get('/category')
        .send();

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch categories' });
    });
  });

  describe('DELETE /category', () => {
    it('should delete a category', async () => {
      (categoryService.deleteCategory as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .delete('/category')
        .send({ categoryId: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Category deleted successfully' });
    });

    it('should return 400 if categoryId is missing', async () => {
      const response = await request(app)
        .delete('/category')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Category ID is required' });
    });

    it('should return 500 if deleting category fails', async () => {
      (categoryService.deleteCategory as jest.Mock).mockRejectedValue(new Error('Error deleting category'));

      const response = await request(app)
        .delete('/category')
        .send({ categoryId: 1 });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Error deleting category' });
    });
  });

});
