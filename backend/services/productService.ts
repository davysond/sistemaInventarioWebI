import * as productRepository from '../repositories/productRepository';

export const getAllProducts = async () => {
  return await productRepository.getAllProducts();
};

export const getProductsByUserId = async (userId: number) => {
  return await productRepository.getProductsByUserId(userId);
};

export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  userId: number;
}) => {
  return await productRepository.createProduct(data);
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