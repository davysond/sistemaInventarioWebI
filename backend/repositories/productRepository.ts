import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductsByUserId = async (userId: number) => {
  return await prisma.product.findMany({ where: { userId } });
};

export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  userId?: number;
}) => {
  return await prisma.product.create({ data });
};

export const updateProduct = async (id: number, data: {
  name?: string;
  description?: string;
  price?: number;
}) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({ where: { id } });
};
