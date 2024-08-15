import * as productRepository from '../repositories/productRepository';

export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  userId?: number;
  categoryId?: number;
}) => {
  const { name, description, price, userId, categoryId } = data;

  if (!name || !price) {
    throw new Error('Name and price are required');
  }

  return await productRepository.createProduct({
    name,
    description,
    price,
    userId,
    categoryId,
  });
};

export const getProductById = async (id: number) => {
  if (!id) {
    throw new Error('Product ID is required');
  }

  return await productRepository.getProductById(id);
};

export const getAllProducts = async () => {
  return await productRepository.getAllProducts();
};

export const getProductsByUserId = async (userId: number) => {
  return await productRepository.getProductsByUserId(userId);
};

export const updateProduct = async (id: number, data: {
  name?: string;
  description?: string;
  price?: number;
}) => {
  return await productRepository.updateProduct(id, data);
};

export const deleteProduct = async (id: number) => {
  return await productRepository.deleteProduct(id);
};